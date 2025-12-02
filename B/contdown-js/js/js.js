let temps = 3;
let display = document.querySelector(".countdown h1");
let s1 = document.querySelector(".one");
let s2 = document.querySelector(".two");

// creem un interval que s'executa cada segon
let countdown = setInterval(() => {
  temps -= 1; // decrementem el temps en 1 segon
  display.innerText = temps; // actualitzem el text amb el temps restant

  // si el temps arriba a zero, aturem el comptador
  if (temps <= 0) {
    clearInterval(countdown);
    display.innerText = "Temps acabat!";
    s1.style.display = "none";
    s2.style.display = "block";
  }
}, 1000);
