const inputField = document.getElementById("userInput");
const button = document.getElementById("readBtn");

// Add click event to the button
button.addEventListener("click", function () {
  const inputValue = inputField.value; // Get input value
  alert("Input Value: " + inputValue); // Display input content
});
