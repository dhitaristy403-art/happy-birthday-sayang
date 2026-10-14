const startButton = document.getElementById("startButton");
const startScreen = document.getElementById("startScreen");
const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");
const skipIntro = document.getElementById("skipIntro");
const music = document.getElementById("music");
const scenes = document.querySelectorAll(".scene");

let currentScene = 0;
let started = false;
let introDone = false;
let sceneTimer = null;


/* =========================
   1. KLIK "BUKA SURPRISE"
   -> putar video pembuka
========================= */

startButton.addEventListener("click", function () {

    if (started) return;
    started = true;

    startScreen.style.opacity = "0";
    setTimeout(() => {
        startScreen.style.display = "none";
    }, 1000);

    intro.classList.add("show");

    introVideo.currentTime = 0;
    introVideo.play().catch(() => endIntro());
});


/* =========================
   2. VIDEO SELESAI / DILEWATI
   -> lanjut ke scene
========================= */

introVideo.addEventListener("ended", endIntro);
introVideo.addEventListener("error", endIntro);
skipIntro.addEventListener("click", endIntro);

function endIntro() {

    if (introDone) return;
    introDone = true;

    introVideo.pause();

    intro.style.opacity = "0";
    setTimeout(() => {
        intro.style.display = "none";
    }, 1000);

    music.currentTime = 0;
    music.play().catch(() => {
        console.log("Musik membutuhkan interaksi pengguna.");
    });

    currentScene = 0;
    scenes[0].classList.add("active");
    sceneTimer = setTimeout(nextScene, durationOf(0));
}


/* =========================
   3. PINDAH SCENE
   Atur lama tampil lewat atribut
   data-duration="7000" di index.html
   (default 3000 = 3 detik)
========================= */

function durationOf(index) {
    return Number(scenes[index].dataset.duration) || 3000;
}

function nextScene() {

    if (currentScene >= scenes.length - 1) {
        return; /* scene terakhir tetap tampil */
    }

    scenes[currentScene].classList.remove("active");

    currentScene++;

    scenes[currentScene].classList.add("active");

    sceneTimer = setTimeout(nextScene, durationOf(currentScene));
}