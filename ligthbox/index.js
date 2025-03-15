const imgList = document.querySelectorAll(`.img`);
const lightbox = document.querySelector(`.lightbox`);
const grande = document.querySelector(`.grande`);
const closeBtn = document.querySelector(`.close`);

imgList.forEach(( eachImg , index )=>{
    imgList[index].addEventListener(`click`,()=>{
        lightbox.classList.add(`isActive`);
        grande.src = imgList[index].src
    })
})

closeBtn.addEventListener(`click`,()=>{
    lightbox.classList.remove(`isActive`)
})