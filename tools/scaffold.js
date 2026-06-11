// Interný build skript — vygeneruje všetky podstránky z index.html ako šablóny.
// Spustenie: node tools/scaffold.js
// Po prvej generácii môžete tento skript ponechať pre prípadné zmeny šablóny
// alebo zmazať. Finálne HTML súbory sú statické a samostatné.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const layoutPath = path.join(root, 'index.html');
const layout = fs.readFileSync(layoutPath, 'utf-8');

// Common service-page sidebar (príbuzné služby + CTA)
const sidebar = (currentSlug) => {
  const items = [
    ['dopravne-nehody', 'Dopravné nehody'],
    ['rodinne-pravo', 'Rodinné právo'],
    ['dedicske-pravo', 'Dedičské právo'],
    ['majetkove-usporiadanie', 'Majetkové usporiadanie'],
    ['pozemkove-pravo', 'Pozemkové právo'],
    ['trestne-pravo', 'Trestné právo'],
    ['pracovne-pravo', 'Pracovné právo'],
    ['ustavne-pravo', 'Ústavné právo'],
    ['vymahanie-pohladavok', 'Vymáhanie pohľadávok']
  ].filter(([s]) => s !== currentSlug).slice(0, 5);

  const links = items
    .map(([s, t]) => `              <li><a href="/pravne-sluzby/${s}/">${t}</a></li>`)
    .join('\n');

  return `        <aside class="service-page__aside">
          <div class="sidebar-cta">
            <h3>Bezplatná konzultácia</h3>
            <p>Popíšte nám vašu situáciu. Ozveme sa do 24 hodín.</p>
            <a href="/kontakt/#formular" class="btn btn--accent">Kontaktovať</a>
          </div>
          <div style="margin-top: var(--sp-6);">
            <h3 style="font-size: 1.1rem;">Ďalšie oblasti</h3>
            <ul class="related-list">
${links}
            </ul>
          </div>
        </aside>`;
};

// CTA banner na koniec service stránok
const ctaBanner = `    <section class="cta-banner">
      <div class="container">
        <span class="eyebrow" style="color: var(--color-accent-light);">Potrebujete poradiť?</span>
        <h2>Prvá konzultácia je u nás bezplatná</h2>
        <p>Popíšte nám stručne svoju situáciu. Do 24 hodín sa vám ozveme a posúdime, či a ako vám vieme pomôcť.</p>
        <div class="btn-group">
          <a href="/kontakt/#formular" class="btn btn--accent btn--lg">Bezplatná konzultácia</a>
          <a href="tel:+421908777813" class="btn btn--outline-light btn--lg">+421 908 777 813</a>
        </div>
      </div>
    </section>`;

// Page hero pre service stránky
const pageHero = (title, lead, parent = { slug: 'pravne-sluzby', label: 'Právne služby' }) => `    <section class="page-hero">
      <div class="container">
        <div class="page-hero__inner">
          <ul class="page-hero__breadcrumbs">
            <li><a href="/">Domov</a></li>
            <li><a href="/${parent.slug}/">${parent.label}</a></li>
            <li><span aria-current="page">${title}</span></li>
          </ul>
          <h1 class="page-hero__title">${title}</h1>
          <p class="page-hero__lead">${lead}</p>
        </div>
      </div>
    </section>`;

// Lorem ipsum obsah pre nedoplnené služby
const lorem = (slug, h1, lead) => `${pageHero(h1, lead)}

    <section class="section">
      <div class="container">
        <div class="service-page__layout">
          <div class="service-page__content">
            <p style="background: rgba(178, 59, 59, 0.08); padding: var(--sp-4); border-left: 3px solid var(--color-error); color: var(--color-error); font-weight: var(--fw-semibold);">⚠ Obsah tejto podstránky zatiaľ neexistuje — doplní klient. Štruktúra (H1, H2, FAQ, CTA, sidebar) je pripravená; treba len vyplniť text.</p>

            <h2>Čo robíme</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <ul class="list-checks">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing.</li>
              <li>Sed do eiusmod tempor incididunt ut labore et dolore.</li>
              <li>Ut enim ad minim veniam, quis nostrud exercitation.</li>
              <li>Duis aute irure dolor in reprehenderit in voluptate velit esse.</li>
            </ul>

            <h2>Kedy nás kontaktovať</h2>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>

            <h2>Ako spolupracujeme</h2>
            <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>

            <h2>Často kladené otázky</h2>
            <div class="faq">
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Aká je cena konzultácie?</button>
                <div class="faq__a"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Doplní klient.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Ako dlho trvá konanie?</button>
                <div class="faq__a"><p>Sed do eiusmod tempor incididunt. Doplní klient.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Akú dokumentáciu potrebujem?</button>
                <div class="faq__a"><p>Ut enim ad minim veniam. Doplní klient.</p></div>
              </div>
            </div>
          </div>

${sidebar(slug)}
        </div>
      </div>
    </section>

${ctaBanner}`;

