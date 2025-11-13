// ============================================
// FORMULARIO AJAX - TAPIPIEL
// ============================================
// Maneja el envío del formulario con reCAPTCHA
// evitando recarga y mostrando errores en alertas
// ============================================

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

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
