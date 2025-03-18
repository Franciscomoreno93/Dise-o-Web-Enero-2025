// Funciones comunes
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getColor(){
    return `rgb(${getRndInteger(0,255)}, ${getRndInteger(0,255)}, ${getRndInteger(0,255)})`
}

// Ejercicio 1
const p1 = document.querySelector("#p1");
const bt1 = document.querySelector("#bt1");

function handleEjercicio1(e) {
    if(p1.style.backgroundColor == "black"){
        p1.style.backgroundColor = "white";
        p1.style.color = "black";
    }else{
        p1.style.backgroundColor = "black";
        p1.style.color = "white";
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

bt2.addEventListener("click", handleEjercicio2);

// Ejercicio 3
// Modificado en ejericcios anteriores


// Ejercicio 4
const box4 = document.querySelector(".box4");
const bt4 = document.querySelector("#bt4");
let flag = false;

function handleEjercicio4(e) {
    if(flag){
        flag = false;
        box4.style.animation = "animacion1 1s linear infinite";
    }else{
        flag = true;
        box4.style.animation = "animacion2 1s linear infinite";
    }
}

bt4.addEventListener("click", handleEjercicio4);

// Ejercicio 5
const box5 = document.querySelector(".box5");
const bt5 = document.querySelector("#bt5");

function handleEjercicio5(e) {
    if(box5.style.display == "none"){
        box5.style.display = "block";
    }else{
        box5.style.display = "none";
    }
    flag = !flag
}

bt5.addEventListener("click", handleEjercicio5);

// Ejercicio 6
const box6 = document.querySelector(".box6");
const bt6 = document.querySelector("#bt6");

function handleEjercicio6(e) {
    console.log(box6.style.opacity)
    if(box6.style.opacity == 1 || box6.style.opacity == ""){
        box6.style.opacity = 0;
    }else{
        box6.style.opacity = 1;
    }
    flag = !flag
}

bt6.addEventListener("click", handleEjercicio6);

// Ejercicio 7
const td7 = document.querySelectorAll(".table7 td");
const bt7 = document.querySelector("#bt7");

function handleEjercicio7() {
    let n = getRndInteger(0, 15)
    td7[n].style.background = "red";
}

bt7.addEventListener("click", handleEjercicio7);

// Ejercicio 8
const td8 = document.querySelectorAll(".table8 td");
const bt8 = document.querySelector("#bt8");

function handleEjercicio8() {
    let n = getRndInteger(0, td8.length - 1)
    td8[n].style.background = "red";

}

bt8.addEventListener("click", handleEjercicio8);

const box9 = document.querySelector(".box9")
const bt = document.querySelector("#bt2");

// Ejercicio 9
function handleEjercicio9() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    box9.style.position = "fixed";
    box9.style.left = `${getRndInteger(50, w - 150)}px`;
    box9.style.top = `${getRndInteger(50, h - 150)}px`;

}

bt.addEventListener("click", handleEjercicio9);