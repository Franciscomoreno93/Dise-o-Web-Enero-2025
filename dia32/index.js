// Ejercicio 1
const box1 = document.querySelector(".box1");
const bt1 = document.querySelector("#bt1");

function handleToggleAnimate1() {
    box1.classList.add("animate1");
}

bt1.addEventListener("click",handleToggleAnimate1);

// Ejercicio 2
const bt2 = document.querySelector("#bt2");

function handleRemoveAnimate2() {
    box1.classList.remove("animate1");
}

bt2.addEventListener("click", handleRemoveAnimate2)

// Ejericcio 3
const bt3 = document.querySelector("#bt3");

function handleToggleAnimate3() {
    box1.classList.toggle("animate1");
}

bt3.addEventListener("click", handleToggleAnimate3)