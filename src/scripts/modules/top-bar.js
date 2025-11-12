// ==========================================
// JAVASCRIPT PARA EL COMPORTAMIENTO HIDE ON SCROLL
// ==========================================

/**
 * Inicializa el comportamiento de la barra superior
 * La barra SOLO se muestra cuando estás arriba del todo (scrollY = 0)
 * Al hacer scroll (cualquier dirección), la barra se oculta
 * El header siempre permanece pegado arriba
 * SOLO ACTIVO EN TABLETS Y DESKTOP (>= 768px)
 */
export function initTopBar() {
  const topBar = document.querySelector('.top-bar-modern');
  const header = document.querySelector('.header');
  
  // Validar que los elementos existen
  if (!topBar) {
    console.warn('⚠️ No se encontró el elemento .top-bar-modern');
    return;
  }
  
  if (!header) {
    console.warn('⚠️ No se encontró el elemento .header');
    return;
  }

  let ticking = false;

  // Función para verificar si estamos en móvil
  function isMobile() {
    return window.innerWidth < 768; // md breakpoint
  }

  function updateTopBar() {
    // Si estamos en móvil, no hacer nada
    if (isMobile()) {
      topBar.classList.add('hidden');
      header.classList.remove('top-bar-visible');
      ticking = false;
      return;
    }

    const currentScrollY = window.scrollY;
    
    // Solo mostrar la top-bar cuando estamos arriba del todo
    if (currentScrollY === 0) {
      topBar.classList.remove('hidden');
      header.classList.add('top-bar-visible');
    } else {
      topBar.classList.add('hidden');
      header.classList.remove('top-bar-visible');
    }
    
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateTopBar);
      ticking = true;
    }
  }

  // Manejar el resize para activar/desactivar en móvil
  function handleResize() {
    if (isMobile()) {
      // En móvil: asegurarse de que las clases estén correctas
      topBar.classList.add('hidden');
      header.classList.remove('top-bar-visible');
    } else {
      // En desktop: verificar el estado del scroll
      updateTopBar();
    }
  }

  // Event listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Verificar estado inicial
  handleResize();
  
  console.log('✅ Top bar inicializado (solo visible arriba del todo)');
}
