
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

function sliderBackAnimate(button) {
    const index = parseInt(button.getAttribute("data-slide"), 10);
    const wizard = document.querySelector(".wizard:nth-child(" + index + ")");
    const nextwizard = document.querySelector(".wizard:nth-child(" + (index + 1) + ")");

    wizard.classList.add("active");
    wizard.style.left = 0;
    wizard.style.position = "relative"

    nextwizard.classList.remove("active");

}

document.querySelectorAll(".slider-next-button").forEach(el => {
    el.addEventListener("click", e => {
        sliderNextAnimate(e.currentTarget)
    })
})

document.querySelectorAll(".slider-back-button").forEach(el => {
    el.addEventListener("click", e => {
        sliderBackAnimate(e.currentTarget)
    })
})