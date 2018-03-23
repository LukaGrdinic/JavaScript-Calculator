/* THIS IS THE MAIN OBJECT - CALCULATOR */
/* ==================================== */

let calculator = {

    stringifiedNumber: "", // IT ALLOWS THE CIPHERS TO CONCATINATE INTO NUMBERS OF MORE DIGITS (25, 155, 300, 999, 125000)
    assignToString: function (x) {
        this.stringifiedNumber += x;
    },
    stringParser: function () {
        let parsedNumber = parseFloat(this.stringifiedNumber); // ODJE CE MOZDA TREBATI parseFloat
        return parsedNumber;
    },
    clearStringifiedNumber: function () {
        this.stringifiedNumber = "";
    },
    clearAll: function () {
        // MISLIM DA TREBA ODJE DA SE PROMIJENI I currentOperator u 'add'
        this.currentOperator = 'add';
        this.stringifiedNumber = "";
        this.myArray[0] = 0; // CLEARS UP THE ACCUMULATOR
        this.myArray[1] = 0; // CLEARS UP THE CURRENT NUMBER
    },
    myArray: [0, 0], // MYARRAY[0] (ACCUMULATOR) IS THE RESULT & MYARRAY[1] IS THE CURRENT NUMBER
    currentOperator: 'add',
    calculateFinalResult: function () {
        let finalResult = calculator.myArray.reduce(function (a, b) {
            switch (calculator.currentOperator) {
                case 'add': return a + b; break;
                case 'subtract': return a - b; break;
                case 'multiply': return a * b; break;
                case 'divide': return a / b; break;
                case 'findPercent': return a / 100 * b; break;
            }
        });

        calculator.myArray[0] = finalResult;
        console.log(finalResult);
    },
    showFinalResult: function () {
        calculator.myArray[1] = calculator.stringParser(this.stringifiedNumber);
        calculator.calculateFinalResult();
        // ODJE STAVLJAMO stringifiedNumber = "", DA BI GA OPERATORI PREPOZNALI NAKON STO KLIKNEMO ZNAK =
        calculator.stringifiedNumber = "";
    }
};

/* THIS IS THE HANDLERS OBJECT */
/* ==================================== */

let handlers = {
    setUpEventListeners: function () {
        let calculatorBody = document.querySelector('.calculator-body');
        calculatorBody.addEventListener('click', function (e) {            // MOZDA OVO TREBA DA ZAMIJENIM TAKO STO CU SAMO U HTML DA STAVIM ONCLICK NA SVAKO DUGME
            if (e.target.classList.length === 0) {
                console.log('Ain\'t nottin\' gonna happen');
            } else {
                e.target.classList.forEach(function (a) {
                    if (a === 'valid') {
                        handlers.buttonNumber(e.target.textContent.trim());
                    } else if (a === 'operator') {
                        handlers.buttonOperator(e.target.textContent.trim());
                    }
                });
            }
        });
    },
    buttonNumber: function (number) {         // AKO JE KLIKNUT BROJ
        calculator.assignToString(number);
        console.log(calculator.stringifiedNumber);
    },
    setCurrentOperator: function (operator) {
        switch (operator) {
            case '+': calculator.currentOperator = 'add'; break;
            case '-': calculator.currentOperator = 'subtract'; break;
            case '*': calculator.currentOperator = 'multiply'; break;
            case '/': calculator.currentOperator = 'divide'; break;
            case '%': calculator.currentOperator = 'findPercent'; break;
        }
    },
    buttonOperator: function (operator) {        // AKO JE KLIKNUT OPERATOR
        // AKO JE stringifiedNumber = "", ONDA SE IZVRSAVA SAMO PROMJENA OPERATORA A NE VRSI SE KALKULISANJE REZULTATA...
        if (calculator.stringifiedNumber === "") {
            handlers.setCurrentOperator(operator);
        }
        // AKO JE stringifiedNumber != "", ONDA SE IZVRSAVA I PROMJENA OPERATORA A I KALKULISANJE REZULTATA...
        else {
            calculator.myArray[1] = calculator.stringParser(this.stringifiedNumber);
            calculator.stringifiedNumber = "";
            calculator.calculateFinalResult();
            handlers.setCurrentOperator(operator);
        }
    }
}

// SETTING UP THE EVENT LISTENERS
handlers.setUpEventListeners();

/* DALJI PLAN ZA DIGITRON */

/* TREBA DA KAD MYARRAY VEC IMA VRIJEDNOSTI, (I MYARRAY[0] I MYARRAY[1])
A ONDA SAMO UKUCAM BROJ NOVI, NE UKUCAVAJUCI OPERATOR PRIJE BROJA,
TREBA DA MYOPERATOR === 'add', MYARRAY[0] = 0, A DA NOVI BROJ BUDE MYARRAY[1] */
// TREBA DA MNOZENJE, DIJELJENJE I NALAZENJE PROCENTA IMA PREDNOST U ODNOSU NA SABIRANJE I ODUZIMANJE
// MOZDA BI TREBALO PONEKAD DA BACI GRESKU (DA OBAVIJESTI ILI U KOZNOLI ILI NA EKRANU)
// TREBA SE POBRINUT ZA DECIMALNE BROJEVE, DA FUNKCIONISU KAKO TREBA, JER ZA SAD RADE SAMO PO DEFAULTU


// NAPRAVITI INTERFEJS,PRIKAZ BROJEVA DOK SE KUCAJU