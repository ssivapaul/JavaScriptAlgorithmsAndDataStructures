const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");
const userInput = document.getElementById("user-input");

const validatePhoneNumber = (phNum) => {
  if (phNum === "") {
    alert("Please provide a phone number");
  }

  const phoneRegex =
    /^(?:\+?1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phNum)
    ? "Valid US number: " + phNum
    : "Invalid US number: " + phNum;
};

checkBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = validatePhoneNumber(userInput.value);
});

clearBtn.addEventListener("click", () => {
  document.getElementById("results-div").innerHTML = "";
});
