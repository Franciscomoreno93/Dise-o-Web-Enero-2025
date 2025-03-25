var squares = document.getElementById("square1");
var eyeball = document.getElementById("eyeball");

document.addEventListener("mousemove", event => {
    let posX = event.clientX - window.innerWidth/2;
    let posY = event.clientY - window.innerHeight/2;

    squares.style.transform = "translate(" + posX * 0.01 + "%, " + posY*0.01 + "%)";
    eyeball.style.transform = "translate(" + posX * 0.08 + "%, " + posY*0.08 + "%)";
})