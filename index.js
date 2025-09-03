const amountInput = document.getElementById('amount');
const FromInput = document.getElementById('From');
const toSelect = document.getElementById('to');
const convertBtn = document.getElementById('convertBtn');
const resultBox = document.getElementById('resultBox');
const resetBtn = document.getElementById('resetBtn');
const savepairBtn = document.getElementById('savepairBtn');
const swapBtn = document.getElementById('swapBtn');

const rates = {
  USD: { PKR: 300, EUR: 0.9, GBP: 0.78, INR: 83 },
  PKR: { USD: 0.0033, EUR: 0.0030, GBP: 0.0026, INR: 0.30 },
  EUR: { USD: 1.1, PKR: 333, GBP: 0.86 },
  GBP: { USD: 1.27, PKR: 380, EUR: 1.16 },
  INR: { USD: 0.012, PKR: 3.6, EUR: 0.011 },
  SAR: { USD: 0.27, PKR: 75, EUR: 0.25, GBP: 0.21, INR: 22 }
};

convertBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const from = FromInput.value;
  const to = toSelect.value;

  // validation
  if (isNaN(amount) || amount <= 0) {
    resultBox.innerText = "Please enter a valid amount";
    return;
  }

  // check if rate exists
  if (rates[from] && rates[from][to]) {
    const rate = rates[from][to];
    const result = amount * rate;
    resultBox.innerText = ` ${amount} ${from} = ${result.toFixed(2)} ${to}`;
  } else {
    resultBox.innerText = "Conversion rate not available.";
  }
});
 
resetBtn.addEventListener("click",()=>{
    amountInput.value="";
    resultBox.value="";
    FromInput.value="";
    toSelect.value="";
})

savepairBtn.addEventListener("click", () => {
  const from = FromInput.value;
  const to = toSelect.value;
  const pair = `${from}-${to}`;

  let savedPair = JSON.parse(localStorage.getItem("pair")) || [];

  if (!savedPair.includes(pair)) {
    savedPair.push(pair);
    localStorage.setItem("pair", JSON.stringify(savedPair));
    resultBox.innerText = ` Pair Saved: ${pair}`;
  } else {
    resultBox.innerText = "Pair already saved";
  }
});

swapBtn.addEventListener("click",()=>{
    const temp=FromInput.value;
    FromInput.value=toSelect.value;
    toSelect.value=temp;

    resetBtn.innerText=`swapped :${FromInput.value} ->${toSelect.value}`
})

