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

// Ejercicio 2
const box2 = document.querySelector(".box2");
const bt2 = document.querySelector("#bt2");

function handleEjercicio2(e) {
    if(box2.style.width == "80vw"){
        box2.style.width = "20vw";
    }else{
        box2.style.width = "80vw";
    }
}

bt2.addEventListener("click", handleEjercicio2)

// Ejercicio 3
