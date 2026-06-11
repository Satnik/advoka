// Navigation: dropdown (desktop), mobile drawer, FAQ accordion.

// ---- Desktop dropdown (klik + Esc + outside-click) -------------------------
function initDropdowns() {
  const triggers = document.querySelectorAll('[data-dropdown-trigger]');

  triggers.forEach(trigger => {
    const item = trigger.closest('.nav__item');
    const panel = item?.querySelector('.dropdown');
    if (!panel) return;

    trigger.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.setAttribute('data-open', 'true');
      }
    });
  });

  // Hover otvára dropdown (desktop), zatváranie pri mouseleave je riadené CSS.
  // Klávesnica: keď trigger získa fokus a používateľ stlačí šípku dole, otvor.
  triggers.forEach(trigger => {
    trigger.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const panel = trigger.closest('.nav__item').querySelector('.dropdown');
        trigger.setAttribute('aria-expanded', 'true');
        panel.setAttribute('data-open', 'true');
        const firstLink = panel.querySelector('a');
        firstLink?.focus();
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav__item')) closeAllDropdowns();
  });
}

function closeAllDropdowns() {
  document.querySelectorAll('[data-dropdown-trigger]').forEach(t => {
    t.setAttribute('aria-expanded', 'false');
  });
  document.querySelectorAll('.dropdown[data-open="true"]').forEach(p => {
    p.removeAttribute('data-open');
  });
}

// ---- Mobile drawer ---------------------------------------------------------
function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const drawer = document.querySelector('[data-mobile-nav]');
  const close = document.querySelector('[data-nav-close]');

  if (!toggle || !drawer) return;

  const open = () => {
    drawer.setAttribute('data-open', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-nav-open');
  };

  const closeDrawer = () => {
    drawer.removeAttribute('data-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-nav-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = drawer.getAttribute('data-open') === 'true';
    isOpen ? closeDrawer() : open();
  });

  close?.addEventListener('click', closeDrawer);

  // Zavri pri klike na link
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') {
      closeDrawer();
      toggle.focus();
    }
  });

  // Sub-menu accordion v drawer
  drawer.querySelectorAll('[data-mobile-submenu-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.mobile-nav__item');
      const isOpen = item.getAttribute('data-open') === 'true';
      if (isOpen) {
        item.removeAttribute('data-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ---- FAQ accordion ---------------------------------------------------------
function initFaq() {
  document.querySelectorAll('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isOpen = item.getAttribute('data-open') === 'true';
      if (isOpen) {
        item.removeAttribute('data-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.setAttribute('data-open', 'true');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

export function initNavigation() {
  initDropdowns();
  initMobileNav();
  initFaq();
}
