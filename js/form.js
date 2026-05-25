/**
 * NIVAM — Booking & Contact Form Handler
 */

'use strict';

// ── Config ────────────────────────────────────────────────────
const FORM_CONFIG = {
  // Replace with your actual Formspree endpoint IDs
  bookingEndpoint: 'https://formspree.io/f/YOUR_BOOKING_ID',
  contactEndpoint: 'https://formspree.io/f/YOUR_CONTACT_ID',
};

// ── Init on DOM ready ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
  initContactForm();
  initNewsletterForm();
});

// ── Booking Form ─────────────────────────────────────────────
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('[type="submit"]');
    setLoadingState(submitBtn, true);

    const data = new FormData(form);

    try {
      const res = await fetch(FORM_CONFIG.bookingEndpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showSuccessState(form, 'booking-success');
        window.NivamUtils?.showToast('✓ Booking request sent! We\'ll contact you shortly.', 'success');

        // Fire WhatsApp if enabled
        if (window.NivamWhatsApp) {
          const name    = data.get('name') || 'Guest';
          const program = data.get('program') || 'a Nivam program';
          window.NivamWhatsApp.sendBookingNotification(name, program);
        }

        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      window.NivamUtils?.showToast('Something went wrong. Please try again.', 'error');
      console.error('Booking form error:', err);
    } finally {
      setLoadingState(submitBtn, false);
    }
  });
}

// ── Contact Form ─────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('[type="submit"]');
    setLoadingState(submitBtn, true);

    const data = new FormData(form);

    try {
      const res = await fetch(FORM_CONFIG.contactEndpoint, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showSuccessState(form, 'contact-success');
        window.NivamUtils?.showToast('✓ Message sent! We\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      window.NivamUtils?.showToast('Something went wrong. Please try again.', 'error');
      console.error('Contact form error:', err);
    } finally {
      setLoadingState(submitBtn, false);
    }
  });
}

// ── Newsletter Form ───────────────────────────────────────────
function initNewsletterForm() {
  document.querySelectorAll('.footer__newsletter-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input?.value) return;

      const btn = form.querySelector('button');
      btn.textContent = '...';
      btn.disabled = true;

      // Simulate API call (replace with real endpoint)
      await new Promise(r => setTimeout(r, 1200));

      btn.textContent = '✓';
      input.value = '';
      window.NivamUtils?.showToast('Subscribed! Stay tuned for updates.', 'success');

      setTimeout(() => {
        btn.textContent = 'Join';
        btn.disabled = false;
      }, 3000);
    });
  });
}

// ── Validation ────────────────────────────────────────────────
function validateForm(form) {
  let isValid = true;

  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  // Required fields
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      showFieldError(field, 'This field is required');
      isValid = false;
    }
  });

  // Email validation
  form.querySelectorAll('input[type="email"]').forEach(field => {
    if (field.value && !isValidEmail(field.value)) {
      showFieldError(field, 'Please enter a valid email address');
      isValid = false;
    }
  });

  // Phone validation (optional but if filled)
  form.querySelectorAll('input[type="tel"]').forEach(field => {
    if (field.value && !isValidPhone(field.value)) {
      showFieldError(field, 'Please enter a valid 10-digit phone number');
      isValid = false;
    }
  });

  return isValid;
}

function showFieldError(field, message) {
  field.classList.add('error');

  const error = document.createElement('span');
  error.className = 'form-error';
  error.innerHTML = `<span>⚠</span> ${message}`;

  field.parentNode.insertBefore(error, field.nextSibling);

  // Scroll to first error
  field.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ''));
}

// ── UI State Helpers ──────────────────────────────────────────
function setLoadingState(btn, loading) {
  if (!btn) return;

  if (loading) {
    btn._originalText = btn.innerHTML;
    btn.innerHTML = `<span style="display:inline-flex;gap:.5rem;align-items:center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Sending...
    </span>`;
    btn.disabled = true;
    btn.style.opacity = '0.8';
  } else {
    btn.innerHTML = btn._originalText || 'Submit';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

function showSuccessState(form, successId) {
  form.style.display = 'none';
  const successEl = document.getElementById(successId);
  if (successEl) {
    successEl.classList.add('show');
  }
}
