const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

const validatePhoneNumber = (phNum) => {
  if (!phNum) {
    alert("Please provide a phone number");
  }
  const phoneRegex =
    /^(?:\+?1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phNum)
    ? `Valid US number: <b>${phNum}</b>`
    : `Invalid US number: <b>${phNum}</b>`;
};

checkBtn.addEventListener(
  "click",
  () =>
    (document.getElementById("results-div").innerHTML = validatePhoneNumber(
      document.getElementById("user-input").value
    ))
);

clearBtn.addEventListener(
  "click",
  () => (document.getElementById("results-div").innerHTML = "")
);
