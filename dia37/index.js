document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carrouselr');
    const items = document.querySelectorAll('.carrousel');
    
    const totalItems = items.length;
    const radius = 300; 
    let currentAngle = 0;
    let autoRotateAnimation;
    let isAutoRotating = true;
    
    function initCarousel() {
        const angleStep = (2 * Math.PI) / totalItems;
        
        items.forEach((item, index) => {
            const angle = angleStep * index;
            
            item.style.transform = `rotateY(${angle}rad) translateZ(${radius}px)`;
            
            const z = Math.cos(angle) * radius;
            
            const zNormalized = (z + radius) / (2 * radius);
            item.style.opacity = 0.5 + (zNormalized * 0.5);
        });
    }

    function rotateCarousel() {
        currentAngle += 0.01; 
        carousel.style.transform = `rotateY(${currentAngle}rad)`;
        
        if (isAutoRotating) {
            autoRotateAnimation = requestAnimationFrame(rotateCarousel);
        }
    }
    
    function startAutoRotate() {
        isAutoRotating = true;
        rotateCarousel();
    }
    
    function stopAutoRotate() {
        isAutoRotating = false;
        cancelAnimationFrame(autoRotateAnimation);
    }
    
    initCarousel();
    
    startAutoRotate();
    
    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);
    
    items.forEach((item, index) => {
        item.addEventListener('click', function() {
            stopAutoRotate();
            
            const targetAngle = (2 * Math.PI / totalItems) * index;
            currentAngle = -targetAngle;
            
            carousel.style.transform = `rotateY(${currentAngle}rad)`;
            
            setTimeout(startAutoRotate, 2000);
        });
    });
});