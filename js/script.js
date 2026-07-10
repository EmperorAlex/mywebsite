const enterButton = document.getElementById("enter");

const landing = document.getElementById("landing");

const cafe = document.getElementById("cafe");

enterButton.addEventListener("click", () => {

    landing.style.display = "none";

    cafe.style.display = "block";

});