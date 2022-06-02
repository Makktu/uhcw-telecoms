"use strict";

const closeAllResults = function () {
    modalControl.innerHTML = `<ion-modal id="test-modal" is-open="false">
    <ion-content id="modal-content"
        ></ion-content
    >`;
};

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

// function parseSearch(searchPhrase) {

//     return searchPhrase;
// }

function showOutcome(searchPhrase) {
    resArr = [];

    // msgArea.innerHTML = "";
    searchPhrase = searchPhrase.toUpperCase();
    if (searchPhrase == "X RAY" || searchPhrase == "XRAY") {
        searchPhrase = "X-RAY";
    }
    if (searchPhrase == "LABOR") searchPhrase = "LABOUR";
    if (searchPhrase.includes("CONTROL")) searchPhrase = "ADK20044";
    console.log(">>>", searchPhrase);

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
        if (resArr.length > 1 && !showAll) {
            html = `Showing 1st result of ${resArr.length}:<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Description"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}`;
            console.log(html);
        } else if (resArr.length > 1 && showAll) {
            createAllResults(resArr);
        } else {
            html = `Showing 1 result:<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Description"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}`;
        }
    }
    displayBox(html);
}

function createAllResults(resArr) {
    html = `<ion-item>All Results:</ion-item><ion-item style="float:right";><ion-button
    fill="outline"
    color="danger"
    id="all-results-close"
    onclick=closeAllResults()
    ><ion-icon
        slot="start"
        name="close-outline"
    ></ion-icon
    >CLOSE</ion-button
></ion-item>`;
    resArr.forEach((entry) => {
        html += `<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Description"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}<br>`;
    });
    showAll = false;
    html = `<div class="ion-padding">${html}</div>`;
    modalControl.innerHTML = `<ion-modal id="test-modal" is-open="true" id="card-modal">
    <ion-content id="modal-content"
        >${html}</ion-content
    ></ion-modal>`;
}

function displayBox(html) {
    alertControl.message = html;
    alertControl.header = `You searched for: ${searchPhrase.toUpperCase()}`;
    // alertControl.buttons = ["SHOW ALL", "OK"];
    alertControl.buttons = [
        {
            text: "SHOW ALL",
            role: "cancel",
            cssClass: "secondary",
            id: "show-all-button",
            handler: () => {
                showAll = true;
                showOutcome(searchPhrase);
            },
        },
        {
            text: "OK",
            id: "ok-button",
            // handler: () => {
            //     console.log("Confirm Okay");
            // },
        },
    ];
    document.body.appendChild(alertControl);
    alertControl.present();
}

let searchPhrase;
let roomNums = [];
let resArr = [];
let dataLoaded = false;
let allData;
let html = "<strong>Content Pending</strong>";
let showAll = false;

const phoneInput = document.querySelector("#input-phone");
const phoneCancelBtn = document.querySelector("#btn-phone-cancel");
const phoneConfirmBtn = document.querySelector("#btn-phone-confirm");
const roomInput = document.querySelector("#input-room");
const roomCancelBtn = document.querySelector("#btn-room-cancel");
const roomConfirmBtn = document.querySelector("#btn-room-confirm");
const alertControl = document.createElement("ion-alert");
const modalControl = document.querySelector("#control-modal");

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
