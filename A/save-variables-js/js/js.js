let totalPoints = 0;

let options = document.querySelectorAll(".option");

// create event listener for each option
options.forEach(function (option) {
  // on click, add the data-point value to totalPoints
  option.addEventListener("click", function () {
    // get data-point attribute and convert to number
    totalPoints = totalPoints + Number(option.getAttribute("data-points"));
    console.log("Punts totals: " + totalPoints);
  });
});
