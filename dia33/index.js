// Operadores
console.log("1 < 2");
console.log(1 < 2);

// Ejercicio 1
const p1 = document.querySelector("#p1");
const bt1 = document.querySelector("bt1");

function handleEjercicio1(e) {
    console.log("Fondo:", p1.style.backgroundColor)
    console.log("Color", p1.style.color)
    if(p1.style.backgroundColor != "black"){
        p1.style.backgorundColor = "black";
        p1.style.color = "white";
    }else{
        p1.style.backgroundColor = "white";
        p1.style.color = "black";
    }
}

bt1.addEventListener("click", handleEjercicio1)