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