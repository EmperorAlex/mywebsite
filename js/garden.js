/* ==========================================================
   My Little Corner
   Phase 6 - Secret Garden
========================================================== */

const flowers = document.querySelectorAll(".flower");
const secretText = document.getElementById("secretText");
const secretTitle = document.querySelector("#secretCard h2");
const fireflyContainer = document.getElementById("fireflies");

let discoveries = 0;

/* ==========================================================
   Garden Secrets
========================================================== */

const secrets = [

{
title:"🌸 Hidden Blossom",
text:"Every flower blooms at its own pace. There is no need to rush your own season."
},

{
title:"🌙 Moonlight",
text:"Even in darkness, the moon quietly reminds us that gentle light is enough."
},

{
title:"🍃 Whispering Leaves",
text:"The wind carries stories that only patient hearts can hear."
},

{
title:"🦋 Tiny Wonder",
text:"Sometimes the smallest discoveries become the most memorable."
},

{
title:"☕ Garden Memory",
text:"Someone once shared coffee beneath these flowers and promised to return."
},

{
title:"✨ Secret Path",
text:"Not every path is meant to be found immediately. Some appear only after wandering."
}

];

/* ==========================================================
   Flower Click
========================================================== */

flowers.forEach((flower,index)=>{

    flower.addEventListener("click",()=>{

        revealSecret(index);

        flower.animate([

            {transform:"scale(1) rotate(0deg)"},
            {transform:"scale(1.4) rotate(10deg)"},
            {transform:"scale(1) rotate(0deg)"}

        ],{

            duration:600

        });

    });

});

/* ==========================================================
   Reveal Secret
========================================================== */

function revealSecret(index){

    secretTitle.textContent = secrets[index].title;

    secretText.textContent = secrets[index].text;

    discoveries++;

    if(discoveries === flowers.length){

        showToast("🏆 Achievement Unlocked: Garden Explorer");

    }

}

/* ==========================================================
   Fireflies
========================================================== */

function createFirefly(){

    const firefly = document.createElement("div");

    firefly.className = "firefly";

    firefly.style.left = Math.random()*window.innerWidth+"px";

    firefly.style.top = (window.innerHeight-80)+"px";

    firefly.style.animationDuration =
    (4+Math.random()*5)+"s";

    firefly.style.opacity = Math.random();

    fireflyContainer.appendChild(firefly);

    setTimeout(()=>{

        firefly.remove();

    },9000);

}

setInterval(createFirefly,500);

/* ==========================================================
   Toast
========================================================== */

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.textContent=message;

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

/* ==========================================================
   Secret Keyboard Shortcut
========================================================== */

document.addEventListener("keydown",(event)=>{

    if(event.key.toLowerCase()==="g"){

        secretTitle.textContent="🌿 Hidden Garden";

        secretText.textContent="The garden thanks you for taking the time to slow down.";

        showToast("🌙 A hidden blessing appeared.");

    }

});

/* ==========================================================
   Random Firefly Burst
========================================================== */

setInterval(()=>{

    if(Math.random()<0.15){

        for(let i=0;i<10;i++){

            setTimeout(createFirefly,i*120);

        }

    }

},8000);