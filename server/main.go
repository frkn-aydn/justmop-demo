package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"justmop-demo/server/routers"
	"os"
	"time"

	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
	"github.com/kataras/iris/sessions"
	"github.com/kataras/iris/sessions/sessiondb/redis"
	"github.com/kataras/iris/sessions/sessiondb/redis/service"
)

func main() {
	// Config file inserting...
	type ConfigType struct {
		Port string `json:"port"`
	}

	configFile, err := ioutil.ReadFile("server/config.json")
	if err != nil {
		fmt.Printf("File error: %v\n", err)
		os.Exit(1)
	}

	var config ConfigType
	json.Unmarshal(configFile, &config)
	fmt.Println("Config file inserted...")

	// Redis session added...
	db := redis.New(service.Config{
		Network:     service.DefaultRedisNetwork,
		Addr:        service.DefaultRedisAddr,
		Password:    "",
		Database:    "",
		MaxIdle:     0,
		MaxActive:   0,
		IdleTimeout: service.DefaultRedisIdleTimeout,
		Prefix:      ""})
	iris.RegisterOnInterrupt(func() {
		db.Close()
	})

	// Session config added...
	sess := sessions.New(sessions.Config{Cookie: "sessionscookieid", Expires: 45 * time.Minute})
	sess.UseDatabase(db)

	// Iris started...
	app := iris.New()
	app.Use(logger.New())

	// Static files served with iris...
	app.StaticServe("server/public", "/")

	// Templates registered...
	app.RegisterView(iris.HTML("server/views", ".html"))

	app.PartyFunc("/", routers.AppHandler)

	// Starting server...
	app.Run(
		iris.Addr("localhost:"+config.Port),
		iris.WithoutVersionChecker,
		iris.WithoutServerError(iris.ErrServerClosed),
		iris.WithOptimizations, // enables faster json serialization and more
	)
}
