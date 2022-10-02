// \\\\\\\\\\\\\\       query input field

const transferAmount = document.getElementById("transfer-amount");
const inputValue = document.getElementById("send-value");
const ownFundsValue = document.getElementById("own-funds");
const typeOfCard = document.getElementById("type-card");
const typeOfMoney = document.querySelectorAll(".type-money");

const tableTitle = document.querySelector(".commission-table__title");
const tableBody = document.getElementsByTagName("tbody");

// \\\\\\\\\\\\\\       query output field

const amountPayment = {
  tableRow: document.getElementsByClassName("amount-payment"),
  subtitle: document.getElementById("amount-payment-subtitle"),
  transferValue: document.getElementById("amount-payment-transfer-value"),
  commissionOnKu: document.getElementById("amount-payment-commission-on-ku"),
  commissionOnKdv: document.getElementById("amount-payment-commission-on-kdv"),
  commissionOnKdvWithReceiver: document.getElementById(
    "amount-payment-commission-on-kdv-with-receiver"
  ),
  commissionUkrBank: document.getElementById(
    "amount-payment-commission-ukr-bank"
  ),
  commissionForeignBank: document.getElementById(
    "amount-payment-commission-foreign-bank"
  ),
};

const ownFunds = {
  tableRow: document.querySelector(".own-funds"),
  subtitle: document.getElementById("own-funds-subtitle"),
  transferValue: document.getElementById("own-funds-transfer-value"),
  commissionOnKu: document.getElementById("own-funds-commission-on-ku"),
  commissionOnKdv: document.getElementById("own-funds-commission-on-kdv"),
  commissionOnKdvWithReceiver: document.getElementById(
    "own-funds-commission-on-kdv-with-receiver"
  ),
  commissionUkrBank: document.getElementById("own-funds-commission-ukr-bank"),
  commissionForeignBank: document.getElementById(
    "own-funds-commission-foreign-bank"
  ),
};

const creditFunds = {
  tableRow: document.querySelector(".credit-funds"),
  subtitle: document.getElementById("credit-funds-subtitle"),
  transferValue: document.getElementById("credits-funds-transfer-value"),
  commissionOnKu: document.getElementById("credits-funds-commission-on-ku"),
  commissionOnKdv: document.getElementById("credits-funds-commission-on-kdv"),
  commissionOnKdvWithReceiver: document.getElementById(
    "credits-funds-commission-on-kdv-with-receiver"
  ),
  commissionUkrBank: document.getElementById(
    "credits-funds-commission-ukr-bank"
  ),
  commissionForeignBank: document.getElementById(
    "credits-funds-commission-foreign-bank"
  ),
};

const totalCommission = {
  subtitle: document.getElementById("total-commission-subtitle"),
  transferValue: document.getElementById("total-commission-value"),
  commissionOnKu: document.getElementById("total-commission-on-ku"),
  commissionOnKdv: document.getElementById("total-commission-on-kdv"),
  commissionOnKdvWithReceiver: document.getElementById(
    "total-commission-on-kdv-with-receiver"
  ),
  commissionUkrBank: document.getElementById("total-commission-ukr-bank"),
  commissionForeignBank: document.getElementById(
    "total-commission-foreign-bank"
  ),
};

// \\\\\\\\\\\\\\       value of commision

const rate = {
  untargetedKDV: 0.005,
  untargetedKDVMax: 50,
  KuOnKdv: 0,
  onUkrBank: 0.005,
  onUkrBankMin: 5,
  onForeignBank: 0.02,
  onForeignBankMin: 50,
  ifCreditMoney: 0.03,
};

// \\\\\\\\\\\\\\       event listeners

inputValue.addEventListener("click", selestTypeOfTransfer);
typeOfCard.addEventListener("click", displayMoneyRadio);
document
  .querySelector("#mix-funds")
  .addEventListener("click", displaySelfMoney);
document
  .querySelector("#only-credit-funds")
  .addEventListener("click", hidenSelfMoney);
document
  .querySelector("#only-own-funds")
  .addEventListener("click", hidenSelfMoney);

// \\\\\\\\\\\\\\       determination of the calculation path

