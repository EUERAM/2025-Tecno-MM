let time = 0.0;
let temps = document.querySelector(".temps h1");

// creem un interval que s'executa cada 10 mil·lisegons
setInterval(() => {
  time += 0.01; // incrementem el temps en 0.01 segons
  temps.innerText = time.toFixed(2); // actualitzem el text amb el temps formatat a dos decimals
}, 10);
