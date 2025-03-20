let price = 1.87;
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

let sum = 0;
cid.forEach((sub) => (sum += sub[1]));
console.log(sum);
