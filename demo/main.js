/* ============ Штукатурка64 — общий JS для страниц услуг ============ */
/* Пути относительные — работают и по file://, и на хостинге */

const SERVICE_ID = document.body.dataset.service || '';

// ---------- Иконки SVG ----------
const ICONS = {
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M8 12l3 3 5-6"/></svg>',
  ruler: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 20l6-6M14 3l7 7-9 9H5v-7l9-9z"/></svg>',
  truck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="8" width="13" height="9"/><path d="M16 11h4l2 3v3h-6"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M3 9l4 4 8-8"/></svg>',
  'check-sm': '<svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M3 9l4 4 8-8"/></svg>'
};

// ---------- Header ----------
function renderHeader(services) {
  const items = services.map(s => {
    const active = s.slug === SERVICE_ID ? ' active' : '';
    return `<a href="${s.slug}.html" class="mega-link${active}">${s.titleShort}<span>от ${formatNum(s.price)} ₽/${s.unit}</span></a>`;
  }).join('');
  return `
  <header class="header" id="header">
    <div class="container header-inner">
      <a href="../index.html" class="logo"><span class="logo-mark">Ш64</span><span>Штукатурка64<small>Саратов · Энгельс · пригород</small></span></a>
      <nav class="nav-desktop">
        <div class="dropdown has-dropdown" id="servicesDropdown">
          <button class="nav-link" aria-haspopup="true" aria-expanded="false">Услуги
            <svg class="chev" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 1l5 5 5-5"/></svg>
          </button>
          <div class="mega">${items}</div>
        </div>
        <a href="../uslugi.html" class="nav-link">Все услуги</a>
        <a href="../index.html#portfolio" class="nav-link">Портфолио</a>
        <a href="../index.html#reviews" class="nav-link">Отзывы</a>
        <a href="../kontakty.html" class="nav-link">Контакты</a>
      </nav>
      <div class="header-actions">
        <a href="tel:+78452000000" class="phone">+7 (8452) 00-00-00<small>ежедневно 8:00–20:00</small></a>
        <a href="#call" class="btn btn-primary">Заказать звонок</a>
        <button class="burger" id="burger" aria-label="Открыть меню"><span></span></button>
      </div>
    </div>
  </header>`;
}

// ---------- Mobile menu ----------
function renderMobileMenu(services) {
  const items = services.map(s => {
    const active = s.slug === SERVICE_ID ? ' active' : '';
    return `<li><a href="${s.slug}.html" class="${active}">${s.titleShort}</a></li>`;
  }).join('');
  return `
  <div class="mobile-menu" id="mobileMenu" aria-hidden="true">
    <div class="mobile-menu-head">
      <a href="../index.html" class="logo"><span class="logo-mark">Ш64</span> Штукатурка64</a>
      <button class="mm-close" id="mmClose" aria-label="Закрыть">×</button>
    </div>
    <a href="tel:+78452000000" class="phone">+7 (8452) 00-00-00<small>ежедневно 8:00–20:00</small></a>
    <ul>${items}<li><a href="../uslugi.html">Все услуги</a></li><li><a href="../index.html#portfolio">Портфолио</a></li><li><a href="../index.html#reviews">Отзывы</a></li><li><a href="../kontakty.html">Контакты</a></li></ul>
    <a href="#call" class="btn btn-primary btn-block" style="margin-top:24px">Рассчитать стоимость</a>
  </div>`;
}

// ---------- Footer ----------
function renderFooter(services) {
  const col1 = services.slice(0, 8).map(s => `<a href="${s.slug}.html">${s.titleShort}</a>`).join('');
  const col2 = services.slice(8, 17).map(s => `<a href="${s.slug}.html">${s.titleShort}</a>`).join('');
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <a href="../index.html" class="logo"><span class="logo-mark">Ш64</span> Штукатурка64</a>
          <p>Механизированная штукатурка стен и потолков, отделочные работы под ключ в Саратове, Энгельсе и пригороде. Работаем с 2016 года.</p>
        </div>
        <div><h4>Услуги</h4>${col1}</div>
        <div><h4>Ещё услуги</h4>${col2}</div>
        <div><h4>Компания</h4>
          <a href="../index.html#portfolio">Портфолио</a><a href="../index.html#reviews">Отзывы</a>
          <a href="../index.html#contractors">Подрядчикам</a><a href="../kontakty.html">Контакты</a>
          <a href="#">Политика конфиденциальности</a><a href="tel:+78452000000">+7 (8452) 00-00-00</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2016–2026 Штукатурка64 · Саратов, Энгельс</span>
        <span>SSL-защита · привязка к вашему домену</span>
      </div>
    </div>
  </footer>
  <div class="mobile-cta">
    <a href="tel:+78452000000" class="btn btn-secondary">Позвонить</a>
    <a href="#call" class="btn btn-primary">Заказать звонок</a>
  </div>`;
}

// ---------- Interactions ----------
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 8), { passive: true });

  const dd = document.getElementById('servicesDropdown');
  if (dd) {
    const btn = dd.querySelector('.nav-link');
    btn.addEventListener('click', e => { e.stopPropagation(); const o = dd.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
    document.addEventListener('click', () => { dd.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    dd.querySelector('.mega').addEventListener('click', e => e.stopPropagation());
  }

  const mm = document.getElementById('mobileMenu');
  document.getElementById('burger')?.addEventListener('click', () => { mm.classList.add('open'); mm.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; });
  document.getElementById('mmClose')?.addEventListener('click', () => { mm.classList.remove('open'); mm.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; });
  mm?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mm.classList.remove('open'); document.body.style.overflow = ''; }));
}

// ---------- Calculator ----------
function initCalc(service) {
  const area = document.getElementById('calcArea');
  const city = document.getElementById('calcCity');
  if (!area) return;
  const areaOut = document.getElementById('areaOut');
  const amount = document.getElementById('calcAmount');
  function recalc() {
    const total = Number(area.value) * service.price * Number(city.value);
    areaOut.textContent = area.value + ' ' + service.unit;
    amount.innerHTML = formatNum(total) + ' <small>₽</small>';
  }
  [area, city].forEach(el => el.addEventListener('input', recalc));
  recalc();
}

// ---------- Sticky indicator ----------
function initIndicator(service) {
  const el = document.createElement('div');
  el.className = 'service-indicator';
  el.textContent = 'Вы здесь: ' + service.titleShort;
  document.body.appendChild(el);
  const hero = document.querySelector('.svc-hero');
  if (!hero) return;
  const obs = new IntersectionObserver(([e]) => el.classList.toggle('visible', !e.isIntersecting), { threshold: 0 });
  obs.observe(hero);
}

// ---------- Form ----------
function initForm() {
  const form = document.getElementById('callForm');
  if (!form) return;
  form.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    form.classList.add('sent');
  });
}

// ---------- Helpers ----------
function formatNum(n) { return new Intl.NumberFormat('ru-RU').format(Math.round(n)); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// ---------- Mount ----------
document.addEventListener('DOMContentLoaded', () => {
  const data = window.SERVICES_DATA;
  if (!data) return;
  const service = data.services.find(s => s.slug === SERVICE_ID);
  if (!service) return;

  document.body.insertAdjacentHTML('afterbegin', renderHeader(data.services) + renderMobileMenu(data.services));
  document.body.insertAdjacentHTML('beforeend', renderFooter(data.services));
  initHeader();
  initCalc(service);
  initIndicator(service);
  initForm();
});