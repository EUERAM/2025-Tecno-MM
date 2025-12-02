console.log("App inicialitzada..."); // aqui també van comentaris

//definim variables per als botons i l'àudio
var buttonPause = document.querySelector(".pause-audio");
var buttonPlay = document.querySelector(".play-audio");
var audio = document.querySelector("audio");

//carrego video
var videoAnimals = document.querySelector(".video-animals");
var areaInteractiva = document.querySelector(".areaInteractiva");

let audios = [
  "medias/can.mp3",
  "medias/bump.mp3",
  "medias/groove.mp3",
  "medias/crickets.mp3",
];

//
buttonPlay.addEventListener("click", function () {
  let numeroAleatori = Math.floor(Math.random() * 4);
  audio.src = audios[numeroAleatori];
  audio.play(); //reproduïm l'àudio
});
buttonPause.addEventListener("click", function () {
  audio.pause(); //pausem l'àudio
});

areaInteractiva.addEventListener("mouseenter", function () {
  videoAnimals.style.opacity = 1; //reproduïm el vídeo
});
areaInteractiva.addEventListener("mouseleave", function () {
  videoAnimals.style.opacity = 0; //pausem el vídeo
});

document.addEventListener("keydown", function (event) {
  console.log("Tecla premuda:", event);
  if (event.key == " ") {
    videoAnimals.style.opacity = 1;
  }
});
document.addEventListener("keyup", function (event) {
  console.log("Tecla premuda:", event);
  if (event.key == " ") {
    videoAnimals.style.opacity = 0;
  }
});
