
let displayCalculate = document.querySelector(".calculate");
const values = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".operate");
const clear = document.querySelector(".clear");


let displayResult = document.querySelector(".result");
let firstNumberAdded = false;
displayResult.textContent = 0;
displayCalculate.textContent = 0;
let firstNumber = 0;
let firstNumberArray = [];
let secondNumber = 0;
let secondNumberArray = [];
function getFirstNumber(){
    //Iterate over the values
for(let i = 0; i < values.length; i++){
    //on click digit, add to the array and turn it into string
    values[i].addEventListener('click', () => {
        //if the first digit is zero, update to zero
            if(firstNumberArray[0] === "0"){
                displayResult.textContent = 0;
                firstNumber = 0;
                firstNumberArray = [];
            }
            if(!firstNumberAdded){
                //if firstNumber is not added yet, add now and return it
            firstNumberArray.push(values[i].textContent);
            displayResult.textContent = firstNumberArray.toString().replaceAll(",", "");
            firstNumber = Number(displayResult.textContent);
            return firstNumber;
            }
          
    })
}
}
function getSecondNumber(){
for(let i = 0; i < values.length; i++){
    values[i].addEventListener('click', () => {
            if(secondNumberArray[0] === "0"){
                displayResult.textContent = 0;
                secondNumber = 0;
                secondNumberArray = [];
            }
            secondNumberArray.push(values[i].textContent);
            displayResult.textContent = secondNumberArray.toString().replaceAll(",", "");
            secondNumber = Number(displayResult.textContent);
            return secondNumber;
            
    })
}
}

getFirstNumber();

function Operators() {
for(let i = 0; i < operators.length;i++){
    operators[i].addEventListener('click', () => {
        if(firstNumber !== 0 && operators[i].textContent === "+"){
            displayCalculate.textContent = firstNumber + "+"; //12+
            displayResult.textContent = 0;
            firstNumberAdded = true;
            getSecondNumber(); //1
            equal.addEventListener("click", () => {
            displayCalculate.textContent = displayCalculate.textContent + secondNumber + "=";
            displayResult.textContent = Operate(Add,firstNumber, secondNumber);
            console.log(firstNumber, secondNumber);
            
            })
            
        }
    })
}
}
Operators();
clear.addEventListener("click", () => {
    displayResult.textContent = 0;
    displayCalculate.textContent = 0;
    firstNumber = 0;
    secondNumber = 0;
    secondNumberArray = 0;
    firstNumberArray = [];
})


function Add(a, b) {
return a + b;
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
return operator(a, b);
}

//console.log(Operate(Add, 2, 3))

