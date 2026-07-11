/* ==========================================================
   My Little Corner
   Friend Profiles
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const polaroids = document.querySelectorAll(".polaroid");

    polaroids.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.style.zIndex = "100";

        });

        card.addEventListener("mouseleave", () => {

            card.style.zIndex = "1";

        });

    });

});