// ============================================
// MAIN JAVASCRIPT - TAPIPIEL
// ============================================
// Archivo principal que inicializa todos los módulos
// ============================================

// Importar estilos principales
import '../styles/main.scss';

// Importar módulos
import { initPreloader } from './modules/preloader.js';
import { initNavigation } from './modules/navigation.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initScrollTop } from './modules/scroll-top.js';
import { initHeroSlider } from './modules/hero-slider.js';
import { initAboutStats } from './modules/about-stats.js';  

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================

/**
 * Función principal que se ejecuta cuando el DOM está listo
 */
function init() {
  console.log(' Tapipiel - Sitio web iniciado');
  
  // Preloader primero
  initPreloader();

  // Inicializar módulos
  initNavigation();
  initSmoothScroll();
  initScrollTop();
  initHeroSlider();
  initAboutStats();

  console.log('Todos los módulos cargados correctamente');
}

// ==========================================
// EJECUTAR AL CARGAR EL DOM
// ==========================================

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // Si el DOM ya está cargado, ejecutar inmediatamente
  init();
}

// ==========================================
// MANEJO DE ERRORES GLOBALES
// ==========================================

window.addEventListener('error', (event) => {
  console.error('❌ Error capturado:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promise rechazada sin manejar:', event.reason);
});
