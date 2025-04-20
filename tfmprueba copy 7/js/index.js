/**
 * JavaScript principal del sitio web
 * Este código implementa múltiples funcionalidades interactivas como:
 * - Navegación móvil con menú hamburguesa
 * - Slider de imágenes automático con controles
 * - Filtrado de artículos por categoría
 * - Búsqueda de artículos en tiempo real
 * - Acordeón para preguntas frecuentes
 * - Validación de formularios
 */
(() => {
  /**
   * INICIALIZACIÓN
   * Espera a que el DOM esté completamente cargado antes de ejecutar código
   */
  document.addEventListener('DOMContentLoaded', () => {
    /**
     * UTILIDADES
     * Funciones de ayuda para simplificar la selección de elementos DOM
     */
    // Selector simplificado para un solo elemento (equivalente a querySelector)
    const $ = s => document.querySelector(s),
      // Selector simplificado para múltiples elementos (equivalente a querySelectorAll)
      $$ = s => document.querySelectorAll(s);

    /**
     * NAVEGACIÓN MÓVIL
     * Implementa un menú desplegable para dispositivos móviles
     */
    const menuToggle = $('.menu-toggle'),  // Botón de hamburguesa
      mainNav = $('.main-nav');        // Menú de navegación

    if (menuToggle && mainNav) {
      // Alterna la clase 'active' en el menú y cambia el ícono al hacer clic
      menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');  // Muestra/oculta el menú
        const icon = menuToggle.querySelector('i');
        if (icon) {
          // Cambia el ícono entre hamburguesa y X
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });

      // Asegúrate de que todos los elementos del menú sean visibles
      const menuItems = mainNav.querySelectorAll('li a');
      menuItems.forEach(item => {
        item.style.display = 'block';
      });
    }

    /**
 * SLIDER DE IMÁGENES
 * Rotación automática de imágenes con indicadores de navegación
 */
    const slides = document.querySelectorAll('.slide');  // Todas las diapositivas
    const dots = document.querySelectorAll('.slider-dot');  // Indicadores de navegación

    if (slides.length && dots.length) {
      let currentSlide = 0;  // Índice de la diapositiva actual
      let slideInterval = setInterval(nextSlide, 5000);  // Transición automática cada 5 segundos

      // Función para avanzar a la siguiente diapositiva
      function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
      }

      // Función para ir a una diapositiva específica
      function goToSlide(index) {
        // Quita la clase 'active' de todas las diapositivas e indicadores
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Actualiza el índice actual y activa la nueva diapositiva
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      }

      // Manejo de clic en los indicadores para navegación manual
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          // Detiene la rotación automática temporalmente
          clearInterval(slideInterval);

          // Cambia a la diapositiva seleccionada
          goToSlide(idx);

          // Reinicia la rotación automática
          slideInterval = setInterval(nextSlide, 5000);
        });
      });
    }

    /**
     * FILTROS DE CATEGORÍAS
     * Sistema de filtrado para mostrar artículos según su categoría
     */
    const filterTabs = $$('.filter-tab'),  // Pestañas de filtrado
      articleCards = $$('.article-card');  // Tarjetas de artículos

    if (filterTabs.length && articleCards.length) {
      filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
          // Desactiva todas las pestañas y activa la seleccionada
          filterTabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');

          // Obtiene la categoría seleccionada
          const category = this.textContent.trim().toLowerCase();

          // Filtra las tarjetas según la categoría
          articleCards.forEach(card => {
            const categoryEl = card.querySelector('.article-category');
            if (!categoryEl) {
              // Si la tarjeta no tiene categoría, siempre se muestra
              card.style.display = 'block';
              return;
            }

            // Muestra la tarjeta si coincide con la categoría o si es 'todos'
            card.style.display = (category === 'todos' ||
              categoryEl.textContent.trim().toLowerCase() === category) ?
              'block' : 'none';
          });

          // Limpia el campo de búsqueda al cambiar de categoría
          const searchInput = $('.search-input');
          if (searchInput) searchInput.value = '';
        });
      });
    }

    /**
     * BUSCADOR DE ARTÍCULOS
     * Funcionalidad de búsqueda en tiempo real con resaltado de coincidencias
     */
    const searchInput = $('.search-input'),  // Campo de búsqueda
      searchBtn = $('.search-btn'),      // Botón de búsqueda
      articlesGrid = $('.articles-grid'); // Contenedor de artículos

    if (searchInput && articleCards.length) {
      // Almacena el contenido original para poder restaurarlo
      articleCards.forEach(card => {
        card.querySelectorAll('h3, p').forEach(el => {
          el.setAttribute('data-original', el.innerHTML);
        });
      });

      // Función principal de búsqueda
      const performSearch = () => {
        const term = searchInput.value.trim().toLowerCase();  // Término de búsqueda
        const noResults = $('.no-results');  // Mensaje de "no hay resultados"

        // Elimina el mensaje previo de "no hay resultados" si existe
        if (noResults) noResults.remove();

        // Si el término está vacío, restaura todos los artículos
        if (!term) {
          articleCards.forEach(card => {
            card.querySelectorAll('[data-original]').forEach(el => {
              el.innerHTML = el.getAttribute('data-original');
            });
            card.style.display = '';
          });
          return;
        }

        let foundResults = false;  // Bandera para determinar si se encontraron resultados

        articleCards.forEach(card => {
          // Restaura el contenido original de la tarjeta
          card.querySelectorAll('[data-original]').forEach(el => {
            el.innerHTML = el.getAttribute('data-original');
          });

          // Verifica si el filtro de categoría actual permite mostrar esta tarjeta
          let categoryMatch = true;
          const activeTab = $('.filter-tab.active');

          if (activeTab && activeTab.textContent.trim().toLowerCase() !== 'todos') {
            const cardCategory = card.querySelector('.article-category');
            if (cardCategory) {
              categoryMatch = cardCategory.textContent.trim().toLowerCase() ===
                activeTab.textContent.trim().toLowerCase();
            }
          }

          // Si el texto de la tarjeta contiene el término y coincide con la categoría
          if (card.textContent.toLowerCase().includes(term) && categoryMatch) {
            card.style.display = '';
            foundResults = true;

            // Resalta las coincidencias del término en el texto
            card.querySelectorAll('h3, p').forEach(el => {
              const original = el.getAttribute('data-original');
              // Escapa caracteres especiales en el término de búsqueda
              const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              // Reemplaza las coincidencias con etiquetas span resaltadas
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
          const messageDiv = document.createElement('div');
          messageDiv.className = 'no-results';
          messageDiv.innerHTML = `
            <p>No se encontraron resultados para: <strong>"${term}"</strong></p>
            <p>Intenta con otros términos o navega por categorías.</p>
          `;
          articlesGrid.appendChild(messageDiv);
        }
      };

      // Evento de clic en el botón de búsqueda
      if (searchBtn) {
        searchBtn.addEventListener('click', e => {
          e.preventDefault();
          performSearch();
        });
      }

      // Evento de tecla Enter en el campo de búsqueda
      searchInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch();
        }
      });

      // Búsqueda en tiempo real con retraso para mejorar rendimiento
      let searchTimeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);  // Espera 300ms después de dejar de escribir
      });
    }

    /**
 * ACORDEÓN PARA FAQS
 * Implementa un sistema de acordeón para mostrar/ocultar respuestas
 */
    const faqItems = document.querySelectorAll('.faq-item');  // Elementos de preguntas frecuentes

    if (faqItems.length) {
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
          question.addEventListener('click', () => {
            // Cierra otros elementos abiertos
            faqItems.forEach(otherItem => {
              if (otherItem !== item) otherItem.classList.remove('active');
            });
            // Alterna el estado del elemento actual
            item.classList.toggle('active');
          });
        }
      });
    }

    /**
     * GESTIÓN DE FORMULARIOS
     * Funciones genéricas para manejar formularios
     */
    // Función auxiliar para manejar la validación y envío de formularios
    const handleForm = (form, validator) => {
      if (!form) return;
      form.addEventListener('submit', e => {
        e.preventDefault();  // Previene el envío tradicional del formulario
        validator(form);     // Ejecuta la función de validación personalizada
      });
    };

    /**
     * FORMULARIO DE CONTACTO
     * Validación y procesamiento del formulario de contacto
     */
    handleForm($('#contactForm'), form => {
      let isValid = true;
      // Valida que todos los campos requeridos estén completos
      form.querySelectorAll('[required]').forEach(field => {
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

      // Simulación de envío exitoso
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      form.reset();  // Limpia el formulario
    });
  });
})();