"use strict";

// *************************************

// function extractTableJSONRecords() {
//     let stmt = "SELECT * FROM `" + "chinook/albums" + "`";
//     let resultset = db.exec(stmt);
//     let columns = resultset[0]["columns"];
//     let values = resultset[0]["values"];
//     let jsonOutput = [];
//     for (let valArr of values) {
//         let obj = {};
//         for (let v in valArr) {
//             obj[columns[v]] = valArr[v];
//         }
//         jsonOutput.push(obj);
//     }
//     return jsonOutput;
// }

// const initSqlJs = window.initSqlJs;
// const SQL = await initSqlJs({
// Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
// You can omit locateFile completely when running in node
//     locateFile: (file) => `/node_modules/sql.js/dist/sql-wasm.wasm`,
// });
// var uInt8Array = new Uint8Array("/chinook.db");
// const db = new SQL.Database();

// let sqlstr =
//     "CREATE TABLE hello (a int, b char); \
// INSERT INTO hello VALUES (0, 'hello'); \
// INSERT INTO hello VALUES (1, 'world');";
// db.run(sqlstr);
// console.log(db);
// const stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");
// console.log(stmt);
// const stmt = db.prepare("SELECT * FROM 'artists'");
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
