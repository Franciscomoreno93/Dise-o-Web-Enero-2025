// Recorre todos los elementos con clase 'bloque' y los guarda en una nodelist
const bloque = document.querySelectorAll('.bloque');
// Recorre todos los elementos con clase 'h2' y los agurda en una nodelist
const h2 = document.querySelectorAll('.h2');

// Recorre cada elemento 'h2' y asigna un evento clic
h2.forEach((cadaH2, i) => {
    h2[i].addEventListener('click', () => {

        // Recorre todos los elementos 'bloque' y elimina la clase activo
        bloque.forEach((cadabloque, i) => {
            bloque[i].classList.remove('activo');
        })

        // Agrega la clase axtivo solo al bloque correspondiente
        bloque[i].classList.add('activo');
    })
})