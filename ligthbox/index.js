const imgList = document.querySelectorAll(`.img`);
const lightbox = document.querySelector(`.lightbox`); // Obtiene la referencia al elemento ligthbox
const grande = document.querySelector(`.grande`); // Obtiene la referencia a la imagen ampliada
const closeBtn = document.querySelector(`.close`); // Obtiene la referencia al botón de cierre

imgList.forEach(( eachImg , index )=>{
    imgList[index].addEventListener(`click`,()=>{ // Añade un evento de clic a cada imagen
        lightbox.classList.add(`isActive`); // Activa el ligthbox añadiendo la clase "isActive"
        grande.src = imgList[index].src
    })
})

closeBtn.addEventListener(`click`,()=>{ // Añade un evento de clic al botón de cierre
    lightbox.classList.remove(`isActive`)
})