function selestTypeOfTransfer() {
  const typeOfCard = document.getElementById("type-card");
  let cardType = typeOfCard.value;
  let transferValue = Number(transferAmount.value);

  if (cardType == "ku") {
    selestTypeOfKUTransfer(transferValue);
  } else {
    commisionTransferValueKDV(transferValue);
  }
}

function selestTypeOfKUTransfer(transferValue) {
  tableTitle.textContent = "Комісії при переказі коштів з КУ";

  const selfMoney = Number(ownFundsValue.value);
  let moneyType;

  let typeOfMoney = document.querySelectorAll(".type-money");
  for (let i = 0; i < typeOfMoney.length; i++) {
    if (typeOfMoney[i].checked) {
      moneyType = typeOfMoney[i].value;
      break;
    }
  }
  if (moneyType == "only-own-funds" || selfMoney > transferValue) {
    commisionTransferKUSelfMoney(transferValue);
  } else if (moneyType == "only-credit-funds") {
    commisionTransferKUCreditMoney(transferValue);
  } else if (moneyType == "mix-funds" && selfMoney == 0) {
    alert(
      'Вкажіть суму наявних особистих коштів, або оберіть варіант "лише кредитні кошти"!'
    );
  } else {
    commisionTransferKUMixMoney(transferValue, selfMoney);
  }
}

function displayMoneyRadio() {
  const typeOfCard = document.getElementById("type-card");
  let cardType = typeOfCard.value;

  if (cardType == "ku") {
    document.querySelector(".type-of-money-radio").classList.remove("is-hiden");
  } else {
    document.querySelector(".type-of-money-radio").classList.add("is-hiden");
    hidenSelfMoney();
  }
}

function displaySelfMoney() {
  document.getElementById("own-funds-label").classList.remove("is-hiden");
}
function hidenSelfMoney() {
  document.getElementById("own-funds-label").classList.add("is-hiden");
}

// \\\\\\\\\\\\\\      hiden redundant field

let hiddenColumn = document.querySelectorAll(".permanent-commision");
for (let i = 0; i < 5; i++) {
  hiddenColumn[i].style.display = "none";
}

// \\\\\\\\\\        auxiliary function

function toggleHidenField() {
  ownFunds.tableRow.classList.add("is-hiden");
  creditFunds.tableRow.classList.add("is-hiden");
}
function toggleUnhidenField() {
  ownFunds.tableRow.classList.remove("is-hiden");
  creditFunds.tableRow.classList.remove("is-hiden");
}

// \\\\\\\\\\\\\\      calculation

function calculateComissionOnKDVWithReceiver(transferValue) {
  let commision = transferValue / (1 - rate.untargetedKDV) - transferValue;
  if (commision >= rate.untargetedKDVMax) {
    return rate.untargetedKDVMax;
  }
  return Number(commision).toFixed(2);
}

function calculateComissionUkrBank(transferValue) {
  let commision = transferValue * rate.onUkrBank;
  if (commision <= rate.onUkrBankMin) {
    return rate.onUkrBankMin;
  }
  return Number(commision).toFixed(2);
}

function calculateComissionForeignBank(transferValue) {
  let commision = transferValue * rate.onForeignBank;
  if (commision <= rate.onForeignBankMin) {
    return rate.onForeignBankMin;
  }
  return Number(commision).toFixed(2);
}

function calculateCreditCommision(amountInCredit) {
  return Number(amountInCredit * rate.ifCreditMoney).toFixed(2);
}

//\\\\\\\\\\\\\\\   output value

function commisionTransferValueKDV(transferValue) {
  tableTitle.textContent = "Комісії при переказі коштів з КДВ";

  toggleHidenField();

  amountPayment.transferValue.textContent = transferValue;

  amountPayment.commissionOnKu.textContent = transferValue;
  totalCommission.commissionOnKu.textContent = 0;

  let transferCommisionOnKDVWithReceiver = Number(
    calculateComissionOnKDVWithReceiver(transferValue)
  );
  amountPayment.commissionOnKdvWithReceiver.textContent =
    transferCommisionOnKDVWithReceiver + transferValue;
  totalCommission.commissionOnKdvWithReceiver.textContent =
    transferCommisionOnKDVWithReceiver;

  let transferCommisionUkrBank = Number(
    calculateComissionUkrBank(transferValue)
  );
  amountPayment.commissionUkrBank.textContent =
    transferCommisionUkrBank + transferValue;
  totalCommission.commissionUkrBank.textContent = transferCommisionUkrBank;

  let transferCommisionForeignBank = Number(
    calculateComissionForeignBank(transferValue)
  );
  amountPayment.commissionForeignBank.textContent =
    transferCommisionForeignBank + transferValue;
  totalCommission.commissionForeignBank.textContent =
    transferCommisionForeignBank;
}

