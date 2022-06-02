"use strict";

// *************************************

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

readTextFile("./switchdesk1.json", function (text) {
    roomNums = JSON.parse(text);
    allData = roomNums.reduce(
        (acc, entry) => acc.concat(Object.values(entry)),
        []
    );
    console.log("Check: " + allData[0]["Wing"]);
    dataLoaded = true;
});

// *************************************

function showOutcome(searchPhrase) {
    resArr = [];
    // msgArea.innerHTML = "";
    searchPhrase = searchPhrase.toUpperCase();
    let thisDescription = "";
    let thisRoom = "";
    let thisDepartment = "";
    allData.forEach((entry) => {
        thisRoom = entry["Room Num"];
        thisDescription = entry["Description"];
        thisDepartment = entry["Department"];
        if (thisRoom?.includes(searchPhrase)) {
            resArr.push(entry);
        }
        if (thisDescription?.includes(searchPhrase)) {
            resArr.push(entry);
        }
        if (thisDepartment?.includes(searchPhrase)) {
            resArr.push(entry);
        }
    });

    if (resArr.length == 0) {
        html = `Nothing found for '${searchPhrase}'`;
    } else {
        if (resArr.length > 1) {
            html = `Showing 1st result of ${resArr.length}:<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}<br>[Tap ALL To Show All (not working yet)]`;
            console.log(html);
        } else {
            html = `Showing 1 result:<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}`;
        }
    }
    displayBox(html);
}

function displayBox(html) {
    alertControl.message = html;
    alertControl.header = `You searched for: ${searchPhrase.toUpperCase()}`;
    alertControl.buttons = ["ALL", "OK"];
    document.body.appendChild(alertControl);
    alertControl.present();
}

let searchPhrase;
let roomNums = [];
let resArr = [];
let dataLoaded = false;
let allData;
let html = "<strong>Content Pending</strong>";

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
        searchPhrase = phoneInput.value;
        clearFields();
        displayBox("This part's not working yet. Coming soon...");
        // showOutcome(enteredPhone);
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
        searchPhrase = roomInput.value;
        clearFields();
        showOutcome(searchPhrase);
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

// ************************

// if (thisDepartment?.includes(searchPhrase)) {
//     resArr.push(entry);
// }

// if (typeof thisDepartment == "object") {
//     entry["Department"].forEach((place) => {
//         if (place.includes(searchPhrase)) {
//             resArr.push(entry);
//         }
//     });
// } else {
//     if (entry["Department"].includes(searchPhrase)) {
//         resArr.push(entry);
//     }
// }
