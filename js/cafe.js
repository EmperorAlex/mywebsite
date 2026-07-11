/* ==========================================================
   My Little Corner
   Café Navigation
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    setupNavigation();

});

/* ========================================================== */

function setupNavigation(){

    const pages = {

        journal: "journal.html",

        profiles: "profiles.html",

        garden: "garden.html",

        surprise: "surprise.html"

    };

    Object.keys(pages).forEach(id => {

        const button = document.getElementById(id);

        if(!button) return;

        button.addEventListener("click", () => {

            window.location.href = pages[id];

        });

    });

}