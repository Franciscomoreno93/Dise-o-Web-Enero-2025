// Selecciona todfos los elementos con clase 'li'
const li = document.querySelectorAll('.li');

// Selecciona todos los elementos con clase 'bloque'
const bloque = document.querySelectorAll('.bloque');

li.forEach( ( cadaLi , i )=>{
    li[i].addEventListener('click',()=>{ // Añade un evento de clic a cada pestaña

        li.forEach( ( cadaLi , i )=>{
            li[i].classList.remove('activo');
            bloque[i].classList.remove('activo');
        })

        li[i].classList.add('activo'); // Añade lcase 'activo' solo a la pestaña clickeada y su bloque 
        bloque[i].classList.add('activo');
    })
})