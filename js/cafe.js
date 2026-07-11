/* ==========================================================
   My Little Corner
   Phase 2 - Café JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       Mouse Glow
    ===================================== */

    createMouseGlow();

    /* =====================================
       Fade In
    ===================================== */

    document.body.classList.add("loaded");

    /* =====================================
       Card Hover Animation
    ===================================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px) scale(1.02)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /* =====================================
       Secret Click
    ===================================== */

    const logo = document.querySelector(".logo");

    let clickCount = 0;

    logo.addEventListener("click", () => {

        clickCount++;

        if(clickCount === 7){

            showToast("☕ The café remembers every visitor.");

            clickCount = 0;

        }

    });

});

/* =====================================
   Navigation
===================================== */

function goTo(page){

    document.body.classList.add("page-leave");

    setTimeout(() => {

        window.location.href = page;

    },700);

}

/* =====================================
   Mouse Glow
===================================== */

function createMouseGlow(){

    const glow = document.createElement("div");

    glow.id = "mouseGlow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove",(e)=>{

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

}

/* =====================================
   Toast Message
===================================== */

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

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

/* =====================================
   Keyboard Shortcut
===================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key.toLowerCase()==="h"){

        goTo("../index.html");

    }

});

/* =====================================
   Optional Ripple Effect
===================================== */

const buttons = document.querySelectorAll("button");

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=e.clientX-rect.left+"px";

        ripple.style.top=e.clientY-rect.top+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});