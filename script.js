class Calculator {
    constructor(previousOperandTextElem, currentOperandTextElem) {
        this.previousOperandTextElem = previousOperandTextElem;
        this.currentOperandTextElem = currentOperandTextElem;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case '+':
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;

            case 'x':
                computation = prev * current;
                break;

            case '÷':
                computation = prev / current;
                break;

            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
    
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
    
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }
    
    updateDisplay() {
        if(this.getDisplayNumber(this.currentOperand) == ''){
            this.currentOperandTextElem.innerText = '0';
        }else{
            this.currentOperandTextElem.innerText = this.getDisplayNumber(this.currentOperand);
        }

        if(this.operation != null){
            this.previousOperandTextElem.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandTextElem.innerText = '0';
        }
    }
}

const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOperandTextElem = document.querySelector('[data-previous-operand]');
const currentOperandTextElem = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElem, currentOperandTextElem);

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

equalsBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplay();
});