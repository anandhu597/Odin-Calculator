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

let result = operate("+", 5, 6);
console.log(result);
result = operate("-", 5, 6);
console.log(result);
result = operate("*", 5, 6);
console.log(result);
result = operate("/", 5, 6);
console.log(result);
result = operate("+", 5, 6);
console.log(result);

result = operate("+", 3, 5); // → 8
console.log(result);
result = operate("-", 10, 4); // → 6

console.log(result);

result = operate("*", 6, 7); //→ 42
console.log(result);

result = operate("/", 20, 4); //→ 5
console.log(result);
result = operate("/", 5, 0);
console.log(result);
