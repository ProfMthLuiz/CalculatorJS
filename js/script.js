// Pegando os elementos HTML.
const previousOperationText = document.getElementById("previousOperation");
const currentOperationText = document.getElementById("currentOperation");
const buttons = document.querySelectorAll("#buttonsContainer button")

class Calculator {
    constructor(previousOperationText, currentOperationText){
        
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }

    // Adiciona o dígito à tela da calculadora.
    addDigit(digit){

        // Verifica se a operação atual já possui um ponto.
        if(digit === "." && this.currentOperationText.innerText.includes(".")){

            return

        }

        this.currentOperation = digit;
        this.updateScreen();

    }

    // Processa todas as operações da calculadora.
    processOperation(operation){

        // Verifique se a operação atual está vazia.
        if(this.currentOperationText.innerText === "" && operation !== "C"){

            // If para mudar a operação.
            if(this.previousOperationText.innerText !== ""){

                this.changeOperation(operation);

            }

            return

        }

        // Obtendo o valor atual e o anterior.
        let operationValue;

        // Pega o valor anterior da operação, sem o sinal da operação.
        const previous = +this.previousOperationText.innerText.split(" ")[0];

        // Pega o valor atual da operação.
        const current = +this.currentOperationText.innerText;

        // Switch que de acordo com a operação, irá fazer a conta matemática.
        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
                
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
                    
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
                
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            
            case "DEL":
                this.processDelOperator();
                break;
            
            case "CE":
                this.processClearCurrentOperator();
                break;

            case "C":
                this.processClearAllOperation();
                break;

            case "=":
                this.processEqualOperator();
                break;

            default:
                return;
        }

    }

    // Altera os valores na tela da calculadora.
    updateScreen( 
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null 
    ){
        // Se o valor da operação for nulo, então a operação atual recebe a primeira operação digitada.
        if( operationValue === null ){
            console.log("entrei neste if 1")
            this.currentOperationText.innerText += this.currentOperation;

        }else{

            // Verifica se o valor anterior é zero, se for apenas adiciona o valor atual.
            if(previous === 0){
                console.log("entrei neste if 2")
                operationValue = current;

            }

            // Adicionar valor atual ao anterior.
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
        

    }

    // Altera operação matemática.
    changeOperation(operation){

        const mathOperations = ["*", "/", "+", "-"]

        if( !mathOperations.includes(operation)){

            return

        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }

    // Exclui o último dígito.
    processDelOperator(){

        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);

    }

    // Limpa a operação atual.
    processClearCurrentOperator(){

        this.currentOperationText.innerText = "";

    }

    // Limpar todas a calculadora.
    processClearAllOperation(){
        this.previousOperationText.innerText = "";
        this.currentOperationText.innerText = "";
    }

    // Processaa uma operação.
    processEqualOperator(){

        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);

    }

}

const calc = new Calculator(previousOperationText, currentOperationText);

// Pegando todos os elementos buttons, e chamando cada um individualmente de btn.
buttons.forEach( (btn) => {

    // Dentro de cada btn, adicionamos um evento de click, ai pegamos o resultado do evento ( objeto )
    // dessa maneira, conseguimos pegar o valor ( texto ) do botão que o usuário apertou.
    btn.addEventListener("click", (event) => {

        // Pegando o valor ( texto ) do botão apertado, e salvando na variavel value.
        const value = event.target.innerText;

        // O + antes do value, tenta converter o valor recebido em número.
        if(+value >= 0 || value === "."){

            calc.addDigit(value);

        }else{

            calc.processOperation(value);

        }

    })

})