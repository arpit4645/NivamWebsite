/**
 * NIVAM — WhatsApp Integration
 */

'use strict';

const WHATSAPP_CONFIG = {
  number: '918866067671',
  defaultMessage: 'Hello Nivam! I\'d like to know more about your programs.',
};

window.NivamWhatsApp = {
  /**
   * Open WhatsApp with a pre-filled message
   */
  open(message) {
    const msg = encodeURIComponent(message || WHATSAPP_CONFIG.defaultMessage);
    const url = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${msg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  },

  /**
   * Open WhatsApp with program-specific inquiry
   */
  openForProgram(programName) {
    const msg = `Hello Nivam! I'm interested in the *${programName}* program. Could you share more details?`;
    this.open(msg);
  },

  /**
   * Send booking notification (client-side intent message)
   */
  sendBookingNotification(name, program) {
    const msg = `Hello Nivam! I'm *${name}* and I've submitted a booking request for *${program}*. Looking forward to hearing from you!`;
    this.open(msg);
  },

  /**
   * Open with workshop inquiry
   */
  openForWorkshop(workshopTitle) {
    const msg = `Hello! I'd like to register for the *${workshopTitle}* workshop on Zoom. Please send me the details.`;
    this.open(msg);
  }
};

// ── Float Button ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const floatBtn = document.getElementById('whatsapp-float');
  if (floatBtn) {
    floatBtn.addEventListener('click', () => {
      window.NivamWhatsApp.open();
    });
  }

  // Inline WhatsApp CTA buttons
  document.querySelectorAll('[data-whatsapp]').forEach(btn => {
    btn.addEventListener('click', () => {
      const program = btn.dataset.whatsapp;
      if (program && program !== 'true') {
        window.NivamWhatsApp.openForProgram(program);
      } else {
        window.NivamWhatsApp.open();
      }
    });
  });

  // Workshop register buttons
  document.querySelectorAll('[data-whatsapp-workshop]').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.whatsappWorkshop;
      window.NivamWhatsApp.openForWorkshop(title);
    });
  });
});