function commisionTransferKUSelfMoney(transferValue) {
  toggleHidenField();

  amountPayment.transferValue.textContent = transferValue;

  amountPayment.commissionOnKu.textContent = transferValue;
  totalCommission.commissionOnKu.textContent = 0;

  let transferCommisionOnKDVWithReceiver = Number(
    calculateComissionOnKDVWithReceiver(transferValue)
  );
  amountPayment.commissionOnKdvWithReceiver.textContent =
    transferCommisionOnKDVWithReceiver + transferValue;
  totalCommission.commissionOnKdvWithReceiver.textContent =
    transferCommisionOnKDVWithReceiver;

  let transferCommisionUkrBank = Number(
    calculateComissionUkrBank(transferValue)
  );
  amountPayment.commissionUkrBank.textContent =
    transferCommisionUkrBank + transferValue;
  totalCommission.commissionUkrBank.textContent = transferCommisionUkrBank;

  let transferCommisionForeignBank = Number(
    calculateComissionForeignBank(transferValue)
  );
  amountPayment.commissionForeignBank.textContent =
    transferCommisionForeignBank + transferValue;
  totalCommission.commissionForeignBank.textContent =
    transferCommisionForeignBank;
}

function commisionTransferKUCreditMoney(transferValue) {
  toggleUnhidenField();

  amountPayment.transferValue.textContent = transferValue;
  ownFunds.transferValue.textContent = 0;
  creditFunds.transferValue.textContent = 0;

  //\\\\\\\\\\\ commissionOnKu

  ownFunds.commissionOnKu.textContent = 0;
  let creditValueOnKu = transferValue;
  let creditCommisionOnKu = Number(calculateCreditCommision(creditValueOnKu));
  creditFunds.commissionOnKu.textContent = creditCommisionOnKu;
  totalCommission.commissionOnKu.textContent = creditCommisionOnKu;
  amountPayment.commissionOnKu.textContent =
    transferValue + creditCommisionOnKu;

  //\\\\\\\\\\\ commission OnKDVWithReceiver

  let transferCommisionOnKDVWithReceiver = Number(
    calculateComissionOnKDVWithReceiver(transferValue)
  );
  ownFunds.commissionOnKdvWithReceiver.textContent =
    transferCommisionOnKDVWithReceiver;
  let creditValueOnKdvWithReceiver =
    transferValue + transferCommisionOnKDVWithReceiver;
  let creditCommisionOnKdvWithReceiver = Number(
    calculateCreditCommision(creditValueOnKdvWithReceiver)
  );
  creditFunds.commissionOnKdvWithReceiver.textContent =
    creditCommisionOnKdvWithReceiver;
  totalCommission.commissionOnKdvWithReceiver.textContent =
    creditCommisionOnKdvWithReceiver + transferCommisionOnKDVWithReceiver;
  amountPayment.commissionOnKdvWithReceiver.textContent =
    transferValue +
    creditCommisionOnKdvWithReceiver +
    transferCommisionOnKDVWithReceiver;

  //\\\\\\\\\\\ commission UkrBank

  let transferCommisionUkrBank = Number(
    calculateComissionUkrBank(transferValue)
  );
  ownFunds.commissionUkrBank.textContent = transferCommisionUkrBank;
  let creditValueUkrBank = transferValue + transferCommisionUkrBank;
  let creditCommisionUkrBank = Number(
    calculateCreditCommision(creditValueUkrBank)
  );
  creditFunds.commissionUkrBank.textContent = creditCommisionUkrBank;
  totalCommission.commissionUkrBank.textContent =
    creditCommisionUkrBank + transferCommisionUkrBank;
  amountPayment.commissionUkrBank.textContent =
    transferValue + creditCommisionUkrBank + transferCommisionUkrBank;

  //\\\\\\\\\\\ commission ForeignBank

  let transferCommisionForeignBank = Number(
    calculateComissionForeignBank(transferValue)
  );
  ownFunds.commissionForeignBank.textContent = transferCommisionForeignBank;
  let creditValueForeignBank = transferValue + transferCommisionForeignBank;
  let creditCommisionForeignBank = Number(
    calculateCreditCommision(creditValueForeignBank)
  );
  creditFunds.commissionForeignBank.textContent = creditCommisionForeignBank;
  totalCommission.commissionForeignBank.textContent =
    creditCommisionForeignBank + transferCommisionForeignBank;
  amountPayment.commissionForeignBank.textContent =
    transferValue + creditCommisionForeignBank + transferCommisionForeignBank;
}

