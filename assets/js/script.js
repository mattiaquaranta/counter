"use strict";

const body = document.body;


// create main structure
const mainContainer = document.createElement("div");
mainContainer.className = "mainContainer";
body.prepend(mainContainer);

const resultContainer = document.createElement("div");
resultContainer.className = "resultContainer";
resultContainer.textContent = 'COUNTER';
mainContainer.append(resultContainer);

const buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttonsContainer";
mainContainer.append(buttonsContainer);

const settingsContainer = document.createElement("div");
settingsContainer.setAttribute("id", "settings-container");
settingsContainer.className = "settingsContainerHidden";
mainContainer.append(settingsContainer);


// create buttonsContainer section
const minusButton = document.createElement("button");
minusButton.setAttribute("title", "decreases result");
minusButton.className = "minusButton";
buttonsContainer.append(minusButton);

const plusButton = document.createElement("button");
plusButton.setAttribute("title", "increases result");
plusButton.className = "plusButton"
buttonsContainer.append(plusButton);

const randomButton = document.createElement("button");
randomButton.setAttribute("title", "generate random number");
randomButton.className = "randomButton"
buttonsContainer.append(randomButton);

const resetButton = document.createElement("button");
resetButton.setAttribute("title", "reset result");
resetButton.className = "resetButton"
buttonsContainer.append(resetButton);

const displaySettingsButton = document.createElement("button");
displaySettingsButton.setAttribute("id", "display-settings-button");
displaySettingsButton.setAttribute("title", "show settings");
displaySettingsButton.className = "displaySettingsButton";
buttonsContainer.append(displaySettingsButton);


// create settingsContainer section
const labelStartValue = document.createElement("label");
labelStartValue.setAttribute("for", "start-value");
labelStartValue.textContent = "start value";
settingsContainer.append(labelStartValue);

const startValue = document.createElement("input");
startValue.setAttribute("id", "start-value");
startValue.setAttribute("type", "number");
startValue.setAttribute("min", "-999999");
startValue.setAttribute("max", "999999");
startValue.setAttribute("value", "0");
settingsContainer.append(startValue);

const labelMinValue = document.createElement("label");
labelMinValue.setAttribute("for", "min-value");
labelMinValue.textContent = "min value";
settingsContainer.append(labelMinValue);

const minValue = document.createElement("input");
minValue.setAttribute("id", "min-value");
minValue.setAttribute("type", "number");
minValue.setAttribute("min", "-999999");
minValue.setAttribute("max", "999999");
minValue.setAttribute("value", "-999999");
settingsContainer.append(minValue);

const labelMaxValue = document.createElement("label");
labelMaxValue.setAttribute("for", "max-value");
labelMaxValue.textContent = "max value";
settingsContainer.append(labelMaxValue);

const maxValue = document.createElement("input");
maxValue.setAttribute("id", "max-value");
maxValue.setAttribute("type", "number");
maxValue.setAttribute("min", "-999999");
maxValue.setAttribute("max", "999999");
maxValue.setAttribute("value", "999999");
settingsContainer.append(maxValue);

const labelDecrementValue = document.createElement("label");
labelDecrementValue.setAttribute("for", "decrement-value");
labelDecrementValue.textContent = "decrease value";
settingsContainer.append(labelDecrementValue);

const decrementValue = document.createElement("input");
decrementValue.setAttribute("id", "decrement-value");
decrementValue.setAttribute("type", "number");
decrementValue.setAttribute("min", "1");
decrementValue.setAttribute("max", "999999");
decrementValue.setAttribute("value", "1");
settingsContainer.append(decrementValue);

const labelIncrementValue = document.createElement("label");
labelIncrementValue.setAttribute("for", "increment-value");
labelIncrementValue.textContent = "increment value";
settingsContainer.append(labelIncrementValue);

const incrementValue = document.createElement("input");
incrementValue.setAttribute("id", "increment-value");
incrementValue.setAttribute("type", "number");
incrementValue.setAttribute("min", "1");
incrementValue.setAttribute("max", "999999");
incrementValue.setAttribute("value", "1");
settingsContainer.append(incrementValue);

const resetSettingsButtonContainer = document.createElement("div");
resetSettingsButtonContainer.className = "resetSettingsButtonContainer";
settingsContainer.append(resetSettingsButtonContainer);

const resetSettingsButton = document.createElement("button");
resetSettingsButton.setAttribute("title", "reset settings");
resetSettingsButton.className = "resetSettingsButton";
resetSettingsButton.textContent = "reset settings";
resetSettingsButtonContainer.append(resetSettingsButton);


