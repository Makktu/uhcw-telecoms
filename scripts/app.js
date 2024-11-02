'use strict';

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
let html = '<strong>Content Pending</strong>';
let showAll = false;
let roomSearch = false;
let phoneSearch = false;
let theWard;
let numberToCall = '';
let allNumbersToCall = [];
let promising;

const phoneInput = document.querySelector('#input-phone');
const phoneCancelBtn = document.querySelector('#btn-phone-cancel');
const phoneConfirmBtn = document.querySelector('#btn-phone-confirm');
const roomInput = document.querySelector('#input-room');
const roomCancelBtn = document.querySelector('#btn-room-cancel');
const roomConfirmBtn = document.querySelector('#btn-room-confirm');
const alertControl = document.createElement('ion-alert');
const modalControl = document.querySelector('#control-modal');
const msgArea = document.querySelector('#all-rooms');
const switchMsgArea = document.querySelector('#all-numbers');

// *********** GETTING THE JSON DATA ***********

function conceptEasterEgg() {
  let conceptDate = new Date() + '';
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = 'New Task';
  alert.inputs = [
    {
      placeholder: 'NAME',
      value: 'NAME',
    },
    {
      name: 'name2',
      id: 'name2-id',
      value: 'EXTENSION',
      placeholder: 'EXTENSION',
    },
    // multiline input.
    {
      name: 'paragraph',
      id: 'paragraph',
      value: 'FROM LOCATION',
      type: 'textarea',
      placeholder: 'FROM LOCATION',
    },
    {
      name: 'paragraph',
      value: 'TO LOCATION',
      id: 'paragraph',
      type: 'textarea',
      placeholder: 'TO LOCATION',
    },
    {
      name: 'name3',
      value: 'TASK DETAILS',
      type: 'textarea',
      placeholder: '',
    },
    {
      name: 'name3',
      value: 'CONTRACT',
      type: 'textarea',
      placeholder: '',
    },
    // input date without min nor max
    {
      name: 'name3',
      value: `${conceptDate.slice(0, 25)}`,
    },
  ];
  alert.buttons = [
    {
      text: 'CANCEL',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel');
      },
    },
    {
      text: 'SAVE',
      handler: () => {
        console.log('Confirm SAVE');
      },
    },
  ];

  document.body.appendChild(alert);
  return alert.present();
}

