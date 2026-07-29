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
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");

// ===== State =====

// Holds the number currently being typed, as a string (so digits can
// be appended one at a time without floating point issues).
let currentInput = "";

// ===== Digit buttons =====
// Each click appends its digit to currentInput and refreshes the display.

digitBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", () => {
    currentInput += digitBtn.dataset.number;
    display.textContent = currentInput;
  });
});

// ===== Clear button =====
// Resets both the display and the stored input back to empty.

clearBtn.addEventListener("click", () => {
  currentInput = "";
  display.textContent = 0;
});
