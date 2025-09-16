
const CORRECT_USER = "Sofia";
const CORRECT_PASS = "PrincessOfJesus";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === CORRECT_USER && pass === CORRECT_PASS) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    startCounter();
    greetingMessage();
    loadSong(currentSongIndex);
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

function toggleMenu() {
  const menu = document.getElementById("menu-list");
  menu.classList.toggle("hidden");
}

// Saudação
function greetingMessage() {
  const hours = new Date().getHours();
  let greeting;
  if (hours < 12) greeting = "Bom dia";
  else if (hours < 18) greeting = "Boa tarde";
  else greeting = "Boa noite";

  document.getElementById("greeting").innerText = `${greeting}, Sofia 💜`;
}

// Contador com meses
function startCounter() {
  const startDate = new Date("2025-07-12T00:00:00");
  setInterval(() => {
    const now = new Date();
    let diff = now - startDate;

    let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("counter").innerText =
      `Nos conhecemos há ${months} meses, ${days} dias, ${hours} horas e ${minutes} minutos`;
  }, 1000);
}

// Player de música
const songs = [
  "musicas/Pode Morar Aqui.ogg",
  "musicas/Fogo em Teus Olhos.ogg",
  "musicas/Homem Deus.ogg",
  "musicas/Êxodo.ogg",
  "musicas/Somos Um.ogg",
  "musicas/OH! Se Fendesses.ogg"
];
let currentSongIndex = 0;
const audio = document.getElementById("audio");
const trackTitle = document.getElementById("track-title");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(index) {
  audio.src = songs[index];
  trackTitle.innerText = "🎶 Tocando agora: " + songs[index].split("/")[1].replace(".ogg","");
  audio.play();
}

function togglePlay() {
  if (audio.paused) audio.play();
  else audio.pause();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime % 60);
  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;

  let durationMinutes = Math.floor(audio.duration / 60) || 0;
  let durationSeconds = Math.floor(audio.duration % 60) || 0;
  if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

  currentTimeEl.innerText = `${currentMinutes}:${currentSeconds}`;
  durationEl.innerText = `${durationMinutes}:${durationSeconds}`;
});

progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener("ended", () => {
  nextSong();
});

// Partículas de coração
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💜";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 15 + 15 + "px";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}
setInterval(createHeart, 800);

// Animação do hambúrguer
function toggleMenu() {
  const menu = document.getElementById("menu-list");
  const burger = document.querySelector(".hamburger");
  menu.classList.toggle("hidden");
  burger.classList.toggle("active");
}
