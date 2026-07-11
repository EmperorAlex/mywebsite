/* ==========================================================
   Café Radio
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    createRadio();

});

/* ===================================================== */

const playlist = [

{
title:"Rainy Café",
file:"../audio/rainy-cafe.mp3"
},

{
title:"Soft Piano",
file:"../audio/soft-piano.mp3"
},

{
title:"Fireplace",
file:"../audio/fireplace.mp3"
},

{
title:"Garden Breeze",
file:"../audio/garden.mp3"
}

];

let currentSong = Number(localStorage.getItem("radioSong")) || 0;

/* ===================================================== */

function createRadio(){

    const html = `

<div id="radioToggle">📻</div>

<div id="radioPanel">

<div class="radioHeader">

<h2>Café Radio</h2>

<div id="closeRadio">✕</div>

</div>

<div class="songTitle" id="songTitle"></div>

<div class="radioControls">

<button id="previousSong">⏮</button>

<button id="playPause">▶</button>

<button id="nextSong">⏭</button>

</div>

<input

type="range"

min="0"

max="1"

step="0.01"

class="volumeSlider"

id="volumeSlider">

<select

id="playlist"

class="playlist">

</select>

</div>

<audio id="radioAudio"></audio>

`;

    document.body.insertAdjacentHTML("beforeend",html);

    setupPlayer();

}

/* ===================================================== */

function setupPlayer(){

    const audio=document.getElementById("radioAudio");

    const play=document.getElementById("playPause");

    const toggle=document.getElementById("radioToggle");

    const panel=document.getElementById("radioPanel");

    const close=document.getElementById("closeRadio");

    const select=document.getElementById("playlist");

    const volume=document.getElementById("volumeSlider");

    const title=document.getElementById("songTitle");

    /* Playlist */

    playlist.forEach((song,index)=>{

        const option=document.createElement("option");

        option.value=index;

        option.textContent=song.title;

        select.appendChild(option);

    });

    /* Restore */

    volume.value=localStorage.getItem("radioVolume") || .5;

    audio.volume=volume.value;

    select.value=currentSong;

    loadSong(currentSong);

    const savedTime=Number(localStorage.getItem("radioTime"))||0;

    audio.currentTime=savedTime;

    if(localStorage.getItem("radioPlaying")==="true"){

        audio.play().catch(()=>{});

        play.textContent="❚❚";

        toggle.classList.add("playing");

        createNotes();

    }

    /* Toggle */

    toggle.onclick=()=>{

        panel.classList.toggle("open");

    };

    close.onclick=()=>{

        panel.classList.remove("open");

    };

    /* Play */

    play.onclick=()=>{

        if(audio.paused){

            audio.play();

            play.textContent="❚❚";

            toggle.classList.add("playing");

            localStorage.setItem("radioPlaying","true");

            createNotes();

        }

        else{

            audio.pause();

            play.textContent="▶";

            toggle.classList.remove("playing");

            localStorage.setItem("radioPlaying","false");

        }

    };

    /* Next */

    document.getElementById("nextSong").onclick=()=>{

        currentSong++;

        if(currentSong>=playlist.length){

            currentSong=0;

        }

        loadSong(currentSong);

        audio.play();

    };

    /* Previous */

    document.getElementById("previousSong").onclick=()=>{

        currentSong--;

        if(currentSong<0){

            currentSong=playlist.length-1;

        }

        loadSong(currentSong);

        audio.play();

    };

    /* Playlist */

    select.onchange=()=>{

        currentSong=Number(select.value);

        loadSong(currentSong);

        audio.play();

    };

    /* Volume */

    volume.oninput=()=>{

        audio.volume=volume.value;

        localStorage.setItem("radioVolume",volume.value);

    };

    /* Save position */

    setInterval(()=>{

        localStorage.setItem("radioTime",audio.currentTime);

    },1000);

    function loadSong(index){

        audio.src=playlist[index].file;

        title.textContent=playlist[index].title;

        localStorage.setItem("radioSong",index);

    }

}

/* ===================================================== */

function createNotes(){

    setInterval(()=>{

        const audio=document.getElementById("radioAudio");

        if(audio.paused) return;

        const note=document.createElement("div");

        note.className="radioNote";

        note.textContent=["♫","♪","♬"][Math.floor(Math.random()*3)];

        note.style.left=(window.innerWidth-120)+"px";

        note.style.bottom="110px";

        document.body.appendChild(note);

        setTimeout(()=>{

            note.remove();

        },4000);

    },2200);

}