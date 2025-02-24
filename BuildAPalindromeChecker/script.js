const checkBtn = document.getElementById("check-btn");
const txtInput = document.getElementById("text-input");
const result = document.getElementById("result");
const regEx = /[^a-zA-Z0-9]/g; // Find all, except the ones in list.

const checkButton = () => {
  const txt = txtInput.value.replace(regEx, "");
  const txtLower = txt.replace(txt, (char) => char.toLowerCase());
  if (txtLower === "") {
    alert("Please input a value");
  } else {
    const revTxtLower = reverseString(txtLower);
    if (txtLower === revTxtLower || txtLower.length === 1) {
      result.textContent = `${txtInput.value}  is a palindrome`;
    } else {
      result.textContent = `${txtInput.value}  is not a palindrome`;
    }
  }
};

function reverseString(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

checkBtn.addEventListener("click", checkButton);
