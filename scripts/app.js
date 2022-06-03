"use strict";

// *********** GETTING THE JSON DATA ***********

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
    if (allData[0]["Wing"]) console.log("✅ DATA LOADED OK");
    dataLoaded = true;
});

// *************************************

function showOutcome(searchPhrase) {
    // resArr = [];
    searchPhrase = searchPhrase.toUpperCase();

    // * catch a few common searches and force them
    if (searchPhrase == "X RAY" || searchPhrase == "XRAY") {
        searchPhrase = "X-RAY";
    }
    if (searchPhrase == "LABOR") searchPhrase = "LABOUR";
    if (searchPhrase.includes("CONTROL")) searchPhrase = "ADK20044";
    // ********************************************

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
            html = `Showing 1 result of ${resArr.length}:<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Description"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}`;
            console.log(html);
        } else {
            html = `Showing 1 result:<br>${resArr[0]["Room Num"]}<br>${resArr[0]["Description"]}<br>${resArr[0]["Department"]}<br>${resArr[0]["Wing"]}`;
        }
    }
    displayBox(html);
}

function createAllResults(resArr) {
    html = `<div style="overflow-y:auto;max-height:200px;"><ion-item>All Results (${resArr.length}):</ion-item>`;
    resArr.forEach((entry) => {
        html += `<br>${entry["Room Num"]}<br>${entry["Description"]}<br>${entry["Department"]}<br>${entry["Wing"]}<br>`;
    });
    html += `<hr></hr></div>`;
    showAll = false;
    msgArea.innerHTML = html;
}

function displayBox(html) {
    alertControl.message = html;
    alertControl.header = `You searched for: ${searchPhrase.toUpperCase()}`;
    // alertControl.buttons = ["SHOW ALL", "OK"];
    alertControl.buttons = [
        {
            text: "SHOW ALL",
            // role: "cancel",
            cssClass: "secondary",
            id: "show-all-button",
            handler: () => {
                showAll = true;
                createAllResults(resArr);
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
const msgArea = document.querySelector("#all-rooms");

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
        resArr = [];
        if (msgArea.innerHTML) msgArea.innerHTML = "";
        showOutcome(searchPhrase);
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
