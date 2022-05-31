"use strict";

// *************************************

const theDatabase = fetch(
    "https://docs.google.com/spreadsheets/d/1pIuk8dvtgyutXFIpqofqwREYlnptFEIxMuJHZak6FIk/gviz/tq?tqx=out:json&tq&gid=0"
);

function getResults(searchtext) {
    var spreadsheetId = "1w3AB-skEn07pVyEj_Auqxhqs3dsvemwMkyNfx8i1vQw"; //** CHANGE !!!
    var dataRange = "A2:F"; //** CHANGE !!!
    var data = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRange).values;
    var ar = [];

    data.forEach(function (f) {
        f.forEach(function (k) {
            if (k.includes(searchtext)) {
                ar.push(f);
                return;
            }
        });
    });
    console.log(ar);
    // return ar;
}

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
const alertControl = document.createElement("ion-alert");

let totalExpensesNumber = 0;

const clearFields = function () {
    phoneInput.value = "";
    roomInput.value = "";
};

phoneConfirmBtn.addEventListener("click", () => {
    if (phoneInput.value) {
        const enteredPhone = phoneInput.value;
        clearFields();
        showOutcome(enteredPhone);
        // getResults(enteredPhone);
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
        clearFields();
        showOutcome(enteredRoom);
        // getResults(enteredRoom);
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
