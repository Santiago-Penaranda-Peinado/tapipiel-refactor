// ============================================
// MÓDULO DE SCROLL TO TOP - TAPIPIEL
// ============================================
// Botón flotante para volver al inicio de la página
// ============================================

/**
 * Inicializa el botón de scroll to top
 */
export function initScrollTop() {
  // Crear el botón si no existe en el HTML
  let scrollTopBtn = document.querySelector('.floating-btn-top');
  
  if (!scrollTopBtn) {
    scrollTopBtn = createScrollTopButton();
  }
  
  // ==========================================
  // MOSTRAR/OCULTAR BOTÓN AL HACER SCROLL
  // ==========================================
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Mostrar el botón después de 300px de scroll
    if (scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  // ==========================================
  // SCROLL AL HACER CLICK
  // ==========================================
  
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  console.log('✅ Módulo de scroll to top inicializado');
}

/**
 * Crea el botón de scroll to top dinámicamente
 * @returns {HTMLElement} El botón creado
 */
function createScrollTopButton() {
  const button = document.createElement('a');
  button.href = '#inicio';
  button.className = 'floating-btn floating-btn-top';
  button.setAttribute('aria-label', 'Volver arriba');
  
  // Icono SVG de flecha arriba
  button.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  `;
  
  // Agregar al contenedor de botones flotantes
  const floatingButtons = document.querySelector('.floating-buttons');
  if (floatingButtons) {
    floatingButtons.appendChild(button);
  } else {
    // Si no existe el contenedor, crearlo
    const container = document.createElement('div');
    container.className = 'floating-buttons';
    container.appendChild(button);
    document.body.appendChild(container);
  }
  
  return button;
}
