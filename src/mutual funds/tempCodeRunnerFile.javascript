const fs = require("fs");
const prompt = require("prompt-sync")();

const DATA_FILE = "funds.json";

const SAMPLE_FUNDS = [
  {
    id: "F001",
    name: "BlueChip Equity Fund",
    type: "Equity",
    risk: "High",
    nav: 42.15,
    oneYr: 18.2,
    notes: "Long-term growth, large-cap focus"
  },
  {
    id: "F002",
    name: "Stable Income Fund",
    type: "Debt",
    risk: "Low",
    nav: 11.78,
    oneYr: 6.1,
    notes: "Low risk, capital protection"
  }
];

function loadFunds() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(SAMPLE_FUNDS, null, 2));
    return SAMPLE_FUNDS;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveFunds(funds) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(funds, null, 2));
}

function listFunds(funds) {
  console.log("\nAvailable Funds:");
  funds.forEach(f => {
    console.log(`${f.id} - ${f.name} (${f.type}) | Risk: ${f.risk} | NAV: ₹${f.nav}`);
  });
}

function addFund(funds) {
  let id = prompt("Enter Fund ID: ");
  let name = prompt("Enter Fund Name: ");
  let type = prompt("Type (Equity/Debt/Hybrid): ");
  let risk = prompt("Risk (Low/Medium/High): ");
  let nav = parseFloat(prompt("Enter NAV: "));
  funds.push({ id, name, type, risk, nav, oneYr: 0, notes: "" });
  saveFunds(funds);
  console.log("✅ Fund Added Successfully!");
}

function suggestFunds(funds) {
  let r = prompt("Enter Risk Tolerance (Low/Medium/High): ");
  const results = funds.filter(f => f.risk.toLowerCase() === r.toLowerCase());
  console.log("\n✅ Suggested Funds:");
  results.forEach(f => console.log(`${f.id} - ${f.name}`));
}

function compareFunds(funds) {
  let f1 = prompt("Enter 1st Fund ID: ");
  let f2 = prompt("Enter 2nd Fund ID: ");
  let A = funds.find(x => x.id === f1);
  let B = funds.find(x => x.id === f2);
  if (!A || !B) return console.log("❌ Fund Not Found");

  console.log(`\nComparison:
${A.name} (NAV: ₹${A.nav}, 1yr: ${A.oneYr}%) 
VS
${B.name} (NAV: ₹${B.nav}, 1yr: ${B.oneYr}%)`);
}

function mainMenu() {
  let funds = loadFunds();
  while (true) {
    console.log("\n======== MAIN MENU ========");
    console.log("1. Admin");
    console.log("2. Investor");
    console.log("3. Financial Advisor");
    console.log("4. Data Analyst");
    console.log("5. Exit");
    let c = prompt("Choose Role: ");

    switch (c) {
      case "1":
        adminMenu(funds);
        break;
      case "2":
        investorMenu(funds);
        break;
      case "3":
        advisorMenu(funds);
        break;
      case "4":
        analystMenu(funds);
        break;
      case "5":
        console.log("Thank you! Exiting...");
        process.exit();
      default:
        console.log("Invalid Choice!");
    }
  }
}

function adminMenu(funds) {
  while (true) {
    console.log("\n--- Admin Menu ---");
    console.log("1. View Funds");
    console.log("2. Add Fund");
    console.log("3. Back");
    let c = prompt("Choose: ");
    if (c === "1") listFunds(funds);
    else if (c === "2") addFund(funds);
    else return;
  }
}

function investorMenu(funds) {
  while (true) {
    console.log("\n--- Investor Menu ---");
    console.log("1. View Funds");
    console.log("2. Compare Funds");
    console.log("3. Suggest Based on Risk");
    console.log("4. Back");
    let c = prompt("Choose: ");
    if (c === "1") listFunds(funds);
    else if (c === "2") compareFunds(funds);
    else if (c === "3") suggestFunds(funds);
    else return;
  }
}

function advisorMenu(funds) {
  console.log("\nFinancial Advisor -> Can Only Add Notes Feature in Pro Version!");
}

function analystMenu(funds) {
  console.log("\nData Analyst -> Analytics Feature Coming Soon!");
}

mainMenu();
