// Kontaktný formulár — klientska validácia + fallback na mailto.
// V tejto fáze (statický web bez backendu) submit otvorí mailovú aplikáciu
// s predvyplneným obsahom. Pre produkčné nasadenie zameniť za serverless
// endpoint (Resend, Formspree, Netlify Forms, Cloudflare Functions...).

import { company } from './data.js';

function validateField(field) {
  if (!field.checkValidity()) {
    field.setAttribute('aria-invalid', 'true');
    return false;
  }
  field.removeAttribute('aria-invalid');
  return true;
}

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const statusEl = form.querySelector('[data-form-status]');

  // Inline validácia pri blur
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    // Honeypot — ak je vyplnené, ide o bota, ticho odíď.
    const hp = form.querySelector('[name="website"]');
    if (hp && hp.value) return;

    // Validácia
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let allValid = true;
    fields.forEach(f => {
      if (!validateField(f)) allValid = false;
    });

    if (!allValid) {
      statusEl.textContent = 'Skontrolujte, prosím, vyplnené polia.';
      statusEl.classList.add('form-status--error');
      return;
    }

    // Zostav mailto link
    const fd = new FormData(form);
    const meno = fd.get('meno') || '';
    const email = fd.get('email') || '';
    const telefon = fd.get('telefon') || '';
    const oblast = fd.get('oblast') || '';
    const sprava = fd.get('sprava') || '';

    const subject = `Otázka cez web — ${oblast || 'Všeobecná'}`;
    const body = [
      `Meno: ${meno}`,
      `Email: ${email}`,
      `Telefón: ${telefon || '—'}`,
      `Oblasť: ${oblast || '—'}`,
      '',
      'Správa:',
      sprava
    ].join('\n');

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    statusEl.textContent = 'Otvárame vašu mailovú aplikáciu… Ak sa neotvorí, napíšte priamo na ' + company.email;
    statusEl.classList.add('form-status--success');

    window.location.href = mailto;
  });
}
