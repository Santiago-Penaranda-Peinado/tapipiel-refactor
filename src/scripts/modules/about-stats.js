// ============================================
// ANIMACIÓN DE ESTADÍSTICAS - TAPIPIEL
// ============================================

// Importar imagen del CTA para que Vite la incluya en el build
import ctaBgImage from '@assets/images/about/cta-bg.jpg';

export function initAboutStats() {
  // Animar contadores
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute('data-count'));
          const suffix = statNumber.getAttribute('data-suffix') || '';
          animateCount(statNumber, target, suffix);
          observer.unobserve(statNumber);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
  }
  
  // Aplicar imagen de fondo al CTA
  const ctaSection = document.querySelector('.about-cta[data-bg]');
  if (ctaSection) {
    const bgImage = ctaSection.getAttribute('data-bg');
    if (bgImage) {
      // Usar la imagen importada para producción
      ctaSection.style.backgroundImage = `url('${ctaBgImage}')`;
    }
  }
}

function animateCount(element, target, suffix) {
  let current = 0;
  const increment = target / 50; // Duración de la animación
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 50);
}