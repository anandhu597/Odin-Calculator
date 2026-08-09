🧮 Calculator

A responsive calculator built with HTML, CSS, and JavaScript.

This project was created as the final project of The Odin Project's Foundations course, to practice JavaScript fundamentals and build a fully functional calculator without using `eval()`.

## 🔗 Live Demo https://anandhu597.github.io/Odin-Calculator/

[Add your deployed link here]

## ✨ Features

- Basic arithmetic operations
  - Addition, subtraction, multiplication, and division
- Chained calculations (e.g. `12 + 7 - 1 =`)
- Decimal number support, with a guard against entering more than one `.`
- Clear and backspace buttons
- Division-by-zero handled with a message instead of crashing
- Long decimal results are rounded so they don't overflow the display
- Keyboard support (numbers, operators, Enter, Backspace, Escape)
- Visual feedback flash on button press, for both mouse and keyboard input

## 🛠️ Technologies

- HTML5
- CSS3 (Flexbox)
- JavaScript (vanilla, no `eval()`)

## 📚 What I Practiced

While building this project, I practiced:

- DOM selection and manipulation
- `addEventListener`
- Writing and organizing multiple JavaScript functions
- `if / else if / else` conditions
- Template literals
- Keyboard events with `keydown`
- Tracking application state across multiple variables
- Debugging by tracing through code step by step
- Responsive layout with Flexbox

## 🎯 Main JavaScript Concepts

The calculator separates its logic into different functions, including:

- `add()`, `subtract()`, `multiply()`, `divide()` — the core math operations
- `operate()` — calls the correct operation based on the selected operator
- `calculate()` — runs the pending operation and updates the display
- `isDividingByZero()` — guards against dividing by zero
- `hasCompleteInput()` — checks that a full operation is ready to run
- `addVisualFeedback()` — flashes a button when pressed

Also involved restructuring the HTML into grouped sections (`.digits`, `.digit-row`, `.operators`) so the Flexbox layout could align the button grid correctly, including a taller operators column matched to the digit grid's height.

## 📁 Project Structure

```
Calculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run

No installation or external dependencies are required.
Simply open `index.html` in a browser.

## 🔮 Future Improvements

Possible future improvements:

- Calculation history
- Dark mode toggle
- Percentage calculations
- Improve accessibility

## 👩‍💻 Author

Built as a JavaScript practice project for The Odin Project.
