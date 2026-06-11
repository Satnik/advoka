// Hlavný entry-point. Spustí inicializátory pre všetky moduly.

import { initNavigation } from './nav.js';
import { initContactForm } from './form.js';
import { company } from './data.js';

function updateFooterYear() {
  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function highlightCurrentNav() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const href = link.getAttribute('href').replace(/\/+$/, '') || '/';
    if (
      href === path ||
      (href !== '/' && path.startsWith(href + '/')) ||
      (href !== '/' && path.startsWith(href))
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initContactForm();
  updateFooterYear();
  highlightCurrentNav();
});

// Expose for debugging in browser console
window.AdvokaData = { company };
