
let displayCalculate = document.querySelector(".calculate");
let displayResult = document.querySelector(".result");
const valueButtons = document.querySelectorAll(".operand");
const operatorsButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".operate");
const clearButton = document.querySelector(".clear");
const clearEntryButton = document.querySelector(".clear-entry");
const pointButton = document.querySelector(".point");
const toggleButton = document.querySelector(".toggle");


let firstOperand = '';
let secondOperand = '';
let currentOperation = undefined;
let operationResult = null;

function IterateThroughValues(){
valueButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(currentOperation === undefined){
        AddFirstNumber(button.innerText);
        updateDisplay();
        }else{
        AddSecondNumber(button.innerText);
        updateDisplay();
        }
        
    })
    AddNumbersByKey(button)
})
}
function AddNumbersByKey(button) {
    document.addEventListener('keydown', function(event) {
        if(currentOperation === undefined){
        if(event.key === button.innerText) {
            AddFirstNumber(button.innerText);
            updateDisplay();
        }
    }else {
        if(event.key === button.innerText){
        AddSecondNumber(button.innerText);
        updateDisplay();
        }
        }
    });

}
function DeleteCurrentDigitByKey(){
document.addEventListener("keydown", (event) => {
    if(event.key === "Backspace"){
        if(firstOperand !== '' && currentOperation === undefined && secondOperand === ''){
            firstOperand = firstOperand.slice(0, -1).toString();
        }
        if(firstOperand !== '' && currentOperation !== undefined && secondOperand === ''){
            currentOperation = '';
            currentOperation = undefined;
        }
        if(firstOperand !== '' && currentOperation !== undefined && secondOperand !== ''){
            secondOperand = secondOperand.slice(0, -1).toString();
        }
        updateDisplay();
    }
})
}
function ClearEntry() {
    clearEntryButton.addEventListener("click", () => {
            if(firstOperand !== '' && currentOperation === undefined && secondOperand === ''){
                if(firstOperand.includes("-")  && firstOperand.length === 2){
                    firstOperand = firstOperand.replace("-", "");
                }
                firstOperand = firstOperand.slice(0, -1).toString();
            }
            if(firstOperand !== '' && currentOperation !== undefined && secondOperand === ''){
                currentOperation = '';
                currentOperation = undefined;
            }
            if(firstOperand !== '' && currentOperation !== undefined && secondOperand !== ''){
                if(secondOperand.includes("-") && secondOperand.length === 2){
                    secondOperand = secondOperand.replace("-", "");
                }
                secondOperand = secondOperand.slice(0, -1).toString();
            }
            updateDisplay();
        })
}
function ClearByKey() {
document.addEventListener("keydown", (event) => {
    if(event.key === "Delete"){
        Clear();
    }
})
}

function setOperator(operator){
    currentOperation = operator.toString();
}

function IterateThroughOperators() {
operatorsButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        if(firstOperand !== ''){
        setOperator(operator.innerText);
        updateDisplay();
        }
    })
    document.addEventListener('keydown', function(event) {
        if(firstOperand !== ''){
           
        if(event.key === operator.innerText) {
            setOperator(operator.innerText);
            updateDisplay();
        }
    }
    })
    
})
}
function TypeCurrentNegativeOrPositiveNumber(){
    document.addEventListener("keydown", (event) => {
        if(event.key === "y"){
            if(currentOperation === undefined){
                if(firstOperand.includes("-")){
                    firstOperand = firstOperand.toString().replace("-", "");
                    updateDisplay();
                }else if(!firstOperand.includes("-") && firstOperand !== "")
                {
                firstOperand = "-" + firstOperand.toString();
                updateDisplay();
                }
            }else {
                if(secondOperand.includes("-")){
                    secondOperand = secondOperand.toString().replace("-", "");
                    updateDisplay();
                }else if(!secondOperand.includes("-") && secondOperand !== "")
                {
                secondOperand = "" + "-" + secondOperand.toString();
                updateDisplay();
                }
            }
        }

})

toggleButton.addEventListener("click", () => {
    if(currentOperation === undefined){
    if(firstOperand.includes("-")){
        firstOperand = firstOperand.toString().replace("-", "");
        updateDisplay();
    }else if(!firstOperand.includes("-") && firstOperand !== "")
    {
    firstOperand = "-" + firstOperand.toString();
    updateDisplay();
    }
}else {
    if(secondOperand.includes("-")){
        secondOperand = secondOperand.toString().replace("-", "");
        updateDisplay();
    }else if(!secondOperand.includes("-") && secondOperand !== "")
    {
    secondOperand = "" + "-" + secondOperand.toString();
    updateDisplay();
    }
}
})
}
function ClearEverythingButton(){
    clearButton.addEventListener('click', Clear);
}