// =============================================================================
// PAGES
// =============================================================================
const pages = [
  // ------------------------- KONTAKT -------------------------
  {
    path: 'kontakt/index.html',
    title: 'Kontakt — ADVOKA, s.r.o. | Bratislava, celé Slovensko',
    description: 'Kontaktujte advokátsku kanceláriu ADVOKA: telefón, email, adresa Komárnická 36, Bratislava. Online konzultácie cez Teams, Zoom, WhatsApp.',
    canonical: 'https://www.advoka.sk/kontakt/',
    ogTitle: 'Kontakt — ADVOKA, s.r.o.',
    ogDesc: 'Kontaktujte nás — telefón, email, formulár, online konzultácie pre celé Slovensko.',
    main: `${pageHero('Kontaktujte advokátsku kanceláriu ADVOKA', 'Popíšte nám svoju situáciu. Do 24 hodín sa vám ozveme a posúdime, či a ako vám vieme pomôcť. Prvá konzultácia je bezplatná.', { slug: '', label: 'Domov' }).replace('<li><a href="/pravne-sluzby/">Právne služby</a></li>', '')}

    <section class="section" id="formular">
      <div class="container">
        <div class="grid grid--2">
          <div>
            <h2>Napíšte nám</h2>
            <hr class="section-divider" />
            <p class="lead">Vyplňte formulár alebo nám napíšte priamo. Otvorí sa vaša mailová aplikácia s predvyplneným textom.</p>

            <form class="form" data-contact-form novalidate>
              <div class="form__row">
                <div class="form__field">
                  <label class="form__label" for="meno">Meno a priezvisko <span class="required" aria-hidden="true">*</span></label>
                  <input class="form__input" type="text" id="meno" name="meno" required autocomplete="name" />
                </div>
                <div class="form__field">
                  <label class="form__label" for="email">E-mail <span class="required" aria-hidden="true">*</span></label>
                  <input class="form__input" type="email" id="email" name="email" required autocomplete="email" />
                </div>
              </div>

              <div class="form__row">
                <div class="form__field">
                  <label class="form__label" for="telefon">Telefón</label>
                  <input class="form__input" type="tel" id="telefon" name="telefon" autocomplete="tel" />
                </div>
                <div class="form__field">
                  <label class="form__label" for="oblast">Oblasť práva</label>
                  <select class="form__select" id="oblast" name="oblast">
                    <option value="">— vyberte —</option>
                    <option>Dopravné nehody</option>
                    <option>Rodinné právo</option>
                    <option>Dedičské právo</option>
                    <option>Majetkové usporiadanie</option>
                    <option>Pozemkové právo</option>
                    <option>Trestné právo</option>
                    <option>Pracovné právo</option>
                    <option>Ústavné právo</option>
                    <option>Vymáhanie pohľadávok</option>
                    <option>Iné / neviem zaradiť</option>
                  </select>
                </div>
              </div>

              <div class="form__field">
                <label class="form__label" for="sprava">Vaša správa <span class="required" aria-hidden="true">*</span></label>
                <textarea class="form__textarea" id="sprava" name="sprava" required minlength="20" placeholder="Stručne opíšte vašu situáciu (ideálne aj termíny a aktuálny stav)."></textarea>
              </div>

              <div class="form__field" style="display:none;" aria-hidden="true">
                <label for="website">Webová stránka (nevyplňať)</label>
                <input type="text" name="website" id="website" tabindex="-1" autocomplete="off" />
              </div>

              <label class="form__checkbox">
                <input type="checkbox" required />
                <span>Súhlasím so spracovaním osobných údajov v súlade s <a href="/ochrana-osobnych-udajov/">pravidlami ochrany osobných údajov</a>.</span>
              </label>

              <div data-form-status></div>

              <button type="submit" class="btn btn--primary btn--lg form__submit">Odoslať správu</button>
            </form>
          </div>

          <div>
            <h2>Priamy kontakt</h2>
            <hr class="section-divider" />
            <div class="contact-info">
              <div class="contact-info__item">
                <span class="contact-info__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.92Z"/></svg>
                </span>
                <div class="contact-info__body">
                  <strong>Telefón</strong>
                  <a href="tel:+421908777813">+421 908 777 813</a>
                </div>
              </div>

              <div class="contact-info__item">
                <span class="contact-info__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="m22 8-10 6L2 8"/></svg>
                </span>
                <div class="contact-info__body">
                  <strong>E-mail</strong>
                  <a href="mailto:lubos.pejhovsky@advoka.sk">lubos.pejhovsky@advoka.sk</a>
                </div>
              </div>

              <div class="contact-info__item">
                <span class="contact-info__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-7.6 8-13a8 8 0 0 0-16 0c0 5.4 8 13 8 13Z"/><circle cx="12" cy="9" r="3"/></svg>
                </span>
                <div class="contact-info__body">
                  <strong>Adresa</strong>
                  <a href="https://maps.app.goo.gl/R1Arh63LSm6oUFGo6" target="_blank" rel="noopener">Komárnická 36, 821 02 Bratislava</a>
                </div>
              </div>

              <div class="contact-info__item">
                <span class="contact-info__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </span>
                <div class="contact-info__body">
                  <strong>Otváracie hodiny</strong>
                  <p>Pondelok – piatok · 9:00 – 17:00</p>
                </div>
              </div>

              <div class="contact-info__item">
                <span class="contact-info__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
                </span>
                <div class="contact-info__body">
                  <strong>Jazyky</strong>
                  <p>Slovenčina · Nemčina · Angličtina</p>
                </div>
              </div>
            </div>

            <div style="margin-top: var(--sp-5); padding: var(--sp-5); background: var(--color-bg-alt); border-left: 3px solid var(--color-accent); border-radius: var(--radius-md);">
              <strong style="display: block; margin-bottom: var(--sp-2);">Online konzultácie</strong>
              <p style="margin: 0; font-size: 0.95rem; color: var(--color-text-muted);">Konzultáciu vám vieme poskytnúť cez <strong>Teams, Zoom alebo WhatsApp</strong> — stačí, ak v správe uvediete vašu preferenciu.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section__header">
          <hr class="section-divider section-divider--center" />
          <h2>Kde nás nájdete</h2>
        </div>
        <div style="aspect-ratio: 16/7; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md);">
          <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=17.150%2C48.155%2C17.175%2C48.170&amp;layer=mapnik&amp;marker=48.1625%2C17.1625" style="width:100%; height:100%; border:0;" title="Mapa polohy kancelárie ADVOKA — Komárnická 36, Bratislava" loading="lazy"></iframe>
        </div>
        <p style="text-align: center; margin-top: var(--sp-4);"><a href="https://maps.app.goo.gl/R1Arh63LSm6oUFGo6" target="_blank" rel="noopener" class="arrow-link">Otvoriť v Google Maps</a></p>
      </div>
    </section>`
  },

  // ------------------------- ROZCESTNÍK SLUŽIEB -------------------------
  {
    path: 'pravne-sluzby/index.html',
    title: 'Právne služby — ADVOKA, s.r.o. | Advokátska kancelária',
    description: 'Kompletný prehľad našich právnych služieb: dopravné nehody, rodinné a dedičské právo, majetkové usporiadanie, trestné, pracovné a ústavné právo, vymáhanie pohľadávok.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/',
    ogTitle: 'Právne služby — ADVOKA, s.r.o.',
    ogDesc: 'Deväť oblastí práva pod jednou strechou. Transparentná odmena, celé Slovensko, online konzultácie.',
    main: `${pageHero('Naše právne služby', 'Zameriavame sa na deväť oblastí. Pre každú nájdete na podstránke konkrétne situácie, ktoré riešime, spôsob spolupráce aj formu odmeny.', { slug: '', label: 'Domov' }).replace('<li><a href="/pravne-sluzby/">Právne služby</a></li>', '')}

    <section class="section">
      <div class="container">
        <div class="grid grid--3">
          <a href="/pravne-sluzby/dopravne-nehody/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-1-7-1.5-4.5A2 2 0 0 0 14.6 4H9.4a2 2 0 0 0-1.9 1.5L6 10m12 0H6m12 0 1 7H5l1-7"/></svg></span>
            <h2 class="service-card__title">Dopravné nehody</h2>
            <p class="service-card__desc">Náhrada škody, bolestné, komunikácia s poisťovňami. <strong>15 % až po vymožení</strong> — dovtedy klient neplatí nič.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/rodinne-pravo/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-7-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 19 11c0 5.5-7 10-7 10Z"/></svg></span>
            <h2 class="service-card__title">Rodinné právo</h2>
            <p class="service-card__desc">Rozvody, zverenie detí, výživné. Diskrétnosť, citlivý prístup, dohoda pred konfliktom.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/dedicske-pravo/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5a2 2 0 0 1 2-2h8l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Zm10-2v4h4M9 13h6M9 9h3m-3 8h6"/></svg></span>
            <h2 class="service-card__title">Dedičské právo</h2>
            <p class="service-card__desc">Komplexné poradenstvo pri dedení, predchádzanie rodinným sporom, vyporiadanie spoluvlastníctva.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/majetkove-usporiadanie/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4 9 10l5 5 6-6Zm-6 6L4 15a2 2 0 1 0 5 5l5-5"/></svg></span>
            <h2 class="service-card__title">Majetkové usporiadanie</h2>
            <p class="service-card__desc">Vyporiadanie BSM, podielové spoluvlastníctvo, prevodové zmluvy.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/pozemkove-pravo/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6 9 4l6 2 6-2v14l-6 2-6-2-6 2Zm6-2v16m6-14v16"/></svg></span>
            <h2 class="service-card__title">Pozemkové právo</h2>
            <p class="service-card__desc">Spory o hranice pozemkov, vecné bremená, prevody nehnuteľností, katastrálne konania.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/trestne-pravo/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z"/></svg></span>
            <h2 class="service-card__title">Trestné právo</h2>
            <p class="service-card__desc">Obhajoba aj zastupovanie poškodených. Konáme rýchlo a dôsledne.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/pracovne-pravo/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v13H3Zm6 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></span>
            <h2 class="service-card__title">Pracovné právo</h2>
            <p class="service-card__desc">Neplatné výpovede, mzdové nároky, zamestnanecké spory.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/ustavne-pravo/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-8m6 8v-8"/></svg></span>
            <h2 class="service-card__title">Ústavné právo</h2>
            <p class="service-card__desc">Ústavné sťažnosti, zastupovanie pred Ústavným súdom SR.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
          <a href="/pravne-sluzby/vymahanie-pohladavok/" class="service-card">
            <span class="service-card__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21v-8l4-2 5 4 5-3v9M3 7l5-4 5 4"/></svg></span>
            <h2 class="service-card__title">Vymáhanie pohľadávok</h2>
            <p class="service-card__desc">Predžalobné výzvy, žaloby, exekučné konanie.</p>
            <span class="service-card__more">Zistiť viac</span>
          </a>
        </div>
      </div>
    </section>

${ctaBanner}`
  },

  // ------------------------- DOPRAVNÉ NEHODY (reálny text) -------------------------
  {
    path: 'pravne-sluzby/dopravne-nehody/index.html',
    title: 'Dopravné nehody — odškodnenie | ADVOKA, s.r.o.',
    description: 'Náhrada škody po dopravnej nehode. Platíte len v prípade úspechu — 15 % z vymoženej sumy. Bezplatná konzultácia, celé Slovensko, právna pomoc bez rizika.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/dopravne-nehody/',
    ogTitle: 'Dopravné nehody — odškodnenie | ADVOKA',
    ogDesc: 'Profesionálna právna pomoc po dopravnej nehode. Platíte len v prípade úspechu — 15 % z vymoženej sumy.',
    main: `${pageHero('Náhrada škody po dopravnej nehode', 'Profesionálna právna pomoc bez rizika. Stali ste sa obeťou dopravnej nehody? Po šoku a zraneniach vás čaká náročný boj s poisťovňou — my ho prevezmeme za vás.')}

    <section class="section">
      <div class="container">
        <div class="service-page__layout">
          <div class="service-page__content">
            <div class="highlight-box">
              <div class="highlight-box__eyebrow">Náš model spolupráce</div>
              <h2 class="highlight-box__title" style="margin-top: 0;">15 % až po vymožení. Dovtedy nič neplatíte.</h2>
              <p class="highlight-box__text">Za naše služby pri náhrade škody po dopravných nehodách <strong>neplatíte zálohové platby ani hodinové odmeny</strong>. Našou odmenou je podielová odmena vo výške 15 % z vymoženej sumy. <strong>Ak nič nevymôžeme, nič nám neplatíte.</strong></p>
              <a href="/kontakt/#formular" class="btn btn--accent">Chcem bezplatne posúdiť moju nehodu</a>
            </div>

            <h2>Čo pre vás urobíme</h2>
            <p>Preberieme kompletnú právnu agendu, aby ste sa vy mohli sústrediť na zotavenie:</p>
            <ul class="list-checks">
              <li><strong>Analýza nárokov</strong> — mnohí poškodení netušia, čo všetko môže zahŕňať ich nárok na náhradu škody. My identifikujeme každý jeden váš nárok.</li>
              <li><strong>Znalci a dôkazy</strong> — spolupracujeme so špičkovými znalcami z odboru zdravotníctva a dopravy. Správne vypracovaný posudok je kľúčom k úspechu.</li>
              <li><strong>Komunikácia s poisťovňou</strong> — poisťovne sú komerčné subjekty a ich cieľom je minimalizovať plnenie. My hovoríme ich jazykom a nenecháme sa odbiť.</li>
              <li><strong>Zastupovanie v trestnom konaní</strong> — ak je nehoda kvalifikovaná ako trestný čin, budeme vás zastupovať ako poškodených v pozícii strany trestného konania.</li>
            </ul>

            <h2>Na čo máte zákonný nárok</h2>
            <p>Nezameriavame sa len na prípadnú opravu vozidla a zranenie. Pomôžeme vám získať náhradu škody v <strong>maximálnej možnej výške</strong> za:</p>
            <ul class="list-checks">
              <li><strong>Bolestné</strong> — náhrada za vytrpenú bolesť</li>
              <li><strong>Sťaženie spoločenského uplatnenia</strong> — trvalé následky na zdraví</li>
              <li><strong>Stratu na zárobku</strong> — počas PN aj po nej</li>
              <li><strong>Náklady liečenia</strong> — lieky, rehabilitácie, cestovné do nemocníc</li>
              <li><strong>Nemajetkovú ujmu</strong> — v prípade tragických následkov</li>
              <li><strong>Nároky pozostalých</strong></li>
            </ul>

            <h2>Prečo si vybrať advokátsku kanceláriu ADVOKA</h2>
            <ul class="list-checks">
              <li><strong>Sme motivovaní vyhrať.</strong> Naša podielová odmena 15 % je priamo naviazaná na výšku náhrady škody. Čím viac získate vy, tým úspešnejší sme aj my.</li>
              <li><strong>Celoslovenská pôsobnosť.</strong> Nezáleží, kde na Slovensku sa nehoda stala. Máme skúsenosti aj s medzinárodným zastupovaním.</li>
              <li><strong>Odbornosť a judikatúra.</strong> Pri uplatňovaní nárokov sa opierame o aktuálne rozhodnutia súdov, ktoré poisťovne zvyknú ignorovať.</li>
            </ul>

            <blockquote>Nenechávajte svoje peniaze v poisťovni. Kontaktujte nás a my vám povieme, aké sú vaše reálne šance na náhradu škody.</blockquote>

            <h2>Často kladené otázky</h2>
            <div class="faq">
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Čo ak nehoda nebola moja vina, ale poisťovňa odmieta vyplatiť plnú výšku?</button>
                <div class="faq__a"><p>Toto je úplne typická situácia. Poisťovne rutinne odmietajú časť nárokov v nádeji, že poškodený dohodu prijme. My uplatníme každý nárok, ktorý vám zo zákona patrí, vrátane bolestného, sťaženia spoločenského uplatnenia a straty na zárobku.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Koľko bude moja vec trvať?</button>
                <div class="faq__a"><p>Pri kooperatívnej poisťovni dohoda do 3–6 mesiacov. Pri spornom nároku alebo trvalých následkoch ide o súdne konanie v rozsahu 1–2 rokov. Stretneme sa s vami na úvodnej konzultácii a priznáme reálny odhad.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Čo ak mám už podpísanú dohodu s poisťovňou?</button>
                <div class="faq__a"><p>Aj to vieme posúdiť. Niektoré dohody sa dajú napadnúť — napríklad ak boli uzavreté v tiesni alebo poškodený nebol o niektorých nárokoch informovaný. Pošlite nám kópiu dohody, pozrieme sa na to bezplatne.</p></div>
              </div>
            </div>
          </div>

${sidebar('dopravne-nehody')}
        </div>
      </div>
    </section>

${ctaBanner}`
  },

  // ------------------------- RODINNÉ PRÁVO -------------------------
  {
    path: 'pravne-sluzby/rodinne-pravo/index.html',
    title: 'Rodinné právo — rozvody, výživné, deti | ADVOKA, s.r.o.',
    description: 'Rodinný právnik pre rozvody, zverenie detí a výživné. Diskrétny a citlivý prístup. Honorár 300 €/úkon alebo cenová ponuka šitá na mieru.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/rodinne-pravo/',
    ogTitle: 'Rodinné právo | ADVOKA, s.r.o.',
    ogDesc: 'Rozvody, zverenie detí, výživné. Diskrétnosť a citlivý prístup. 300 €/úkon alebo cenová ponuka šitá na mieru.',
    main: `${pageHero('Rodinný právnik — rozvody, výživné, zverenie detí', 'Rodinné konflikty patria medzi najťažšie životné situácie. Sprevádzame vami s diskrétnosťou a citlivým prístupom — uprednostňujeme dohodu pred zbytočným konfliktom.')}

    <section class="section">
      <div class="container">
        <div class="service-page__layout">
          <div class="service-page__content">
            <div class="highlight-box">
              <div class="highlight-box__eyebrow">Náš model spolupráce</div>
              <h2 class="highlight-box__title" style="margin-top: 0;">300 € / úkon, alebo cenová ponuka šitá na mieru</h2>
              <p class="highlight-box__text">Bežná sadzba za jednotlivý úkon je <strong>300 €</strong>. Pre komplexnejšie veci pripravíme <strong>individuálnu cenovú ponuku</strong> ešte pred prvým úkonom — žiadne nepríjemné prekvapenia v účte.</p>
              <a href="/kontakt/#formular" class="btn btn--accent">Kontaktovať pre cenovú ponuku</a>
            </div>

            <h2>Tri kľúčové oblasti, ktoré najčastejšie riešime</h2>
            <div class="sub-areas">
              <a href="#rozvody" class="sub-areas__item">
                <h3>Rozvody</h3>
                <p>Sporné aj nesporné rozvodové konanie, dohoda o vyporiadaní BSM, úprava pomerov k deťom na čas po rozvode.</p>
              </a>
              <a href="#zverenie-deti" class="sub-areas__item">
                <h3>Zverenie detí</h3>
                <p>Striedavá osobná starostlivosť, výlučná starostlivosť jedného z rodičov, úprava styku s druhým rodičom, predbežné opatrenia.</p>
              </a>
              <a href="#vyzivne" class="sub-areas__item">
                <h3>Výživné</h3>
                <p>Stanovenie, zvýšenie alebo zníženie výživného, vymáhanie zameškaného výživného, výživné pre rozvedeného manžela.</p>
              </a>
            </div>

            <h2 id="rozvody">Rozvody</h2>
            <p>Pri rozvode pomáhame klientovi dosiahnuť výsledok, s ktorým sa dá ďalej žiť — <strong>vrátane úpravy starostlivosti o deti a vyporiadania spoločného majetku</strong>. Pri spornom rozvode dôsledne zastupujeme záujmy klienta, pri nespornom hľadáme cestu k rýchlej dohode.</p>

            <h2 id="zverenie-deti">Zverenie detí a styk s rodičom</h2>
            <p>Zákonom preferovaná je <strong>striedavá osobná starostlivosť</strong>, ale nie je vhodná pre každú rodinu. Posúdime konkrétnu situáciu — bývanie, zamestnanie, vek dieťaťa, vzťahy — a navrhneme model, ktorý je v najlepšom záujme dieťaťa a zároveň udržateľný pre rodiča.</p>

            <h2 id="vyzivne">Výživné</h2>
            <p>Výživné nie je raz navždy. Pri zmene pomerov (zvýšenie príjmov povinného, nové potreby dieťaťa, štúdium) je možné požiadať o jeho úpravu. Pri neplatení vieme rýchlo iniciovať <strong>exekučné konanie</strong> a uplatniť zameškané výživné aj spätne.</p>

            <h2>Náš prístup</h2>
            <p><strong>Diskrétnosť je samozrejmosť.</strong> Citlivý prístup, žiadne zbytočné súdne kroky, dôraz na rýchle a udržateľné riešenia. V rodinnom práve veríme, že <strong>mimosúdna dohoda je takmer vždy lepšia ako súdny rozsudok</strong> — pre dieťa, pre vás aj pre rýchlosť výsledku.</p>

            <h2>Často kladené otázky</h2>
            <div class="faq">
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Ako dlho trvá rozvodové konanie?</button>
                <div class="faq__a"><p>Pri nespornom rozvode s dohodou o deťoch a majetku — bežne 3 až 6 mesiacov. Pri spornom rozvode aj rok a viac, podľa pojednávacieho kalendára súdu a komplikovanosti veci.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Môžem dosiahnuť striedavú starostlivosť, aj keď druhý rodič nesúhlasí?</button>
                <div class="faq__a"><p>Áno, súd môže nariadiť striedavú starostlivosť aj proti vôli jedného z rodičov, ak je to v záujme dieťaťa. Posúdime, či sú vo vašom prípade splnené predpoklady.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Čo robiť, keď druhý rodič neplatí výživné?</button>
                <div class="faq__a"><p>Po dvoch nesplnených splátkach môžete iniciovať exekúciu. Zároveň hrozí povinnému trestnoprávna zodpovednosť za zanedbanie povinnej výživy. Pri vyšších sumách odporúčame okamžite konať.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Aké poplatky ma čakajú okrem honoráru advokáta?</button>
                <div class="faq__a"><p>Súdny poplatok pri rozvode je 66 €, pri úprave výživného alebo zverenia detí spravidla bezplatne. Pri vyporiadaní BSM poplatok závisí od hodnoty veci. Konkrétny rozpočet pripravíme pri prvej konzultácii.</p></div>
              </div>
            </div>
          </div>

${sidebar('rodinne-pravo')}
        </div>
      </div>
    </section>

${ctaBanner}`
  },

  // ------------------------- DEDIČSKÉ PRÁVO -------------------------
  {
    path: 'pravne-sluzby/dedicske-pravo/index.html',
    title: 'Dedičské právo — dedičské konanie | ADVOKA, s.r.o.',
    description: 'Dedičský právnik. Poradenstvo pri dedení zo zákona aj zo závetu, vyporiadanie spoluvlastníctva, predchádzanie rodinným sporom. Oboznámime vás s vašimi právami.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/dedicske-pravo/',
    ogTitle: 'Dedičské právo | ADVOKA, s.r.o.',
    ogDesc: 'Komplexné poradenstvo pri dedení. Oboznámime vás s vašimi právami a predídeme rodinným sporom.',
    main: `${pageHero('Dedičské právo — poradenstvo, ktoré predíde sporom', 'Strata blízkeho je ťažká aj bez právnych komplikácií. Pomôžeme vám zorientovať sa v dedení zo zákona aj zo závetu a vysvetlíme vám jednoduchým jazykom, čo presne sa s majetkom stane.')}

    <section class="section">
      <div class="container">
        <div class="service-page__layout">
          <div class="service-page__content">
            <blockquote>„Oboznámime vás s vašimi právami a možnosťami."</blockquote>

            <h2>Kedy nás kontaktovať</h2>
            <ul class="list-checks">
              <li>Začalo sa dedičské konanie a neviete, aké sú vaše práva ako dediča</li>
              <li>Zomrel váš blízky a viete o závete, ktorý sa zdá byť pochybný</li>
              <li>Spoludediči nesúhlasia s navrhovaným vyporiadaním dedičstva</li>
              <li>Chcete si <strong>vopred pripraviť závet</strong>, ktorý predíde sporom medzi dedičmi</li>
              <li>Potrebujete poradiť s neopomenuteľnými dedičmi (deti, manžel)</li>
              <li>Riešite vyporiadanie podielového spoluvlastníctva, ktoré vzniklo dedením</li>
            </ul>

            <h2>Čo pre vás urobíme</h2>
            <ul class="list-checks">
              <li><strong>Posúdenie dedičskej situácie</strong> — kto sú zákonní dediči, aký je rozsah dedičstva, aké sú nároky každého dediča</li>
              <li><strong>Zastupovanie pred notárom</strong> — preberáme za vás komunikáciu s notárom v dedičskom konaní</li>
              <li><strong>Negociácia medzi dedičmi</strong> — hľadáme dohodu, ktorá udrží rodinné vzťahy</li>
              <li><strong>Súdne spory</strong> — žaloby o určenie dedičstva, vydedenie, neplatnosť závetu</li>
              <li><strong>Prevencia</strong> — príprava závetu a darovacích zmlúv, ktoré nemajú slabé miesta</li>
            </ul>

            <h2>Najčastejšie problémy, s ktorými prichádzajú klienti</h2>
            <p><strong>Sporný závet.</strong> Bol zostavený v dobrom psychickom stave? Sú v ňom všetky náležitosti? Často sa stane, že vlastnoručný závet má formálne chyby, ktoré ho robia neplatným.</p>
            <p><strong>Neopomenuteľní dediči.</strong> Maloleté deti dedia vždy aspoň toľko, čo by im patrilo zo zákona. Plnoleté deti aspoň polovicu. Závet, ktorý ich úplne obchádza, je v tejto časti neplatný.</p>
            <p><strong>Vyporiadanie spoluvlastníctva.</strong> Ak po dedičskom konaní vlastníte byt alebo dom spolu so súrodencami, často je lepším riešením vyporiadať spoluvlastníctvo dohodou než čakať, kým situácia vyhrotí.</p>

            <h2>Často kladené otázky</h2>
            <div class="faq">
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Treba advokáta na bežné dedičské konanie?</button>
                <div class="faq__a"><p>Pri jednoduchom dedení s jedným dedičom obvykle nie. Advokáta odporúčame, ak je dedičov viac, ak existuje závet, alebo ak je v dedičstve nehnuteľnosť či podiel vo firme.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Môžem odmietnuť dedičstvo?</button>
                <div class="faq__a"><p>Áno — odmietnutie sa robí pred notárom do 1 mesiaca od oznámenia. Tým sa zbavíte aj dlhov poručiteľa. Pozor: odmietnutie je nezvratné.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Ako napadnúť závet?</button>
                <div class="faq__a"><p>Závet sa napáda žalobou o určenie neplatnosti. Dôvodom môže byť nedostatok psychickej spôsobilosti poručiteľa, formálne nedostatky, alebo obchádzanie neopomenuteľných dedičov. Vyžaduje to často aj znalecký posudok.</p></div>
              </div>
            </div>
          </div>

${sidebar('dedicske-pravo')}
        </div>
      </div>
    </section>

${ctaBanner}`
  },

  // ------------------------- MAJETKOVÉ USPORIADANIE -------------------------
  {
    path: 'pravne-sluzby/majetkove-usporiadanie/index.html',
    title: 'Majetkové usporiadanie — BSM, spoluvlastníctvo | ADVOKA',
    description: 'Vyporiadanie bezpodielového spoluvlastníctva manželov, podielové spoluvlastníctvo, prevodové zmluvy. Bezproblémový prevod aj rozdelenie majetku.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/majetkove-usporiadanie/',
    ogTitle: 'Majetkové usporiadanie | ADVOKA, s.r.o.',
    ogDesc: 'Vyporiadanie BSM, podielové spoluvlastníctvo, prevodové zmluvy. Pripravíme vás na bezproblémový prevod.',
    main: `${pageHero('Majetkové usporiadanie a vyporiadanie spoluvlastníctva', 'Riešite delenie majetku po rozvode, dedičstve alebo medzi súrodencami? Pripravíme zmluvy a stratégiu, ktoré obstoja a predídu budúcim sporom.')}

    <section class="section">
      <div class="container">
        <div class="service-page__layout">
          <div class="service-page__content">
            <h2>S čím sa na nás obraciate</h2>
            <ul class="list-checks">
              <li><strong>Vyporiadanie BSM</strong> (bezpodielové spoluvlastníctvo manželov) po rozvode alebo po smrti manžela</li>
              <li><strong>Podielové spoluvlastníctvo</strong> — zrušenie a vyporiadanie spoluvlastníctva nehnuteľností</li>
              <li><strong>Prevodové zmluvy</strong> — kúpne, darovacie, zámenné</li>
              <li><strong>Predmanželské zmluvy</strong> a zmluvy o úprave BSM počas trvania manželstva</li>
              <li><strong>Vyporiadanie spoluvlastníctva po dedičskom konaní</strong></li>
            </ul>

            <h2>Čo pre vás urobíme</h2>
            <p>Pripravíme zmluvu, ktorá obstojí pred katastrom, daňovým úradom aj prípadným budúcim súdnym sporom. Posúdime daňové dôsledky prevodu (najmä pri darovaniach), ošetríme všetky vecné bremená a ťarchy.</p>

            <h2>Pri delení BSM dbáme najmä na</h2>
            <ul class="list-checks">
              <li>Spravodlivé ocenenie nehnuteľností (znalecký posudok, ak treba)</li>
              <li>Vyrovnanie hypoték a iných záväzkov</li>
              <li>Otázku, kto z manželov v nehnuteľnosti zostane bývať</li>
              <li>Daňové optimality prevodu medzi manželmi a deťmi</li>
            </ul>

            <h2>Často kladené otázky</h2>
            <div class="faq">
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Do kedy treba vyporiadať BSM po rozvode?</button>
                <div class="faq__a"><p>3 roky od právoplatnosti rozsudku o rozvode. Po tejto lehote nastúpi zákonná domnienka rovnakých podielov — to nemusí byť výhodné pre tých, ktorí prispievali do majetku viac.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Môžem nehnuteľnosť darovať dieťaťu už za života?</button>
                <div class="faq__a"><p>Áno, ale treba zvážiť dôsledky pre dedičské konanie (započítavanie darov), pre vás (vecné bremeno bývania), aj daňové. Pripravíme darovaciu zmluvu so všetkými ochrannými prvkami.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Spoluvlastník nesúhlasí s predajom — čo robiť?</button>
                <div class="faq__a"><p>Môžete žiadať súd o zrušenie a vyporiadanie spoluvlastníctva. Súd rozhodne buď rozdelením veci (ak je to možné), priznaním veci jednému spoluvlastníkovi s vyplatením druhého, alebo predajom dražbou.</p></div>
              </div>
            </div>
          </div>

${sidebar('majetkove-usporiadanie')}
        </div>
      </div>
    </section>

${ctaBanner}`
  },

  // ------------------------- POZEMKOVÉ PRÁVO -------------------------
  {
    path: 'pravne-sluzby/pozemkove-pravo/index.html',
    title: 'Pozemkové právo — hranice, kataster | ADVOKA, s.r.o.',
    description: 'Spory o hranice pozemkov, vecné bremená, prevody nehnuteľností, ROEP, katastrálne konania. Skúsenosť s pozemkovými konaniami v celej SR.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/pozemkove-pravo/',
    ogTitle: 'Pozemkové právo | ADVOKA, s.r.o.',
    ogDesc: 'Spory o hranice pozemkov, vecné bremená, prevody nehnuteľností. Skúsenosť s katastrálnymi konaniami.',
    main: `${pageHero('Pozemkové právo — od hraníc cez kataster po zápisy', 'Pozemky majú dlhú pamäť. Spory o hranice, nevyporiadané spoluvlastníctvo, neaktuálne zápisy v katastri — všetko sa to dá riešiť, ale vyžaduje to trpezlivosť a znalosť detailov.')}

    <section class="section">
      <div class="container">
        <div class="service-page__layout">
          <div class="service-page__content">
            <h2>S čím pomáhame</h2>
            <ul class="list-checks">
              <li><strong>Spory o hranice pozemkov</strong> — žaloba o určenie hranice, geometrický plán, súdne znalcovstvo</li>
              <li><strong>Vecné bremená</strong> — zriaďovanie, výklad, výmaz; práva chôdze, jazdy, inžinierskych sietí</li>
              <li><strong>Prevody nehnuteľností</strong> — kúpne a darovacie zmluvy, vrátane bezpečného úschovného mechanizmu kúpnej ceny</li>
              <li><strong>Katastrálne konania</strong> — návrhy na vklad, opravy chýb v katastri, námietky</li>
              <li><strong>ROEP</strong> (Register obnovenej evidencie pozemkov) — uplatňovanie nárokov, odvolania</li>
              <li><strong>Vyporiadanie spoluvlastníctva pozemkov</strong> — dohodou aj súdnou cestou</li>
              <li><strong>Susedské spory</strong> — imisie (hluk, dym, voda), pohraničné stromy, oplotenie</li>
            </ul>

            <h2>Náš prístup</h2>
            <p>Pri pozemkových veciach <strong>dôkladne preverujeme historický stav</strong> — staré listy vlastníctva, ROEP, pôvodné parcelné čísla. Často sa stane, že vyriešenie sporu závisí od zápisu, ktorý je v katastri už desaťročia chybne. Pri takýchto veciach sa spolupracuje s geodetom a znalcom.</p>

            <h2>Často kladené otázky</h2>
            <div class="faq">
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Sused tvrdí, že hranica pozemku je inde — čo s tým?</button>
                <div class="faq__a"><p>Najprv objednať geometrický plán. Ak sused nesúhlasí, podáme žalobu o určenie hranice. Súd rozhodne na základe znaleckého posudku, dlhodobej užívanej situácie a katastrálnych podkladov.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">V katastri je iný vlastník, hoci pozemok vlastníme desiatky rokov.</button>
                <div class="faq__a"><p>Niekoľko ciest: oprava chyby v katastri (správne konanie), žaloba o určenie vlastníckeho práva, prípadne vydržanie. Posúdime, ktorá cesta je pre vás najrýchlejšia.</p></div>
              </div>
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">Kúpna zmluva na dom — môžem ju spísať bez advokáta?</button>
                <div class="faq__a"><p>Technicky áno, ale neodporúčame. Pri kúpe nehnuteľnosti ide o veľkú sumu a chyby (chýbajúce vecné bremeno, nesprávne identifikovaná parcela, problémové ťarchy) sú drahé. Bezpečnejšie je nechať si zmluvu napísať advokátom a kúpnu cenu uložiť do advokátskej úschovy.</p></div>
              </div>
            </div>
          </div>

${sidebar('pozemkove-pravo')}
        </div>
      </div>
    </section>

${ctaBanner}`
  },

  // ------------------------- TRESTNÉ PRÁVO (lorem) -------------------------
  {
    path: 'pravne-sluzby/trestne-pravo/index.html',
    title: 'Trestné právo — obhajoba | ADVOKA, s.r.o.',
    description: 'Trestnoprávna obhajoba aj zastupovanie poškodených. Pohotovostné zastupovanie pri zadržaní, väzbe, výsluchu. Celé Slovensko.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/trestne-pravo/',
    ogTitle: 'Trestné právo | ADVOKA, s.r.o.',
    ogDesc: 'Obhajoba aj zastupovanie poškodených. Konáme rýchlo a dôsledne.',
    main: lorem('trestne-pravo', 'Trestné právo — obhajoba a zastupovanie poškodených', 'Pri trestnoprávnych veciach platí pravidlo: čas je rozhodujúci faktor. Zastupujeme obvinených aj poškodených v celom Slovensku.')
  },

  // ------------------------- PRACOVNÉ PRÁVO (lorem) -------------------------
  {
    path: 'pravne-sluzby/pracovne-pravo/index.html',
    title: 'Pracovné právo — výpovede, mzdy | ADVOKA, s.r.o.',
    description: 'Pracovnoprávne spory: neplatné výpovede, mzdové nároky, mobbing, pracovné úrazy. Zastupujeme zamestnancov aj zamestnávateľov.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/pracovne-pravo/',
    ogTitle: 'Pracovné právo | ADVOKA, s.r.o.',
    ogDesc: 'Neplatné výpovede, mzdové nároky, zamestnanecké spory. Zastupujeme obe strany.',
    main: lorem('pracovne-pravo', 'Pracovné právo — od výpovedí po mzdové spory', 'Práca je nielen zdrojom príjmu, ale aj veľká časť života. Ak sa pracovné vzťahy zauzlujú, postaráme sa o ne so znalosťou aktuálneho Zákonníka práce aj súdnej praxe.')
  },

  // ------------------------- ÚSTAVNÉ PRÁVO (lorem) -------------------------
  {
    path: 'pravne-sluzby/ustavne-pravo/index.html',
    title: 'Ústavné právo — Ústavný súd SR | ADVOKA, s.r.o.',
    description: 'Ústavné sťažnosti a zastupovanie pred Ústavným súdom SR. Skúsenosť s konaniami o porušení základných práv a slobôd.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/ustavne-pravo/',
    ogTitle: 'Ústavné právo | ADVOKA, s.r.o.',
    ogDesc: 'Ústavné sťažnosti, zastupovanie pred Ústavným súdom SR. Kde končia ostatné inštancie, my pokračujeme.',
    main: lorem('ustavne-pravo', 'Ústavné právo — sťažnosti pred Ústavným súdom SR', 'Keď máte pocit, že rozhodnutie všeobecných súdov porušilo vaše základné práva, Ústavný súd SR je posledná inštancia. Máme s týmto typom konania reálnu skúsenosť.')
  },

  // ------------------------- VYMÁHANIE POHĽADÁVOK (lorem) -------------------------
  {
    path: 'pravne-sluzby/vymahanie-pohladavok/index.html',
    title: 'Vymáhanie pohľadávok | ADVOKA, s.r.o.',
    description: 'Vymáhanie pohľadávok — predžalobné výzvy, žaloby, platobné rozkazy, exekučné konanie. Aj pre fyzické osoby, aj pre firmy.',
    canonical: 'https://www.advoka.sk/pravne-sluzby/vymahanie-pohladavok/',
    ogTitle: 'Vymáhanie pohľadávok | ADVOKA, s.r.o.',
    ogDesc: 'Predžalobné výzvy, žaloby, exekučné konanie. Vrátime vám peniaze, ktoré vám patria.',
    main: lorem('vymahanie-pohladavok', 'Vymáhanie pohľadávok — od výzvy po exekúciu', 'Niekto vám dlhuje peniaze a vyhovára sa. Pripravíme stratégiu vymáhania šitú na mieru — od jemnej predžalobnej výzvy po neúprosnú exekúciu.')
  },

  // ------------------------- COOKIES -------------------------
  {
    path: 'cookies/index.html',
    title: 'Pravidlá cookies — ADVOKA, s.r.o.',
    description: 'Pravidlá používania súborov cookies na webovej stránke advokátskej kancelárie ADVOKA, s.r.o.',
    canonical: 'https://www.advoka.sk/cookies/',
    ogTitle: 'Pravidlá cookies — ADVOKA, s.r.o.',
    ogDesc: 'Pravidlá používania súborov cookies.',
    main: `${pageHero('Pravidlá používania súborov cookies', 'Tento dokument vysvetľuje, aké súbory cookies používame na našej webovej stránke a na čo slúžia.', { slug: '', label: 'Domov' }).replace('<li><a href="/pravne-sluzby/">Právne služby</a></li>', '')}

    <section class="section">
      <div class="container container--narrow">
        <p style="background: rgba(178, 59, 59, 0.08); padding: var(--sp-4); border-left: 3px solid var(--color-error); color: var(--color-error); font-weight: var(--fw-semibold);">⚠ Toto je šablónový text. Pred launchom musí klient (ako advokát) odsúhlasiť presné znenie podľa skutočného technického nasadenia.</p>

        <h2>1. Čo sú cookies</h2>
        <p>Cookies sú malé textové súbory, ktoré sa pri návšteve webovej stránky ukladajú vo vašom prehliadači. Slúžia na zapamätanie si vašich preferencií, analytiku alebo na technické fungovanie stránky.</p>

        <h2>2. Aké cookies používame</h2>
        <p>Webová stránka <strong>advoka.sk</strong> v súčasnosti používa <strong>iba technicky nevyhnutné cookies</strong>, ktoré nevyžadujú váš súhlas:</p>
        <ul class="list">
          <li>Cookies pre zachovanie stavu navigácie (otvorené/zatvorené menu)</li>
          <li>Cookies pre zapamätanie si vášho súhlasu (ak v budúcnosti pridáme analytické cookies)</li>
        </ul>
        <p>Stránka v súčasnosti <strong>nepoužíva</strong> trackovacie, marketingové ani sociálne cookies tretích strán.</p>

        <h2>3. Vaše práva</h2>
        <p>Cookies môžete kedykoľvek vymazať alebo zakázať priamo v nastaveniach vášho prehliadača (Chrome, Firefox, Safari, Edge). Vypnutie cookies môže ovplyvniť funkčnosť niektorých prvkov stránky.</p>

        <h2>4. Kontakt</h2>
        <p>Otázky týkajúce sa cookies adresujte na <a href="mailto:lubos.pejhovsky@advoka.sk">lubos.pejhovsky@advoka.sk</a>.</p>
      </div>
    </section>`
  },

  // ------------------------- OCHRANA OSOBNÝCH ÚDAJOV -------------------------
  {
    path: 'ochrana-osobnych-udajov/index.html',
    title: 'Ochrana osobných údajov — ADVOKA, s.r.o.',
    description: 'Informácie o spracovaní osobných údajov v advokátskej kancelárii ADVOKA, s.r.o. podľa GDPR a slovenského zákona č. 18/2018 Z. z.',
    canonical: 'https://www.advoka.sk/ochrana-osobnych-udajov/',
    ogTitle: 'Ochrana osobných údajov — ADVOKA, s.r.o.',
    ogDesc: 'Informácie o spracovaní osobných údajov podľa GDPR.',
    main: `${pageHero('Ochrana osobných údajov', 'Informácie o spracovaní osobných údajov klientov a návštevníkov webovej stránky v zmysle Nariadenia EÚ 2016/679 (GDPR) a zákona č. 18/2018 Z. z.', { slug: '', label: 'Domov' }).replace('<li><a href="/pravne-sluzby/">Právne služby</a></li>', '')}

    <section class="section">
      <div class="container container--narrow">
        <p style="background: rgba(178, 59, 59, 0.08); padding: var(--sp-4); border-left: 3px solid var(--color-error); color: var(--color-error); font-weight: var(--fw-semibold);">⚠ Toto je šablónový text. Pred launchom musí klient (ako advokát) odsúhlasiť presné znenie podľa skutočných procesov spracovania údajov v kancelárii.</p>

        <h2>1. Prevádzkovateľ</h2>
        <p><strong>ADVOKA, s.r.o.</strong><br />
        Komárnická 36, 821 02 Bratislava<br />
        IČO: <span style="color: var(--color-error);">TODO</span> · DIČ: <span style="color: var(--color-error);">TODO</span><br />
        E-mail: <a href="mailto:lubos.pejhovsky@advoka.sk">lubos.pejhovsky@advoka.sk</a> · Telefón: <a href="tel:+421908777813">+421 908 777 813</a></p>

        <h2>2. Účely spracovania</h2>
        <ul class="list">
          <li><strong>Poskytovanie právnych služieb klientom</strong> — na základe zmluvy a v rozsahu zákona o advokácii</li>
          <li><strong>Komunikácia s potenciálnymi klientmi</strong> cez kontaktný formulár — na základe vášho súhlasu, do skončenia komunikácie</li>
          <li><strong>Plnenie zákonných povinností</strong> (účtovníctvo, AML, daňové)</li>
        </ul>

        <h2>3. Príjemcovia údajov</h2>
        <p>Osobné údaje neposkytujeme tretím stranám okrem prípadov, keď to vyžaduje zákon (súdy, orgány činné v trestnom konaní, Slovenská advokátska komora) alebo plnenie zmluvy (znalci, notári v rámci konania).</p>

        <h2>4. Doba uchovávania</h2>
        <p>Klientske spisy uchovávame v zmysle zákona o advokácii a registratúrnych pravidiel kancelárie. Dáta z kontaktného formulára (pri neuzavretí zmluvy) likvidujeme do 6 mesiacov od poslednej komunikácie.</p>

        <h2>5. Vaše práva</h2>
        <ul class="list">
          <li>Právo na prístup k údajom</li>
          <li>Právo na opravu nepresných údajov</li>
          <li>Právo na výmaz (pri neuzavretí zmluvy)</li>
          <li>Právo na obmedzenie spracovania</li>
          <li>Právo namietať proti spracovaniu</li>
          <li>Právo podať sťažnosť na <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener">Úrad na ochranu osobných údajov SR</a></li>
        </ul>

        <h2>6. Kontakt v otázkach ochrany údajov</h2>
        <p>Akúkoľvek žiadosť alebo otázku adresujte na <a href="mailto:lubos.pejhovsky@advoka.sk">lubos.pejhovsky@advoka.sk</a> alebo poštou na sídlo kancelárie.</p>
      </div>
    </section>`
  }
];

// =============================================================================
// GENERATE
// =============================================================================
const ogRegex = /<meta property="og:title" content="[^"]*"[^>]*\/>\s*<meta property="og:description" content="[^"]*"[^>]*\/>\s*<meta property="og:url" content="[^"]*"[^>]*\/>/;

function buildPage(p) {
  let out = layout;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${p.title}</title>`);
  out = out.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${p.description}" />`);
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${p.canonical}" />`);
  out = out.replace(
    ogRegex,
    `<meta property="og:title" content="${p.ogTitle}" />\n  <meta property="og:description" content="${p.ogDesc}" />\n  <meta property="og:url" content="${p.canonical}" />`
  );
  out = out.replace(/<main id="main">[\s\S]*?<\/main>/, `<main id="main">\n${p.main}\n  </main>`);
  return out;
}

let count = 0;
for (const p of pages) {
  const outPath = path.join(root, p.path);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buildPage(p));
  count++;
  console.log(`✓ ${p.path}`);
}
console.log(`\nGenerated ${count} pages.`);
