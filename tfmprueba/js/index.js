/**
 * SkateWorld - JavaScript principal optimizado con comentarios detallados
 */

// Funciones de utilidad para seleccionar elementos del DOM
// $ para seleccionar un elemento único y $$ para seleccionar múltiples elementos
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Inicializar todas las funcionalidades cuando el DOM esté completamente cargado
// Esto asegura que todos los elementos HTML estén disponibles para manipular
document.addEventListener('DOMContentLoaded', () => {
  // ----- NAVEGACIÓN MÓVIL -----
  // Seleccionar el botón de menú hamburguesa y el contenedor de navegación principal
  const menuToggle = $('.menu-toggle');
  const mainNav = $('.main-nav');
  
  // Verificar que existan ambos elementos antes de configurar el comportamiento del menú
  if (menuToggle && mainNav) {
    // Agregar evento de clic para mostrar/ocultar el menú móvil
    menuToggle.addEventListener('click', () => {
      // Alternar la clase 'active' que controla la visibilidad del menú
      mainNav.classList.toggle('active');
      // Buscar el ícono dentro del botón de menú
      const icon = menuToggle.querySelector('i');
      if (icon) {
        // Cambiar el ícono dependiendo del estado del menú (abierto/cerrado)
        if (mainNav.classList.contains('active')) {
          // Reemplazar el ícono de barras por el de X cuando el menú está abierto
          icon.classList.replace('fa-bars', 'fa-times');
        } else {
          // Reemplazar el ícono de X por el de barras cuando el menú está cerrado
          icon.classList.replace('fa-times', 'fa-bars');
        }
      }
    });
  }
  
  // ----- SLIDER DE IMÁGENES -----
  // Seleccionar todas las diapositivas y los puntos de navegación del slider
  const slides = $$('.slide');
  const dots = $$('.slider-dot');
  
  // Verificar que existan diapositivas y puntos de navegación
  if (slides.length && dots.length) {
    // Inicializar la diapositiva actual y configurar el intervalo de cambio automático
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Función para avanzar a la siguiente diapositiva
    function nextSlide() {
      // Remover la clase 'active' de todas las diapositivas y puntos
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Calcular el índice de la siguiente diapositiva (con ciclo circular)
      currentSlide = (currentSlide + 1) % slides.length;
      // Activar la nueva diapositiva y su punto correspondiente
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }
    
    // Configurar la navegación manual mediante los puntos
    dots.forEach((dot, idx) => {
      // Agregar evento de clic a cada punto de navegación
      dot.addEventListener('click', () => {
        // Detener el cambio automático al hacer clic manual
        clearInterval(slideInterval);
        // Remover la clase 'active' de todas las diapositivas y puntos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Actualizar el índice de la diapositiva actual y activar la seleccionada
        currentSlide = idx;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reiniciar el intervalo de cambio automático después del clic manual
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }
  
  // ----- FILTROS DE CATEGORÍAS -----
  // Seleccionar todas las pestañas de filtro y tarjetas de artículos
  const filterTabs = $$('.filter-tab');
  const articleCards = $$('.article-card');
  
  // Verificar que existan pestañas de filtro y tarjetas de artículos
  if (filterTabs.length && articleCards.length) {
    // Configurar cada pestaña de filtro con su comportamiento
    filterTabs.forEach(tab => {
      // Agregar evento de clic a cada pestaña
      tab.addEventListener('click', function() {
        // Actualizar la apariencia de las pestañas (desactivar todas y activar la seleccionada)
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Obtener la categoría seleccionada en minúsculas para comparación
        const category = this.textContent.trim().toLowerCase();
        
        // Filtrar y mostrar/ocultar artículos según la categoría seleccionada
        articleCards.forEach(card => {
          // Obtener el elemento que contiene la categoría del artículo
          const categoryEl = card.querySelector('.article-category');
          // Si el artículo no tiene categoría, mostrarlo siempre
          if (!categoryEl) {
            card.style.display = 'block';
            return;
          }
          
          // Comparar la categoría del artículo con la seleccionada
          const cardCategory = categoryEl.textContent.trim().toLowerCase();
          // Mostrar el artículo si coincide con la categoría o si se seleccionó 'todos'
          card.style.display = (category === 'todos' || cardCategory === category) ? 'block' : 'none';
        });
        
        // Limpiar el campo de búsqueda cuando se cambia de categoría
        const searchInput = $('.search-input');
        if (searchInput) searchInput.value = '';
      });
    });
  }
  
  // ----- BUSCADOR DE ARTÍCULOS -----
  // Inicializar la funcionalidad de búsqueda
  initArticleSearch();
  
  // Función que implementa la búsqueda de artículos
  function initArticleSearch() {
    // Seleccionar elementos necesarios para la búsqueda
    const searchInput = $('.search-input');
    const searchBtn = $('.search-btn');
    const articlesGrid = $('.articles-grid');
    const articleCards = $$('.article-card');
    
    // Salir si no hay campo de búsqueda o artículos para buscar
    if (!searchInput || !articleCards.length) return;
    
    // Añadir estilos CSS para el resaltado de resultados
    const style = document.createElement('style');
    // Definir estilos para elementos resaltados y mensajes de no resultados
    style.textContent = `
      .highlight {background-color: #ffeb3b; color: #000; padding: 0 2px; font-weight: bold;}
      .no-results {text-align: center; padding: 30px; background: #f8f8f8; border-radius: 10px; margin: 20px 0;}
    `;
    // Agregar los estilos al documento
    document.head.appendChild(style);
    
    // Guardar el texto original de los elementos para poder restaurarlo después
    articleCards.forEach(card => {
      // Seleccionar elementos de texto dentro de cada tarjeta
      const textElements = card.querySelectorAll('h3, p');
      // Almacenar el HTML original como atributo en cada elemento
      textElements.forEach(el => {
        el.setAttribute('data-original', el.innerHTML);
      });
    });
    
    // Función principal que realiza la búsqueda
    function performSearch() {
      // Obtener el término de búsqueda y convertirlo a minúsculas
      const term = searchInput.value.trim().toLowerCase();
      
      // Eliminar mensaje previo de no resultados si existe
      const noResults = $('.no-results');
      if (noResults) noResults.remove();
      
      // Si no hay término de búsqueda, mostrar todos los artículos
      if (!term) {
        articleCards.forEach(card => {
          // Restaurar el contenido original de la tarjeta
          resetCard(card);
          // Mostrar la tarjeta
          card.style.display = '';
        });
        return;
      }
      
      // Variable para rastrear si se encontraron resultados
      let foundResults = false;
      
      // Procesar cada tarjeta de artículo
      articleCards.forEach(card => {
        // Restaurar el contenido original antes de buscar
        resetCard(card);
        
        // Verificar compatibilidad con el filtro de categoría activo
        let categoryMatch = true;
        // Buscar si hay alguna pestaña de filtro activa
        const activeTab = $('.filter-tab.active');
        if (activeTab && activeTab.textContent.trim().toLowerCase() !== 'todos') {
          // Obtener la categoría del artículo actual
          const cardCategory = card.querySelector('.article-category');
          if (cardCategory) {
            // Comparar la categoría del artículo con la categoría filtrada
            categoryMatch = cardCategory.textContent.trim().toLowerCase() === 
                           activeTab.textContent.trim().toLowerCase();
          }
        }
        
        // Buscar el término en todo el texto del artículo
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(term) && categoryMatch) {
          // Mostrar el artículo si coincide con la búsqueda y el filtro
          card.style.display = '';
          foundResults = true;
          
          // Resaltar las coincidencias en los elementos de texto
          const textElements = card.querySelectorAll('h3, p');
          textElements.forEach(el => {
            // Obtener el contenido original del elemento
            const original = el.getAttribute('data-original');
            // Escapar caracteres especiales en el término de búsqueda para usar en regex
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Crear expresión regular para buscar coincidencias
            const regex = new RegExp(`(${escapedTerm})`, 'gi');
            // Reemplazar coincidencias con span resaltado
            el.innerHTML = original.replace(regex, '<span class="highlight">$1</span>');
          });
        } else {
          // Ocultar el artículo si no coincide
          card.style.display = 'none';
        }
      });
      
      // Mostrar mensaje si no se encontraron resultados
      if (!foundResults && articlesGrid) {
        // Crear elemento para mostrar mensaje
        const messageDiv = document.createElement('div');
        // Asignar clase y contenido HTML al mensaje
        messageDiv.className = 'no-results';
        messageDiv.innerHTML = `
          <p>No se encontraron resultados para: <strong>"${term}"</strong></p>
          <p>Intenta con otros términos o navega por categorías.</p>
        `;
        // Agregar mensaje al contenedor de artículos
        articlesGrid.appendChild(messageDiv);
      }
    }
    
    // Función para restaurar el contenido original de una tarjeta
    function resetCard(card) {
      // Seleccionar elementos que tienen contenido original guardado
      const textElements = card.querySelectorAll('[data-original]');
      // Restaurar el HTML original de cada elemento
      textElements.forEach(el => {
        el.innerHTML = el.getAttribute('data-original');
      });
    }
    
    // Configuración de eventos para activar la búsqueda
    if (searchBtn) {
      // Evento para el botón de búsqueda
      searchBtn.addEventListener('click', (e) => {
        // Prevenir comportamiento predeterminado del formulario
        e.preventDefault();
        // Ejecutar la búsqueda
        performSearch();
      });
    }
    
    // Evento para buscar al presionar Enter en el campo
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // Prevenir comportamiento predeterminado
        e.preventDefault();
        // Ejecutar la búsqueda
        performSearch();
      }
    });
    
    // Búsqueda automática mientras se escribe (con retraso)
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      // Cancelar búsqueda anterior si el usuario sigue escribiendo
      clearTimeout(searchTimeout);
      // Configurar nueva búsqueda con retraso para mejor rendimiento
      searchTimeout = setTimeout(performSearch, 300);
    });
  }
  
  // ----- ACORDEÓN PARA FAQs -----
  // Seleccionar todos los elementos de preguntas frecuentes
  const faqItems = $$('.faq-item');
  if (faqItems.length) {
    // Configurar cada elemento del acordeón
    faqItems.forEach(item => {
      // Obtener el elemento de pregunta dentro del item
      const question = item.querySelector('.faq-question');
      if (!question) return;
      
      // Agregar evento de clic a la pregunta
      question.addEventListener('click', () => {
        // Cerrar todos los otros elementos del acordeón
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            // Remover clase active de los elementos que no sean el actual
            otherItem.classList.remove('active');
          }
        });
        
        // Alternar el estado de apertura/cierre del elemento actual
        item.classList.toggle('active');
      });
    });
  }
  
  // ----- FORMULARIO DE CONTACTO -----
  // Seleccionar el formulario de contacto
  const contactForm = $('#contactForm');
  if (contactForm) {
    // Agregar evento de envío del formulario
    contactForm.addEventListener('submit', (e) => {
      // Prevenir el envío predeterminado del formulario
      e.preventDefault();
      
      // Validar campos requeridos
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      // Verificar que todos los campos requeridos tengan contenido
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          // Marcar campo como error si está vacío
          field.classList.add('error');
          isValid = false;
        } else {
          // Quitar marca de error si tiene contenido
          field.classList.remove('error');
        }
      });
      
      // Mostrar mensaje si hay campos inválidos
      if (!isValid) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
      
      // Mostrar mensaje de éxito y limpiar el formulario
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      contactForm.reset();
    });
  }
  
  // ----- FORMULARIO DE NEWSLETTER -----
  // Seleccionar el formulario de suscripción al newsletter
  const newsletterForm = $('.newsletter-form');
  if (newsletterForm) {
    // Agregar evento de envío del formulario
    newsletterForm.addEventListener('submit', (e) => {
      // Prevenir el envío predeterminado del formulario
      e.preventDefault();
      
      // Obtener y validar el campo de email
      const input = newsletterForm.querySelector('input');
      if (!input || !input.value.trim()) {
        // Mostrar error si el campo está vacío
        alert('Por favor ingresa tu correo electrónico');
        return;
      }
      
      // Validar formato de email con expresión regular
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        // Mostrar error si el formato de email es inválido
        alert('Por favor ingresa un correo electrónico válido');
        return;
      }
      
      // Mostrar mensaje de éxito y limpiar el formulario
      alert(`¡Gracias por suscribirte! Recibirás nuestras actualizaciones en: ${input.value}`);
      newsletterForm.reset();
    });
  }
});