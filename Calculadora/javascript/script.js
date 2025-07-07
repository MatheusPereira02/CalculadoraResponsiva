        const display = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let operator = null;
let resetNext = false;


function updateDisplay() {
  display.textContent = currentInput;
}

function clearAll() {
  currentInput = '0';
  previousInput = null;
  operator = null;
  resetNext = false;
}

function backspace() {
  if (resetNext) return;
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
}

function appendNumber(num) {
  if (resetNext) {
    currentInput = '0';
    resetNext = false;
  }
  if (num === '.' && currentInput.includes('.')) return;

  currentInput = currentInput === '0' && num !== '.' ? num : currentInput + num;
}

function chooseOperator(op) {
  if (operator !== null) {
    calculate();
  }
  previousInput = currentInput;
  operator = op;
  resetNext = true;
}

function calculate() {
  if (operator === null || resetNext) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case 'add': result = prev + current; break;
    case 'subtract': result = prev - current; break;
    case 'multiply': result = prev * current; break;
    case 'divide':
      if (current === 0) {
        alert("Erro: divisão por zero");
        clearAll();
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    case 'percent': result = prev * (current / 100); break;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = null;
  resetNext = true;
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      appendNumber(number);
      updateDisplay();
      return;
    }

    if (action !== undefined) {
      switch (action) {
        case 'clear':
          clearAll();
          updateDisplay();
          break;
        case 'backspace':
          backspace();
          updateDisplay();
          break;
        case 'percent':
          if (previousInput !== null) {
            calculate();
            operator = 'percent';
            previousInput = currentInput;
            resetNext = true;
          } else {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay();
          }
          break;
        case 'divide':
        case 'multiply':
        case 'subtract':
        case 'add':
          chooseOperator(action);
          break;
        case 'equals':
          calculate();
          updateDisplay();
          break;
      }
    }
  });
});

updateDisplay();

                       