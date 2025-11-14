// ============================================
// HERO SLIDER MODULE - TAPIPIEL
// ============================================
// Maneja el slider automático del hero con:
// - Rotación automática cada 8 segundos
// - Navegación manual con flechas
// - Navegación con indicadores (dots)
// - Pausa en hover
// - Transiciones suaves
// ============================================

// Importar imágenes del slider para que Vite las incluya en el build
import slide1 from '@assets/images/hero/slide-1.webp';
import slide2 from '@assets/images/hero/slide-2.webp';
import slide3 from '@assets/images/hero/slide-3.webp';
import slide4 from '@assets/images/hero/slide-4.webp';

// Mapeo de imágenes
const slideImages = {
  'src/assets/images/hero/slide-1.webp': slide1,
  'src/assets/images/hero/slide-2.webp': slide2,
  'src/assets/images/hero/slide-3.webp': slide3,
  'src/assets/images/hero/slide-4.webp': slide4,
};

/**
 * Inicializa el slider del hero
 */
export function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  
  // Validar que el slider existe
  if (!slider) {
    console.warn('Hero slider no encontrado en la página');
    return;
  }
  
  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const indicators = Array.from(slider.querySelectorAll('.hero-indicator'));
  const prevButton = slider.querySelector('.hero-prev');
  const nextButton = slider.querySelector('.hero-next');
  
  // Validar elementos necesarios
  if (slides.length === 0) {
    console.warn('No se encontraron slides en el hero slider');
    return;
  }
  
  // Estado del slider
  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 8000; // 8 segundos según especificación
  
  /**
   * Cambia al slide especificado
   * @param {number} index - Índice del slide a mostrar
   */
  function goToSlide(index) {
    // Validar índice
    if (index < 0 || index >= slides.length) {
      return;
    }
    
    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    
    // Remover clase active del indicador actual si existe
    if (indicators.length > 0) {
      indicators[currentSlide].classList.remove('active');
    }
    
    // Actualizar índice
    currentSlide = index;
    
    // Agregar clase active al nuevo slide
    slides[currentSlide].classList.add('active');
    
    // Agregar clase active al nuevo indicador si existe
    if (indicators.length > 0) {
      indicators[currentSlide].classList.add('active');
    }
  }
  
  /**
   * Avanza al siguiente slide
   */
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }
  
  /**
   * Retrocede al slide anterior
   */
  function prevSlide() {
    const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prev);
  }
  
  /**
   * Inicia la rotación automática
   */
  function startAutoplay() {
    // Limpiar intervalo existente si lo hay
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    
    // Crear nuevo intervalo
    autoplayInterval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);
  }
  
  /**
   * Detiene la rotación automática
   */
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }
  
  /**
   * Reinicia la rotación automática
   * Útil después de interacciones manuales
   */
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
  
  // ==========================================
  // EVENT LISTENERS
  // ==========================================
  
  // NAVEGACIÓN CON FLECHAS
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }
  
  // NAVEGACIÓN CON INDICADORES
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
  });
  
  // PAUSAR AUTOPLAY EN HOVER
  slider.addEventListener('mouseenter', () => {
    stopAutoplay();
  });
  
  slider.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // NAVEGACIÓN CON TECLADO (Accesibilidad)
  document.addEventListener('keydown', (e) => {
    // Solo si el slider está visible en el viewport
    const rect = slider.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (!isVisible) return;
    
    // Flecha izquierda
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    }
    
    // Flecha derecha
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });
  
  // ==========================================
  // APLICAR IMÁGENES DE FONDO
  // ==========================================
  
  /**
   * Aplica las imágenes de fondo desde el atributo data-bg
   * Usa las imágenes importadas para producción
   */
  function applyBackgroundImages() {
    slides.forEach(slide => {
      const bgImage = slide.getAttribute('data-bg');
      if (bgImage) {
        // Usar la imagen importada si existe, sino usar la ruta directa
        const imagePath = slideImages[bgImage] || bgImage;
        slide.style.backgroundImage = `url('${imagePath}')`;
      }
    });
  }
  
  // ==========================================
  // INICIALIZACIÓN
  // ==========================================
  
  // Aplicar imágenes de fondo
  applyBackgroundImages();
  
  // Establecer el primer slide como activo
  goToSlide(0);
  
  // Iniciar autoplay
  startAutoplay();
  
  // Log de inicialización
  console.log(`Hero slider inicializado con ${slides.length} slides (${AUTOPLAY_DELAY / 1000}s autoplay)`);
}

// ==========================================
// INICIALIZACIÓN AUTOMÁTICA
// ==========================================

// Si este módulo se importa, se auto-ejecuta cuando el DOM está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  // DOM ya está listo
  initHeroSlider();
}
