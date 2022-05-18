function showOutcome(content) {
    alertControl.message = content;
    alertControl.header = "You searched for";
    alertControl.buttons = ["OK"];
    document.body.appendChild(alertControl);
    alertControl.present();
}

const phoneInput = document.querySelector("#input-phone");
const phoneCancelBtn = document.querySelector("#btn-phone-cancel");
const phoneConfirmBtn = document.querySelector("#btn-phone-confirm");
const roomInput = document.querySelector("#input-room");
const roomCancelBtn = document.querySelector("#btn-room-cancel");
const roomConfirmBtn = document.querySelector("#btn-room-confirm");

// const amountInput = document.querySelector("#input-amount");
// const expensesList = document.querySelector("#expenses-list");
// const totalExpensesDisplay = document.querySelector("#total-expenses");
const alertControl = document.createElement("ion-alert");

let totalExpensesNumber = 0;

const clearFields = function () {
    phoneInput.value = "";
    // amountInput.value = "";
};

phoneConfirmBtn.addEventListener("click", () => {
    if (phoneInput.value) {
        const enteredPhone = phoneInput.value;
        // const enteredAmount = amountInput.value;
        // const newItem = document.createElement("ion-item");
        // newItem.textContent += enteredReason + ": £" + enteredAmount;
        // expensesList.appendChild(newItem);
        clearFields();
        showOutcome(enteredPhone);
        // totalExpensesNumber += +enteredAmount;
        // totalExpensesDisplay.textContent = `£${totalExpensesNumber}`;
    } else {
        alertControl.message = "Enter a search term first";
        alertControl.header = "No Input";
        alertControl.buttons = ["OK"];
        document.body.appendChild(alertControl);
        alertControl.present();
    }
});

// cancelBtn.addEventListener("click", () => {
//     if (amountInput.value || reasonInput.value) {
//         clearFields();
//     }
// });
