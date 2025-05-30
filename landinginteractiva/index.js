document.addEventListener('DOMContentLoaded', () => {
    // Guarda elementos con clase 'background-image' y los guarda en una variable
    const backgrounds = document.querySelectorAll('.background-image');
    
    const brandBackgrounds = {};
    backgrounds.forEach(bg => {
        bg.classList.remove('active-background'); // Limpiar todos al cargar
        const id = bg.id;
        if (id?.startsWith('bg-')) {
            const brandName = id.substring(3);
            brandBackgrounds[brandName] = bg;
        }
    });
    
    
    document.body.addEventListener('mouseover', (e) => {
        
        const brandElement = e.target.closest('.brand-item');
        
        // Elimina clase activa de todos los fondos
        backgrounds.forEach(bg => bg.classList.remove('active-background'));
        
        // Activa el fondo correspondiente 
        if (brandElement) {
            const targetBrand = brandElement.getAttribute('data-brand');
            if (targetBrand && brandBackgrounds[targetBrand]) {
                brandBackgrounds[targetBrand].classList.add('active-background'); // Activa el fondo especifico
            }
        }
    });
    
    
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