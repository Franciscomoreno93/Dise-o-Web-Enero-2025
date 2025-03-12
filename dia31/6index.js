document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente.");

    // Evento de scroll
    const scrollBox = document.getElementById("scroll-box");
    if (scrollBox) {
        scrollBox.addEventListener("scroll", function () {
            console.log("Has hecho scroll!");
            const scrollPosition = scrollBox.scrollTop;
            if (scrollPosition > 100) {
                console.log("Has desplazado más de 100px.");
            }
        });
    }

    // Evento de resize
    window.addEventListener("resize", function () {
        console.log("La ventana ha sido redimensionada!");
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(`Ancho: ${width}px, Alto: ${height}px`);
    });

    // Evento de change
    const colorPicker = document.getElementById("color-picker");
    const changeBox = document.getElementById("change-box");

    if (colorPicker && changeBox) {
        colorPicker.addEventListener("change", function () {
            const selectedColor = colorPicker.value;
            console.log(`El color seleccionado es: ${selectedColor}`);
            changeBox.style.backgroundColor = selectedColor;
        });
    }
});
