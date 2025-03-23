const original = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let cid = [
  ["PENNY", 1.01], // 1 cents
  ["NICKEL", 2.05], // 5 cents
  ["DIME", 3.1], // 10 cents
  ["QUARTER", 4.25], // 25 cents
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
// Create a reversed copy of the outer array
const reversedCopy = [...original].reverse();
const reversedcid = [...cid].reverse();
console.log(reversedCopy); // [[7, 8, 9], [4, 5, 6], [1, 2, 3]]
console.log(original); // Original remains unchanged
console.log(reversedcid);