function firstRun() {
  let firstMessage = `Welcome to the unofficial app of Switchboard and Helpdesk at UHCW.

• SWITCHBOARD: Full or partial search for any ward, department or telephone number.
  Example: A search for '22' will find all Ward 22 numbers; search for 'ED' will find all Emergency Dept numbers.

• Perform 'reverse lookup' of any phone number to check which Department it is from.
  Example: A search for '27777' will reveal that it is located on Renal Dialysis.

• HELPDESK: full or partial search for locations by name or room number.
  Example: searching 'security' will find the location and room number of the Security office in The Mall; searching 'abr1' will show that those room numbers are on Ward 15.

👷 This app is under active development and is not yet feature-complete.
🔗 Tap the link at the bottom of the page for a preview of how it will look and work when finished!

❗ Please be aware that information contained in this app may be incomplete, and is subject to change at short notice.`;
  displayBox(firstMessage);
}

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType('application/json');
  rawFile.open('GET', file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

readTextFile('./switchdesk1.json', function (text) {
  roomNums = JSON.parse(text);
  allData = roomNums.reduce(
    (acc, entry) => acc.concat(Object.values(entry)),
    []
  );
  if (allData[0]['Wing']) dataLoaded = true;
});

readTextFile('./telephone.json', function (text) {
  telNums = JSON.parse(text);
  telNums = telNums[0];
  dataLoaded = true;
  topKeys = Object.keys(telNums);
});

// *************************************

function callNumber(numberToCall) {
  numberToCall += '';
  numberToCall = testConvert(numberToCall);
  window.open(`tel:${numberToCall}`);
  numberToCall = '';
}

function numberSearch(searchPhrase) {
  let thisWard, thisArea;
  searchPhrase += '';
  topKeys.forEach((entry) => {
    thisWard = entry;
    let thisObject = telNums[entry];
    let thisObjKeys = Object.keys(thisObject);
    thisObjKeys.forEach((nextEntry, ind) => {
      thisArea = nextEntry;
      for (let number in nextEntry) {
        if (telNums[entry][nextEntry][number] == searchPhrase) {
          alertControl.message = `<div class="alert-message">✅ Extension ${searchPhrase} is located at ${thisWard}, ${thisArea}</div>`;
          alertControl.header = `
                    ☎️ UHCW Telecoms 🗺️`;

          alertControl.buttons = [
            {
              text: '❌ CLOSE',
              id: 'ok-button',
              // cssClass: "my-custom-class",
              handler: () => {
                console.log('Confirm Okay');
              },
            },
            {
              text: '☎️ CALL',
              id: 'call-button',
              handler: () => {
                callNumber(searchPhrase);
              },
            },
          ];
          document.body.appendChild(alertControl);
          alertControl.present();
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
  if (searchPhrase == 'GCC' || searchPhrase.includes('CRITI')) {
    searchPhrase = 'GENERAL CRITICAL CARE';
  }
  if (
    searchPhrase == 'ED' ||
    searchPhrase == 'A AND E' ||
    searchPhrase == 'A&E'
  ) {
    searchPhrase = 'EMERGENCY';
  }
  if (searchPhrase == 'MDU') {
    searchPhrase = 'WARD 2 MDU';
  }
  if (searchPhrase == '2') {
    searchPhrase = 'WARD 2';
  }
  if (searchPhrase == '3') {
    searchPhrase = 'WARD 3';
  }
  if (searchPhrase == '1') {
    searchPhrase = 'WARD 1';
  }
  if (searchPhrase == '10') {
    searchPhrase = 'WARD 10';
  }
  if (searchPhrase == '11') {
    searchPhrase = 'WARD 11';
  }
  if (searchPhrase.includes('OUT') || searchPhrase.includes('OPD')) {
    // check if last character(s) of entry is a number
    // convert to 'clinic' search
    let lastOneOrTwo = searchPhrase.slice(searchPhrase.length - 2);
    if (isNaN(+lastOneOrTwo.slice(0, 1)) || lastOneOrTwo.slice(0, 1) == ' ') {
      lastOneOrTwo = lastOneOrTwo.slice(1, 2);
    }
    searchPhrase = 'CLINIC ' + lastOneOrTwo;
  }
  for (let entry of topKeys) {
    if (entry.includes(searchPhrase)) {
      foundWard.push(entry);
    }
    theWard = foundWard[0];
  }
  if (foundWard.length == 0) {
    roomSearch = false;
    phoneSearch = false;
    alertControl.message = `<div class="alert-message">❌ Nothing found. Check spelling and try again.</div>`;
    alertControl.header = `☎️ UHCW Telecoms 🗺️`;
    alertControl.buttons = [
      {
        text: 'OK',
        id: 'ok-button',
        // handler: () => {
        //     console.log("Confirm Okay");
        // },
      },
    ];
    document.body.appendChild(alertControl);
    alertControl.present();
    return;
  }
  if (foundWard) {
    searchPhrase = foundWard[0];
    message = "<div class='alert-message'>";
    if (typeof telNums[`${searchPhrase}`] == 'object') {
      promising = Object.keys(telNums[`${searchPhrase}`]);
      message += `<div id="phone-results-header"><br><strong>${theWard}</strong></div>`;
      numberToCall = '';
      allNumbersToCall = [];
      // ******************
      // ***** HERE *******
      // ******************
      for (let entry of promising) {
        if (!numberToCall) {
          numberToCall = telNums[searchPhrase][entry][0];
        }
        message += `${entry}: ${telNums[searchPhrase][entry][0]}<br>`;
        allNumbersToCall.push(telNums[searchPhrase][entry][0]);
        if (telNums[searchPhrase][entry][1]) {
          message += `${entry}: ${telNums[searchPhrase][entry][1]}<br>`;
          allNumbersToCall.push(telNums[searchPhrase][entry][1]);
        }
        if (telNums[searchPhrase][entry][2]) {
          message += `${entry}: ${telNums[searchPhrase][entry][2]}<br>`;
          allNumbersToCall.push(telNums[searchPhrase][entry][2]);
        }
        if (telNums[searchPhrase][entry][3]) {
          message += `${telNums[searchPhrase][entry][3]}<br>`;
          allNumbersToCall.push(telNums[searchPhrase][entry][3]);
        }
      }
    }
    message += '</div>';
    foundWard = [];
    displayBox(message, numberToCall, promising);
  }
}

function testConvert(ext) {
  // * converts 5-digit internal extension into external diallable number prefixed by 02476 96XXXX
  let outsideDial = '02476 96';
  let fullNumber = outsideDial + ext.slice(-4) + '';
  return fullNumber;
}

function showOutcome(searchPhrase) {
  if (searchPhrase.toUpperCase() == 'CONCEPT') {
    conceptEasterEgg();
    return;
  }
  // resArr = [];
  searchPhrase = searchPhrase.toUpperCase();

  // * catch a few common searches and force them
  if (searchPhrase == 'X RAY' || searchPhrase == 'XRAY') {
    searchPhrase = 'X-RAY';
  }
  if (searchPhrase == 'LABOR') searchPhrase = 'LABOUR';
  if (searchPhrase.includes('CONTROL')) searchPhrase = 'ADK20044';
  // ********************************************

  let thisDescription = '';
  let thisRoom = '';
  let thisDepartment = '';
  allData.forEach((entry) => {
    thisRoom = entry['Room Num'];
    thisDescription = entry['Description'];
    thisDepartment = entry['Department'];
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
      html = formatLocationResult(resArr[0], resArr.length);
    } else {
      html = formatLocationResult(resArr[0], 1);
    }
  }
  displayBox(html);
}

// New helper function to format location results
function formatLocationResult(result, totalResults) {
  return `
    <ion-list>
      ${
        totalResults > 1
          ? `<ion-item><ion-note>Showing 1 result of ${totalResults}</ion-note></ion-item>`
          : ''
      }
      <ion-item>
        <ion-label>
          <h2>${result['Room Num']}</h2>
          <h3>${result['Description']}</h3>
          <p>${result['Department']}</p>
          <p>${result['Wing']}</p>
        </ion-label>
      </ion-item>
    </ion-list>`;
}

function createAllResults(resArr) {
  html = `
    <ion-list>
      <ion-item><ion-note>All Results (${resArr.length})</ion-note></ion-item>
      ${resArr
        .map(
          (entry) => `
        <ion-item>
          <ion-label>
            <h2>${entry['Room Num']}</h2>
            <h3>${entry['Description']}</h3>
            <p>${entry['Department']}</p>
            <p>${entry['Wing']}</p>
          </ion-label>
        </ion-item>
      `
        )
        .join('')}
    </ion-list>`;
  showAll = false;
  msgArea.innerHTML = html;
}

function displayAllNumbers(allNumbersToCall) {
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = `CALL ${theWard}`;
  let allAlerts = [];
  for (let area of promising) {
    allAlerts.push({
      text: `☎️ ${area} ${telNums[theWard][area][0]}`,
      id: 'ok-button',
      handler: () => {
        callNumber(telNums[theWard][area][0]);
      },
    });
    if (telNums[theWard][area][1]) {
      allAlerts.push({
        text: `☎️ ${area} ${telNums[theWard][area][1]}`,
        id: 'ok-button',
        handler: () => {
          callNumber(telNums[theWard][area][1]);
        },
      });
    }
    if (telNums[theWard][area][2]) {
      allAlerts.push({
        text: `☎️ ${area} ${telNums[theWard][area][2]}`,
        id: 'ok-button',
        handler: () => {
          callNumber(telNums[theWard][area][2]);
        },
      });
    }
    if (telNums[theWard][area][3]) {
      allAlerts.push({
        text: `☎️ ${area} ${telNums[theWard][area][3]}`,
        id: 'ok-button',
        handler: () => {
          callNumber(telNums[theWard][area][3]);
        },
      });
    }
  }
  allAlerts.push({
    text: '❌ CLOSE',
    id: 'close-button',
  });
  alert.message = '';
  alert.buttons = allAlerts;

  document.body.appendChild(alert);
  return alert.present();
}

function displayBox(html, numberToCall) {
  if (!firstUp) {
    firstUp = true;
    alertControl.message = `<div class="alert-message">${html}</div>`;
    alertControl.header = `☎️ UHCW Telecoms 🗺️`;
    alertControl.buttons = [
      {
        text: 'OK',
        id: 'ok-button', // handler: () => {
        //     console.log("Confirm Okay");
        // },
      },
    ];
    document.body.appendChild(alertControl);
    alertControl.present();
    return;
  }
  alertControl.message = html;

  if (roomSearch) {
    alertControl.cssClass = 'location-results-alert';
    alertControl.header = searchPhrase.toUpperCase();
    alertControl.message = html;
    alertControl.buttons = [
      {
        text: 'SHOW ALL',
        cssClass: 'secondary',
        id: 'show-all-button',
        handler: () => {
          showAll = true;
          createAllResults(resArr);
        },
      },
      {
        text: 'CLOSE',
        role: 'cancel',
        id: 'ok-button',
      },
    ];
    roomSearch = false;
    document.body.appendChild(alertControl);
    alertControl.present();
  }

  if (phoneSearch) {
    phoneSearch = false;
    displayAllNumbers(allNumbersToCall, promising);
  }
}

const clearFields = function () {
  phoneInput.value = '';
  roomInput.value = '';
};

function checkInput(searchPhrase) {
  if (
    searchPhrase == 'ED' ||
    searchPhrase == 'A AND E' ||
    searchPhrase == 'A&E'
  ) {
    searchPhrase = 'EMERGENCY';
  }
  return searchPhrase;
}

phoneConfirmBtn.addEventListener('click', () => {
  if (phoneInput.value) {
    searchPhrase = phoneInput.value;
    searchPhrase = searchPhrase.toUpperCase();
    phoneInput.value = '';
    clearFields();

    if (dataLoaded && searchPhrase) {
      phoneSearch = true;
      if (msgArea.innerHTML) msgArea.innerHTML = '';
      telephoneSearch(searchPhrase);
    }
  } else {
    alertControl.message = 'Enter a search term first';
    alertControl.header = 'No Input';
    alertControl.buttons = ['OK'];
    document.body.appendChild(alertControl);
    alertControl.present();
  }
});

roomConfirmBtn.addEventListener('click', () => {
  if (roomInput.value) {
    searchPhrase = roomInput.value;
    clearFields();
    resArr = [];
    if (msgArea.innerHTML) msgArea.innerHTML = '';
    roomSearch = true;
    showOutcome(searchPhrase);
  } else {
    alertControl.message = 'Enter a search term first';
    alertControl.header = 'No Input';
    alertControl.buttons = ['OK'];
    document.body.appendChild(alertControl);
    alertControl.present();
  }
});

phoneCancelBtn.addEventListener('click', () => {
  if (phoneInput.value) {
    clearFields();
  }
});

roomCancelBtn.addEventListener('click', () => {
  if (roomInput.value) {
    clearFields();
  }
});

function presentAlertPrompt() {
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = 'Prompt!';
  alert.inputs = [
    {
      placeholder: 'Placeholder 1',
    },
    {
      name: 'name2',
      id: 'name2-id',
      value: 'hello',
      placeholder: 'Placeholder 2',
    },
    // multiline input.
    {
      name: 'paragraph',
      id: 'paragraph',
      type: 'textarea',
      placeholder: 'Placeholder 3',
    },
    {
      name: 'name3',
      value: 'http://ionicframework.com',
      type: 'url',
      placeholder: 'Favorite site ever',
    },
    // input date with min & max
    {
      name: 'name4',
      type: 'date',
      min: '2017-03-01',
      max: '2018-01-12',
    },
    // input date without min nor max
    {
      name: 'name5',
      type: 'date',
    },
    {
      name: 'name6',
      type: 'number',
      min: -5,
      max: 10,
    },
    {
      name: 'name7',
      type: 'number',
    },
    {
      name: 'name8',
      type: 'password',
      placeholder: 'Advanced Attributes',
      cssClass: 'specialClass',
      attributes: {
        maxlength: 4,
        inputmode: 'decimal',
      },
    },
  ];
  alert.buttons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel');
      },
    },
    {
      text: 'Ok',
      handler: () => {
        console.log('Confirm Ok');
      },
    },
  ];

  document.body.appendChild(alert);
  return alert.present();
}

let firstUp = false;
if (!firstUp) firstRun();

// presentAlertPrompt();
