import Language from "../../languages/eng";

export default class calendar {
    constructor(date, constrollerArea, dayNamesArea, daysArea) {
        this.date = date;
        this.constrollerArea = constrollerArea;
        this.dayNamesArea = dayNamesArea;
        this.daysArea = daysArea;
        this.crated = false
    }
    init() {
        this.setUpControllers()
        this.giveDayNames()
        this.insertDays()
        this.setTitle()
    }
    setTitle(){
        const month = Language.MONTH_NAMES[(this.date.getMonth())]
        this.constrollerArea.querySelector(".title").innerHTML = `${month}, ${this.date.getFullYear()}`
    }
    setUpControllers() {
        if(this.crated) return;
        const that = this;
        const backToLastMonth = this.constrollerArea.querySelector("#last-month");
        const goToNextMonth = this.constrollerArea.querySelector("#next-month");
        backToLastMonth.addEventListener("click", _ => {
            that.date = new Date(that.date.getFullYear(), that.date.getMonth() - 1);
            that.crated = true
            that.init()
        })
        goToNextMonth.addEventListener("click", _ => {
            that.date = new Date(that.date.getFullYear(), that.date.getMonth() + 1);
            that.crated = true
            that.init()
        })
    }
    giveDayNames() {
        this.dayNamesArea.innerHTML = ""
        // Day names giving...
        Language.DAY_NAMES.forEach(day => {
            this.dayNamesArea.innerHTML += `<li>${day}</li>`
        })
        
    }
    insertDays() {
        const that = this;
        let controlerDate = new Date(this.date.getFullYear(), (this.date.getMonth() + 1), 0)
        const now = new Date()
        const previousDay = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
        let currentDate = new Date(this.date.getFullYear(), (this.date.getMonth()), 1)
        let iter = 0;
        let ready = true;
        if (currentDate.getDay() !== 0) {
            iter = 0 - currentDate.getDay()
        }
        this.daysArea.innerHTML = ""
        while (ready) {
            currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), ++iter)
            const li = document.createElement("li");
            if(iter < 1 || previousDay > +currentDate) li.classList.add("outside");
            if(now.getDate() == currentDate.getDate()) li.classList.add("active")
            li.setAttribute("data-date", `${currentDate.getDate()}`)
            li.setAttribute("data-month", `${currentDate.getMonth()}`)
            li.setAttribute("data-year", `${currentDate.getFullYear()}`)

            li.innerHTML += `<div class="date">${currentDate.getDate()}</div>`

            if(iter < 1 || previousDay > +currentDate) {
                li.style.userSelect = "none";
                li.style.cursor = "default"
            }else{
                li.addEventListener("click", e=>{
                    e.currentTarget.parentNode.querySelectorAll("li").forEach(el=>{
                        el.classList.remove("active");
                        if(e.currentTarget == el) el.classList.add("active");
                        var d = new Date();
                        d.setDate(e.currentTarget.dataset.date);
                        d.setMonth(e.currentTarget.dataset.month);
                        d.setFullYear(e.currentTarget.dataset.year);
                        that.date = d;
                    })
                })
            }
            this.daysArea.appendChild(li)
            if (+controlerDate < +currentDate && currentDate.getDay() === 1) {
                ready = false
            }
        }
    }
}