function commisionTransferKUMixMoney(transferValue, selfMoney) {
  let creditMoney = transferValue - selfMoney;

  toggleUnhidenField();

  amountPayment.transferValue.textContent = transferValue;
  ownFunds.transferValue.textContent = 0;
  creditFunds.transferValue.textContent = creditMoney;

  //\\\\\\\\\\\ commissionOnKu

  ownFunds.commissionOnKu.textContent = 0;
  let creditValueOnKu = creditMoney;
  let creditCommisionOnKu = Number(calculateCreditCommision(creditValueOnKu));
  creditFunds.commissionOnKu.textContent = creditCommisionOnKu;
  totalCommission.commissionOnKu.textContent = creditCommisionOnKu;
  amountPayment.commissionOnKu.textContent =
    transferValue + creditCommisionOnKu;

  //\\\\\\\\\\\ commission OnKDVWithReceiver

  let transferCommisionOnKDVWithReceiver = Number(
    calculateComissionOnKDVWithReceiver(transferValue)
  );
  ownFunds.commissionOnKdvWithReceiver.textContent =
    transferCommisionOnKDVWithReceiver;
  let creditValueOnKdvWithReceiver =
    creditMoney + transferCommisionOnKDVWithReceiver;
  let creditCommisionOnKdvWithReceiver = Number(
    calculateCreditCommision(creditValueOnKdvWithReceiver)
  );
  creditFunds.commissionOnKdvWithReceiver.textContent =
    creditCommisionOnKdvWithReceiver;
  totalCommission.commissionOnKdvWithReceiver.textContent =
    creditCommisionOnKdvWithReceiver + transferCommisionOnKDVWithReceiver;
  amountPayment.commissionOnKdvWithReceiver.textContent =
    transferValue +
    creditCommisionOnKdvWithReceiver +
    transferCommisionOnKDVWithReceiver;

  //\\\\\\\\\\\ commission UkrBank

  let transferCommisionUkrBank = Number(
    calculateComissionUkrBank(transferValue)
  );
  ownFunds.commissionUkrBank.textContent = transferCommisionUkrBank;
  let creditValueUkrBank = creditMoney + transferCommisionUkrBank;
  let creditCommisionUkrBank = Number(
    calculateCreditCommision(creditValueUkrBank)
  );
  creditFunds.commissionUkrBank.textContent = creditCommisionUkrBank;
  totalCommission.commissionUkrBank.textContent =
    creditCommisionUkrBank + transferCommisionUkrBank;
  amountPayment.commissionUkrBank.textContent =
    transferValue + creditCommisionUkrBank + transferCommisionUkrBank;

  //\\\\\\\\\\\ commission ForeignBank

  let transferCommisionForeignBank = Number(
    calculateComissionForeignBank(transferValue)
  );
  ownFunds.commissionForeignBank.textContent = transferCommisionForeignBank;
  let creditValueForeignBank = creditMoney + transferCommisionForeignBank;
  let creditCommisionForeignBank = Number(
    calculateCreditCommision(creditValueForeignBank)
  );
  creditFunds.commissionForeignBank.textContent = creditCommisionForeignBank;
  totalCommission.commissionForeignBank.textContent =
    creditCommisionForeignBank + transferCommisionForeignBank;
  amountPayment.commissionForeignBank.textContent =
    transferValue + creditCommisionForeignBank + transferCommisionForeignBank;
}
