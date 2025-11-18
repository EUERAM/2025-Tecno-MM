// console.log serveix per mostrar missatges a la consola del navegador
console.log("App inicialitzada..."); // aqui també van comentaris

// Tipologies de variables (text,números, booleans, objects, arrays, funcions, etc)
let color = "red"; // variable de tipus text (string entre cometes)
let numero = 42; // variable de tipus número
let esVisible = true; // variable de tipus booleà (boolean)

const PI = 3.14159; // constant (no canvia el seu valor)

let colors = ["red", "rgb(206, 233, 156)", "blue"]; // array (llista de valors)

let persona = {
  // objecte amb propietats
  nom: "Jordi",
  edat: 30,
  ciutat: "Barcelona",
};

color = "rgba(206, 233, 156, 1)"; // canviem el valor de la variable color

console.log("Color a la variable", color);

// crear variable de la etiqueta body
let body = document.querySelector("body");
let button = document.querySelector(".canviColor");
let buttonStop = document.querySelector(".stopButton");

// canviar l'estil del cos de la pàgina
// body.style.backgroundColor = color; // utilitzem la variable color per definir el fons

//crear esdeveniment de click al body
// body.addEventListener("click", function () {
//   //Math.random() genera un número decimal entre 0 i 1 (1 no inclòs)
//   //Math.floor() arrodoneix un número decimal a l'integer inferior més proper
//   let numAleatori = Math.floor(Math.random() * 3);
//   body.style.backgroundColor = colors[numAleatori];
// });
button.addEventListener("click", function () {
  canviaColorFons();
});

let nom = "Pere";
console.log("Hola " + nom + ", benvingut/uda a la programació amb JavaScript!");

// setTimeout permet cridar una funció després d'un temps determinat (en mil·lisegons)
//setTimeout(canviaColorFons, 5000); // cridem la funció després de 5 segons
let intervalColor = setInterval(canviaColorFons, 300); // cridem la funció cada 3 segons

buttonStop.addEventListener("click", function () {
  clearInterval(intervalColor); // aturem l'interval
});
//creem funcio de canviar color
function canviaColorFons() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  let colorRandom = "rgb(" + red + "," + green + "," + blue + ")";
  body.style.backgroundColor = colorRandom;
}
