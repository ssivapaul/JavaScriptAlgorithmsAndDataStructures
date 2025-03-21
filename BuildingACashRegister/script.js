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
  ["NICKLE", "Nickels"],
  ["PENNY", "Pennies"],
];
//-----------------------------------
function amountDenomWise(cents) {
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
}
//---------------------------------
function getValue(key) {
  for (let item of lookUp) {
    if (item[0] === key) return item[1];
  }
  return null; // or return a default value if key not found
}
//------------------------------------------------------------

let cash = document.getElementById("cash"); // Customer pay
let purchaseBtn = document.getElementById("purchase-btn");
let changeDue = document.getElementById("change-due");
let cashInDrawer = document.getElementById("cash-in-drawer");
let priceScreen = document.getElementById("price-screen");
//-----------------------------------------
priceScreen.textContent = `Total: $${price}`;
const mapped = cid
  .reverse()
  .map((x) => `<div>${getValue(x[0])}: ${x[1]}</div>`);
cashInDrawer.innerHTML += mapped.join("");
let sum = 0;
let cidCT = cid.map((c) => [c[0], (sum += c[1] * 100)]);
console.log(cidCT);

const CDW = amountDenomWise(10000 - 326);
sum = 0;
let CCT = CDW.map((c) => [c[0], (sum += c[1] * 100)]);
console.log(CCT);
//-------------------------------------------------------
purchaseBtn.addEventListener("click", () => {
  //let cashCents = Math.round(Number(cash.value) * 100);
  //let priceCents = Math.round(price * 100);
  if (priceCents > cashCents) {
    alert("Customer does not have enough money to purchase the item");
  }
  if (priceCents == cashCents) {
    changeDue.textContent = "No change due - customer paid with exact cash";
  }
  if (priceCents < cashCents) {
    //const changeDenomWise = amountDenomWise(cashCents - priceCents)
    changeDue.innerHTML = `<div>Status: OPEN</div>`;
    let change = changeDenomWise.map((c) => c[0]);
    let ci = cid.map((c) => c[0]);
    lookUp.forEach((look, i) => {
      if (!change.includes(look[0])) changeDenomWise.splice(i, 0, [look[0], 0]);
      if (!ci.includes(look[0])) cid.splice(i, 0, [look[0], 0]);
    });
    console.log(changeDenomWise);
    console.log(cid);
    let mapped = changeDenomWise.map((x) => `<div>${x[0]}: $${x[1]}</div>`);
    changeDue.innerHTML += mapped.join("");
  }
});
