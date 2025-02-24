const input = document.getElementById("number");
console.log(input.value);
const convert = document.getElementById("convert-btn");
const result = document.getElementById("output");

const toRoman = (num) => {
  const romanNumerals = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  for (let [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};

convert.addEventListener("click", () => {
  const x = parseInt(input.value);

  switch (true) {
    case input.value === "":
      result.innerHTML = "Please enter a valid number";
      break;
    case x === -1:
      result.innerHTML = "Please enter a number greater than or equal to 1";
      break;
    case x < -1:
      result.innerHTML = "Please enter a number greater than or equal to 1";
      break;
    case x >= 4000:
      result.innerHTML = "Please enter a number less than or equal to 3999";
      break;
    case x <= 4000:
      result.innerHTML = String(toRoman(x));
  }
});
