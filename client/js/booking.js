// Service Worker installing...
require('offline-plugin/runtime').install();

// Importing style...
import "../less/main.less";

// Dependencies
import Calendar from "./BookingPage/calendar";
import Schedule from "./BookingPage/schedule";
import Slider from "./BookingPage/slider"
import CleaningMaterials from "./BookingPage/cleaningMaterials";

const date = new Date();
const controllerArea = document.querySelector(".calendar-controller");
const dayNamesArea = document.querySelector(".day-names");
const daysArea = document.querySelector(".days");
const calendar = new Calendar(date, controllerArea, dayNamesArea, daysArea)
calendar.init(document.getElementById("selected-date"))

const scheduleButtonsArea = document.getElementById("schedule");
const schedule = new Schedule(scheduleButtonsArea)
schedule.init()

const cleanTimeInput = document.getElementById("clean-time");
let cleanTime = 1
cleanTimeInput.addEventListener("change", cleanTimeUpdate)

function cleanTimeUpdate(e){
    cleanTime = e.currentTarget.value;    
    showResults()
}

const CleanersInput = document.getElementById("cleaners");
let cleaners = 1;
CleanersInput.addEventListener("change", updateCleaners);

function updateCleaners(e) {
    cleaners = e.currentTarget.value;
    showResults()
}

const CleaningMaterialsArea = document.getElementById("cleaning-materials")
const cleaningMaterials = new CleaningMaterials(CleaningMaterialsArea)
cleaningMaterials.init()

const cleaningInstructionsButton = document.getElementById("cleaning-instructions")
let cleaningInstructions = ""
cleaningInstructionsButton.addEventListener("change", cleaningInstructionsUpdate)

function cleaningInstructionsUpdate(e){
    cleaningInstructions = e.currentTarget.value;
    showResults()
}

function showResults(){
    console.log("Secilen tarih, ", calendar.date)
    console.log("How often sorusunun cevabı, ", schedule.value);
    console.log("Clean time, ", cleanTime)
    console.log("cleaners, ", cleaners)
    console.log("cleanıng materials, ", cleaningMaterials.value)
    console.log("cleanıng Instructions, ", cleaningInstructions)
}


import $ from "jquery";
import bootstrap from "bootstrap";
import formValidate from "./vendors/form-validate";