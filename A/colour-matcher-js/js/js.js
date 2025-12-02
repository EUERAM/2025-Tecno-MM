let color = getRandomColor();
let swatches = document.querySelectorAll(".swatch");
let difference = 100;

function loop() {
  swatches.forEach(function (swatch) {
    swatch.style.backgroundColor = color;

    swatch.addEventListener("click", function () {
      color = getRandomColor();
      loop();
      let randomNumber = Math.floor(Math.random() * 2);
      swatches[randomNumber].style.backgroundColor = getRandomColor();
    });
  });
}
// Example usage:
console.log(color);
loop();

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
