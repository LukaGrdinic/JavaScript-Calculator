var resultElement = document.getElementById("result"); // HTML element where result is displayed
var currentOperatorElement = document.getElementById('currentOperator'); // HTML element where currentOperator is displayed

/* THE CALCULATOR OBJECT */
/* ==================================== */

let calculator = {

    stringifiedNumber: '', // It allows the ciphers to concatenate into numbers of more digits ('25', '155', '300', '999', '125000')
    assignToString: function (x) {
        this.stringifiedNumber += x;
    },
    stringParser: function () {
        if (this.stringifiedNumber === '' || this.stringifiedNumber === '.') {
            return 0; // returns a 0 instead of returning NaN when attempting to parse an empty string ('') or a dot ('.')
        }
        let parsedNumber = parseFloat(this.stringifiedNumber);
        return parsedNumber;
    },
    clearStringifiedNumber: function () {
        if (this.showFinalResultStatus) {
            this.clearAll();
        } else {
            this.stringifiedNumber = '';
        }
        resultElement.innerText = this.calculationArray[0];
    },
    clearAll: function () {
        this.currentOperator = '+';
        this.stringifiedNumber = '';
        this.calculationArray[0] = 0; // Clears up the accumulator
        this.calculationArray[1] = 0; // Clears up the current number
        resultElement.innerText = this.calculationArray[0];
        currentOperatorElement.innerText = '';
    },
    // Maybe this array should have been split up into accumulator and currentNumber variables
    calculationArray: [0, 0], // calculationArray[0] (accumulator) is the result & calculationArray[1] is the current number
    currentOperator: '+',
    calculateFinalResult: function () {
        let finalResult = calculator.calculationArray.reduce(function (a, b) {
            switch (calculator.currentOperator) {
                case '+': return a + b; break; // DA LI JE OVO BREAK POTREBNO ODJE ?
                case '-': return a - b; break;
                case 'x': return a * b; break;
                case '÷': return a / b; break;
                case '%': return a / 100 * b; break;
            }
        });
        calculator.calculationArray[0] = finalResult;
        resultElement.innerText = calculator.calculationArray[0];
    },
    showFinalResult: function () {
        if (this.showFinalResultStatus) { return; }
        calculator.calculationArray[1] = calculator.stringParser(this.stringifiedNumber);
        calculator.calculateFinalResult();
        calculator.stringifiedNumber = ''; // maybe this expression could be implemented in calculateFinalResult() function
        this.showFinalResultStatus = true;
        currentOperatorElement.innerText = '';
    },
    showFinalResultStatus: false
};

/* THE HANDLERS OBJECT */
/* ==================================== */

let handlers = {
    setUpButtonListeners: function () {
        let calculatorBody = document.querySelector('.calculator-body');
        calculatorBody.addEventListener('click', function (e) {
            if (e.target.classList.length === 0) {
                console.log('Ain\'t nottin\' gonna happen');
            } else {
                e.target.classList.forEach(function (a) {
                    if (a === 'validNumber') {
                        handlers.buttonNumber(e.target.textContent.trim());
                    } else if (a === 'operator') {
                        handlers.buttonOperator(e.target.textContent.trim());
                    }
                    e.target.blur();    /* It removes the focus from the last clicked button,
                     so that when user types ENTER key on keybord it does not click the button again*/
                });
            }
        });
    },
    buttonNumber: function (number) { // If number button is clicked
        if (calculator.showFinalResultStatus) {
            calculator.clearAll();
        }
        calculator.showFinalResultStatus = false;
        calculator.assignToString(number);
        resultElement.innerText = calculator.stringifiedNumber;
    },
    buttonOperator: function (operator) { // If operator button is clicked
        calculator.showFinalResultStatus = false;
        if (calculator.stringifiedNumber === '') {
            handlers.setCurrentOperator(operator);
        }
        else {
            calculator.calculationArray[1] = calculator.stringParser(this.stringifiedNumber);
            calculator.stringifiedNumber = '';
            calculator.calculateFinalResult();
            handlers.setCurrentOperator(operator);
        }
    },
    setCurrentOperator: function (operator) {
        switch (operator) {
            case '+': calculator.currentOperator = '+'; break;
            case '-': calculator.currentOperator = '-'; break;
            case 'x': calculator.currentOperator = 'x'; break;
            case '÷': calculator.currentOperator = '÷'; break;
            case '%': calculator.currentOperator = '%'; break;
        }
        currentOperatorElement.innerText = calculator.currentOperator; // This displays the current (active) operator
    }
}

// Setting up button listeners
handlers.setUpButtonListeners();

// Setting up keybord listeners
document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {

        /* THE ENTER KEY, THE ESCAPE KEY AND BACKSPACE */
        //===============================================
        case 13: calculator.showFinalResult(); break;
        case 27: calculator.clearAll(); break;
        case 8: calculator.clearStringifiedNumber(); break;

        /* NUMBERS ON MAIN KEYPAD */                           /* NUMBERS ON NUMERIC KEYPAD */
        //======================================               //========================================
        case 48: handlers.buttonNumber(0); break;     /* || */   case 96: handlers.buttonNumber(0); break;
        case 49: handlers.buttonNumber(1); break;     /* || */   case 97: handlers.buttonNumber(1); break;
        case 50: handlers.buttonNumber(2); break;     /* || */   case 98: handlers.buttonNumber(2); break;
        case 51: handlers.buttonNumber(3); break;     /* || */   case 99: handlers.buttonNumber(3); break;
        case 52: handlers.buttonNumber(4); break;     /* || */  case 100: handlers.buttonNumber(4); break;
        case 53: handlers.buttonNumber(5); break;     /* || */  case 101: handlers.buttonNumber(5); break;
        case 54: handlers.buttonNumber(6); break;     /* || */  case 102: handlers.buttonNumber(6); break;
        case 55: handlers.buttonNumber(7); break;     /* || */  case 103: handlers.buttonNumber(7); break;
        case 56: handlers.buttonNumber(8); break;     /* || */  case 104: handlers.buttonNumber(8); break;
        case 57: handlers.buttonNumber(9); break;     /* || */  case 105: handlers.buttonNumber(9); break;
        case 190: handlers.buttonNumber('.'); break;  /* || */  case 110: handlers.buttonNumber('.'); break;

        // OPERATORS
        //===========================================
        case 106: handlers.buttonOperator('x'); break;
        case 107: handlers.buttonOperator('+'); break;
        case 109: handlers.buttonOperator('-'); break;
        case 111: handlers.buttonOperator('÷'); break;
        default: return;
    }
});

function showScientific() {
    window.alert('Work in progress!');
}

/* DALJI PLAN ZA DIGITRON */

// TREBA SE POBRINUT ZA DECIMALNE BROJEVE, DA FUNKCIONISU KAKO TREBA, JER ZA SAD RADE SAMO PO DEFAULTU
/* ??? OVO CE SE MOZDA BOLJE VIDJETI U TESTOVIMA */
// MOZDA BI TREBALO PONEKAD DA BACI GRESKU (DA OBAVIJESTI ILI U KONZOLI ILI NA EKRANU)
// TREBA DA MNOZENJE, DIJELJENJE I NALAZENJE PROCENTA IMA PREDNOST U ODNOSU NA SABIRANJE I ODUZIMANJE