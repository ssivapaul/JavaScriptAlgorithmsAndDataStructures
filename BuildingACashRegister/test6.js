const lookUp = {
  "ONE HUNDRED": "Hundreds",
  TWENTY: "Twenties",
  TEN: "Tens",
  FIVE: "Fives",
  ONE: "Ones",
  QUARTER: "Quarters",
  DIME: "Dimes",
  NICKEL: "Nickels",
  PENNY: "Pennies",
};

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

console.log(lookUp["ONE HUNDRED"]);

let rcid = [...cid].reverse(); // Reverse Change In Drawer
let rCid = [];
rcid.forEach(([denom, value]) =>
  rCid.push([lookUp[denom], Math.round(value * 100)])
);
let totalCid = rCid.reduce((acc, [_, value]) => {
  return acc + value;
}, 0);
console.log(totalCid);
