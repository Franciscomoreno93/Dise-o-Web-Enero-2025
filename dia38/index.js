window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;

    document.querySelectorAll('.parallax-bg').forEach(function(background) {
        const translateY = scrollPosition * 0.5;
        background.style.transform = 'translate3d(0, ' + translateY * 0.5 + 'px, 0)';
    });
});