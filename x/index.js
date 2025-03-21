document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las marcas y el contenedor principal
    const brandItems = document.querySelectorAll('.brand-item');
    const mainContainer = document.querySelector('.container');
    const bgContainer = document.querySelector('.background-container');
    const backgrounds = document.querySelectorAll('.background-image');
    
    // Función para ocultar todos los fondos (volver a negro)
    function clearAllBackgrounds() {
        backgrounds.forEach(bg => {
            bg.classList.remove('active-background');
        });
    }
    
    // Al cargar la página, asegurarse de que no haya fondos activos
    clearAllBackgrounds();
    
    // Variable para controlar si el cursor está sobre una marca
    let isOverBrand = false;
    
    // Manejar todas las marcas
    brandItems.forEach(item => {
        const brandName = item.getAttribute('data-brand');
        const bg = document.getElementById(`bg-${brandName}`);
        
        // Cuando el mouse entra en una marca
        item.addEventListener('mouseenter', function() {
            isOverBrand = true;
            clearAllBackgrounds();
            if (bg) {
                bg.classList.add('active-background');
            }
        });
        
        // Cuando el mouse sale de una marca
        item.addEventListener('mouseleave', function() {
            isOverBrand = false;
            clearAllBackgrounds();
        });
        
        // Para dispositivos táctiles
        item.addEventListener('touchstart', function(e) {
            clearAllBackgrounds();
            if (bg) {
                bg.classList.add('active-background');
            }
        });
    });
    
    // Agregar un evento global para asegurar que el fondo se borre
    document.body.addEventListener('mouseover', function(e) {
        // Verificar si el mouse está sobre alguna marca
        let onBrand = false;
        for (let item of brandItems) {
            if (item.contains(e.target)) {
                onBrand = true;
                break;
            }
        }
        
        // Si no está sobre ninguna marca, limpiar los fondos
        if (!onBrand) {
            clearAllBackgrounds();
        }
    });
    
    // Evento especial para dispositivos táctiles
    document.body.addEventListener('touchstart', function(e) {
        // Si el toque no fue en una marca, limpiar fondos
        let touchedBrand = false;
        for (let item of brandItems) {
            if (item.contains(e.target)) {
                touchedBrand = true;
                break;
            }
        }
        
        if (!touchedBrand) {
            clearAllBackgrounds();
        }
    });
});