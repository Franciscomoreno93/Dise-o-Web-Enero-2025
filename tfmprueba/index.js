/**
 * SkateWorld - JavaScript principal
 * Script optimizado que controla todas las funcionalidades del sitio
 */

// Utilidades generales
const utils = {
    // Función para seleccionar elementos con fallback
    select: (selector, fallbackSelectors = []) => {
      let element = document.querySelector(selector);
      if (!element && fallbackSelectors.length) {
        for (const fallback of fallbackSelectors) {
          element = document.querySelector(fallback);
          if (element) break;
        }
      }
      return element;
    },
    
    // Función para crear y agregar estilos
    addStyles: (id, css) => {
      if (document.getElementById(id)) return;
      
      const style = document.createElement('style');
      style.id = id;
      style.textContent = css;
      document.head.appendChild(style);
    }
  };
  
  // Funcionalidad para el menú hamburguesa
  function initMobileMenu() {
    const menuToggle = utils.select('.menu-toggle');
    const mainNav = utils.select('.main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      
      if (icon) {
        if (mainNav.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-times');
        } else {
          icon.classList.replace('fa-times', 'fa-bars');
        }
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
          const cardCategoryEl = card.querySelector('.article-category');
          if (!cardCategoryEl) {
            card.style.display = 'block'; // Mostrar si no tiene categoría
            return;
          }
          
          const cardCategory = cardCategoryEl.textContent.trim().toLowerCase();
          
          card.style.display = (category === 'todos' || cardCategory === category) ? 'block' : 'none';
        });
        
        // Resetear el buscador al cambiar de categoría
        const searchInput = utils.select('.search-input', ['input[placeholder*="Buscar"]', 'input[type="search"]']);
        if (searchInput) {
          searchInput.value = '';
        }
      });
    });
  }
  
  // Función mejorada para el buscador de artículos
  function initArticleSearch() {
    // Buscar el campo de búsqueda con múltiples estrategias
    const searchInput = utils.select('.search-input', [
      'input[placeholder*="Buscar"]', 
      'input[type="search"]',
      'form input[type="text"]'
    ]);
    
    // Buscar el botón de búsqueda
    const searchBtn = searchInput ? (
      searchInput.nextElementSibling?.tagName === 'BUTTON' ? 
      searchInput.nextElementSibling : 
      searchInput.closest('form')?.querySelector('button') || 
      searchInput.parentElement.querySelector('button, .btn, [type="submit"]')
    ) : null;
    
    // Si no encontramos el campo de búsqueda, salimos
    if (!searchInput) {
      console.warn('Buscador no inicializado: No se encontró el campo de búsqueda');
      return;
    }
    
    console.log('Buscador encontrado:', searchInput);
    
    // Encontrar los artículos para buscar con múltiples estrategias
    let allArticles = document.querySelectorAll('.article-card');
    
    // Si no hay artículos con clase .article-card, intentar detectar otros elementos
    if (!allArticles.length) {
      allArticles = document.querySelectorAll('article, .card, [class*="article"], [class*="post"]');
    }
    
    // Si aún no hay artículos, intentar con elementos que contengan títulos
    if (!allArticles.length) {
      // Buscar cualquier elemento que probablemente contenga un artículo
      const possibleArticles = Array.from(document.querySelectorAll('h2, h3'))
        .map(heading => heading.closest('div, li, section'))
        .filter(Boolean);
        
      // Eliminar duplicados
      allArticles = [...new Set(possibleArticles)];
    }
    
    if (!allArticles.length) {
      console.warn('Buscador no inicializado: No se encontraron artículos para buscar');
      return;
    }
    
    console.log(`Se encontraron ${allArticles.length} artículos para buscar`);
    
    // Añadir estilos necesarios
    utils.addStyles('search-highlight-style', `
      .highlight {
        background-color: #ffeb3b;
        color: #000;
        padding: 0 2px;
        border-radius: 2px;
        font-weight: bold;
      }
    `);
    
    utils.addStyles('no-results-style', `
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
    `);
    
    // Funciones de búsqueda
    function searchArticles() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      // Si el campo está vacío, mostrar todos los artículos
      if (searchTerm === '') {
        resetArticlesDisplay();
        return;
      }
      
      let foundResults = false;
      
      // Buscar coincidencias
      allArticles.forEach(card => {
        // Buscar en todo el contenido de texto del artículo
        const cardText = card.textContent.toLowerCase();
        
        // Determinar si hay coincidencia con la categoría activa (si existe)
        let categoryMatch = true;
        const activeTab = utils.select('.filter-tab.active');
        const categoryElement = card.querySelector('.article-category, .category, [class*="category"]');
        
        if (activeTab && categoryElement) {
          const activeCategory = activeTab.textContent.trim().toLowerCase();
          const cardCategory = categoryElement.textContent.trim().toLowerCase();
          
          if (activeCategory !== 'todos') {
            categoryMatch = (cardCategory === activeCategory);
          }
        }
        
        // Mostrar/ocultar basado en coincidencia
        if (cardText.includes(searchTerm) && categoryMatch) {
          card.style.display = '';
          foundResults = true;
          
          // Resaltar coincidencias
          highlightMatchesInCard(card, searchTerm);
        } else {
          card.style.display = 'none';
        }
      });
      
      // Gestionar mensaje de no resultados
      if (!foundResults) {
        showNoResultsMessage(searchTerm);
      } else {
        removeNoResultsMessage();
      }
    }
    
    function highlightMatchesInCard(card, term) {
      // Elementos donde buscar coincidencias para resaltar
      const textElements = card.querySelectorAll('h1, h2, h3, h4, p, .title, .excerpt, [class*="title"], [class*="excerpt"]');
      
      textElements.forEach(element => {
        // Guardar texto original
        if (!element.hasAttribute('data-original-text')) {
          element.setAttribute('data-original-text', element.innerHTML);
        }
        
        const originalText = element.getAttribute('data-original-text');
        
        // Escapar caracteres especiales de regex
        const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        const highlightedText = originalText.replace(regex, '<span class="highlight">$1</span>');
        
        element.innerHTML = highlightedText;
      });
    }
    
    function resetArticlesDisplay() {
      removeNoResultsMessage();
      
      // Restaurar texto original (eliminar resaltado)
      document.querySelectorAll('[data-original-text]').forEach(element => {
        element.innerHTML = element.getAttribute('data-original-text');
      });
      
      // Mostrar artículos según la categoría activa
      const activeTab = utils.select('.filter-tab.active');
      
      if (activeTab) {
        const activeCategory = activeTab.textContent.trim().toLowerCase();
        
        allArticles.forEach(card => {
          const categoryElement = card.querySelector('.article-category, .category, [class*="category"]');
          
          if (!categoryElement) {
            card.style.display = '';
            return;
          }
          
          const cardCategory = categoryElement.textContent.trim().toLowerCase();
          
          card.style.display = (activeCategory === 'todos' || cardCategory === activeCategory) ? '' : 'none';
        });
      } else {
        // Si no hay filtro activo, mostrar todos
        allArticles.forEach(card => {
          card.style.display = '';
        });
      }
    }
    
    function showNoResultsMessage(term) {
      removeNoResultsMessage();
      
      // Encontrar contenedor adecuado
      const container = utils.select('.articles-grid, .articles-container') || allArticles[0].parentElement;
      
      const noResultsDiv = document.createElement('div');
      noResultsDiv.className = 'no-results-message';
      noResultsDiv.innerHTML = `
        <p>No se encontraron resultados para: <strong>"${term}"</strong></p>
        <p>Intenta con otros términos o navega por categorías.</p>
      `;
      
      container.appendChild(noResultsDiv);
    }
    
    function removeNoResultsMessage() {
      const existingMessage = utils.select('.no-results-message');
      if (existingMessage) {
        existingMessage.remove();
      }
    }
    
    // Configurar eventos de búsqueda
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchArticles();
      });
    }
    
    // Búsqueda al presionar Enter
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchArticles();
      }
    });
    
    // Búsqueda en tiempo real con debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(searchArticles, 300);
    });
  
    // Ejecutar una búsqueda inicial si hay valor en el campo
    if (searchInput.value.trim()) {
      setTimeout(searchArticles, 100);
    }
  }
  
  // Funcionalidad para el FAQ (acordeón)
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      
      question.addEventListener('click', () => {
        // Cerrar otros items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Alternar estado
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
      
      // Validación básica
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
      
      // Envío del formulario (simulado)
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      contactForm.reset();
    });
  }
  
  // Funcionalidad para la paginación
  function initPagination() {
    const pageNumbers = document.querySelectorAll('.page-number');
    const pageArrows = document.querySelectorAll('.page-arrow');
    
    if (!pageNumbers.length) return;
    
    let currentPage = Array.from(pageNumbers).findIndex(page => page.classList.contains('active'));
    if (currentPage === -1) currentPage = 0;
    
    function goToPage(index) {
      if (index < 0 || index >= pageNumbers.length) return;
      
      pageNumbers.forEach(p => p.classList.remove('active'));
      pageNumbers[index].classList.add('active');
      currentPage = index;
      
      // Aquí se podría implementar la lógica para cargar el contenido de la página
    }
    
    // Configurar eventos de click en números de página
    pageNumbers.forEach((page, index) => {
      page.addEventListener('click', () => goToPage(index));
    });
    
    // Configurar flechas de navegación
    if (pageArrows.length >= 2) {
      // Flecha izquierda (página anterior)
      pageArrows[0].addEventListener('click', () => {
        if (currentPage > 0) {
          goToPage(currentPage - 1);
        }
      });
      
      // Flecha derecha (página siguiente)
      pageArrows[1].addEventListener('click', () => {
        if (currentPage < pageNumbers.length - 1) {
          goToPage(currentPage + 1);
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
      if (!input || !input.value.trim()) {
        alert('Por favor ingresa tu correo electrónico');
        return;
      }
      
      // Validación básica de email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        alert('Por favor ingresa un correo electrónico válido');
        return;
      }
      
      // Envío del formulario (simulado)
      alert(`¡Gracias por suscribirte! Recibirás nuestras actualizaciones en: ${input.value}`);
      this.reset();
    });
  }
  
  // Activar animaciones al hacer scroll
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .article-card, .feature, .team-member, .category-card');
    
    if (!elements.length) return;
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px'
      });
      
      elements.forEach(el => observer.observe(el));
    } else {
      // Fallback para navegadores que no soportan IntersectionObserver
      elements.forEach(el => el.classList.add('animate'));
    }
  }
  
  // Inicializar la navegación activa
  function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || 
          (currentPage.includes(href) && href !== '') || 
          (href === 'index.html' && currentPage === '')) {
        link.classList.add('active');
      }
    });
  }
  
  // Función principal de inicialización
  function initApp() {
    // Inicializar componentes
    initMobileMenu();
    initSlider();
    initCategoryFilters();
    initArticleSearch(); // Buscador mejorado
    initFAQ();
    initContactForm();
    initPagination();
    initNewsletter();
    initScrollAnimations();
    initActiveNavigation();
    
    console.log('✅ Aplicación SkateWorld inicializada correctamente');
  }
  
  // Inicializar cuando el DOM esté cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    // Si el DOM ya está cargado (script cargado de forma asíncrona)
    initApp();
  }