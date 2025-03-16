// Selecciona todos los elementos necesarios de una sola vez
const bloques = document.querySelectorAll('.bloque');
const h2s = document.querySelectorAll('.h2');

// Agrega event listeners a cada h2
h2s.forEach((h2, index) => {
    h2.addEventListener('click', () => {
        // Remueve la clase 'activo' de todos los bloques
        bloques.forEach(bloque => bloque.classList.remove('activo'));
        
        // Agrega la clase 'activo' solo al bloque correspondiente
        bloques[index].classList.add('activo');
    });
});