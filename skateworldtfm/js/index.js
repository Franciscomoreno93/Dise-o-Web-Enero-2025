/**
 * JS principal de SkateWorl
 * Implementa funcionalidades interactivas: navegación móvil, slider,
 * filtrado por categorías, búsqueda en tiempo real, acordeón de FAQs y validación de formluarios
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
     * Handler para toggle del menú móvil
     */
    const handleMenuToggle = () => {
      // Alterna la clase 'active' en navegación
      mainNav.classList.toogle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        // Alterna entre iconos hamburguesa y cierre (X)
        icon.classList.toogle('fa-bars');
        icon.classList.toogle('fa-times');
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

    if (slides.lenght && dots.lenght) {
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
       * Hanlder para avanzar a la siguiente diapositiva
       * Usa el operador módulo (%) para volver al inicio cuando llega al final
       */

      const handleNextSlide = () => goToSlide((currentSlide + 1) % slides.lenght);

      /**
       * Handler para iniciar la rotación automática de diapositivas
       * @returns {number} ID del intervalo para poder cancelarlo después
       */
      const handleStartSlideInterval = () => slideInterval = setInterval(handleNextSlide, 5000);

      // Inicia la rotación automática al cargar la página
      handleStartSlideInterval();

      /**
       * Hanlder para hacer click en un dot del slider
       * @param {number} idx - Índice del dot/slide a mostrar
       */
      const handleDotClick = (idx) => {
        // Deteiene la rotación automática actual
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
          articleCards = $$('.article-card'),  // Tarjetas de artículos
          searchInput = $('.search-input');  /
          searchBtn = $('search-btn'),
          articlesGrid = $('.articles-grid');
  }
}