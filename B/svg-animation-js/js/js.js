// Animate SVG path drawing on scroll
document.addEventListener("DOMContentLoaded", function () {
  const path = document.getElementById("scroll-animated-path");
  if (!path) return;
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  function animatePath() {
    // Get scroll position relative to SVG
    const svg = document.getElementById("scroll-animated-svg");
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Calculate how much of the SVG is visible
    let percent = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));
    // Animate stroke
    path.style.strokeDashoffset = pathLength * (1 - percent);
  }

  window.addEventListener("scroll", animatePath);
  animatePath();
});
