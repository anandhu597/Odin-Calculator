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
const backSpBtn = document.querySelector(".backspace");

// ===== State =====

let currentInput = ""; // number currently being typed
let firstNbr = ""; // first number of the current operation
let currentOp = ""; // selected operator
let result = ""; // most recent calculated result
let justCalculated = true; // true right after "=", until the next digit press

// ===== Digit buttons (includes the decimal point) =====
// Handles four cases, checked in order:
//   1. "." pressed with nothing typed yet -> start a fresh "0."
//   2. "." pressed when the number already has one -> ignored
//   3. any digit pressed right after "=" -> starts a new number,
//      replacing the old result instead of appending to it
//   4. otherwise -> append normally

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    const digit = digitBtn.dataset.number;

    if (digit === "." && currentInput === "") {
      currentInput = "0.";
      display.textContent = currentInput;
      justCalculated = true;
    } else if (currentInput.includes(".") && digit === ".") {
      // duplicate decimal point, ignore
    } else if (justCalculated === false) {
      currentInput = digit === "." ? "0." : digit;
      display.textContent = currentInput;
      justCalculated = true;
    } else {
      currentInput += digit;
      display.textContent = currentInput;
    }
  });
});

// ===== Clear button =====
// Resets all calculator state back to its starting point.

clearBtn.addEventListener("click", () => {
  currentInput = "";
  firstNbr = "";
  currentOp = "";
  result = "";
  display.textContent = 0;
  justCalculated = true;
});

// ===== Operator buttons =====
// Three cases, checked in order:
//   1. right after "=" -> just swap to the new operator, no recalculation
//   2. mid-chain (e.g. 12 + 7 -) -> evaluate the pending operation first,
//      then continue with the new operator
//   3. first operator of a fresh calculation -> simple setup

operatorBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    const newOp = operatorBtn.dataset.operator;

    if (justCalculated === false) {
      currentOp = newOp;
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
      }
      currentOp = newOp;
    } else {
      firstNbr = currentInput;
      currentOp = newOp;
      currentInput = "";
      display.textContent = 0;
    }
  });
});

// ===== Equals button =====

equalBtn.addEventListener("click", () => {
  if (isDividingByZero(currentOp, currentInput)) {
    dividingByZeroCase();
  } else if (hasCompleteInput(currentOp, firstNbr, currentInput)) {
    calculate();
  }
});

// ===== Backspace button =====
// Removes the last character of currentInput. Falls back to "0" on
// the display once everything has been removed.

backSpBtn.addEventListener("click", () => {
  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput === "" ? "0" : currentInput;
  } else {
    display.textContent = "0";
  }
});

// ===== Keyboard support =====
// Maps keys to the matching button and simulates a real click, so all
// the logic above runs exactly the same way as a mouse click would.

document.addEventListener("keyup", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    const matchingBtn = document.querySelector(`[data-number="${key}"]`);
    matchingBtn.click();
    addVisualFeedback(matchingBtn);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    const matchingBtn = document.querySelector(`[data-operator="${key}"]`);
    matchingBtn.click();
    addVisualFeedback(matchingBtn);
  } else if (key === "Enter") {
    equalBtn.click();
    addVisualFeedback(equalBtn);
  } else if (key === "Backspace") {
    backSpBtn.click();
    addVisualFeedback(backSpBtn);
  } else if (key === "Escape") {
    clearBtn.click();
    addVisualFeedback(clearBtn);
  } else if (key === ".") {
    const matchingBtn = document.querySelector(`[data-number="."]`);
    matchingBtn.click();
    addVisualFeedback(matchingBtn);
  }
});

// Briefly flashes a button, so keyboard presses get the same visual
// response as an actual click.
function addVisualFeedback(matchingButton) {
  matchingButton.classList.add("active");
  setTimeout(() => matchingButton.classList.remove("active"), 100);
}

// ===== Helpers =====

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
  currentOp = "";
}