function AddFirstNumber(number) {
    if(number === "." && firstOperand.includes(".")){
        return;
    }
    if(number === "." && firstOperand === "."){
        firstOperand = 0;
    }
     
    firstOperand = firstOperand.toString() + number.toString();
}
function AddSecondNumber(number) {
    if(number === "." && secondOperand.includes(".")){
        return;
    }
    
    secondOperand = secondOperand.toString() + number.toString();
}
function Clear() {
    firstOperand = '';
    secondOperand = '';
    currentOperation = undefined;
    operationResult = null;
    displayResult.innerText = "";
    updateDisplay();
}
function Evaluate() {
    equalButton.addEventListener("click", () => {
        if(firstOperand !== '' && secondOperand !== '' && currentOperation !== undefined){
            if(Number(secondOperand.substring(0, secondOperand.length)) === 0){
                secondOperand = "0";
            }
            if(currentOperation === "/" && secondOperand === "0"){
                alert("You can't divide it by 0 dumbass!");
                Clear();
                return;
            }
            if(currentOperation === "%" && secondOperand === "0"){
                alert("You can't divide it by 0 dumbass!");
                Clear();
                return;
            }
            if(firstOperand === "."){
                firstOperand = 0;
            }
            if(secondOperand === "."){
                secondOperand = 0;
            }
          
            operationResult = Operate(currentOperation, firstOperand, secondOperand);
            if(firstOperand.indexOf(".") === 0 && firstOperand.length > 1){
                firstOperand = "0" + firstOperand.toString();
            }
            if(secondOperand.indexOf(".") === 0 && secondOperand.length > 1){
                secondOperand = "0" + secondOperand.toString();
            }
            
            updateDisplay();
            firstOperand = operationResult.toString();
            if(firstOperand === "0"){
                firstOperand = "";
                //if the first operand is zero, change it to empty
                //because we don't want the next values to be like "0875" with zero on the first position
            }
            secondOperand = '';
            currentOperation = undefined;
            operationResult = null;
        }
    })
    
    document.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
        if(firstOperand !== '' && secondOperand !== '' && currentOperation !== undefined){
            if(Number(secondOperand.substring(0, secondOperand.length)) === 0){
                secondOperand = "0";
            }
            if(currentOperation === "/" && secondOperand === "0"){
                alert("You can't divide it by 0 dumbass!");
                Clear();
                return;
            }
            if(currentOperation === "%" && secondOperand === "0"){
                alert("You can't divide it by 0 dumbass!");
                Clear();
                return;
            }
            if(firstOperand === "."){
                firstOperand = 0;
            }
            if(secondOperand === "."){
                secondOperand = 0;
            }
            operationResult = Operate(currentOperation, firstOperand, secondOperand);
            // if(operationResult.toString().includes(".")){
            // operationResult = (Math.round(operationResult * 100) / 100).toFixed(2);
            // }
            updateDisplay();
            firstOperand = operationResult.toString();
            secondOperand = '';
            currentOperation = undefined;
            operationResult = null;
            
        }
    }
    })
}
//daca am toate 3 valide si apas pe un operator, sa se efectueze operatia, sa dea rezultatul si sa afiseze rezultatul urmat
//de acel operator
function updateDisplay() {
    displayCalculate.innerText = firstOperand;
    if(currentOperation !== undefined){
        if(firstOperand.toString().charAt(firstOperand.length - 1) === "." && firstOperand.indexOf(".") !== 0){
            firstOperand = firstOperand.replace(".", "")
        }
        if((secondOperand.toString().charAt(secondOperand.length - 1) === ".") && operationResult !== null){
            secondOperand = secondOperand.replace(".", "")
        }
        displayCalculate.innerText = firstOperand + "" + currentOperation + "" + secondOperand;
    }
    if(operationResult !== null){
        displayResult.innerText = operationResult.toString();
    }
    if(operationResult === null){
        displayResult.innerText = "";
    }
    
    let totalLength = firstOperand.length + secondOperand.length;
    let totalResultLength = displayResult.innerText.length;
    IgnoreOverflow(totalLength, displayCalculate, totalResultLength, displayResult);
}
function IgnoreOverflow(totalLength, displayText, resultLength, resultDisplay) {
    
    if(totalLength >= 17){
        displayText.style.fontSize = "25px";
    }
    if(totalLength >= 54)
    {
        displayText.style.fontSize = "20px";
    }
    if(totalLength >= 70)
    {
        displayText.style.fontSize = "15px";
    }
    if(totalLength < 17)
    {
        displayText.style.fontSize = "39px";
    }

    if(resultLength >= 17){
        resultDisplay.style.fontSize = "25px";
    }
    if(resultLength >= 54)
    {
        resultDisplay.style.fontSize = "20px";
    }
    if(resultLength >= 70)
    {
        resultDisplay.style.fontSize = "15px";
    }
    if(resultLength < 17)
    {
        resultDisplay.style.fontSize = "39px";
    }
}
function Add(a, b) {
return a + b;
}
function Modulo(a, b){
    return a % b;
}
function Subtract(a, b) {
    return a - b;
}

function Multiply(a, b) {
return a * b;
}
function Divide(a, b) {
return a/b;
}
function Operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator){
    case "+":
        return Add(a, b);
    case "-":
        return Subtract(a, b);
    case "x":
        return Multiply(a, b);
    case "%":
        return Modulo(a, b);
    case "/":
        if(b === 0){
            return null;
        }else
        return Divide(a, b);
    default: return null;
}
}
Evaluate();
DeleteCurrentDigitByKey();
ClearByKey();
IterateThroughOperators();
TypeCurrentNegativeOrPositiveNumber();
ClearEverythingButton();
IterateThroughValues();
ClearEntry();
IgnoreOverflow();

// .3 + .3 +> 0.3 + 0.3 




