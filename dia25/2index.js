function mostrar(){
    const text = document.getElementById("text").value;
    document.getElementById("resultado").innerHTML = text;
}

function sumar(){
    const n1 = parseInt(document.getElementById("n1").value);
    const n2 = parseInt(document.getElementById("n2").value);
    document.getElementById("resultado2").innerHTML = n1 + n2;
}