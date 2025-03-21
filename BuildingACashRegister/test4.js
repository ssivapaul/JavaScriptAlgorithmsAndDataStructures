let price = 3.26;
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

    if (count > 0) {
      result.push([key, (count * value) / 100]);
      cents = cents % value;
    }
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
cid.reverse();
let CDW = amountDenom(10000 - 326);
let change = CDW.map((c) => c[0]);
let ci = cid.map((c) => c[0]);

lookUp.forEach((look, i) => {
  if (!change.includes(look[0])) {
    CDW.splice(i, 0, [look[0], 0]);
  }
  if (!ci.includes(look[0])) {
    cid.splice(i, 0, [look[0], 0]);
  }
});

let sum = 0;
let cidCT = cid.map((c) => [c[0], (sum += c[1] * 100)]);
sum = 0;
let CCT = CDW.map((c) => [c[0], (sum += c[1] * 100)]);

const findfirstNonZeroIndex = (arr) => {
  const firstNonZeroIndex = arr.findIndex((num) => num[1] !== 0);
  return firstNonZeroIndex;
  //return firstNonZeroIndex === -1 ? [] : arr.slice(firstNonZeroIndex);
};
let index = findfirstNonZeroIndex(CDW);
let trimedCDW = CDW.slice(index);
let trimedCid = cid.slice(index);

let newCDW = [];
let newcid = [];

let short = 0;
for (let i = 0; i < trimedCDW.length; i++) {
  if (trimedCDW[i][1] * 100 <= trimedCid[i][1] * 100) {
    if (short <= trimedCid[i][1] - trimedCDW[i][1]) {
      newCDW.push([trimedCDW[i][0], trimedCDW[i][1] + short]);
      newcid.push([trimedCid[i][0], trimedCid[i][1] - trimedCDW[i][1] - short]);
      short = 0;
    } else if (short > trimedCid[i][1] - trimedCDW[i][1]) {
      newCDW.push([trimedCDW[i][0], trimedCid[i][1]]);
      newcid.push([trimedCid[i][0], 0]);
      short -= trimedCid[i][1] - trimedCDW[i][1];
    }
  }
  if (trimedCDW[i][1] * 100 > trimedCid[i][1] * 100) {
    newCDW.push([trimedCDW[i][0], trimedCid[i][1]]);
    newcid.push([trimedCid[i][0], 0]);
    short += trimedCDW[i][1] - trimedCid[i][1];
  }
}
console.log(newCDW, newcid);
