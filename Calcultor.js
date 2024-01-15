document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = '';
    let firstOperand = null;
    let waitingForSecondOperand = false;

    const updateDisplay = () => {
        display.textContent = currentInput;
    };

    const inputDigit = (digit) => {
        if (waitingForSecondOperand) {
            currentInput = digit;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
    };

    const inputDecimal = () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    };

    const handleOperator = (nextOperator) => {
        const inputValue = parseFloat(currentInput);

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    };

    const performCalculation = {
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    };

    document.querySelector('.buttons').addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) return;

        if (target.classList.contains('digit')) {
            inputDigit(target.textContent);
            updateDisplay();
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.textContent);
        }

        if (target.id === 'clear') {
            currentInput = '0';
            firstOperand = null;
            operator = '';
            waitingForSecondOperand = false;
        }

        if (target.id === 'backspace') {
            currentInput = currentInput.slice(0, -1);
        }

        if (target.id === 'decimal') {
            inputDecimal();
        }

        if (target.id === 'calculate') {
            handleOperator('=');
            updateDisplay();
            firstOperand = null;
            operator = '';
        }

        updateDisplay();
    });
});
