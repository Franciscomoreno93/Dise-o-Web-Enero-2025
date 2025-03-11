// Ejercicio 1
function pares2(){
    for (let i = 2; i <= 100; i = i + 2) {
        console.log(i)
    }
}

pares2()

// Ejercicio 2
function cuadrado(){
    for (let i = 0; i < 5; i++) {
        console.log("*******")
    }
}
cuadrado()

// Ejercicio 3
console.log("----------")
function cuadrado(){}
    for (let i = 0; i < 5; i++) {
        let str = ""
        for (let j = 0; j < 5; j ++) {
            if(i == 0 || i == 4 || j == 0 || j == 4){
                str += "**"
        }else{
            str += " "
        }
    }
    console.log(str)
}



// Ejercicio 4
function saludar(nombre) {
    alert("Hola " + nombre);
}

function adios(nombre) {
    alert("Adios " + nombre);
}

function procesarEntradaUsuario(callback) {
    var nombre = prompt("Por favor ingresa tu nombre. ");
    callback(nombre);
}

procesarEntradaUsuario(saludar);
// procesarEntradaUsuario(adios);