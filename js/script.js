const landing = document.getElementById("landing");

const cafe = document.getElementById("cafe");

const enterButton = document.getElementById("enter");

enterButton.addEventListener("click", function () {

    landing.classList.add("hidden");

    cafe.classList.remove("hidden");

});