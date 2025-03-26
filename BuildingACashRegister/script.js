let price = 19.5;

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
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
// Group into denominations
const Denoms = (cents) => {
  const result = [];
  denoms.forEach((den) => {
    const key = den[0];
    const val = den[1];
    const count = Math.floor(cents / val);
    result.push([key, Math.round(count * val)]);
    cents = cents % val;
  });
  return result;
};
//---------------------------------------------------------
let cash = document.getElementById("cash"); // Customer pay
let purchaseBtn = document.getElementById("purchase-btn");
let changeDue = document.getElementById("change-due");
let cashInDrawer = document.getElementById("cash-in-drawer");
let priceScreen = document.getElementById("price-screen");
//---------------------------------------------------------
// update price screen
priceScreen.innerHTML = `Total: $${price}`;
//---------------update Cash In Drawer--------------------
cashInDrawer.innerHTML = `<div><strong>Change in drawer:</strong></div>`;
cashInDrawer.innerHTML += cid
  .map(([den, val]) => `<div>${lookUp[den]}: $${val}</div>`)
  .join("");
//---------------------------------------------------------------------
purchaseBtn.addEventListener("click", () => {
  if (!cash.value) {
    return;
  }
  let rCid = [];
  let rcid = [...cid].reverse(); // Reverse Change In Drawer
  rcid.forEach(([denom, value]) =>
    rCid.push([lookUp[denom], Math.round(value * 100)])
  );
  let cashCents = Math.round(Number(cash.value) * 100);
  let priceCents = Math.round(Number(price) * 100);
  let changedue = cashCents - priceCents;
  let cDue = Denoms(cashCents - priceCents);
  let totalCid = rCid.reduce((acc, [_, val]) => {
    return acc + val;
  }, 0);
  cash.value = "";
  //1. alert: "Customer does not have enough money to purchase the item"
  if (priceCents > cashCents) {
    cash.value = "";
    alert("Customer does not have enough money to purchase the item");
  }
  //2. "Status: No change due - customer paid with exact cash"
  if (priceCents == cashCents) {
    changeDue.innerHTML =
      "<div>No change due - customer paid with exact cash</div>";
    return;
  }
  //3. "Status: INSUFFICIENT_FUNDS"
  if (totalCid < changedue) {
    changeDue.innerHTML = "<div>Status: INSUFFICIENT_FUNDS</div>";
    return;
  }
  //  5. Calculation starts
  if (priceCents < cashCents) {
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
    if (short > 0) {
      changeDue.innerHTML = "<div>Status: INSUFFICIENT_FUNDS</div>";
      return;
    }
    // 4. totalCid == changedue, Update change due display-------
    if (totalCid == changedue) {
      changeDue.innerHTML = "<div>Status: CLOSED</div>";
    } else changeDue.innerHTML = `<div>Status: OPEN</div>`;
    changeDue.innerHTML += newcDue
      .filter(([_, val]) => val !== 0)
      .map(([den, val]) => `<div> ${den}: $${val / 100}</div>`)
      .join("");

    // UpDate drawer display
    cashInDrawer.innerHTML = "<div><strong>Change in drawer:</strong></div>";
    let newCid = [...newrCid].reverse();
    cashInDrawer.innerHTML += newCid
      .map(([den, val]) => `<div>${den}: $${val / 100}</div>`)
      .join("");
    updateCid(newCid);
  }
});
//-------------------------------
let updateCid = (newCid) => {
  for (let i = 0; i < newCid.length; i++) {
    if (cid[i][1] != newCid[i][1] / 100) {
      cid[i][1] = newCid[i][1] / 100;
    }
  }
};
