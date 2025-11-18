// JavaScript code here
console.log("Random Colors Script Loaded");

/* HERE THE VARIABLES */
// Types of data in Javascript (string, number, boolean,object, array);

//let is a variable that can change value
let color = "red"; // string (text data)
let numberOfColors = 5; // number (numeric data)
let isVisible = true; // boolean (true/false)

// constant is a value that cannot be changed
const numberPi = 3.14; // number (numeric data)

let colorsArray = [
  "rgba(235, 167, 167, 1)",
  "rgba(167, 235, 167, 1)",
  "rgba(167, 167, 235, 1)",
  "rgba(235, 235, 167, 1)",
  "rgba(167, 235, 235, 1)",
]; // array (list of items)

console.log("Color:", color);
console.log("colorsArray:", colorsArray[2]);

let person = {
  name: "Alice",
  age: 30,
  isStudent: false,
}; // object (key-value pairs)

let buttonChangeColor = document.querySelector(".change-color");
let buttonRandomColor = document.querySelector(".random-color");
let buttonStopColor = document.querySelector(".stop-color");
let body = document.querySelector("body");

/* Here the Events */

// add an event listener to the button
buttonChangeColor.addEventListener("click", function () {
  let numberRandom = Math.floor(Math.random() * 4); // random number between 0 and 4
  // Math.random() gives a random number between 0 and 1
  // Math.floor() rounds down to the nearest whole number
  color = colorsArray[numberRandom];

  body.style.backgroundColor = color;
});

buttonRandomColor.addEventListener("click", function () {
  changeRandomColor();
});

//setTimeout to change color after 5 seconds
//setInterval to change color every 5 seconds
let intervalOfColors = setInterval(function () {
  changeRandomColor();
}, 300);

buttonStopColor.addEventListener("click", function () {
  clearInterval(intervalOfColors);
});

/* Here the Functions */

function changeRandomColor() {
  let red = Math.floor(Math.random() * 256); // random number between 0 and 255
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
  color = "rgb(" + red + "," + green + "," + blue + ")";
  body.style.backgroundColor = color;
}
