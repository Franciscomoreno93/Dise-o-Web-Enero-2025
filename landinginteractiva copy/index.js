document.addEventListener('DOMContentLoaded', () => {
    // Cache de elementos DOM
    const backgrounds = document.querySelectorAll('.background-image');
    
    // Crear un mapa de nombres de marcas a elementos de fondo para búsqueda rápida
    const brandBackgrounds = {};
    backgrounds.forEach(bg => {
        bg.classList.remove('active-background'); // Limpiar todos al cargar
        const id = bg.id;
        if (id?.startsWith('bg-')) {
            const brandName = id.substring(3); // Eliminar prefijo 'bg-'
            brandBackgrounds[brandName] = bg;
        }
    });
    
    // Usar delegación de eventos para manejar interacciones
    document.body.addEventListener('mouseover', (e) => {
        // Buscar si estamos sobre un elemento de marca
        const brandElement = e.target.closest('.brand-item');
        
        // Limpiar todos los fondos
        backgrounds.forEach(bg => bg.classList.remove('active-background'));
        
        // Activar el fondo correspondiente si estamos sobre una marca
        if (brandElement) {
            const targetBrand = brandElement.getAttribute('data-brand');
            if (targetBrand && brandBackgrounds[targetBrand]) {
                brandBackgrounds[targetBrand].classList.add('active-background');
            }
        }
    });
    
    // Manejo de eventos táctiles con la misma lógica
    document.body.addEventListener('touchstart', (e) => {
        const brandElement = e.target.closest('.brand-item');
        backgrounds.forEach(bg => bg.classList.remove('active-background'));
        
        if (brandElement) {
            const targetBrand = brandElement.getAttribute('data-brand');
            if (targetBrand && brandBackgrounds[targetBrand]) {
                brandBackgrounds[targetBrand].classList.add('active-background');
            }
        }
    });
});