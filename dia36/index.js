document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoplayInterval;
    
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            slideIndex = slideCount - 1;
        } else if (slideIndex >= slideCount) {
            slideIndex = 0;
        }
        
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
        
        resetAutoplay();
    }
    
    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlide + 1);
    });
    
    function startAutoplay() {
        autoplayInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 4000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    startAutoplay();
    
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        startAutoplay();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
           
            goToSlide(currentSlide + 1);
        } else if (touchEndX > touchStartX + 50) {
            
            goToSlide(currentSlide - 1);
        }
    }
});
