// Constantes y variables
const imgList = document.querySelectorAll(`.img`);
const lightbox = document.querySelector(`.lightbox`); // Obtiene la referencia al elemento ligthbox
const grande = document.querySelector(`.grande`); // Obtiene la referencia a la imagen ampliada
const closeBtn = document.querySelector(`.close`); // Obtiene la referencia al botón de cierre

// Funciones
const closeBtnHandler = () => lightbox.classList.remove(`isActive`);
const imgListHandler = (index) =>{
    lightbox.classList.add(`isActive`);
        grande.src = imgList[index].src
    }

imgList.forEach(( eachImg , index )=>{
    imgList[index].addEventListener(`pointerdown`,()=>{ 
        imgListHandler(index)
    })
})

closeBtn.addEventListener(`click`, closeBtnHandler)