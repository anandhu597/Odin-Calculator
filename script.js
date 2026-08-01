// ===== Core math operations =====

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

// Takes an operator symbol and two numbers, runs the matching operation.
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

// ===== DOM references =====

const digitBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equals");

// ===== State =====

// The number currently being typed, built up as a string one digit at a time.
let currentInput = "";

// The first number in the current operation (set when an operator is clicked).
let firstNbr = "";

// The operator selected for the current operation (e.g. "+", "-", "*", "/").
let currentOp = "";

// The result of the most recent calculation.
let result = "";

// ===== Digit buttons =====
// Each click appends its digit onto currentInput and refreshes the display.

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    currentInput += digitBtn.dataset.number;
    display.textContent = currentInput;
  });
});

// ===== Clear button =====
// Resets all calculator state back to its starting point.

clearBtn.addEventListener("click", () => {
  currentInput = "";
  display.textContent = 0;
});

// ===== Operator buttons =====
// Stores the current input as the first number and the selected operator,
// then resets currentInput so the next digits typed become the second number.
//
// currentInput is always kept up to date (including after "=", see below),
// so this same logic works whether the user is starting a fresh calculation
// or chaining onto a previous result.

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    firstNbr = currentInput;
    currentOp = operatorBtn.dataset.operator;
    currentInput = "";
    display.textContent = 0;
  });
});

// ===== Equals button =====
// Runs the stored operation and displays the result. currentInput is synced
// to the result afterward, so it can be used as the first number if the
// user chains another operation (e.g. presses an operator again next).

equalBtn.addEventListener("click", () => {
  result = operate(currentOp, Number(firstNbr), Number(currentInput));
  display.textContent = result;
  currentInput = String(result);
});
