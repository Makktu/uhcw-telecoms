"use strict";

let searchPhrase;
let searchComplete = false;
let foundWard = [];
let message;
let topKeys = [];
let roomNums = [];
let telNums;
let resArr = [];
let dataLoaded = false;
let allData;
let html = "<strong>Content Pending</strong>";
let showAll = false;
let roomSearch = false;
let phoneSearch = false;
let theWard;
let numberToCall = "";

const phoneInput = document.querySelector("#input-phone");
const phoneCancelBtn = document.querySelector("#btn-phone-cancel");
const phoneConfirmBtn = document.querySelector("#btn-phone-confirm");
const roomInput = document.querySelector("#input-room");
const roomCancelBtn = document.querySelector("#btn-room-cancel");
const roomConfirmBtn = document.querySelector("#btn-room-confirm");
const alertControl = document.createElement("ion-alert");
const modalControl = document.querySelector("#control-modal");
const msgArea = document.querySelector("#all-rooms");

// *********** GETTING THE JSON DATA ***********

function firstRun() {
    let firstMessage = `🙋🏽‍♀️ Welcome to the unofficial app of Switchboard and Helpdesk at UHCW.<br>➡️ Search for any ward, department or telephone number.<br>➡️ Perform 'reverse lookup' of any phone number to check where it comes from.<br>🏗️ This app is still under development.<br>🔗 Tap the link at the bottom of the page for a preview of how it will look and work when finished!<br>❗Please be aware that information contained in this app may be incomplete, and is subject to change at short notice.`;
    displayBox(firstMessage);
}

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

readTextFile("./telephone.json", function (text) {
    telNums = JSON.parse(text);
    telNums = telNums[0];
    dataLoaded = true;
    topKeys = Object.keys(telNums);
});

// *************************************

function callNumber(numberToCall) {
    console.log("!!!!", numberToCall);
    numberToCall += "";
    numberToCall = testConvert(numberToCall);

    console.log("CONVERTED TO:", numberToCall);
    window.open(`tel:${numberToCall}`);

    numberToCall = "";
}

function numberSearch(searchPhrase) {
    let thisWard, thisArea;
    searchPhrase += "";
    topKeys.forEach((entry) => {
        thisWard = entry;
        let thisObject = telNums[entry];
        let thisObjKeys = Object.keys(thisObject);
        thisObjKeys.forEach((nextEntry, ind) => {
            thisArea = nextEntry;
            for (let number in nextEntry) {
                if (telNums[entry][nextEntry][number] == searchPhrase) {
                    displayBox(
                        `✅ Extension ${searchPhrase} is located at ${thisWard}, ${thisArea}`,
                        searchPhrase
                    );
                    numberToCall = searchPhrase;
                    searchComplete = true;
                    return;
                }
            }
        });
    });
}

function telephoneSearch(searchPhrase) {
    numberSearch(searchPhrase);
    if (searchComplete) {
        searchComplete = false;
        return;
    }
    searchPhrase = searchPhrase.toUpperCase();
    for (let entry of topKeys) {
        if (entry.includes(searchPhrase)) {
            foundWard.push(entry);
        }
        theWard = foundWard[0];
    }
    if (foundWard.length == 0) {
        roomSearch = false;
        phoneSearch = false;
        displayBox("❌ Nothing found. Check spelling and try again.");
        return;
    }
    if (foundWard) {
        searchPhrase = foundWard[0];
        // console.log(telNums[`${searchPhrase}`]);
        message = "";
        if (typeof telNums[`${searchPhrase}`] == "object") {
            let promising = Object.keys(telNums[`${searchPhrase}`]);
            // message += `${searchPhrase}<br>`;
            if (theWard.length > 16) theWard = theWard.slice(0, 13);
            message += `✅ ${theWard}<br>`;
            numberToCall = "";
            for (let entry of promising) {
                console.log(telNums[searchPhrase][entry][0]);
                if (!numberToCall)
                    numberToCall = telNums[searchPhrase][entry][0];
                message += `${entry}: ${telNums[searchPhrase][entry][0]}<br>`;
                if (telNums[searchPhrase][entry][1]) {
                    message += `${entry}: ${telNums[searchPhrase][entry][1]}<br>`;
                }
                if (telNums[searchPhrase][entry][2]) {
                    message += `${entry}: ${telNums[searchPhrase][entry][2]}<br>`;
                }
                if (telNums[searchPhrase][entry][3]) {
                    message += `${telNums[searchPhrase][entry][3]}<br>`;
                }

                // console.log(
                //     telNums[`${searchPhrase}`][entry][0],
                //     telNums[`${searchPhrase}`][entry][1]
                //         ? telNums[`${searchPhrase}`][entry][1]
                //         : "",
                //     telNums[`${searchPhrase}`][entry][2]
                //         ? telNums[`${searchPhrase}`][entry][2]
                //         : "",
                //     telNums[`${searchPhrase}`][entry][3]
                //         ? telNums[`${searchPhrase}`][entry][3]
                //         : ""
                // );
            }
        }
        if (foundWard.length > 1) {
            console.log("MORE???");
            for (let multiple of foundWard) {
                console.log(multiple);
            }
        }
        foundWard = [];
        displayBox(message, numberToCall);
    }
}

function testConvert(ext) {
    // * converts 5-digit internal extension into external diallable number prefixed by 02476 96XXXX
    let outsideDial = "02476 96";
    let fullNumber = outsideDial + ext.slice(-4) + "";
    return fullNumber;
}

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
        html = `❌ Nothing found for '${searchPhrase}'`;
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

function displayBox(html, numberToCall) {
    if (!firstUp) {
        firstUp = true;
        alertControl.message = html;
        alertControl.header = `☎️ UHCW Telecoms 🗺️`;
        alertControl.buttons = [
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
        return;
    }
    alertControl.message = html;
    alertControl.header = `${searchPhrase.toUpperCase()}`;
    // alertControl.buttons = ["SHOW ALL", "OK"];

    if (roomSearch) {
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
        roomSearch = false;
    }

    if (phoneSearch) {
        console.log("???", numberToCall);
        alertControl.buttons = [
            // {
            //     text: "SAVE 1ST NUMBER",
            //     // role: "cancel",
            //     cssClass: "secondary",
            //     id: "show-all-button",
            //     handler: () => {
            //         showAll = true;
            //         callNumber();
            //     },
            // },
            {
                text: `CALL NOW`,
                // role: "cancel",
                cssClass: "secondary",
                id: "show-all-button",
                handler: () => {
                    showAll = true;
                    callNumber(numberToCall);
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
        phoneSearch = false;
    }
    document.body.appendChild(alertControl);
    alertControl.present();
}

const clearFields = function () {
    phoneInput.value = "";
    roomInput.value = "";
};

phoneConfirmBtn.addEventListener("click", () => {
    if (phoneInput.value) {
        searchPhrase = phoneInput.value;
        searchPhrase = searchPhrase.toUpperCase();
        phoneInput.value = "";
        clearFields();

        if (dataLoaded && searchPhrase) {
            phoneSearch = true;
            telephoneSearch(searchPhrase);
        }
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
        roomSearch = true;
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

let firstUp = false;
if (!firstUp) firstRun();
