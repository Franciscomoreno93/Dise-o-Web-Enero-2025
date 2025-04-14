// Funcionalidad para el menú hamburguesa
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Funcionalidad para el slider
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // Agregar eventos a los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlider();
            showSlide(index);
            startSlider();
        });
    });
    
    // Iniciar slider automático
    startSlider();
}

// Funcionalidad para los filtros de categorías
function initCategoryFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (!filterTabs.length || !articleCards.length) return;
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.textContent.trim().toLowerCase();
            
            // Actualizar tabs activos
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar artículos
            articleCards.forEach(card => {
                const cardCategory = card.querySelector('.article-category').textContent.trim().toLowerCase();
                
                if (category === 'todos') {
                    card.style.display = 'block';
                } else if (cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Resetear el buscador al cambiar de categoría
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
}

// Funcionalidad para el buscador de artículos
function initArticleSearch() {
    // 1. Primero intentamos con los selectores originales
    let searchInput = document.querySelector('.search-input');
    let searchBtn = document.querySelector('.search-btn');
    
    // 2. Si no encontramos nada, intentamos con los selectores del nuevo diseño
    if (!searchInput) {
        searchInput = document.querySelector('input[placeholder*="Buscar"]');
        if (searchInput) {
            searchBtn = searchInput.nextElementSibling || searchInput.parentElement.querySelector('button');
        }
    }
    
    // 3. Si aún no encontramos, probamos con selectores genéricos
    if (!searchInput) {
        const possibleInputs = [
            document.querySelector('input[type="search"]'),
            document.querySelector('input[type="text"]'),
            document.querySelector('form input')
        ];
        
        for (const input of possibleInputs) {
            if (input) {
                searchInput = input;
                searchBtn = input.closest('form')?.querySelector('button') || input.nextElementSibling;
                break;
            }
        }
    }
    
    // Si no encontramos el campo de búsqueda, salimos
    if (!searchInput) return;
    
    // Encontrar los artículos para buscar
    const articleCards = document.querySelectorAll('.article-card');
    
    // Si no hay artículos con clase .article-card, intentar detectar otros elementos que puedan ser artículos
    const allArticles = articleCards.length ? articleCards : 
                     document.querySelectorAll('article, .card, [class*="article"], [class*="post"]');
    
    if (!allArticles.length) return;
    
    function searchArticles() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Si el campo de búsqueda está vacío, mostrar todos los artículos
        if (searchTerm === '') {
            // Encontrar la categoría activa (si existe)
            const activeTab = document.querySelector('.filter-tab.active');
            if (activeTab) {
                const activeCategory = activeTab.textContent.trim().toLowerCase();
                
                allArticles.forEach(card => {
                    const categoryElement = card.querySelector('.article-category');
                    if (!categoryElement) {
                        card.style.display = '';  // Mostrar si no tiene categoría
                        return;
                    }
                    
                    const cardCategory = categoryElement.textContent.trim().toLowerCase();
                    
                    if (activeCategory === 'todos') {
                        card.style.display = '';
                    } else if (cardCategory === activeCategory) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                // Si no hay categoría activa, mostrar todos
                allArticles.forEach(card => {
                    card.style.display = '';
                });
            }
            
            removeNoResultsMessage();
            return;
        }
        
        let foundResults = false;
        
        // Buscar coincidencias
        allArticles.forEach(card => {
            // Buscar en todo el contenido de texto del artículo
            const cardText = card.textContent.toLowerCase();
            
            // Buscar elementos específicos que contienen texto para resaltar
            const titleElement = card.querySelector('.article-title, h1, h2, h3, h4, .title, [class*="title"]');
            const excerptElement = card.querySelector('.article-excerpt, p, .excerpt, .description, [class*="excerpt"], [class*="description"]');
            const categoryElement = card.querySelector('.article-category, .category, [class*="category"]');
            
            // Determinar si hay coincidencia
            let categoryMatch = true;  // Por defecto no filtramos por categoría
            
            // Verificar filtro de categoría (si aplica)
            const activeTab = document.querySelector('.filter-tab.active');
            if (activeTab && categoryElement) {
                const activeCategory = activeTab.textContent.trim().toLowerCase();
                const cardCategory = categoryElement.textContent.trim().toLowerCase();
                
                // Si hay una categoría activa que no es "todos", verificar coincidencia de categoría
                if (activeCategory !== 'todos') {
                    categoryMatch = (cardCategory === activeCategory);
                }
            }
            
            // Mostrar/ocultar basado en coincidencia
            if (cardText.includes(searchTerm) && categoryMatch) {
                card.style.display = '';
                foundResults = true;
                
                // Resaltar coincidencias si los elementos existen
                if (titleElement) highlightText(titleElement, searchTerm);
                if (excerptElement) highlightText(excerptElement, searchTerm);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Mostrar mensaje si no hay resultados
        if (!foundResults) {
            showNoResultsMessage(searchTerm);
        } else {
            removeNoResultsMessage();
        }
    }
    
    function highlightText(element, term) {
        // Guardar el texto original si no lo hemos hecho
        if (!element.hasAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.innerHTML);
        }
        
        const originalText = element.getAttribute('data-original-text');
        
        // Crear regex para buscar el término (insensible a mayúsculas/minúsculas)
        const regex = new RegExp(`(${term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        const highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');
        
        element.innerHTML = highlightedText;
    }
    
    function showNoResultsMessage(term) {
        removeNoResultsMessage();
        
        // Encontrar un contenedor adecuado para mostrar el mensaje
        let container = document.querySelector('.articles-grid') || 
                        document.querySelector('.articles-container') || 
                        allArticles[0].parentElement;
        
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results-message';
        noResultsDiv.innerHTML = `
            <p>No se encontraron resultados para: <strong>"${term}"</strong></p>
            <p>Intenta con otros términos o navega por categorías.</p>
        `;
        
        container.appendChild(noResultsDiv);
    }
    
    function removeNoResultsMessage() {
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Restaurar texto original (eliminar resaltado)
        document.querySelectorAll('[data-original-text]').forEach(element => {
            element.innerHTML = element.getAttribute('data-original-text');
        });
    }
    
    // Aplicar búsqueda al hacer clic en el botón
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchArticles();
        });
    }
    
    // Búsqueda al presionar Enter
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchArticles();
        }
    });
    
    // Búsqueda en tiempo real
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchArticles, 300);
    });
    
    // Agregar estilos para resaltado y mensaje de no resultados
    addHighlightStyle();
    addNoResultsStyle();
}

function addHighlightStyle() {
    if (document.getElementById('search-highlight-style')) return;
    
    const style = document.createElement('style');
    style.id = 'search-highlight-style';
    style.textContent = `
        .highlight {
            background-color: #ffeb3b;
            color: #000;
            padding: 0 2px;
            border-radius: 2px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

function addNoResultsStyle() {
    if (document.getElementById('no-results-style')) return;
    
    const style = document.createElement('style');
    style.id = 'no-results-style';
    style.textContent = `
        .no-results-message {
            text-align: center;
            padding: 30px;
            background-color: #f8f8f8;
            border-radius: 10px;
            margin: 20px 0;
            color: #666;
        }
        .no-results-message p {
            margin-bottom: 10px;
        }
        .no-results-message strong {
            color: #ff3e3e;
        }
    `;
    document.head.appendChild(style);
}

// Funcionalidad para el FAQ (acordeón)
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar clase active en el item actual
            item.classList.toggle('active');
        });
    });
}

// Funcionalidad para el formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });
}

// Funcionalidad para la paginación
function initPagination() {
    const pageNumbers = document.querySelectorAll('.page-number');
    const pageArrows = document.querySelectorAll('.page-arrow');
    
    if (!pageNumbers.length) return;
    
    let currentPage = 0;
    
    pageNumbers.forEach((page, index) => {
        page.addEventListener('click', () => {
            pageNumbers.forEach(p => p.classList.remove('active'));
            page.classList.add('active');
            currentPage = index;
            // Aquí iría la lógica para cambiar a la página seleccionada
        });
    });
    
    if (pageArrows.length) {
        // Flecha izquierda (página anterior)
        pageArrows[0].addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                pageNumbers.forEach(p => p.classList.remove('active'));
                pageNumbers[currentPage].classList.add('active');
                // Aquí iría la lógica para cambiar a la página anterior
            }
        });
        
        // Flecha derecha (página siguiente)
        pageArrows[1].addEventListener('click', () => {
            if (currentPage < pageNumbers.length - 1) {
                currentPage++;
                pageNumbers.forEach(p => p.classList.remove('active'));
                pageNumbers[currentPage].classList.add('active');
                // Aquí iría la lógica para cambiar a la página siguiente
            }
        });
    }
}

// Funcionalidad para el formulario de newsletter
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('.newsletter-input');
        // Aquí iría la lógica para suscribir al newsletter
        alert(`¡Gracias por suscribirte! Recibirás nuestras actualizaciones en: ${input.value}`);
        this.reset();
    });
}

// Activar animaciones al hacer scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .article-card, .feature, .team-member, .category-card');
    
    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '0px'
    });
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar las diferentes funcionalidades
    initMobileMenu();
    initSlider();
    initCategoryFilters();
    initArticleSearch();
    initFAQ();
    initContactForm();
    initPagination();
    initNewsletter();
    initScrollAnimations();
    
    // Marcar el enlace activo en la navegación según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});