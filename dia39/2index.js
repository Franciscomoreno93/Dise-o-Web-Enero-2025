let p = document.querySelector("p");
fetch("https://www.el-tiempo.net/api/json/v2/provincias/41/municipios/41001")
.then(data => data.json())
.then(data => {
    let text = ``;
    text += `Temperatura: ${data.temperatura_actual}º <br>`;
    text += `Humedad: ${data.humedad}%` ;
    p.innerHTML = text;
})