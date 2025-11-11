// ============================================
// MÓDULO DE SMOOTH SCROLL - TAPIPIEL
// ============================================
// Implementa scroll suave al hacer click en links de navegación
// ============================================

/**
 * Inicializa el smooth scroll para links internos
 */
export function initSmoothScroll() {
  // Seleccionar todos los links que apuntan a anclas (#)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  if (anchorLinks.length === 0) {
    console.warn('⚠️ No se encontraron links de navegación interna');
    return;
  }
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignorar # solo (links que no van a ninguna sección)
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      // Buscar el elemento objetivo
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calcular offset del header si existe
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calcular posición objetivo
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        // Hacer scroll suave
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Actualizar URL sin hacer scroll (para compartir links)
        if (history.pushState) {
          history.pushState(null, null, href);
        }
        
        // Focus en el elemento (accesibilidad)
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      }
    });
  });
  
  console.log('✅ Módulo de smooth scroll inicializado');
}
