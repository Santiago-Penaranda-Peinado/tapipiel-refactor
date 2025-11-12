// ============================================
// PRELOADER MODULE - TAPIPIEL
// ============================================
// Inserta un overlay de carga y lo oculta al terminar la carga
// Robusto: timeout de seguridad y accesible con ARIA
// ============================================

export function initPreloader() {
  // Evitar duplicado
  if (document.querySelector('.preloader')) return;

  // Crear elementos
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.setAttribute('role', 'status');
  preloader.setAttribute('aria-live', 'polite');
  preloader.setAttribute('aria-label', 'Cargando contenido');

  // Contenido del preloader (ligero, sin imágenes externas)
  preloader.innerHTML = `
    <div class="preloader__spinner" aria-hidden="true"></div>
    <div class="preloader__text">Cargando…</div>
  `;

  // Insertar al inicio del body
  document.body.prepend(preloader);

  const hide = () => {
    // Evitar múltiples ejecuciones
    if (preloader.classList.contains('is-hidden')) return;
    preloader.classList.add('is-hidden');
    // Remover del DOM después de la transición
    preloader.addEventListener('transitionend', () => {
      preloader.remove();
    }, { once: true });
  };

  // Ocultar al cargar todos los recursos
  window.addEventListener('load', () => {
    // pequeño defer para que la transición sea visible
    setTimeout(hide, 150);
  });

  // Fallback: si load no se dispara en X seg, ocultar
  setTimeout(hide, 4000);
}
