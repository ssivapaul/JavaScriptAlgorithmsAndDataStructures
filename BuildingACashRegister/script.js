let price = 19.5;

let cid1 = [
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

let cid = [
  ["PENNY", 0.1],
  ["NICKEL", 0.1],
  ["DIME", 0.3],
  ["QUARTER", 0],
  ["ONE", 1],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
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
//---------------------------------------------------------
let cash = document.getElementById("cash"); // Customer pay
let purchaseBtn = document.getElementById("purchase-btn");
let changeDue = document.getElementById("change-due");
let cashInDrawer = document.getElementById("cash-in-drawer");
let priceScreen = document.getElementById("price-screen");
//---------------------------------------------------------

let rcid = [...cid].reverse(); // Reverse Change In Drawer
let rCid = [];
rcid.forEach(([denom, value]) =>
  rCid.push([lookUp[denom], Math.round(value * 100)])
);
//------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------
priceScreen.innerHTML = `Total: $${price}`;
cashInDrawer.innerHTML = `<div><strong>Change in drawer:</strong></div>`;
cashInDrawer.innerHTML += rCid
  .map(([den, val]) => `<div>${den}: $${val / 100}</div>`)
  .join("");
//------------------------------------------------------------------------------------

purchaseBtn.addEventListener("click", () => {
  let cashCents = Math.round(Number(cash.value) * 100);
  let priceCents = Math.round(Number(price) * 100);
  let changedue = cashCents - priceCents;
  let cDue = Denoms(cashCents - priceCents);
  console.log(cDue);
  let totalCid = rCid.reduce((acc, [_, val]) => {
    return acc + val;
  }, 0);

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
  //----------------------
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

    // 4. totalCid == changedue
    if (totalCid == changedue) {
      changeDue.innerHTML = "<div>Status: CLOSED</div>";
      changeDue.innerHTML += newcDue
        .filter(([_, val]) => val !== 0)
        .map(([den, val]) => `<div> ${den}: $${val / 100}</div>`)
        .join("");
    } else {
      changeDue.innerHTML = `<div>Status: OPEN</div>`;
      changeDue.innerHTML += newcDue
        .filter(([_, val]) => val !== 0)
        .map(([den, val]) => `<div> ${den}: $${val / 100}</div>`)
        .join("");
    }
    // UpDate drawer display
    cashInDrawer.innerHTML = "<div><strong>Change in drawer:</strong></div>";
    cashInDrawer.innerHTML += newrCid
      .map(([den, val]) => `<div>${den}: $${val / 100}</div>`)
      .join("");
  }
});
