let lookUp = [
  { Hundreds: "HUNDRED" },
  { Twenties: "TWENTY" },
  { Tens: "TEN" },
  { Fives: "FIVE" },
  { Ones: "ONE" },
  { Quarters: "QUARTER" },
  { Dimes: "DIME" },
  { Nickels: "NICKLE" },
  { Pennies: "PENNY" },
];

function getValue(key) {
  for (let item of lookUp) {
    if (item.hasOwnProperty(key)) {
      return item[key];
    }
  }
  return null; // or return a default value if key not found
}

// Example usage:
console.log(getValue("Tens")); // Output: TEN
console.log(getValue("Dimes")); // Output: DIME
console.log(getValue("Pennies")); // Output: PENNY
console.log(getValue("Random")); // Output: null
