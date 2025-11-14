// ============================================
// FORMULARIO AJAX - TAPIPIEL
// ============================================
// Maneja el envío del formulario con reCAPTCHA
// evitando recarga y mostrando errores en alertas
// ============================================

// Variable para controlar si reCAPTCHA ya fue cargado
let recaptchaLoaded = false;

/**
 * Carga el script de reCAPTCHA dinámicamente
 */
function loadRecaptcha() {
  return new Promise((resolve, reject) => {
    if (recaptchaLoaded) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      recaptchaLoaded = true;
      console.log('reCAPTCHA cargado exitosamente');
      resolve();
    };
    script.onerror = () => reject(new Error('Error al cargar reCAPTCHA'));
    document.head.appendChild(script);
  });
}

/**
 * Inicializa el observer para cargar reCAPTCHA cuando el usuario se acerca al formulario
 */
function initRecaptchaLazyLoad() {
  const contactSection = document.getElementById('contacto');
  if (!contactSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !recaptchaLoaded) {
        loadRecaptcha().catch(err => {
          console.error('Error al cargar reCAPTCHA:', err);
        });
        observer.disconnect(); // Desconectar después de cargar
      }
    });
  }, {
    rootMargin: '200px' // Cargar 200px antes de que sea visible
  });

  observer.observe(contactSection);
}

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Inicializar carga lazy de reCAPTCHA
  initRecaptchaLazyLoad();

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (typeof grecaptcha !== 'undefined') {
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        alert('Por favor completa el reCAPTCHA.');
        return;
      }
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
    }

    const formData = new FormData(form);
    formData.append('ajax', '1');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        body: formData
      });

      let data;
      try {
        data = await res.json();
      } catch (_) {
        throw new Error('Respuesta inválida del servidor');
      }

      if (data.success) {
        window.location.href = data.redirect || '/thank-you.html';
      } else {
        alert(data.error || 'Error al enviar el formulario.');
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }
      }
    } catch (err) {
      alert(err.message || 'Error de red. Intenta nuevamente.');
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
      }
    }
  });
}
