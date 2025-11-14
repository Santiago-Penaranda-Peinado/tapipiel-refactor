// ============================================
// ANIMACIÓN DE ESTADÍSTICAS - TAPIPIEL
// ============================================

// Importar imágenes del CTA para que Vite las incluya en el build
import ctaBgImage from '@assets/images/about/cta-bg.webp';
import ctaBgImageMobile from '@assets/images/about/cta-bg-mb.webp';
import tallerImage from '@assets/images/about/taller.webp';
import tallerImageMobile from '@assets/images/about/taller-mb.webp';

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
  
  // Aplicar imágenes de fondo responsive
  function applyResponsiveBackgrounds() {
    const isMobile = window.innerWidth <= 768;
    
    // CTA background
    const ctaSection = document.querySelector('.about-cta[data-bg]');
    if (ctaSection) {
      const bgImage = isMobile ? ctaBgImageMobile : ctaBgImage;
      ctaSection.style.backgroundImage = `url('${bgImage}')`;
    }
    
    // Taller background
    const tallerSection = document.querySelector('.main-image[data-bg]');
    if (tallerSection) {
      const bgImage = isMobile ? tallerImageMobile : tallerImage;
      tallerSection.style.backgroundImage = `url('${bgImage}')`;
    }
  }
  
  // Aplicar backgrounds iniciales
  applyResponsiveBackgrounds();
  
  // Actualizar en resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(applyResponsiveBackgrounds, 250);
  });
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