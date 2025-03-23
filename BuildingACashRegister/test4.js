let price = 3.26;

let cid = [
  ["PENNY", 1.01], // 1 cents
  ["NICKEL", 2.05], // 5 cents
  ["DIME", 3.1], // 10 cents
  ["QUARTER", 4.25], // 25 cents
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 10],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const denom = [
  "Pennies",
  "Nickels",
  "Dimes",
  "Quarters",
  "Ones",
  "Fives",
  "Tens",
  "Twenties",
  "Hundreds",
];

const denoms = [
  ["ONE HUNDRED", 10000],
  ["TWENTY", 2000],
  ["TEN", 1000],
  ["FIVE", 500],
  ["ONE", 100],
  ["QUARTER", 25],
  ["DIME", 10],
  ["NICKEL", 5],
  ["PENNY", 1],
];
const lookUp = [
  ["ONE HUNDRED", "Hundreds"],
  ["TWENTY", "Twenties"],
  ["TEN", "Tens"],
  ["FIVE", "Fives"],
  ["ONE", "Ones"],
  ["QUARTER", "Quarters"],
  ["DIME", "Dimes"],
  ["NICKEL", "Nickels"],
  ["PENNY", "Pennies"],
];
//-----------------------------------
const amountDenom = (cents) => {
  const result = [];
  denoms.forEach((denom) => {
    const key = denom[0];
    const value = denom[1];
    const count = Math.floor(cents / value);
    result.push([key, count * value]);
    cents = cents % value;
  });
  return result;
};
//---------------------------------
const getValue = (key) => {
  for (let item of lookUp) {
    if (item[0] === key) return item[1];
  }
  return null; // or return a default value if key not found
};
//------------------------------------------------------------
let rcid = [...cid].reverse();
let rcidDenom = [];
rcid.forEach((x) => rcidDenom.push(x[0]));

lookUp.forEach((x, i) => {
  if (!rcidDenom.includes(x[0])) {
    rcid.splice(i, 0, [x[0], 0]);
  }
});
let rCid = [];
rcid.forEach((x) => rCid.push([x[0], Math.round(x[1] * 100)]));
let cDue = amountDenom(10000 - 351);

let newcDue = [];
let newrCid = [];

let short = 0;
for (let i = 0; i < cDue.length; i++) {
  if (cDue[i][1] <= rCid[i][1]) {
    if (short <= rCid[i][1] - cDue[i][1]) {
      newcDue.push([cDue[i][0], cDue[i][1] + short]);
      newrCid.push([rCid[i][0], rCid[i][1] - cDue[i][1] - short]);
      short = 0;
    } else if (short > rCid[i][1] - cDue[i][1]) {
      newcDue.push([cDue[i][0], rCid[i][1]]);
      newrCid.push([rCid[i][0], 0]);
      short -= rCid[i][1] - cDue[i][1];
    }
  }
  if (cDue[i][1] > rCid[i][1]) {
    newcDue.push([cDue[i][0], rCid[i][1]]);
    newrCid.push([rCid[i][0], 0]);
    short += cDue[i][1] - rCid[i][1];
  }
}
console.log(rCid);
console.log(cDue);
console.log(newrCid);
console.log(newcDue);
