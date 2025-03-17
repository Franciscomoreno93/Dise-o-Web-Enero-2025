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

// Ejericcio 5 y 6
const bt5 = document.querySelector("#bt5");
const container5 = document.querySelector(".container5");
let i5 = 0;

function handleRemoveBox5(e) {
    e.target.remove()
}

function handleAddBox5() {
    let div = document.createElement("div");
    i5++;
    div.classList.add("box");
    div.classList.add("box5");
    div.innerHTML = i5;
    div.addEventListener("click", handleRemoveBox5);
    container5.appendChild(div);
}

bt5.addEventListener("click", handleAddBox5)
