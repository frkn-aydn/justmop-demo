// Service Worker installing...
require('offline-plugin/runtime').install();

// Importing style...
import "../less/main.less";

// Dependencies
import Calendar from "./SecontPage/calendar";
import Schedule from "./SecontPage/schedule";

(_ => {
    class Main {
        constructor() {
            // Generating Calendar...
            const date = new Date();
            const controllerArea = document.querySelector(".calendar-controller");
            const dayNamesArea = document.querySelector(".day-names");
            const daysArea = document.querySelector(".days");
            this.calendar = new Calendar(date, controllerArea, dayNamesArea, daysArea)
            
            // Generating Schedule...
            const scheduleButtonsArea = document.getElementById("schedule");
            this.schedule = new Schedule(scheduleButtonsArea);
            
            //Stay time...
            const DurationInput = document.getElementById("stay-time");
            this.duration = 1
            DurationInput.addEventListener("change", this.updateDurationTime)

            // Cleaner units
            const CleanersInput = document.getElementById("cleaners");
            CleanersInput.addEventListener("change", updateCleaners);
        }
        init() {
            this.calendar.init()
            this.schedule.init();
        }
        updateDurationTime(event){
            this.duration = event.currentTarget.value;
            document.getElementById("duration-time-result").innerHTML = `${this.duration} ${this.duration == 1 ? "Hour" : "Hours"}`
        }
        updateCleaners(event){
            
        }
    }

    window.mainFunction = new Main();
    window.mainFunction.init()
})()

// Slider
function sliderNextAnimate(button) {
    const index = parseInt(button.getAttribute("data-slide"), 10) + 1;
    const wizard = document.querySelector(".wizard:nth-child(" + index + ")");
    const nextwizard = document.querySelector(".wizard:nth-child(" + (index + 1) + ")");
    wizard.style.left = "-" + 200 + "%";
    wizard.style.position = "absolute"
    nextwizard.style.left = "100%";
    nextwizard.classList.add("active");
    setTimeout(_ => {
        nextwizard.style.left = "0";
    }, 1)
}
document.querySelectorAll(".slider-next-button").forEach(el => {
    el.addEventListener("click", e => {
        sliderNextAnimate(e.currentTarget)
    })
})