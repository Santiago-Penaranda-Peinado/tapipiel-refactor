// Popup Promocional - Tapipiel
// Crea e inicializa un modal promocional para captar leads

export function initPopupPromo() {
  try {
    // Flags rápidos
    const POPUP_ENABLED = true; // ponlo en false para apagarlo
    // Ajusta estas fechas si quieres limitar el popup al Buen Fin
    // Ejemplo: new Date('2025-11-15T00:00:00-06:00') a new Date('2025-11-18T23:59:59-06:00')
    const START_DATE = null;
    const END_DATE = null;

    // Overrides vía storage (QA):
    // localStorage.setItem('buenFinPopupOff', '1') para desactivar
    // localStorage.setItem('buenFinPopupOn', '1') para forzar mostrar
    const forceOff = typeof localStorage !== 'undefined' && localStorage.getItem('buenFinPopupOff') === '1';
    const forceOn = typeof localStorage !== 'undefined' && localStorage.getItem('buenFinPopupOn') === '1';

    if (!forceOn) {
      if (!POPUP_ENABLED || forceOff) return;
      const now = new Date();
      if (START_DATE instanceof Date && !isNaN(START_DATE) && now < START_DATE) return;
      if (END_DATE instanceof Date && !isNaN(END_DATE) && now > END_DATE) return;
    }

    // Mostrar solo una vez por sesión
    // Usamos una nueva clave para que se muestre aunque haya visto otros popups
    const storageKey = 'buenFinPopupShown';
    try {
      const alreadyShown = sessionStorage.getItem(storageKey);
      if (alreadyShown) return;
    } catch (_) {}

    // Evitar duplicados
    if (document.getElementById('buenFinPopup')) return;

    // Template del popup (HTML)
    const template = document.createElement('div');
    template.innerHTML = `
      <div class="popup-overlay" id="buenFinPopup" aria-hidden="true" role="dialog" aria-labelledby="buenFinTitle">
        <div class="popup-container" role="document">
          <button class="popup-close" id="buenFinClose" aria-label="Cerrar">&times;</button>
          <div class="popup-header">
            <div class="popup-badge">BUEN FIN</div>
            <h2 class="popup-title" id="buenFinTitle">¡El Buen Fin llegó a Tapipiel!</h2>
          </div>
          <div class="popup-body">
            <div class="popup-offer">
              <h3 class="popup-offer-title">Promociones Exclusivas por Tiempo Limitado</h3>
              <h3 class="popup-offer-subtitle">¡Aprovecha hasta!</h3>
              <div class="popup-price">
                12 MESES
                <small>SIN INTERESES</small>
              </div>
              <ul class="popup-features">
                <li>Precios especiales en tapicería y limpieza</li>
                <li>Atención prioritaria durante el Buen Fin</li>
                <li>Bonos y beneficios exclusivos</li>
              </ul>
            </div>
            <div class="popup-cta">
              <a href="#contacto" class="popup-btn">¡Solicita Información!</a>
            </div>
            <p class="popup-terms">*Válido durante El Buen Fin. Aplican términos y condiciones.</p>
          </div>
        </div>
      </div>
    `;

    // Agregar al body
    document.body.appendChild(template.firstElementChild);

    const overlay = document.getElementById('buenFinPopup');
    const closeBtn = document.getElementById('buenFinClose');
    const body = document.body;

    const openPopup = () => {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden';
    };

    const closePopup = () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      try { sessionStorage.setItem(storageKey, 'true'); } catch (_) {}
    };

    // Abrir después de 2s
    setTimeout(openPopup, 2000);

    // Cerrar con botón X
    closeBtn.addEventListener('click', closePopup);

    // Cerrar al hacer click en CTA y scroll a #contacto
    const cta = overlay.querySelector('.popup-btn');
    if (cta) {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#contacto');
        closePopup();
        if (target && typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          try { history.pushState(null, '', '#contacto'); } catch (_) {}
        } else {
          window.location.hash = 'contacto';
        }
      });
    }

    // Cerrar al hacer click fuera del contenedor
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePopup();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePopup();
      }
    });
  } catch (err) {
    console.warn('No se pudo inicializar el Popup Promocional Tapipiel:', err);
  }
}
