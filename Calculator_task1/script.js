const display = document.getElementById('display');
const inputDisplay = document.createElement('div');
inputDisplay.id = 'input';
display.appendChild(inputDisplay);
const resultDisplay = document.createElement('div');
resultDisplay.id = 'result';
display.appendChild(resultDisplay);
const buttons = document.querySelectorAll('button');
let currentInput = '';
let operator = '';
let firstOperand = '';
let lastResult = '';


resultDisplay.textContent = '0';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'clear') {
            currentInput = '';
            operator = '';
            firstOperand = '';
            inputDisplay.textContent = ''; 
            resultDisplay.textContent = '0'; 
        } else if (value === 'del') {
            currentInput = currentInput.slice(0, -1);
            inputDisplay.textContent = currentInput || '0'; 
            if (currentInput === '') resultDisplay.textContent = '0'; 
        } else if (value === 'ENTER') {
            if (operator && firstOperand !== '') {
                try {
                    currentInput = eval(firstOperand + operator + currentInput.replace('x', '*').replace('÷', '/'));
                    resultDisplay.textContent = currentInput;
                    lastResult = currentInput; 
                    operator = '';
                    firstOperand = '';
                    inputDisplay.textContent = ''; 
                } catch (error) {
                    resultDisplay.textContent = 'Error';
                }
            }
        } else if (value === '±') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) * -1).toString();
                inputDisplay.textContent = currentInput;
            }
        } else if (value === '√') {
            if (currentInput !== '') {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                inputDisplay.textContent = currentInput;
            }
        } else if (value === 'ans') {
            currentInput = lastResult; 
            inputDisplay.textContent = currentInput;
        } else if (['+', '-', 'x', '÷'].includes(value)) {
            if (currentInput !== '') {
                firstOperand = currentInput;
                operator = value.replace('x', '*').replace('÷', '/');
                currentInput = ''; 
                inputDisplay.textContent = firstOperand + ' ' + value; 
                resultDisplay.textContent = ''; 
            }
        } else {
            if (inputDisplay.textContent === '0' || inputDisplay.textContent === '') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            inputDisplay.textContent = firstOperand + ' ' + operator + ' ' + currentInput; 
            if (resultDisplay.textContent === '0') {
                resultDisplay.textContent = ''; 
            }
        }
    });
});
