function breakdownAmount(amount) {
  // Convert to cents to avoid floating point precision issues
  let cents = Math.round(amount * 100);

  const denominations = [
    { name: "hundred", value: 10000 },
    { name: "twenty", value: 2000 },
    { name: "ten", value: 1000 },
    { name: "five", value: 500 },
    { name: "one", value: 100 },
    { name: "quarter", value: 25 },
    { name: "dime", value: 10 },
    { name: "nickel", value: 5 },
    { name: "penny", value: 1 },
  ];

  const result = {};

  denominations.forEach((denom) => {
    const count = Math.floor(cents / denom.value);
    if (count > 0) {
      result[denom.name] = count;
      cents = cents % denom.value;
    }
  });

  return result;
}

// Example usage:
const amount = 1.47;
console.log(`$${amount} breakdown:`, breakdownAmount(amount));
