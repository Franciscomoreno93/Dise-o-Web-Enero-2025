/**
 * JavaScript principal del sitio web optimizado
 * Implementa funcionalidades interactivas: navegación móvil, slider,
 * filtrado por categoría, búsqueda en tiempo real, acordeón FAQ y validación de formularios
 */
(() => {
  // Espera a que el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', () => {
    // Selectores simplificados para acceder más fácilmente a los elementos del DOM
    const $ = document.querySelector.bind(document),
          $$ = document.querySelectorAll.bind(document);

    /**
     * NAVEGACIÓN MÓVIL
     */
    // Elementos para el menú hamburguesa responsive
    const menuToggle = $('.menu-toggle'), // Botón de toggle para el menú
          mainNav = $('.main-nav');       // Contenedor principal de navegación

    /**
     * Handler para el toggle del menú móvil
     */
    const handleMenuToggle = () => {
      // Alterna la clase 'active' en la navegación
      mainNav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        // Alterna entre íconos de hamburguesa y cierre (X)
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    };

    if (menuToggle && mainNav) {
      // Evento: Click en botón de menú para mostrar/ocultar navegación en móviles
      menuToggle.addEventListener('click', handleMenuToggle);
    }

    /**
     * SLIDER DE IMÁGENES
     */
    // Elementos para el carrusel/slider
    const slides = $$('.slide'),    // Conjunto de diapositivas
          dots = $$('.slider-dot'); // Indicadores/controles del slider

    if (slides.length && dots.length) {
      let currentSlide = 0;  // Índice de la diapositiva actual
      let slideInterval;     // Variable para almacenar el temporizador de rotación automática

      /**
       * Función para cambiar a una diapositiva específica
       * @param {number} index - Índice de la diapositiva a mostrar
       */
      const goToSlide = index => {
        // Oculta la diapositiva actual y su indicador
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        // Actualiza el índice de la diapositiva actual
        currentSlide = index;
        // Muestra la nueva diapositiva y su indicador
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      };

      /**
       * Handler para avanzar a la siguiente diapositiva
       * Usa el operador módulo (%) para volver al inicio cuando llega al final
       */
      const handleNextSlide = () => goToSlide((currentSlide + 1) % slides.length);
      
      /**
       * Handler para iniciar la rotación automática de diapositivas
       * @returns {number} ID del intervalo para poder cancelarlo después
       */
      const handleStartSlideInterval = () => slideInterval = setInterval(handleNextSlide, 5000);
      
      // Inicia la rotación automática al cargar la página
      handleStartSlideInterval();

      /**
       * Handler para el clic en un dot del slider
       * @param {number} idx - Índice del dot/slide a mostrar
       */
      const handleDotClick = (idx) => {
        // Detiene la rotación automática actual
        clearInterval(slideInterval);
        // Cambia a la diapositiva correspondiente al indicador clicado
        goToSlide(idx);
        // Reinicia la rotación automática
        handleStartSlideInterval();
      };

      // Configurar navegación manual para el slider
      dots.forEach((dot, idx) => {
        // Evento: Click en un indicador/dot del slider
        dot.addEventListener('click', () => handleDotClick(idx));
      });
    }

    /**
     * FILTROS DE CATEGORÍAS Y BÚSQUEDA
     */
    // Elementos para el sistema de filtrado y búsqueda
    const filterTabs = $$('.filter-tab'),    // Pestañas de categorías
          articleCards = $$('.article-card'), // Tarjetas de artículos
          searchInput = $('.search-input'),   // Campo de búsqueda
          searchBtn = $('.search-btn'),       // Botón de búsqueda
          articlesGrid = $('.articles-grid'); // Contenedor de artículos

    // Almacenar contenido original para poder restaurarlo después de buscar
    if (articleCards.length) {
      articleCards.forEach(card => {
        // Guarda el contenido original de títulos y párrafos
        card.querySelectorAll('h3, p').forEach(el => {
          el.setAttribute('data-original', el.innerHTML);
        });
      });
    }

    /**
     * Handler para restaurar el contenido original de las tarjetas
     */
    const handleRestoreOriginalContent = () => {
      articleCards.forEach(card => {
        card.querySelectorAll('[data-original]').forEach(el => {
          el.innerHTML = el.getAttribute('data-original');
        });
      });
    };

    /**
     * Handler para el filtrado por categorías
     * @param {Element} clickedTab - La pestaña de categoría clickeada
     */
    const handleCategoryFilter = (clickedTab) => {
      // Actualiza las pestañas: quita la clase active de todas
      filterTabs.forEach(t => t.classList.remove('active'));
      // Y la añade solo a la pestaña clickeada
      clickedTab.classList.add('active');

      // Obtiene y normaliza la categoría seleccionada
      const category = clickedTab.textContent.trim().toLowerCase();

      // Filtra las tarjetas según la categoría seleccionada
      articleCards.forEach(card => {
        const categoryEl = card.querySelector('.article-category');
        if (!categoryEl) {
          // Si la tarjeta no tiene categoría, siempre mostrarla
          card.style.display = 'block';
          return;
        }

        // Muestra las tarjetas que coincidan con la categoría o si se seleccionó 'todos'
        card.style.display = (category === 'todos' || 
          categoryEl.textContent.trim().toLowerCase() === category) ? 
          'block' : 'none';
      });

      // Limpia el campo de búsqueda para evitar confusiones
      if (searchInput) searchInput.value = '';
      
      // Restaura el contenido original (sin resaltado de búsqueda)
      handleRestoreOriginalContent();
    };

    // Filtro por categorías
    if (filterTabs.length && articleCards.length) {
      filterTabs.forEach(tab => {
        // Evento: Click en una pestaña de categoría
        tab.addEventListener('click', function() {
          handleCategoryFilter(this);
        });
      });
    }

    /**
     * Handler para ejecutar la búsqueda en artículos
     * Filtra las tarjetas y resalta los términos encontrados
     */
    const handleSearch = () => {
      // Obtiene y normaliza el término de búsqueda
      const term = searchInput.value.trim().toLowerCase();
      // Verifica si ya existe un mensaje de "no se encontraron resultados"
      const noResults = $('.no-results');
      
      // Elimina mensaje de no resultados si existe
      if (noResults) noResults.remove();

      // Si el término está vacío, restaura todas las tarjetas
      if (!term) {
        handleRestoreOriginalContent();
        // Muestra todas las tarjetas (considerando el filtro de categoría)
        articleCards.forEach(card => {
          card.style.display = '';
        });
        return;
      }

      // Variable para controlar si se encontraron resultados
      let foundResults = false;
      
      // Obtiene información de la categoría activa
      const activeTab = $('.filter-tab.active');
      const activeCategory = activeTab ? 
                            activeTab.textContent.trim().toLowerCase() : null;
      // Determina si se deben mostrar todas las categorías
      const showAllCategories = !activeCategory || activeCategory === 'todos';

      // Procesa cada tarjeta de artículo
      articleCards.forEach(card => {
        // Restaura el contenido original antes de aplicar nuevo filtro
        card.querySelectorAll('[data-original]').forEach(el => {
          el.innerHTML = el.getAttribute('data-original');
        });

        // Verifica si la tarjeta coincide con el filtro de categoría
        let categoryMatch = showAllCategories;
        if (!showAllCategories) {
          const cardCategory = card.querySelector('.article-category');
          if (cardCategory) {
            categoryMatch = cardCategory.textContent.trim().toLowerCase() === activeCategory;
          }
        }

        // Verifica si el texto contiene el término de búsqueda y coincide con la categoría
        if (card.textContent.toLowerCase().includes(term) && categoryMatch) {
          // Muestra la tarjeta
          card.style.display = '';
          foundResults = true;

          // Resalta las coincidencias del término de búsqueda
          card.querySelectorAll('h3, p').forEach(el => {
            // Obtiene el texto original
            const original = el.getAttribute('data-original');
            // Escapa caracteres especiales en el término
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Reemplaza coincidencias con un span resaltado
            el.innerHTML = original.replace(
              new RegExp(`(${escapedTerm})`, 'gi'),
              '<span class="highlight">$1</span>'
            );
          });
        } else {
          // Oculta las tarjetas que no coinciden
          card.style.display = 'none';
        }
      });

      // Muestra mensaje cuando no hay resultados
      if (!foundResults && articlesGrid) {
        // Crea un elemento para mostrar el mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = 'no-results';
        messageDiv.innerHTML = `
          <p>No se encontraron resultados para: <strong>"${term}"</strong></p>
          <p>Intenta con otros términos o navega por categorías.</p>
        `;
        // Inserta el mensaje en el grid de artículos
        articlesGrid.appendChild(messageDiv);
      }
    };

    // Búsqueda de artículos
    if (searchInput && articleCards.length) {
      // Crea una versión con debounce de la función de búsqueda
      const debouncedSearch = debounce(handleSearch, 300);
      
      /**
       * Handler para el clic en el botón de búsqueda
       * @param {Event} e - Evento de clic
       */
      const handleSearchButtonClick = (e) => {
        e.preventDefault(); // Previene envío de formulario
        handleSearch();     // Ejecuta búsqueda inmediatamente
      };
      
      /**
       * Handler para el evento keydown en el campo de búsqueda
       * @param {Event} e - Evento de teclado
       */
      const handleSearchKeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Previene envío de formulario
          handleSearch();     // Ejecuta búsqueda inmediatamente
        }
      };
      
      // Evento: Click en el botón de búsqueda
      if (searchBtn) {
        searchBtn.addEventListener('click', handleSearchButtonClick);
      }

      // Evento: Presionar Enter en el campo de búsqueda
      searchInput.addEventListener('keydown', handleSearchKeydown);

      // Evento: Escribir en el campo de búsqueda (con debounce)
      searchInput.addEventListener('input', debouncedSearch);
    }

    /**
     * ACORDEÓN PARA FAQS
     */
    // Elementos para el acordeón de preguntas frecuentes
    const faqItems = $$('.faq-item');

    /**
     * Handler para el toggle del acordeón FAQ
     * @param {Element} item - El elemento FAQ a mostrar/ocultar
     */
    const handleFaqToggle = (item) => {
      // Verifica si este item ya está activo (abierto)
      const isActive = item.classList.contains('active');
      
      // Cierra todos los items primero
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      
      // Si el item no estaba abierto, lo abre
      if (!isActive) {
        item.classList.add('active');
      }
    };

    if (faqItems.length) {
      faqItems.forEach(item => {
        // Obtiene el elemento de pregunta dentro de cada item
        const question = item.querySelector('.faq-question');
        if (question) {
          // Evento: Click en una pregunta del acordeón
          question.addEventListener('click', () => handleFaqToggle(item));
        }
      });
    }

    /**
     * VALIDACIÓN DE FORMULARIOS
     */
    // Elemento del formulario de contacto
    const contactForm = $('#contactForm');
    
    /**
     * Handler para validar y procesar el envío del formulario
     * @param {Event} e - Evento de envío del formulario
     */
    const handleFormSubmit = (e) => {
      e.preventDefault(); // Previene el envío tradicional del formulario
      
      // Variable para verificar validez del formulario
      let isValid = true;
      
      // Valida todos los campos requeridos
      contactForm.querySelectorAll('[required]').forEach(field => {
        // Verifica si el campo está vacío después de quitar espacios
        const isEmpty = !field.value.trim();
        // Añade/quita clase de error según corresponda
        field.classList.toggle('error', isEmpty);
        // Si algún campo está vacío, marca el formulario como inválido
        if (isEmpty) isValid = false;
      });

      // Si el formulario no es válido, muestra mensaje y detiene el proceso
      if (!isValid) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }

      // Si todo está bien, muestra confirmación y resetea el formulario
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      contactForm.reset();
    };
    
    if (contactForm) {
      // Evento: Envío del formulario
      contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    /**
     * UTILIDAD: Debounce para mejorar rendimiento
     * Limita la frecuencia con la que se ejecuta una función
     * Es útil para eventos como 'input' que se disparan muchas veces
     * 
     * @param {Function} func - La función a ejecutar con limitación
     * @param {number} wait - Tiempo de espera en milisegundos
     * @returns {Function} - Versión de la función con debounce aplicado
     */
    function debounce(func, wait) {
      // Variable para almacenar el temporizador
      let timeout;
      // Devuelve una función que aplica el debounce
      return function(...args) {
        // Cancela el temporizador anterior si existe
        clearTimeout(timeout);
        // Configura un nuevo temporizador
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  });
})();