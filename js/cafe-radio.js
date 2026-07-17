/* ==========================================================
   Café Radio
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    createRadio();

});

/* ==========================================================
   Playlist
========================================================== */

const musicList = [

    {
        title: "Rainy Café",
        file: "../audio/rainy-cafe.mp3"
    },

    {
        title: "Soft Piano",
        file: "../audio/soft-piano.mp3"
    },

    {
        title: "Fireplace",
        file: "../audio/fireplace.mp3"
    },

    {
        title: "Garden Breeze",
        file: "../audio/garden.mp3"
    }

];

/* ==========================================================
   Global State
========================================================== */

let currentSong = Number(
    localStorage.getItem("radioSong")
) || 0;

let noteInterval = null;

let audio;
let playButton;
let toggleButton;
let radioPanel;
let closeButton;
let playlistSelect;
let volumeSlider;
let songTitle;

/* ==========================================================
   Local Storage Keys
========================================================== */

const STORAGE = {

    SONG: "radioSong",

    TIME: "radioTime",

    VOLUME: "radioVolume",

    PLAYING: "radioPlaying"

};

/* ==========================================================
   Create Radio
========================================================== */

function createRadio(){

    const html = `

        <div id="radioToggle">

            ☕

        </div>

        <div id="radioPanel">

            <div class="radioHeader">

                <div>

                    <h2>Café Radio</h2>

                    <span class="radioSubtitle">

                        Freshly Brewed Music

                    </span>

                </div>

                <div id="closeRadio">

                    ✕

                </div>

            </div>

            <div class="nowPlaying">

                <p>

                    Now Brewing

                </p>

                <h3 id="songTitle">

                </h3>

            </div>

            <div class="radioControls">

                <button id="previousSong">

                    ⏮

                </button>

                <button id="playPause">

                    ▶

                </button>

                <button id="nextSong">

                    ⏭

                </button>

            </div>

            <div class="radioSection">

                <label for="volumeSlider">

                    Volume

                </label>

                <input

                    type="range"

                    id="volumeSlider"

                    class="volumeSlider"

                    min="0"

                    max="1"

                    step="0.01"

                >

            </div>

            <div class="radioSection">

                <label for="playlist">

                    Playlist

                </label>

                <select

                    id="playlist"

                    class="playlist"

                >

                </select>

            </div>

        </div>

        <audio id="radioAudio"></audio>

    `;

    document.body.insertAdjacentHTML(

        "beforeend",

        html

    );

    setupPlayer();

}

/* ==========================================================
   Setup Player
========================================================== */

function setupPlayer(){

    audio = document.getElementById("radioAudio");

    playButton = document.getElementById("playPause");

    toggleButton = document.getElementById("radioToggle");

    radioPanel = document.getElementById("radioPanel");

    closeButton = document.getElementById("closeRadio");

    playlistSelect = document.getElementById("playlist");

    volumeSlider = document.getElementById("volumeSlider");

    songTitle = document.getElementById("songTitle");

    /* ===============================
       Build Playlist
    =============================== */

    musicList.forEach((song,index)=>{

        const option = document.createElement("option");

        option.value = index;

        option.textContent = song.title;

        playlistSelect.appendChild(option);

    });

    /* ===============================
       Restore Settings
    =============================== */

    volumeSlider.value = localStorage.getItem(STORAGE.VOLUME) || .5;

    audio.volume = volumeSlider.value;

    playlistSelect.value = currentSong;

    loadSong(currentSong);

    audio.currentTime = Number(

        localStorage.getItem(STORAGE.TIME)

    ) || 0;

    if(localStorage.getItem(STORAGE.PLAYING)==="true"){

        audio.play().catch(()=>{});

        updatePlayerState();

        startNotes();

    }

    /* ===============================
       Toggle Panel
    =============================== */

    toggleButton.onclick = ()=>{

        radioPanel.classList.toggle("open");

    };

    closeButton.onclick = ()=>{

        radioPanel.classList.remove("open");

    };

    /* ===============================
       Play / Pause
    =============================== */

    playButton.onclick = ()=>{

        if(audio.paused){

            audio.play();

            startNotes();

        }

        else{

            audio.pause();

            stopNotes();

        }

        updatePlayerState();

    };

    /* ===============================
       Previous Song
    =============================== */

    document.getElementById("previousSong").onclick = ()=>{

        currentSong--;

        if(currentSong<0){

            currentSong = musicList.length-1;

        }

        playSong(currentSong);

    };

    /* ===============================
       Next Song
    =============================== */

    document.getElementById("nextSong").onclick = ()=>{

        currentSong++;

        if(currentSong>=musicList.length){

            currentSong = 0;

        }

        playSong(currentSong);

    };

    /* ===============================
       Playlist
    =============================== */

    playlistSelect.onchange = ()=>{

        currentSong = Number(

            playlistSelect.value

        );

        playSong(currentSong);

    };

    /* ===============================
       Volume
    =============================== */

    volumeSlider.oninput = ()=>{

        audio.volume = volumeSlider.value;

        localStorage.setItem(

            STORAGE.VOLUME,

            volumeSlider.value

        );

    };

    /* ===============================
       Save Playback
    =============================== */

    setInterval(()=>{

        localStorage.setItem(

            STORAGE.TIME,

            audio.currentTime

        );

    },1000);

    /* ===============================
       Auto Next Song
    =============================== */

    audio.onended = ()=>{

        currentSong++;

        if(currentSong>=musicList.length){

            currentSong = 0;

        }

        playSong(currentSong);

    };

}

/* ==========================================================
   Player Functions
========================================================== */

function loadSong(index){

    const song = musicList[index];

    audio.src = song.file;

    songTitle.textContent = song.title;

    playlistSelect.value = index;

    localStorage.setItem(

        STORAGE.SONG,

        index

    );

}

/* ========================================================== */

function playSong(index){

    currentSong = index;

    loadSong(index);

    audio.currentTime = 0;

    audio.play();

    startNotes();

    updatePlayerState();

}

/* ========================================================== */

function updatePlayerState(){

    if(audio.paused){

        playButton.textContent = "▶";

        toggleButton.classList.remove("playing");

        localStorage.setItem(

            STORAGE.PLAYING,

            "false"

        );

    }

    else{

        playButton.textContent = "❚❚";

        toggleButton.classList.add("playing");

        localStorage.setItem(

            STORAGE.PLAYING,

            "true"

        );

    }

}

/* ==========================================================
   Floating Notes
========================================================== */

function startNotes(){

    if(noteInterval) return;

    noteInterval = setInterval(()=>{

        if(audio.paused) return;

        const note = document.createElement("div");

        note.className = "radioNote";

        note.textContent =

            ["♫","♪","♬"][

                Math.floor(

                    Math.random()*3

                )

            ];

        note.style.left =

            (window.innerWidth-120)+"px";

        note.style.bottom = "110px";

        note.style.fontSize =

            (20+Math.random()*12)+"px";

        note.style.transform =

            `rotate(${Math.random()*30-15}deg)`;

        document.body.appendChild(note);

        setTimeout(()=>{

            note.remove();

        },4000);

    },1800);

}

/* ========================================================== */

function stopNotes(){

    clearInterval(noteInterval);

    noteInterval = null;

}

/* ==========================================================
   Audio Events
========================================================== */

audio?.addEventListener("pause",()=>{

    stopNotes();

    updatePlayerState();

});

audio?.addEventListener("play",()=>{

    startNotes();

    updatePlayerState();

});