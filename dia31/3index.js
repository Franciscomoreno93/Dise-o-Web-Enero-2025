script.js

console.log("Script externo cargado correctamente");

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColors() {
    
    const boxes = document.querySelectorAll('.box');
    
    
    boxes.forEach(box => {
        box.style.backgroundColor = getRandomColor();
    });
}

document.addEventListener('DOMContentLoaded', function() {
   
    document.querySelector('button').addEventListener('click', changeColors);
    
 
    changeColors();
});