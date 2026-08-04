// Core math operations

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

// DOM references

const digitBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equals");

// State

let currentInput = ""; // number currently being typed
let firstNbr = ""; // first number of the current operation
let currentOp = ""; // selected operator
let result = ""; // most recent calculated result

let justCalculated = true;

// Digit buttons

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    if (justCalculated === false) {
      currentInput = digitBtn.dataset.number;
      display.textContent = currentInput;
      justCalculated = true;
    } else {
      currentInput += digitBtn.dataset.number;
      display.textContent = currentInput;
    }
  });
});

// Clear button

clearBtn.addEventListener("click", () => {
  currentInput = "";
  firstNbr = "";
  currentOp = "";
  result = "";
  display.textContent = 0;
  justCalculated = true;
});

// Operator buttons
// If an operator is already pending, evaluate it first (chaining support)
// before switching to the newly clicked operator.

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    if (justCalculated === false) {
      currentOp = operatorBtn.dataset.operator;
      firstNbr = currentInput;
      currentInput = "";
      display.textContent = 0;
    } else if (currentOp !== "") {
      if (isDividingByZero(currentOp, currentInput)) {
        dividingByZeroCase();
      } else if (hasCompleteInput(currentOp, firstNbr, currentInput)) {
        calculate();
        firstNbr = result;
        currentInput = "";
        currentOp = operatorBtn.dataset.operator;
      }
      currentOp = operatorBtn.dataset.operator;
    } else {
      firstNbr = currentInput;
      currentOp = operatorBtn.dataset.operator;
      currentInput = "";
      display.textContent = 0;
    }
  });
});

// Equals button

equalBtn.addEventListener("click", () => {
  if (isDividingByZero(currentOp, currentInput)) {
    dividingByZeroCase();
  } else if (hasCompleteInput(currentOp, firstNbr, currentInput)) {
    calculate();
  }
});

// Helpers

function isDividingByZero(op, input) {
  return op === "/" && input === "0";
}

function hasCompleteInput(op, first, input) {
  return op !== "" && first !== "" && input !== "";
}

function dividingByZeroCase() {
  display.textContent = "Nope 🚫";
  currentInput = "";
  firstNbr = "";
  currentOp = "";
  result = "";
}

function calculate() {
  result = operate(currentOp, Number(firstNbr), Number(currentInput));
  result = Number(result.toFixed(8));
  display.textContent = result;
  currentInput = String(result);
  justCalculated = false;
}
