/* ==========================================================
   My Little Corner
   Global JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    createMouseGlow();

    enableRipples();

    pageTransition();

    setupLoader();

});

/* ==========================================================
   Mouse Glow
========================================================== */

function createMouseGlow(){

    if(document.getElementById("mouseGlow")) return;

    const glow = document.createElement("div");

    glow.id = "mouseGlow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove",(e)=>{

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

}

/* ==========================================================
   Toast
========================================================== */

function showToast(message){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}

/* ==========================================================
   Ripple
========================================================== */

function enableRipples(){

    document.querySelectorAll("button").forEach(button=>{

        if(button.dataset.rippleAttached) return;

        button.dataset.rippleAttached = "true";

        button.style.position = "relative";

        button.style.overflow = "hidden";

        button.addEventListener("click",(e)=>{

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = button.getBoundingClientRect();

            ripple.style.left = (e.clientX-rect.left)+"px";

            ripple.style.top = (e.clientY-rect.top)+"px";

            button.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

}

/* ==========================================================
   Page Transition
========================================================== */

function pageTransition(){

    document.querySelectorAll("a").forEach(link=>{

        if(link.target === "_blank") return;

        if(link.href.startsWith("javascript:")) return;

        link.addEventListener("click",(e)=>{

            const url = link.href;

            if(!url) return;

            e.preventDefault();

            document.body.classList.add("fadeOut");

            setTimeout(()=>{

                window.location = url;

            },350);

        });

    });

}

/* ==========================================================
   Loading Screen
========================================================== */

function setupLoader(){

    const loader = document.getElementById("loader");

    if(!loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("hidden");

        },1700);

    });

}

/* ==========================================================
   Achievement System
========================================================== */

function unlockAchievement(id,title){

    const unlocked =

    JSON.parse(

        localStorage.getItem("mlcAchievements")

        ||

        "[]"

    );

    if(unlocked.includes(id)) return;

    unlocked.push(id);

    localStorage.setItem(

        "mlcAchievements",

        JSON.stringify(unlocked)

    );

    showToast("🏆 Achievement Unlocked: "+title);

}

function hasAchievement(id){

    const unlocked =

    JSON.parse(

        localStorage.getItem("mlcAchievements")

        ||

        "[]"

    );

    return unlocked.includes(id);

}

/* ==========================================================
   Random Helper
========================================================== */

function randomItem(array){

    return array[

        Math.floor(Math.random()*array.length)

    ];

}

/* ==========================================================
   Keyboard Shortcuts
========================================================== */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        document.querySelectorAll(".modal").forEach(modal=>{

            modal.remove();

        });

    }

});

/* ==========================================================
   Theme
========================================================== */

function setTheme(theme){

    document.documentElement.dataset.theme = theme;

    localStorage.setItem("theme",theme);

}

(function(){

    const saved = localStorage.getItem("theme");

    if(saved){

        document.documentElement.dataset.theme = saved;

    }

})();