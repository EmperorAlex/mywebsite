/* ==========================================================
   My Little Corner
   Phase 7 - Music Room
========================================================== */

const audio = document.getElementById("music");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const vinyl = document.querySelector(".vinyl");

let noteInterval = null;

/* ==========================================
   Play Music
========================================== */

playButton.addEventListener("click", () => {

    audio.play();

    vinyl.classList.add("playing");

    startNotes();

    showToast("🎵 Music is now playing.");

});

/* ==========================================
   Pause Music
========================================== */

pauseButton.addEventListener("click", () => {

    audio.pause();

    vinyl.classList.remove("playing");

    stopNotes();

    showToast("☕ Music paused.");

});

/* ==========================================
   Volume
========================================== */

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

/* ==========================================
   Progress Bar
========================================== */

audio.addEventListener("timeupdate", () => {

    if(audio.duration){

        const percent =

        (audio.currentTime / audio.duration) * 100;

        progress.style.width = percent + "%";

    }

});

/* ==========================================
   Song Finished
========================================== */

audio.addEventListener("ended", () => {

    vinyl.classList.remove("playing");

    stopNotes();

    progress.style.width = "0%";

    showToast("🌸 Thanks for listening.");

});

/* ==========================================
   Floating Notes
========================================== */

function startNotes(){

    if(noteInterval) return;

    noteInterval = setInterval(createNote,600);

}

function stopNotes(){

    clearInterval(noteInterval);

    noteInterval = null;

}

function createNote(){

    const note = document.createElement("div");

    note.className = "note";

    const notes = ["♫","♪","♬","♩"];

    note.textContent =

    notes[Math.floor(Math.random()*notes.length)];

    note.style.left =

    (window.innerWidth/2 + (Math.random()*250-125)) + "px";

    note.style.top =

    (window.innerHeight/2 + 40) + "px";

    note.style.fontSize =

    (22 + Math.random()*18) + "px";

    document.body.appendChild(note);

    setTimeout(()=>{

        note.remove();

    },4000);

}

/* ==========================================
   Toast
========================================== */

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

/* ==========================================
   Keyboard Shortcuts
========================================== */

document.addEventListener("keydown",(event)=>{

    switch(event.key.toLowerCase()){

        case " ":

            event.preventDefault();

            if(audio.paused){

                playButton.click();

            }

            else{

                pauseButton.click();

            }

        break;

        case "m":

            audio.muted = !audio.muted;

            showToast(

                audio.muted ?

                "🔇 Muted"

                :

                "🔊 Unmuted"

            );

        break;

    }

});