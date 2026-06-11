// Hlavný entry-point. Spustí inicializátory pre všetky moduly.

import { initNavigation } from './nav.js';
import { initContactForm } from './form.js';
import { company } from './data.js';

function updateFooterYear() {
  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function highlightCurrentNav() {
  // Pracujeme s plne vyriesenymi URL (link.href), takze funguje nezavisle od
  // base cesty — na koreni domeny, na podadresari (napr. /advoka/) aj lokalne.
  const norm = url =>
    new URL(url).pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  const here = norm(window.location.href);
  let best = null;
  let bestLen = -1;
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const target = norm(link.href);
    // Najdlhsia zhoda vyhrava, aby sa "Domov" nezvyraznoval na podstrankach.
    if ((here === target || here.startsWith(target + '/')) && target.length > bestLen) {
      best = link;
      bestLen = target.length;
    }
  });
  if (best) best.setAttribute('aria-current', 'page');
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initContactForm();
  updateFooterYear();
  highlightCurrentNav();
});

// Expose for debugging in browser console
window.AdvokaData = { company };
