let newWin;

function handleOpen() {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
    newWin = open("", "test", params);
    newWin.document.write("Hello, world!<br>");
}

function handleClose() {
    newWin.close()
}

function handleMove() {
    newWin.moveTo(500, 500)
}

function handleResize() {
    newWin.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
}

function handleLocation() {
    newWin.location = "https://cei.es"
}

// Ejercicio 2
const boxs = document.querySelectorAll(".box");

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function handleRandorizer(){
    boxs.forEach((box, index) => {
        box.innerHTML = getRndInteger(1, 100);
        let r = getRndInteger(0, 255);
        let g = getRndInteger(0, 255);
        let b = getRndInteger(0, 255);
        box.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    });
}

// Ejercicio 3
function handleCalcular() {
    try {
        // Obtener los valores de los inputs
        const num1 = document.getElementById("num1").value;
        const num2 = document.getElementById("num2").value;
        const operador = document.getElementById("operador").value;
        
        // Convertir a números después de verificar que no estén vacíos
        if (num1 === "" || num2 === "") {
            alert("Por favor, completa ambos campos numéricos");
            return;
        }
        
        const numero1 = parseFloat(num1);
        const numero2 = parseFloat(num2);
        
        // Verificar que sean números válidos
        if (isNaN(numero1) || isNaN(numero2)) {
            alert("Por favor, ingresa números válidos");
            return;
        }
        
        let resultado;
        
        // Realizar operación
        if (operador === "+") {
            resultado = numero1 + numero2;
        } else if (operador === "-") {
            resultado = numero1 - numero2;
        } else if (operador === "*") {
            resultado = numero1 * numero2;
        } else if (operador === "/") {
            if (numero2 === 0) {
                alert("No es posible dividir por cero");
                return;
            }
            resultado = numero1 / numero2;
        }
        
        // Mostrar resultado (con máximo 2 decimales si es necesario)
        document.getElementById("resultado").textContent = resultado % 1 !== 0 ? resultado.toFixed(2) : resultado;
    } catch (error) {
        console.error("Error en la calculadora:", error);
        alert("Ocurrió un error al calcular");
    }
}
