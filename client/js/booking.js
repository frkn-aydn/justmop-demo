// Service Worker installing...
require('offline-plugin/runtime').install();

// Importing style...
import "../less/main.less";

// Dependencies
import Calendar from "./BookingPage/calendar";
import Schedule from "./BookingPage/schedule";
import Slider from "./BookingPage/slider"
import CleaningMaterials from "./BookingPage/cleaningMaterials";

export class Main {
    constructor() {
        const that = this;
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
        this.duration = DurationInput.value
        DurationInput.addEventListener("change", this.updateDurationTime)

        // Cleaner units
        const CleanersInput = document.getElementById("cleaners");
        this.cleaners = CleanersInput.value
        CleanersInput.addEventListener("change", this.updateCleaners);

        const clieaningMaterialsButtonsArea = document.getElementById("cleaning-materials");
        this.cleaningMaterials = new CleaningMaterials(clieaningMaterialsButtonsArea);
        
    }
    init() {
        this.calendar.init();
        this.schedule.init();
        this.cleaningMaterials.init();
    }
    updateDurationTime(event) {
        this.duration = event.currentTarget.value;
        //document.getElementById("duration-time-result").innerHTML = `${this.duration} ${this.duration == 1 ? "Hour" : "Hours"}`
    }
    updateCleaners(event) {
        this.cleaners = event.currentTarget.value;
        console.log(this.cleaners)
    }
}

new Main().init()