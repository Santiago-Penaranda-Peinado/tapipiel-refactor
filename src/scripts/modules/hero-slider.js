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
import slide1Mobile from '@assets/images/hero/slide-1-mb.webp';
import slide2Mobile from '@assets/images/hero/slide-2-mb.webp';
import slide3Mobile from '@assets/images/hero/slide-3-mb.webp';
import slide4Mobile from '@assets/images/hero/slide-4-mb.webp';

// Mapeo de imágenes desktop
const slideImages = {
  'src/assets/images/hero/slide-1.webp': slide1,
  'src/assets/images/hero/slide-2.webp': slide2,
  'src/assets/images/hero/slide-3.webp': slide3,
  'src/assets/images/hero/slide-4.webp': slide4,
};

// Mapeo de imágenes mobile
const slideImagesMobile = {
  'src/assets/images/hero/slide-1-mb.webp': slide1Mobile,
  'src/assets/images/hero/slide-2-mb.webp': slide2Mobile,
  'src/assets/images/hero/slide-3-mb.webp': slide3Mobile,
  'src/assets/images/hero/slide-4-mb.webp': slide4Mobile,
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
  // NAVEGACIÓN CON GESTOS TÁCTILES (TOUCH/SWIPE)
  // ==========================================
  
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const SWIPE_THRESHOLD = 50; // Mínima distancia para considerar un swipe (px)
  
  /**
   * Maneja el inicio del touch
   */
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  /**
   * Maneja el final del touch y detecta la dirección del swipe
   */
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  /**
   * Determina la dirección del swipe y ejecuta la acción correspondiente
   */
  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Verificar si es un movimiento horizontal significativo
    // y que no sea principalmente vertical (scroll)
    if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swipe hacia la derecha - ir al slide anterior
        prevSlide();
        resetAutoplay();
      } else {
        // Swipe hacia la izquierda - ir al siguiente slide
        nextSlide();
        resetAutoplay();
      }
    }
  }
  
  // ==========================================
  // APLICAR IMÁGENES DE FONDO
  // ==========================================
  
  /**
   * Aplica las imágenes de fondo desde el atributo data-bg
   * Usa las imágenes importadas para producción
   * Aplica versión mobile en viewports pequeños
   */
  function applyBackgroundImages() {
    const isMobile = window.innerWidth <= 768;
    
    slides.forEach(slide => {
      const bgImage = slide.getAttribute('data-bg');
      const bgImageMobile = slide.getAttribute('data-bg-mobile');
      
      if (bgImage) {
        // Usar imagen mobile si está disponible y estamos en viewport pequeño
        const imageKey = isMobile && bgImageMobile ? bgImageMobile : bgImage;
        const imageMap = isMobile && bgImageMobile ? slideImagesMobile : slideImages;
        const imagePath = imageMap[imageKey] || imageKey;
        slide.style.backgroundImage = `url('${imagePath}')`;
      }
    });
  }
  
  /**
   * Actualiza las imágenes de fondo al redimensionar la ventana
   */
  function handleResize() {
    applyBackgroundImages();
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
  
  // Escuchar cambios de tamaño de ventana para actualizar imágenes
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });
  
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
