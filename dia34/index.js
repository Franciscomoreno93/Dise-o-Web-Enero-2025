document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav a');
    
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Has hecho clic en: ' + this.textContent);
            
            this.classList.add('active-link');
            
            setTimeout(() => {
                this.classList.remove('active-link');
            }, 300);
        });
    });
    
    const menuItems = document.querySelectorAll('.nav > li');
    menuItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            console.log('Pasando sobre: ' + this.querySelector('a').textContent);
        });
    });
});