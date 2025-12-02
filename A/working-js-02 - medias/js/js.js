console.log("Init app...");

// Select DOM elements (DOM means Document Object Model)
let audio = document.querySelector("audio");
let playButton = document.querySelector(".play-audio");
let pauseButton = document.querySelector(".pause-audio");

let interactiveArea = document.querySelector(".interactive-area");
let videoFish = document.querySelector(".video-fish");

let audios = [
  "medias/bump.mp3",
  "medias/can.mp3",
  "medias/crickets.mp3",
  "medias/groove.mp3",
];

// Add event listeners to buttons
playButton.addEventListener("click", function () {
  let randomNumber = Math.floor(Math.random() * 4);
  audio.src = audios[randomNumber]; // Set audio source to a random audio file
  audio.play(); // Play the audio
});

pauseButton.addEventListener("click", function () {
  audio.pause(); // Pause the audio
});
interactiveArea.addEventListener("mouseenter", function () {
  videoFish.style.opacity = 1; // Play the video when mouse enters the area
});
interactiveArea.addEventListener("mouseleave", function () {
  videoFish.style.opacity = 0; // Hide the video when mouse leaves the area
});

// Add event listener for keydown events
document.addEventListener("keydown", function (ev) {
  console.log("Key pressed:", ev);
  if (ev.key == " ") {
    videoFish.style.opacity = 1;
  }
});
document.addEventListener("keyup", function (ev) {
  console.log("Key released:", ev);
  if (ev.key == " ") {
    videoFish.style.opacity = 0;
  }
});
