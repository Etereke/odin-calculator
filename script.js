const display = document.querySelector('.text');
const buttons = document.querySelectorAll('.buttons button');
let displayValue = "";
let leftValue = "0";
let operator = "";
let rightValue = "";
let overWriteLeft = false;
populateDisplay(displayValue);


//Event listeners for buttons and the keyboard
window.addEventListener('keydown', (e) => {
        let input = e.key === "Enter" ? "=" : e.key;
        //If input is a digit
        if(!isNaN(+input)){
            evaluateNumberInput(input);
        }
        else if(input === "c"){
            clearDisplay(input);
        }
        else if(input === "Backspace"){
            backspace();
        }
        else if(input === "."){
            addDecimalPoint();
        }
        else if(input === "+" || input === "-" || input === "*" || input === "/" || input === "="){
            evaluateOperatorInput(input);
        }

        populateDisplay();
});
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const input = e.target.textContent;

        //If input is a digit
        if(!isNaN(+input)){
            evaluateNumberInput(input);
        }
        else if(input === "C"){
            clearDisplay(input);
        }
        else if(input === "<-"){
            backspace();
        }
        else if(input === "."){
            addDecimalPoint();
        }
        else{
            evaluateOperatorInput(input);
        }

        populateDisplay();
    });
});


//Input evaluation functions
function evaluateNumberInput(digit){
    if(!operator){
        //When the last operation was '=', the left hand value is overwritten
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
    //'=' can only be the operator if we have a right-hand value, otherwise the operator stays what it was previously
    if(!rightValue){
        operator = op === "=" ? operator : op;
    }
    else if(op === "="){
        leftValue = operate(leftValue, rightValue, operator).toString();
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
function addDecimalPoint(){
    if(!operator){
        //We start from "0." if "." is the first input, or the first after the '=' operator
        if(!leftValue || overWriteLeft){
            leftValue = "0.";
            overWriteLeft = false;
        }
        else{
            leftValue = leftValue.includes(".") ? leftValue : leftValue + ".";
        }
    }
    else if(!rightValue){
        rightValue = "0.";
    }
    else{
        rightValue = rightValue.includes(".") ? rightValue : rightValue + ".";
    }
}
function backspace(){
    if(!operator){
        //We delete the whole text if the last input was '='
        if(!leftValue || overWriteLeft){
            leftValue = "0";
            overWriteLeft = false;
        }
        else{
            leftValue = leftValue.substring(0, leftValue.length - 1);
        }
    }
    else if(!rightValue){
        operator = "";
    }
    else{
        rightValue = rightValue.substring(0, rightValue.length - 1);
    }

}
function populateDisplay(){
    if(!operator || operator === "="){
        displayValue = `${+leftValue}`;
        if(leftValue.endsWith(".")) displayValue += ".";
    }
    else if(!rightValue){
        displayValue = `${+leftValue} ${operator}`;
    }
    else {
        displayValue = `${+leftValue} ${operator} ${rightValue}`;
    }
    display.textContent = displayValue;
}



//Base logic functions
//We convert them to number at this point
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