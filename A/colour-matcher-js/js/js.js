// Utility to parse and format rgb
function rgbToArr(rgb) {
  return rgb
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);
}
function arrToRgb(arr) {
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

let swatches = document.querySelectorAll(".swatch");
const step = 20;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function moveCloser(current, target, step) {
  const cur = rgbToArr(current);
  const tgt = rgbToArr(target);
  for (let i = 0; i < 3; i++) {
    if (cur[i] < tgt[i]) cur[i] = Math.min(cur[i] + step, tgt[i]);
    else if (cur[i] > tgt[i]) cur[i] = Math.max(cur[i] - step, tgt[i]);
  }
  return arrToRgb(cur);
}

// Initialize two swatches with random colors
if (swatches.length >= 2) {
  swatches[0].style.backgroundColor = getRandomColor();
  swatches[1].style.backgroundColor = getRandomColor();

  swatches[0].addEventListener("click", function () {
    const c0 = swatches[0].style.backgroundColor;
    const c1 = swatches[1].style.backgroundColor;
    swatches[0].style.backgroundColor = moveCloser(c0, c1, step);
  });
  swatches[1].addEventListener("click", function () {
    const c0 = swatches[0].style.backgroundColor;
    const c1 = swatches[1].style.backgroundColor;
    swatches[1].style.backgroundColor = moveCloser(c1, c0, step);
  });
}
