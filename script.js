const display = document.querySelector('.text');
const buttons = document.querySelectorAll('.buttons button');
// const numberButtons = document.querySelectorAll('.num-btn');
// const OperatorButtons = document.querySelectorAll('.op-btn');
// const clearButton = document.querySelector('.cl-btn');
let displayValue = "";
let leftValue = "0";
let operator = "";
let rightValue = "";
let overWriteLeft = false;
populateDisplay(displayValue);

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const input = e.target.textContent;
        console.log(input);
        if(!isNaN(+input)){
            evaluateNumberInput(input);
        }
        else if(input === "C"){
            clearDisplay(input);
        }
        else{
            evaluateOperatorInput(input);
        }
        populateDisplay();
    });
});

function evaluateNumberInput(digit){
    if(!operator){
        if(overWriteLeft){
            overWriteLeft = false;
            leftValue = "0";
        }
        leftValue += digit;
    }
    else{
        rightValue += digit;
    }
}

function evaluateOperatorInput(op){
    
    if(!rightValue){
        operator = op === "=" ? operator : op;
    }
    else if(op === "="){
        leftValue = operate(leftValue, rightValue, operator);
        operator = "";
        rightValue = "";
        overWriteLeft = true;
    }
    else{
        leftValue = operate(leftValue, rightValue, operator);
        operator = op;
        rightValue = "";
    }
}

function clearDisplay(){
    leftValue = "0";
    operator = "";
    rightValue = "";
}

function populateDisplay(){
    if(!operator || operator === "="){
        displayValue = `${+leftValue}`;
    }
    else if(!rightValue){
        displayValue = `${+leftValue} ${operator}`;
    }
    else {
        displayValue = `${+leftValue} ${operator} ${rightValue}`;
    }
    display.textContent = displayValue;
}

function add(a, b){
    return +a + +b;
}

function subtract(a, b){
    return +a - +b;
}

function multiply(a, b){
    return +a * +b;
}

function divide(a, b){
    return +a / +b;
}

function operate(a, b, op){
    let result;
    switch(op){
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        default:
            result = "invalid operator";
    }
    return result;
}

