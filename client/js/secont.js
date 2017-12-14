// Service Worker installing...
require('offline-plugin/runtime').install();

// Importing style...
import "../less/main.less";

// Dependencies
import Calendar from "./SecontPage/calendar";
import Schedule from "./SecontPage/schedule";

function sliderNextAnimate(button){
    const index = parseInt(button.getAttribute( "data-slide" ), 10 ) + 1;
    const wizard = document.querySelector( ".wizard:nth-child(" + index + ")" );
    const nextwizard = document.querySelector( ".wizard:nth-child(" + (index + 1) + ")" );
    wizard.style.left = "-" + 200 + "%";   
    wizard.style.position = "absolute"
    nextwizard.style.left = "100%";
    nextwizard.classList.add("active");
    setTimeout(_=>{
        nextwizard.style.left = "0";
    }, 1)
}

document.querySelectorAll(".slider-next-button").forEach(el=>{
    el.addEventListener("click", e=>{
        sliderNextAnimate(e.currentTarget)
    })
})

function MakeCalendarGreatAgain(){
    const date = new Date();
    const controllerArea = document.querySelector(".calendar-controller");
    const dayNamesArea = document.querySelector(".day-names");
    const daysArea = document.querySelector(".days");
    
    // [TODO] Window nesnesinden cikartilip ana bir class icinde erisim sagla...
    window.CalendarUtil = new Calendar(date, controllerArea, dayNamesArea, daysArea)
    window.CalendarUtil.init()
}

function MakeScheduleGreatAgain(){
    const buttonsArea = document.getElementById("schedule");
    window.Schedule = new Schedule(buttonsArea);
    window.Schedule.init()
    window.Schedule.value.addEventListener("change", e=>{
        console.log(`asd`)
    })
}

document.addEventListener("DOMContentLoaded", _=>{
    MakeCalendarGreatAgain()
    MakeScheduleGreatAgain()
})
