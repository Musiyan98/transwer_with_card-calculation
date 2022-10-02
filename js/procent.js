const transferAmount = document.getElementById("transfer-amount");
const inputValue = document.getElementById("send-value");
const ownFundsValue = document.getElementById("own-funds");
const typeOfCard = document.getElementById("type-card");
const typeOfMoney = document.querySelectorAll(".type-money");

const tableTitle = document.querySelector(".commission-table__title");
const tableBody = document.getElementsByTagName("tbody");

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

let hiddenColumn = document.querySelectorAll(".permanent-commision");
for (let i = 0; i < 5; i++) {
  hiddenColumn[i].style.display = "none";
}

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

function commisionTransferValueKDV(transferValue) {
  tableTitle.innerHTML = "Комісії при переказі коштів з КДВ";

  ownFunds.tableRow.classList.add("is-hiden");
  creditFunds.tableRow.classList.add("is-hiden");

  amountPayment.transferValue.innerHTML = transferValue;
  amountPayment.commissionOnKu.innerHTML = transferValue;
  totalCommission.commissionOnKu.innerHTML = 0;

  if (transferValue >= 10000) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML =
      transferValue + rate.untargetedKDVMax;
    totalCommission.commissionOnKdvWithReceiver.innerHTML =
      rate.untargetedKDVMax;
  } else if (transferValue <= 0) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = "0";
    totalCommission.commissionOnKdvWithReceiver.innerHTML = 0;
  } else {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      transferValue /
      (1 - rate.untargetedKDV)
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML = (
      transferValue / (1 - rate.untargetedKDV) -
      transferValue
    ).toFixed(2);
  }

  if (transferValue >= 1000) {
    amountPayment.commissionUkrBank.innerHTML = (
      transferValue *
      (1 + rate.onUkrBank)
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = (
      transferValue * rate.onUkrBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionUkrBank.innerHTML = "0";
    totalCommission.commissionUkrBank.innerHTML = 0;
  } else {
    amountPayment.commissionUkrBank.innerHTML = (
      transferValue + rate.onUkrBankMin
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = rate.onUkrBankMin;
  }

  if (transferValue >= 2500) {
    amountPayment.commissionForeignBank.innerHTML = (
      transferValue *
      (1 + rate.onForeignBank)
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = (
      transferValue * rate.onForeignBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionForeignBank.innerHTML = "0";
    totalCommission.commissionForeignBank.innerHTML = 0;
  } else {
    amountPayment.commissionForeignBank.innerHTML = (
      transferValue + rate.onForeignBankMin
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = rate.onForeignBankMin;
  }
}

function commisionTransferKUSelfMoney(transferValue) {
  ownFunds.tableRow.classList.add("is-hiden");
  creditFunds.tableRow.classList.add("is-hiden");

  amountPayment.transferValue.innerHTML = transferValue;
  amountPayment.commissionOnKu.innerHTML = transferValue;
  totalCommission.commissionOnKu.innerHTML = 0;

  if (transferValue >= 10000) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      transferValue + rate.untargetedKDVMax
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML =
      rate.untargetedKDVMax;
  } else if (transferValue <= 0) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = "0";
    totalCommission.commissionOnKdvWithReceiver.innerHTML = 0;
  } else {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      transferValue /
      (1 - rate.untargetedKDV)
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML = (
      transferValue / (1 - rate.untargetedKDV) -
      transferValue
    ).toFixed(2);
  }

  if (transferValue >= 1000) {
    amountPayment.commissionUkrBank.innerHTML = (
      transferValue *
      (1 + rate.onUkrBank)
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = (
      transferValue * rate.onUkrBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionUkrBank.innerHTML = "0";
    totalCommission.commissionUkrBank.innerHTML = 0;
  } else {
    amountPayment.commissionUkrBank.innerHTML = (
      transferValue + rate.onUkrBankMin
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = rate.onUkrBankMin;
  }

  if (transferValue >= 2500) {
    amountPayment.commissionForeignBank.innerHTML = (
      transferValue *
      (1 + rate.onForeignBank)
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = (
      transferValue * rate.onForeignBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionForeignBank.innerHTML = "0";
    totalCommission.commissionForeignBank.innerHTML = 0;
  } else {
    amountPayment.commissionForeignBank.innerHTML = (
      transferValue + rate.onForeignBankMin
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = rate.onForeignBankMin;
  }
}

function commisionTransferKUCreditMoney(transferValue) {
  ownFunds.tableRow.classList.remove("is-hiden");
  creditFunds.tableRow.classList.remove("is-hiden");

  ownFunds.transferValue.innerHTML = 0;
  creditFunds.transferValue.innerHTML = 0;

  amountPayment.transferValue.innerHTML = transferValue;

  amountPayment.commissionOnKu.innerHTML =
    transferValue * (1 + rate.ifCreditMoney);
  creditFunds.commissionOnKu.innerHTML = transferValue * rate.ifCreditMoney;
  totalCommission.commissionOnKu.innerHTML = transferValue * rate.ifCreditMoney;

  if (transferValue >= 10000) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue + rate.untargetedKDVMax) *
      (1 + rate.ifCreditMoney)
    ).toFixed(2);
    ownFunds.commissionOnKdvWithReceiver.innerHTML = rate.untargetedKDVMax;
    creditFunds.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue + rate.untargetedKDVMax) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue + rate.untargetedKDVMax) * rate.ifCreditMoney +
      rate.untargetedKDVMax
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = "0";
    ownFunds.commissionOnKdvWithReceiver.innerHTML = 0;
  } else {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue / (1 - rate.untargetedKDV)) *
      (1 + rate.ifCreditMoney)
    ).toFixed(2);
    ownFunds.commissionOnKdvWithReceiver.innerHTML = (
      transferValue / (1 - rate.untargetedKDV) -
      transferValue
    ).toFixed(2);
    creditFunds.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue / (1 - rate.untargetedKDV)) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue / (1 - rate.untargetedKDV)) * (1 + rate.ifCreditMoney) -
      transferValue
    ).toFixed(2);
  }

  if (transferValue >= 1000) {
    amountPayment.commissionUkrBank.innerHTML = (
      transferValue *
      (1 + rate.onUkrBank) *
      (1 + rate.ifCreditMoney)
    ).toFixed(2);
    ownFunds.commissionUkrBank.innerHTML = (
      transferValue * rate.onUkrBank
    ).toFixed(2);
    creditFunds.commissionUkrBank.innerHTML = (
      (transferValue * rate.onUkrBank + transferValue) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = (
      (transferValue * rate.onUkrBank + transferValue) * rate.ifCreditMoney +
      transferValue * rate.onUkrBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionUkrBank.innerHTML = "0";
    ownFunds.commissionUkrBank.innerHTML = 0;
  } else {
    amountPayment.commissionUkrBank.innerHTML = (
      (transferValue + rate.onUkrBankMin) *
      (1 + rate.ifCreditMoney)
    ).toFixed(2);
    ownFunds.commissionUkrBank.innerHTML = rate.onUkrBankMin;
    creditFunds.commissionUkrBank.innerHTML = (
      (transferValue + rate.onUkrBankMin) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = (
      (transferValue + rate.onUkrBankMin) * rate.ifCreditMoney +
      rate.onUkrBankMin
    ).toFixed(2);
  }

  if (transferValue >= 2500) {
    amountPayment.commissionForeignBank.innerHTML = (
      transferValue *
      (1 + rate.onForeignBank) *
      (1 + rate.ifCreditMoney)
    ).toFixed(2);
    ownFunds.commissionForeignBank.innerHTML = (
      transferValue * rate.onForeignBank
    ).toFixed(2);
    creditFunds.commissionForeignBank.innerHTML = (
      (transferValue * rate.onForeignBank + transferValue) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = (
      (transferValue * rate.onForeignBank + transferValue) *
        rate.ifCreditMoney +
      transferValue * rate.onForeignBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionForeignBank.innerHTML = "0";
    ownFunds.commissionForeignBank.innerHTML = 0;
  } else {
    amountPayment.commissionForeignBank.innerHTML = (
      (transferValue + rate.onForeignBankMin) *
      (1 + rate.ifCreditMoney)
    ).toFixed(2);
    ownFunds.commissionForeignBank.innerHTML = rate.onForeignBankMin;
    creditFunds.commissionForeignBank.innerHTML = (
      (transferValue + rate.onForeignBankMin) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = (
      (transferValue + rate.onForeignBankMin) * rate.ifCreditMoney +
      rate.onForeignBankMin
    ).toFixed(2);
  }
}

function commisionTransferKUMixMoney(transferValue) {
  let selfMoney = Number(ownFundsValue.value);
  let creditMoney = transferValue - selfMoney;

  ownFunds.tableRow.classList.remove("is-hiden");
  creditFunds.tableRow.classList.remove("is-hiden");

  creditFunds.transferValue.innerHTML = creditMoney;

  amountPayment.transferValue.innerHTML = transferValue;

  amountPayment.commissionOnKu.innerHTML = (
    creditMoney * (1 + rate.ifCreditMoney) +
    selfMoney
  ).toFixed(2);
  creditFunds.commissionOnKu.innerHTML = (
    creditMoney * rate.ifCreditMoney
  ).toFixed(2);
  totalCommission.commissionOnKu.innerHTML = (
    creditMoney * rate.ifCreditMoney
  ).toFixed(2);

  if (transferValue >= 10000) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      (creditMoney + rate.untargetedKDVMax) * (1 + rate.ifCreditMoney) +
      selfMoney
    ).toFixed(2);
    ownFunds.commissionOnKdvWithReceiver.innerHTML = rate.untargetedKDVMax;
    creditFunds.commissionOnKdvWithReceiver.innerHTML = (
      (creditMoney + rate.untargetedKDVMax) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML = (
      (creditMoney + rate.untargetedKDVMax) * rate.ifCreditMoney +
      rate.untargetedKDVMax
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = "0";
    ownFunds.commissionOnKdvWithReceiver.innerHTML = 0;
  } else {
    amountPayment.commissionOnKdvWithReceiver.innerHTML = (
      transferValue / (1 - rate.untargetedKDV) +
      (transferValue / (1 - rate.untargetedKDV) - selfMoney) *
        rate.ifCreditMoney
    ).toFixed(2);
    ownFunds.commissionOnKdvWithReceiver.innerHTML = (
      transferValue / (1 - rate.untargetedKDV) -
      transferValue
    ).toFixed(2);
    creditFunds.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue / (1 - rate.untargetedKDV) - selfMoney) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionOnKdvWithReceiver.innerHTML = (
      (transferValue / (1 - rate.untargetedKDV) - selfMoney) *
        rate.ifCreditMoney +
      (transferValue / (1 - rate.untargetedKDV) - transferValue)
    ).toFixed(2);
  }

  if (transferValue >= 1000) {
    amountPayment.commissionUkrBank.innerHTML = (
      (transferValue * rate.onUkrBank + creditMoney) * rate.ifCreditMoney +
      transferValue * (1 + rate.onUkrBank)
    ).toFixed(2);
    ownFunds.commissionUkrBank.innerHTML = (
      transferValue * rate.onUkrBank
    ).toFixed(2);
    creditFunds.commissionUkrBank.innerHTML = (
      (transferValue * rate.onUkrBank + creditMoney) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = (
      (transferValue * rate.onUkrBank + creditMoney) * rate.ifCreditMoney +
      transferValue * rate.onUkrBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionUkrBank.innerHTML = "0";
    ownFunds.commissionUkrBank.innerHTML = 0;
  } else {
    amountPayment.commissionUkrBank.innerHTML = (
      (creditMoney + rate.onUkrBankMin) * rate.ifCreditMoney +
      rate.onUkrBankMin +
      transferValue
    ).toFixed(2);
    ownFunds.commissionUkrBank.innerHTML = rate.onUkrBankMin;
    creditFunds.commissionUkrBank.innerHTML = (
      (creditMoney + rate.onUkrBankMin) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionUkrBank.innerHTML = (
      (creditMoney + rate.onUkrBankMin) * rate.ifCreditMoney +
      rate.onUkrBankMin
    ).toFixed(2);
  }

  if (transferValue >= 2500) {
    amountPayment.commissionForeignBank.innerHTML = (
      (transferValue * rate.onForeignBank + creditMoney) * rate.ifCreditMoney +
      transferValue * (1 + rate.onForeignBank)
    ).toFixed(2);
    ownFunds.commissionForeignBank.innerHTML = (
      transferValue * rate.onForeignBank
    ).toFixed(2);
    creditFunds.commissionForeignBank.innerHTML = (
      (transferValue * rate.onForeignBank + creditMoney) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = (
      (transferValue * rate.onForeignBank + creditMoney) * rate.ifCreditMoney +
      transferValue * rate.onForeignBank
    ).toFixed(2);
  } else if (transferValue <= 0) {
    amountPayment.commissionForeignBank.innerHTML = "0";
    ownFunds.commissionForeignBank.innerHTML = 0;
  } else {
    amountPayment.commissionForeignBank.innerHTML = (
      (creditMoney + rate.onForeignBankMin) * rate.ifCreditMoney +
      rate.onForeignBankMin +
      transferValue
    ).toFixed(2);
    ownFunds.commissionForeignBank.innerHTML = rate.onForeignBankMin;
    creditFunds.commissionForeignBank.innerHTML = (
      (creditMoney + rate.onForeignBankMin) *
      rate.ifCreditMoney
    ).toFixed(2);
    totalCommission.commissionForeignBank.innerHTML = (
      (creditMoney + rate.onForeignBankMin) * rate.ifCreditMoney +
      rate.onForeignBankMin
    ).toFixed(2);
  }
}

function selestTypeOfKUTransfer(transferValue) {
  tableTitle.innerHTML = "Комісії при переказі коштів з КУ";

  selfMoney = Number(ownFundsValue.value);

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
    commisionTransferKUMixMoney(transferValue);
  }
}

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
