(() => {
    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
      // Selectores simplificados
      const $ = s => document.querySelector(s),
            $$ = s => document.querySelectorAll(s);
      
      // Navegación móvil
      const menuToggle = $('.menu-toggle'),
            mainNav = $('.main-nav');
            
      if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
          mainNav.classList.toggle('active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
          }
        });
      }
    
      // Slider de imágenes
      const slides = $$('.slide'),
            dots = $$('.slider-dot');
            
      if (slides.length && dots.length) {
        let currentSlide = 0;
        let slideInterval = setInterval(nextSlide, 5000);
        
        function nextSlide() {
          slides.forEach(s => s.classList.remove('active'));
          dots.forEach(d => d.classList.remove('active'));
          
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
          dots[currentSlide].classList.add('active');
        }
        
        dots.forEach((dot, idx) => {
          dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            currentSlide = idx;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            slideInterval = setInterval(nextSlide, 5000);
          });
        });
      }
    
      // Filtros de categorías
      const filterTabs = $$('.filter-tab'),
            articleCards = $$('.article-card');
            
      if (filterTabs.length && articleCards.length) {
        filterTabs.forEach(tab => {
          tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent.trim().toLowerCase();
            
            articleCards.forEach(card => {
              const categoryEl = card.querySelector('.article-category');
              if (!categoryEl) {
                card.style.display = 'block';
                return;
              }
              
              card.style.display = (category === 'todos' || 
                                   categoryEl.textContent.trim().toLowerCase() === category) ? 
                                   'block' : 'none';
            });
            
            const searchInput = $('.search-input');
            if (searchInput) searchInput.value = '';
          });
        });
      }
    
      // Buscador de artículos
      const searchInput = $('.search-input'),
            searchBtn = $('.search-btn'),
            articlesGrid = $('.articles-grid');
            
      if (searchInput && articleCards.length) {
        // Guardar texto original
        articleCards.forEach(card => {
          card.querySelectorAll('h3, p').forEach(el => {
            el.setAttribute('data-original', el.innerHTML);
          });
        });
        
        const performSearch = () => {
          const term = searchInput.value.trim().toLowerCase();
          const noResults = $('.no-results');
          
          if (noResults) noResults.remove();
          
          if (!term) {
            articleCards.forEach(card => {
              card.querySelectorAll('[data-original]').forEach(el => {
                el.innerHTML = el.getAttribute('data-original');
              });
              card.style.display = '';
            });
            return;
          }
          
          let foundResults = false;
          
          articleCards.forEach(card => {
            // Reset card
            card.querySelectorAll('[data-original]').forEach(el => {
              el.innerHTML = el.getAttribute('data-original');
            });
            
            let categoryMatch = true;
            const activeTab = $('.filter-tab.active');
            
            if (activeTab && activeTab.textContent.trim().toLowerCase() !== 'todos') {
              const cardCategory = card.querySelector('.article-category');
              if (cardCategory) {
                categoryMatch = cardCategory.textContent.trim().toLowerCase() === 
                               activeTab.textContent.trim().toLowerCase();
              }
            }
            
            if (card.textContent.toLowerCase().includes(term) && categoryMatch) {
              card.style.display = '';
              foundResults = true;
              
              card.querySelectorAll('h3, p').forEach(el => {
                const original = el.getAttribute('data-original');
                const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                el.innerHTML = original.replace(
                  new RegExp(`(${escapedTerm})`, 'gi'), 
                  '<span class="highlight">$1</span>'
                );
              });
            } else {
              card.style.display = 'none';
            }
          });
          
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
        
        if (searchBtn) {
          searchBtn.addEventListener('click', e => {
            e.preventDefault();
            performSearch();
          });
        }
        
        searchInput.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
          }
        });
        
        let searchTimeout;
        searchInput.addEventListener('input', () => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(performSearch, 300);
        });
      }
    
      // Acordeón para FAQs
      const faqItems = $$('.faq-item');
      
      if (faqItems.length) {
        faqItems.forEach(item => {
          const question = item.querySelector('.faq-question');
          if (question) {
            question.addEventListener('click', () => {
              faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
              });
              item.classList.toggle('active');
            });
          }
        });
      }
    
      // Formularios
      const handleForm = (form, validator) => {
        if (!form) return;
        form.addEventListener('submit', e => {
          e.preventDefault();
          validator(form);
        });
      };
      
      // Formulario de contacto
      handleForm($('#contactForm'), form => {
        let isValid = true;
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
        
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        form.reset();
      });
      
      // Formulario de newsletter
      handleForm($('.newsletter-form'), form => {
        const input = form.querySelector('input');
        if (!input || !input.value.trim()) {
          alert('Por favor ingresa tu correo electrónico');
          return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          alert('Por favor ingresa un correo electrónico válido');
          return;
        }
        
        alert(`¡Gracias por suscribirte! Recibirás nuestras actualizaciones en: ${input.value}`);
        form.reset();
      });
    });
  })();