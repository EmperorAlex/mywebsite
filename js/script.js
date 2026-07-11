/* ==========================================================
   My Little Corner
   Phase 1 JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       Cursor Glow
    =============================== */

    const glow = document.getElementById("cursor-glow");

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

    /* ===============================
       Floating Particles
    =============================== */

    const particleContainer = document.getElementById("particles");

    function createParticle(){

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * window.innerWidth + "px";

        const size = Math.random() * 6 + 3;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.animationDuration = (Math.random() * 5 + 6) + "s";

        particle.style.opacity = Math.random();

        particleContainer.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        },11000);

    }

    setInterval(createParticle,250);

    /* ===============================
       Begin Button
    =============================== */

    const button = document.getElementById("beginButton");

    button.addEventListener("click", () => {

        document.body.classList.add("fade-out");

        setTimeout(() => {

            window.location.href = "pages/cafe.html";

        },900);

    });

    /* ===============================
       Easter Egg
    =============================== */

    const title = document.querySelector("h1");

    let clicks = 0;

    title.addEventListener("click", () => {

        clicks++;

        if(clicks === 5){

            showToast("🌸 You found your first little secret.");

            clicks = 0;

        }

    });

});

/* ===================================
   Toast Message
=================================== */

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },500);

    },3000);

}