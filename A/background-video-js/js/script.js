// YouTube background video controller
const toggleBtn = document.getElementById("toggleVideo");
const youtubePlayer = document.getElementById("youtubePlayer");

// Toggle video play/pause
toggleBtn.addEventListener("click", () => {
  if (toggleBtn.textContent === "Pause Video") {
    youtubePlayer.style.opacity = "0.1";
    toggleBtn.textContent = "Play Video";
  } else {
    youtubePlayer.style.opacity = "1";
    toggleBtn.textContent = "Pause Video";
  }
});

// Add fade transition to iframe
youtubePlayer.style.transition = "opacity 0.3s ease";
