const phoneRegex = /^(?:\+?1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

// Test cases
const testNumbers = [
  "+1 555-555-5555", // Valid
  "1 (555) 555-5555", // Valid
  "1(555)555-5555", // Valid
  "1 555 555 5555", // Valid
  "1 456 789 4444", // Valid
];
console.log("---------------------------------");
testNumbers.forEach((num) => {
  console.log(`${num}: ${phoneRegex.test(num)}`);
});
