const cars = [
  {
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    color: { primary: "Silver", secondary: "Gray" },
    audio: "audio/toyota-corolla.mp3",
    backgroundImage: "images/toyota-corolla.jpg",
  },
  {
    brand: "Honda",
    model: "Civic",
    year: 2021,
    color: { primary: "Blue", secondary: "Black" },
    audio: "audio/honda-civic.mp3",
    backgroundImage: "images/honda-civic.jpg",
  },
  {
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    color: { primary: "Red", secondary: "White" },
    audio: "audio/ford-mustang.mp3",
    backgroundImage: "images/ford-mustang.jpg",
  },
  {
    brand: "Tesla",
    model: "Model 3",
    year: 2024,
    color: { primary: "White", secondary: "Blue" },
    audio: "audio/tesla-model3.mp3",
    backgroundImage: "images/tesla-model3.jpg",
  },
  {
    brand: "BMW",
    model: "X5",
    year: 2020,
    color: { primary: "Black", secondary: "Silver" },
    audio: "audio/bmw-x5.mp3",
    backgroundImage: "images/bmw-x5.jpg",
  },
];

let currentIndex = 0;

// HTML structure

// Update car info function
function showCar(index) {
  const car = cars[index];
  document.body.style.backgroundImage = `url('${car.backgroundImage}')`;
  document.body.style.backgroundSize = "cover";
  document.getElementById("car-brand").textContent = car.brand;
  document.getElementById("car-model").textContent = car.model;
  document.getElementById("car-year").textContent = car.year;
  document.getElementById("car-brand").style.color = car.color.primary;
  document.getElementById("car-model").style.color = car.color.primary;
  document.getElementById("car-year").style.color = car.color.primary;
  const audio = document.getElementById("car-audio");
  audio.src = car.audio;
  audio.load();
  audio.play();
  document.getElementById("next-car").style.background = car.color.secondary;
  document.getElementById("next-car").style.color = car.color.primary;
}

// Button event
document.getElementById("next-car").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cars.length;
  showCar(currentIndex);
});

// Show first car
showCar(currentIndex);