// add listeners
minusButton.addEventListener("click", decreaseResult);
plusButton.addEventListener("click", increaseResult);
randomButton.addEventListener("click", randomNumber);
resetButton.addEventListener("click", resetResult);
body.addEventListener("keydown", logKey);
startValue.addEventListener("change", checkValue);
minValue.addEventListener("change", checkValue);
maxValue.addEventListener("change", checkValue);
decrementValue.addEventListener("change", checkValue);
incrementValue.addEventListener("change", checkValue);
resetSettingsButton.addEventListener("click", resetSettings);
displaySettingsButton.addEventListener("click", setVisibilitySettings);

// dblclick preventDefault
const buttons = document.querySelectorAll("button");
for (let btn of buttons) {
    btn.addEventListener("dblclick", e => {
        e.preventDefault();
    })
}


let result = Number(document.querySelector("#start-value").value);


// create functions
function decreaseResult() {
    let minValue = Number(document.querySelector("#min-value").value);
    let decrementValue = Number(document.querySelector("#decrement-value").value);
    if (result > minValue) {
        if (result - decrementValue < minValue){
            result = minValue;
        } else {
            result = result - decrementValue;
        }
        resultContainer.textContent = result;
    }  
}

function increaseResult() {
    let maxValue = Number(document.querySelector("#max-value").value);
    let incrementValue = Number(document.querySelector("#increment-value").value);
    if (result < maxValue) {
        if (result + incrementValue > maxValue){
            result = maxValue;
        } else {
            result = result + incrementValue;
        }
        resultContainer.textContent = result;
    }
}

function randomNumber() {
    let minValue = Number(document.querySelector("#min-value").value);
    let maxValue = Number(document.querySelector("#max-value").value);
    result = Math.floor(Math.random() * (maxValue - minValue) + minValue);
    resultContainer.textContent = result;
}

function resetResult() {
    result = Number(document.querySelector("#start-value").value);
    resultContainer.textContent = result;
}

function logKey(e) {
    // disable logKey if setting container is enable
        if (document.querySelector("#settings-container").classList.contains("settingsContainerHidden")) {
            if (e.code == 'ArrowUp' || e.code == 'NumpadAdd')
                increaseResult();
            else if (e.code == 'ArrowDown' || e.code == 'NumpadSubtract')
                decreaseResult();
        }
}

function checkValue(target) {
    if (target.currentTarget.value == "" || Number(target.currentTarget.value) < Number(target.currentTarget.min) || Number(target.currentTarget.value) > Number(target.currentTarget.max)){
        target.currentTarget.value = target.currentTarget.defaultValue;
    }

    // if min value > max value, switch value
    if (target.currentTarget.id == "min-value") {
        if (Number(target.currentTarget.value) > Number(document.querySelector("#max-value").value)){
            let maxValueTemp = target.currentTarget.value
            target.currentTarget.value = document.querySelector("#max-value").value;
            document.querySelector("#max-value").value = maxValueTemp;
        }
    }

    // if max value < min value, switch value
    if (target.currentTarget.id == "max-value") {
        if (Number(target.currentTarget.value) < Number(document.querySelector("#min-value").value)){
            let minValueTemp = target.currentTarget.value
            target.currentTarget.value = document.querySelector("#min-value").value;
            document.querySelector("#min-value").value = minValueTemp;
        }
    }

    // if the initial value has been changed, update result
    if (target.currentTarget.id == "start-value"){
        result = Number(document.querySelector("#start-value").value);
        resultContainer.textContent = result;
    }
}

function resetSettings() {
    let inputSettings = document.querySelectorAll("input");
    inputSettings.forEach((element) => element.value = element.getAttribute("value"))
}

function setVisibilitySettings() {
    if (document.querySelector("#settings-container").classList.contains("settingsContainerHidden")) {
        document.querySelector("#settings-container").classList.remove("settingsContainerHidden");
        document.querySelector("#settings-container").classList.add("settingsContainer");
        document.querySelector("#display-settings-button").setAttribute("title", "hide settings");               
        document.querySelector("#display-settings-button").classList.remove("displaySettingsButton");
        document.querySelector("#display-settings-button").classList.add("displaySettingsButtonOn"); 
    } else if (document.querySelector("#settings-container").classList.contains("settingsContainer")) {
        document.querySelector("#settings-container").classList.remove("settingsContainer");
        document.querySelector("#settings-container").classList.add("settingsContainerHidden");
        document.querySelector("#display-settings-button").setAttribute("title", "show settings");            
        document.querySelector("#display-settings-button").classList.remove("displaySettingsButtonOn");       
        document.querySelector("#display-settings-button").classList.add("displaySettingsButton");     
    }
}