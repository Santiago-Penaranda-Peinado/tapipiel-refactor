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
  // FUNCIÓN PARA CERRAR EL MENÚ
  // ==========================================
  
  const closeMenu = () => {
    navbarMenu.classList.remove('active');
    navbarToggle.classList.remove('active');
    header.classList.remove('menu-open');
    navbarToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  
  const openMenu = () => {
    navbarMenu.classList.add('active');
    navbarToggle.classList.add('active');
    header.classList.add('menu-open');
    navbarToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  
  // ==========================================
  // TOGGLE DEL MENÚ MÓVIL
  // ==========================================
  
  navbarToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevenir que se propague al document
    const isOpen = navbarMenu.classList.contains('active');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // ==========================================
  // CERRAR MENÚ AL HACER CLICK EN UN LINK
  // ==========================================
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  
  // ==========================================
  // CERRAR MENÚ AL HACER CLICK FUERA
  // ==========================================
  
  document.addEventListener('click', (e) => {
    const isClickInside = header.contains(e.target);
    const isMenuOpen = navbarMenu.classList.contains('active');
    
    if (!isClickInside && isMenuOpen) {
      closeMenu();
    }
  });
  
  // ==========================================
  // CERRAR MENÚ CON TECLA ESC
  // ==========================================
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
      closeMenu();
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
