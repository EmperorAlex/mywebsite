/* ==========================================================
   My Little Corner
   Phase 5 - Curiosity Cabinet
========================================================== */

const drawer = document.querySelector(".drawer");
const button = document.getElementById("discoverButton");
const resultText = document.getElementById("resultText");
const resultTitle = document.querySelector("#resultCard h2");

let clickCount = 0;

/* ==========================================================
   Discoveries
========================================================== */

const discoveries = [

    {
        type:"☕ Cozy Quote",
        chance:40,
        text:"A warm drink shared with a friend is never time wasted."
    },

    {
        type:"🌸 Hidden Memory",
        chance:20,
        text:"You found an old café receipt tucked inside the drawer. On the back it simply says, 'Let's meet here again someday.'"
    },

    {
        type:"😂 Funny Moment",
        chance:15,
        text:"Achievement unlocked: Professional Drawer Opener."
    },

    {
        type:"📖 Journal Excerpt",
        chance:10,
        text:"'Some days don't need excitement. Sometimes peace is enough.'"
    },

    {
        type:"🎵 Music Recommendation",
        chance:8,
        text:"Today's recommendation: Soft piano with gentle rain."
    },

    {
        type:"🌿 Garden Hint",
        chance:5,
        text:"Someone whispered that one flower in the Secret Garden hides a secret."
    },

    {
        type:"✨ Rare Discovery",
        chance:2,
        text:"You discovered a tiny golden key. It doesn't seem to fit anything... yet."
    }

];

/* ==========================================================
   Open Drawer
========================================================== */

button.addEventListener("click", openDrawer);

drawer.addEventListener("click", openDrawer);

function openDrawer(){

    clickCount++;

    drawer.classList.add("open");

    createSparkles();

    const reward = chooseReward();

    setTimeout(()=>{

        resultTitle.textContent = reward.type;

        resultText.textContent = reward.text;

        drawer.classList.remove("open");

    },500);

    if(clickCount === 10){

        showToast("🏆 Achievement Unlocked: Curiosity Never Sleeps");

    }

}

/* ==========================================================
   Weighted Random
========================================================== */

function chooseReward(){

    const pool=[];

    discoveries.forEach(item=>{

        for(let i=0;i<item.chance;i++){

            pool.push(item);

        }

    });

    const random=Math.floor(Math.random()*pool.length);

    return pool[random];

}

/* ==========================================================
   Sparkles
========================================================== */

function createSparkles(){

    for(let i=0;i<12;i++){

        const sparkle=document.createElement("div");

        sparkle.className="sparkle";

        sparkle.textContent="✨";

        sparkle.style.left=(window.innerWidth/2+(Math.random()*180-90))+"px";

        sparkle.style.top=(window.innerHeight/2+(Math.random()*100-50))+"px";

        sparkle.style.fontSize=(18+Math.random()*20)+"px";

        document.body.appendChild(sparkle);

        setTimeout(()=>{

            sparkle.remove();

        },2000);

    }

}

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
   Secret Shortcut
========================================================== */

document.addEventListener("keydown",(event)=>{

    if(event.key.toLowerCase()==="d"){

        showToast("🌸 Developer Secret: Every discovery starts with curiosity.");

    }

});