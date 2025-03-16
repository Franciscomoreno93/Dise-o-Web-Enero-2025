// Selecciona todos los elementos con clase 'li'
const tabs = document.querySelectorAll('.li');
// Selecciona todos los elementos con clase 'bloque'
const blocks = document.querySelectorAll('.bloque');

// Agrega un solo event listener al contenedor padre
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Elimina la clase 'activo' de todos los elementos
    tabs.forEach((t, i) => {
      t.classList.remove('activo');
      blocks[i].classList.remove('activo');
    });
    
    // Añade la clase 'activo' solo al tab clickeado y su bloque correspondiente
    tab.classList.add('activo');
    blocks[index].classList.add('activo');
  });
});