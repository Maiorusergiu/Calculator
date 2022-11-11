
let displayCalculate = document.querySelector(".calculate");
let displayResult = document.querySelector(".result");
const valueButtons = document.querySelectorAll(".operand");
const operatorsButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".operate");
const clearButton = document.querySelector(".clear");
const pointButton = document.querySelector(".point");


let firstOperand = '';
let secondOperand = '';
let currentOperation = undefined;
let operationResult = null;

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
})
operatorsButtons.forEach(operator => {
    operator.addEventListener('click', () => {
        if(firstOperand !== ''){
        setOperator(operator.innerText);
        updateDisplay();
        }
    })
})


function setOperator(operator){
    currentOperation = operator.toString();
}
clearButton.addEventListener('click', Clear);
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
    displayResult.innerText = "0";
    updateDisplay();
}
function Evaluate() {
    equalButton.addEventListener("click", () => {
        if(firstOperand !== '' && secondOperand !== '' && currentOperation !== undefined){
            if(currentOperation === "÷" && secondOperand === "0"){
                alert("You can't divide it by 0!");
                Clear();
            }
            if(firstOperand === "."){
                firstOperand = 0;
            }
            if(secondOperand === "."){
                secondOperand = 0;
            }
            operationResult = Operate(currentOperation, firstOperand, secondOperand);
            if(operationResult.toString().includes(".")){
            operationResult = (Math.round(operationResult * 100) / 100).toFixed(2);
            }
            updateDisplay();
            firstOperand = operationResult.toString();
            secondOperand = '';
            currentOperation = undefined;
            
            
        }
    })
   
}

function updateDisplay() {
    displayCalculate.innerText = firstOperand;
    if(currentOperation !== undefined){
        displayCalculate.innerText = firstOperand + "" + currentOperation + "" + secondOperand;
    }
    if(operationResult !== null){
        displayResult.innerText = operationResult.toString();
    }

}
Evaluate();
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
    case "÷":
        if(b === 0){
            return null;
        }else
        return Divide(a, b);
    default: return null;
}
}
//console.log(Operate(Add, 2, 3))

