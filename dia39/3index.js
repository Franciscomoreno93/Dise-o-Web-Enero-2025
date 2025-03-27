
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const LANGUAGE = 'es-ES';

const elements = {
  searchInput: document.getElementById('searchInput'),
  searchButton: document.getElementById('searchButton'),
  errorMessage: document.getElementById('errorMessage'),
  loading: document.getElementById('loading'),
  resultsContainer: document.getElementById('resultsContainer'),
  resultsCount: document.getElementById('resultsCount')
};

function initApp() {
  elements.searchButton.addEventListener('click', performSearch);
  
  elements.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}


async function performSearch() {
  const searchTerm = elements.searchInput.value.trim();
  
  if (!searchTerm) {
    showError('Por favor introduce un término de búsqueda');
    return;
  }
  
  setLoadingState(true);
  clearResults();
  hideError();
  
  try {
    const movies = await searchMovies(searchTerm);
    
    if (movies.length === 0) {
      showError('No se encontraron películas con ese nombre');
    } else {
      displayMovies(movies, searchTerm);
    }
  } catch (error) {
    showError('Error al buscar películas: ' + error.message);
  } finally {
    setLoadingState(false);
  }
}

/**
 * Consulta la API de TMDB para buscar películas
 * @param {string} query 
 * @returns {Promise<Array>} 
 */
async function searchMovies(query) {
  const url = `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=${LANGUAGE}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.results || [];
}

/**
 * Muestra las películas en el contenedor de resultados
 * @param {Array} movies 
 * @param {string} searchTerm 
 */
function displayMovies(movies, searchTerm) {
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    elements.resultsContainer.appendChild(movieCard);
  });
  
  elements.resultsCount.textContent = `Se encontraron ${movies.length} resultados para "${searchTerm}"`;
}

/**
 * Crea el elemento HTML para una tarjeta de película
 * @param {Object} movie 
 * @returns {HTMLElement} 
 */
function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  
  const posterContent = movie.poster_path 
    ? `<img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}" class="movie-poster">`
    : `<div class="no-poster"><span>Sin imagen</span></div>`;
    
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'Fecha desconocida';
    
  const overview = movie.overview || 'No hay descripción disponible';
  const rating = movie.vote_average ? (Math.round(movie.vote_average * 10) / 10) : 'N/A';
  
  card.innerHTML = `
    ${posterContent}
    <div class="movie-info">
      <h2 class="movie-title">${movie.title}</h2>
      <p class="movie-year">${releaseYear}</p>
      <p class="movie-description">${overview}</p>
      <div class="movie-rating">
        <span class="star-icon">★</span>
        <span class="rating-value">${rating}</span>
      </div>
    </div>
  `;
  
  return card;
}

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje de error 
 */
function showError(message) {
  elements.errorMessage.textContent = message;
  elements.errorMessage.style.display = 'block';
}

function hideError() {
  elements.errorMessage.style.display = 'none';
}

/**
 * Establece el estado de carga
 * @param {boolean} isLoading - Indicador de carga 
 */
function setLoadingState(isLoading) {
  elements.searchButton.disabled = isLoading;
  elements.searchButton.textContent = isLoading ? 'Buscando...' : 'Buscar';
  elements.loading.style.display = isLoading ? 'block' : 'none';
}

function clearResults() {
  elements.resultsContainer.innerHTML = '';
  elements.resultsCount.textContent = '';
}

document.addEventListener('DOMContentLoaded', initApp);