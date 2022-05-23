"use strict";

// *************************************

const initSqlJs = window.initSqlJs;

const db = "./chinook.db";

// const db = new sqlite3.Database(
//     "./chinook.db",
//     sqlite3.OPEN_READWRITE,
//     (err) => {
//         if (err) {
//             return console.error(err.message + "<<<<<<<_________");
//         } else console.log("ALL OK");
//     }
// );

// DO ALL THE DATABASE STUFF HERE

// import sqlite3 from "/sqlite3";
// import { open } from "/sqlite";

// import sqlite3 from "sqlite3";

// this is a top-level await
// (async () => {
//     // open the database
//     const db = await open({
//         filename: "/chinook.db",
//         driver: sqlite3.Database,
//     });
// })();
// *************************************

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
    roomInput.value = "";
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

roomConfirmBtn.addEventListener("click", () => {
    if (roomInput.value) {
        const enteredRoom = roomInput.value;
        // const enteredAmount = amountInput.value;
        // const newItem = document.createElement("ion-item");
        // newItem.textContent += enteredReason + ": £" + enteredAmount;
        // expensesList.appendChild(newItem);
        clearFields();
        showOutcome(enteredRoom);
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

phoneCancelBtn.addEventListener("click", () => {
    if (phoneInput.value) {
        clearFields();
    }
});

roomCancelBtn.addEventListener("click", () => {
    if (roomInput.value) {
        clearFields();
    }
});
