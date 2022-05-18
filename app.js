const reasonInput = document.querySelector("#input-reason");
const amountInput = document.querySelector("#input-amount");
const cancelBtn = document.querySelector("#btn-cancel");
const confirmBtn = document.querySelector("#btn-confirm");

const expensesList = document.querySelector("#expenses-list");

const totalExpensesDisplay = document.querySelector("#total-expenses");

const alertControl = document.createElement("ion-alert");

let totalExpensesNumber = 0;

const clearFields = function () {
    reasonInput.value = "";
    amountInput.value = "";
};

confirmBtn.addEventListener("click", () => {
    if (amountInput.value && reasonInput.value) {
        const enteredReason = reasonInput.value;
        const enteredAmount = amountInput.value;
        const newItem = document.createElement("ion-item");
        newItem.textContent += enteredReason + ": £" + enteredAmount;
        expensesList.appendChild(newItem);
        clearFields();
        totalExpensesNumber += +enteredAmount;
        totalExpensesDisplay.textContent = `£${totalExpensesNumber}`;
    } else {
        alertControl.message = "Enter a valid reason and amount";
        alertControl.header = "Invalid Input";
        alertControl.buttons = ["OK"];
        document.body.appendChild(alertControl);
        alertControl.present();
    }
});

cancelBtn.addEventListener("click", () => {
    if (amountInput.value || reasonInput.value) {
        clearFields();
    }
});
