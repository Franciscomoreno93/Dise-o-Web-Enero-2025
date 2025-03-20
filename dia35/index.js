/**
 * Función para cambiar entre pestañas
 * @param {number} id - El ID de la pestaña a mostrar
 */
function menu(id) {
    document.querySelector("li.active").classList.remove("active");
    document.querySelector("main div.active").classList.remove("active");
    
    document.querySelector("#menu-" + id).classList.add("active");
    document.querySelector("#div-" + id).classList.add("active");
}

/**
 * Función para abrir una imagen en tamaño completo
 * @param {string} src - La ruta de la imagen a abrir
 */
function open_img(src) {
    console.log("Abriendo imagen: " + src);
    alert("Imagen abierta: " + src);
}