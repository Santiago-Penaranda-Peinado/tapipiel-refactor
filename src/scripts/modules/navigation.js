// ============================================
// MÓDULO DE NAVEGACIÓN - TAPIPIEL
// ============================================
// Maneja el menú móvil, sticky header y active states
// ============================================

/**
 * Inicializa la funcionalidad de navegación
 */
export function initNavigation() {
  const header = document.querySelector('.header');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  if (!header || !navbarToggle || !navbarMenu) {
    console.warn('⚠️ Elementos de navegación no encontrados');
    return;
  }
  
  // ==========================================
  // TOGGLE DEL MENÚ MÓVIL
  // ==========================================
  
  navbarToggle.addEventListener('click', () => {
    const isOpen = navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active');
    
    // Actualizar aria-expanded para accesibilidad
    navbarToggle.setAttribute('aria-expanded', isOpen);
    
    // Prevenir scroll cuando el menú está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  
  // ==========================================
  // CERRAR MENÚ AL HACER CLICK EN UN LINK
  // ==========================================
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      navbarToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // ==========================================
  // CERRAR MENÚ AL HACER CLICK FUERA
  // ==========================================
  
  document.addEventListener('click', (e) => {
    const isClickInside = header.contains(e.target);
    const isMenuOpen = navbarMenu.classList.contains('active');
    
    if (!isClickInside && isMenuOpen) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      navbarToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // ==========================================
  // STICKY HEADER AL HACER SCROLL
  // ==========================================
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Agregar clase sticky cuando se hace scroll (header se hace compacto)
    if (currentScrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });
  
  // ==========================================
  // ACTIVE STATE EN LINKS DE NAVEGACIÓN
  // ==========================================
  
  // Crear Intersection Observer para detectar secciones visibles
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        // Remover active de todos los links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Agregar active al link correspondiente
        const activeLink = document.querySelector(`.navbar-menu a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observar todas las secciones
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  console.log('✅ Módulo de navegación inicializado');
}
