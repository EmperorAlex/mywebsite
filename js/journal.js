/* ======================================================
   My Little Corner
   Journal
====================================================== */

const entries = [

{

    date:"July 12, 2026",

    title:"Rainy Afternoon",

    text:`Today the rain quietly tapped against the café window.

I spent the afternoon with a warm drink, listening to soft music while people wandered outside.

Some days don't need excitement.

Sometimes peace is enough.`,

    image:"../images/journal-photo.jpg",

    caption:"A quiet afternoon ☕",

    note:"Remember\n\nBuy flowers 🌸"

},

{

    date:"July 18, 2026",

    title:"A Walk Through The Garden",

    text:`The flowers were brighter today.

The breeze carried the scent of fresh leaves and roses.

I wished time would slow down just a little longer.`,

    image:"../images/journal-photo2.jpg",

    caption:"Morning Garden 🌸",

    note:"Water the flowers."

},

{

    date:"July 24, 2026",

    title:"Coffee & Music",

    text:`I discovered a song that perfectly matched the weather.

Coffee tasted warmer.

The café felt quieter.

Maybe that's what happiness feels like.`,

    image:"../images/journal-photo3.jpg",

    caption:"Coffee Time ☕",

    note:"Find this song again."

}

];

/* ====================================== */

let currentEntry = 0;

/* ====================================== */

const dateElement = document.getElementById("entryDate");

const titleElement = document.getElementById("entryTitle");

const textElement = document.getElementById("entryText");

const photo = document.querySelector(".polaroid img");

const caption = document.querySelector(".polaroid span");

const sticky = document.querySelector(".sticky");

/* ====================================== */

function loadEntry(index){

    const entry = entries[index];

    dateElement.textContent = entry.date;

    titleElement.textContent = entry.title;

    textElement.innerText = entry.text;

    photo.src = entry.image;

    caption.textContent = entry.caption;

    sticky.innerText = entry.note;

}

/* ====================================== */

document.getElementById("nextButton").addEventListener("click",()=>{

    currentEntry++;

    if(currentEntry >= entries.length){

        currentEntry = 0;

    }

    pageTurn();

    setTimeout(()=>{

        loadEntry(currentEntry);

    },250);

});

/* ====================================== */

document.getElementById("previousButton").addEventListener("click",()=>{

    currentEntry--;

    if(currentEntry < 0){

        currentEntry = entries.length-1;

    }

    pageTurn();

    setTimeout(()=>{

        loadEntry(currentEntry);

    },250);

});

/* ====================================== */

function pageTurn(){

    const pages=document.querySelectorAll(".page");

    pages.forEach(page=>{

        page.style.transform="rotateY(90deg)";
        page.style.opacity=".4";

    });

    setTimeout(()=>{

        pages.forEach(page=>{

            page.style.transform="rotateY(0deg)";
            page.style.opacity="1";

        });

    },250);

}

/* ====================================== */
/* Flower Easter Egg */
/* ====================================== */

const flower=document.querySelector(".flower");

flower.addEventListener("click",()=>{

    randomQuote();

});

/* ====================================== */

const quotes=[

"🌸 Some memories bloom forever.",

"☕ A warm drink can fix more than you think.",

"🌿 Quiet places often tell the loudest stories.",

"📖 Every page remembers something.",

"🎵 Some songs become memories."

];

/* ====================================== */

function randomQuote(){

    const random=Math.floor(Math.random()*quotes.length);

    showToast(quotes[random]);

}

/* ====================================== */

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

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

/* ====================================== */
/* Keyboard Navigation */
/* ====================================== */

document.addEventListener("keydown",(event)=>{

    if(event.key==="ArrowRight"){

        document.getElementById("nextButton").click();

    }

    if(event.key==="ArrowLeft"){

        document.getElementById("previousButton").click();

    }

});

/* ====================================== */

loadEntry(currentEntry);