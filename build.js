/* node build.js — генерирует 17 HTML-файлов в папке services/ */
const fs = require('fs');
const path = require('path');
const { services } = require('./services.js');

const OUT_DIR = path.join(__dirname, 'services');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Иконки для trust-блоков (дублируем из main.js — build.js не может выполнять браузерный JS)
const ICONS = {
  shield: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M8 12l3 3 5-6"/></svg>',
  ruler: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 20l6-6M14 3l7 7-9 9H5v-7l9-9z"/></svg>',
  truck: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="8" width="13" height="9"/><path d="M16 11h4l2 3v3h-6"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M3 9l4 4 8-8"/></svg>',
  checkLg: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l4 4 8-8"/></svg>'
};

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function fmt(n) { return new Intl.NumberFormat('ru-RU').format(Math.round(n)); }

function renderTrust(items) {
  return items.map(t => `
    <div class="trust-item">
      <div class="ico">${ICONS[t.icon] || ICONS.shield}</div>
      <h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>
    </div>`).join('');
}

function renderTable(rows) {
  return rows.map(r => `<tr><td>${esc(r.work)}</td><td>${esc(r.unit)}</td><td>${esc(r.price)}</td></tr>`).join('');
}

function renderPhotos(photos) {
  return photos.map((p, i) => `
    <div class="photo-card">
      <div class="img" role="img" aria-label="Фото: ${esc(p.caption)}"></div>
      <div class="cap"><b>${esc(p.title)}</b>${esc(p.caption)}</div>
    </div>`).join('');
}

function renderIncluded(items) {
  return items.map(i => `<li>${ICONS.checkLg}<span>${esc(i)}</span></li>`).join('');
}

function renderRelated(relatedSlugs) {
  return relatedSlugs.map(slug => {
    const s = services.find(x => x.slug === slug);
    if (!s) return '';
    return `<a href="${s.slug}.html" class="related-card"><h3>${esc(s.titleShort)}</h3><div class="price">от ${fmt(s.price)} ₽ <span>/ ${s.unit}</span></div></a>`;
  }).join('');
}

function renderFaq(faq) {
  return faq.map(f => `
    <details class="faq-item">
      <summary>${esc(f.q)}</summary>
      <p>${esc(f.a)}</p>
    </details>`).join('');
}

function renderPage(s) {
  // уникальные поля: title, titleEm, icon, price, unit, lead, usps, included, trust, table, photos, related, faq, calc
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(s.title)} — от ${fmt(s.price)} ₽/${s.unit}, гарантия ${s.warranty || '3 года'}</title>
<meta name="description" content="${esc(s.lead.slice(0, 160))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": s.titleShort,
  "provider": { "@type": "HomeAndConstructionBusiness", "name": "Штукатурка64", "telephone": "+7 (8452) 00-00-00" },
  "areaServed": ["Саратов", "Энгельс", "Саратовская область"],
  "offers": { "@type": "Offer", "price": String(s.price), "priceCurrency": "RUB" }
})}</script>
</head>
<body data-service="${s.slug}">

<nav class="crumbs" aria-label="Хлебные крошки">
  <div class="container">
    <a href="../index.html">Главная</a><span>/</span><a href="../uslugi.html">Услуги</a><span>/</span><span class="current">${esc(s.titleShort)}</span>
  </div>
</nav>

<section class="svc-hero">
  <div class="container svc-hero-grid">
    <div>
      <div class="svc-hero-head">
        <div class="svc-hero-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg></div>
        <div>
          <div class="svc-hero-tag">Раздел: ${esc(s.titleShort)}</div>
          <h1>${esc(s.title)}</h1>
        </div>
      </div>
      <p class="lead">${esc(s.lead)}</p>
      <ul class="svc-hero-points">${s.usps.map(u => `<li>${ICONS.checkLg}${esc(u)}</li>`).join('')}</ul>
      <div class="svc-hero-cta">
        <a href="#call" class="btn btn-primary">Вызвать замерщика</a>
        <a href="#calc" class="btn btn-ghost-light">Рассчитать стоимость</a>
      </div>
    </div>
    <aside class="price-card">
      <div class="label">Цена за работу</div>
      <div class="big">от ${fmt(s.price)} <small>₽ / ${s.unit}</small></div>
      <div class="sub">${s.unit === 'м²' ? 'Без стоимости материала' : 'Стоимость за единицу'}</div>
      <ul>
        <li>${ICONS.check} Гарантия ${s.warranty || '3 года'}</li>
        <li>${ICONS.check} Замер бесплатно</li>
        <li>${ICONS.check} Работаем по договору</li>
      </ul>
      <a href="#call" class="btn btn-primary">Узнать точную цену</a>
      <div class="note">Ответим за 15 минут</div>
    </aside>
  </div>
</section>

<section>
  <div class="container">
    <div class="trust-grid">${renderTrust(s.trust)}</div>
  </div>
</section>

<section class="bg-gray">
  <div class="container">
    <div class="section-head">
      <span class="kicker">Что входит</span>
      <h2>Что входит в стоимость услуги</h2>
      <p>Полный перечень работ — без скрытых доплат. Всё, что не входит, обговариваем на замере.</p>
    </div>
    <div class="included-grid">
      <ul class="included-list">${renderIncluded(s.included)}</ul>
      <aside class="included-aside">
        <h3>Нужна консультация?</h3>
        <p>Прораб ответит на вопросы по вашей задаче, сориентирует по цене и срокам. Без навязывания.</p>
        <a href="#call" class="btn btn-primary">Задать вопрос прорабу</a>
      </aside>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head">
      <span class="kicker">Цены</span>
      <h2>Стоимость по видам работ</h2>
      <p>Цены за работу без материала. Точная смета — после бесплатного замера.</p>
    </div>
    <div class="table-wrap">
      <table class="price">
        <thead><tr><th>Вид работ</th><th>Ед. изм.</th><th>Цена, ₽</th></tr></thead>
        <tbody>${renderTable(s.table)}</tbody>
      </table>
    </div>
    <p class="table-note">* Указаны ориентировочные цены. Итоговая стоимость зависит от объёма и состояния объекта.</p>
  </div>
</section>

<section class="bg-gray">
  <div class="container">
    <div class="section-head">
      <span class="kicker">Как проходит работа</span>
      <h2>Три этапа — от заявки до сдачи</h2>
      <p>Каждый день — фотоотчёт в мессенджер.</p>
    </div>
    <div class="photos-grid">${renderPhotos(s.photos)}</div>
  </div>
</section>

<section id="calc">
  <div class="container">
    <div class="calc-wrap">
      <div class="calc-head">
        <span class="kicker">Калькулятор</span>
        <h2>Посчитайте стоимость: ${esc(s.titleShort.toLowerCase())}</h2>
        <p>Услуга уже выбрана. Укажите объём и город — увидите цену. Точная сумма — после замера.</p>
      </div>
      <div class="calc-grid">
        <div class="calc-form">
          <div class="field">
            <label for="calcArea">Объём (${s.unit})</label>
            <div class="slider-row" style="margin-bottom:0;">
              <span style="color:rgba(255,255,255,.75);font-size:14px;">${s.calcMin} – ${s.calcMax} ${s.unit}</span>
              <output id="areaOut">${s.calcDefault} ${s.unit}</output>
            </div>
            <input type="range" id="calcArea" min="${s.calcMin}" max="${s.calcMax}" step="${s.calcStep || 1}" value="${s.calcDefault}" aria-label="Объём">
          </div>
          <div class="field">
            <label for="calcCity">Город</label>
            <select id="calcCity"><option value="1">Саратов</option><option value="1">Энгельс</option><option value="1.05">Пригород (до 30 км)</option></select>
          </div>
        </div>
        <div class="calc-result">
          <div class="label">Предварительная стоимость</div>
          <div class="amount" id="calcAmount">${fmt(s.price * s.calcDefault)} <small>₽</small></div>
          <div class="disclaimer">* Только работа, без материала. Точная сумма — после замера.</div>
          <a href="#call" class="btn btn-primary btn-block">Записаться на замер</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="bg-gray">
  <div class="container">
    <div class="section-head">
      <span class="kicker">Вопросы</span>
      <h2>Частые вопросы по услуге</h2>
    </div>
    <div class="faq">${renderFaq(s.faq)}</div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head">
      <span class="kicker">Смежные услуги</span>
      <h2>Часто берут вместе с «${esc(s.titleShort.toLowerCase())}»</h2>
      <p>Закрываем ремонт одной бригадой — не нужно искать отдельных мастеров.</p>
    </div>
    <div class="related-grid">${renderRelated(s.related)}</div>
  </div>
</section>

<section id="call">
  <div class="container">
    <div class="call-block">
      <div>
        <h2>Бесплатный замер и точная смета</h2>
        <p>Перезвоним за 15 минут, зададим 3–4 вопроса и согласуем удобное время выезда.</p>
        <div class="contacts">
          <div><b>+7 (8452) 00-00-00</b><span>ежедневно 8:00–20:00</span></div>
          <div><b>Saratov@plaster64.ru</b><span>для смет и документов</span></div>
        </div>
      </div>
      <div class="call-form" id="callForm">
        <div class="success">Спасибо! Перезвоним в течение 15 минут.</div>
        <form>
          <input type="text" name="name" placeholder="Ваше имя" required>
          <input type="tel" name="phone" placeholder="Телефон" required>
          <textarea name="comment" placeholder="Кратко: что нужно сделать и какой объём"></textarea>
          <button type="submit" class="btn btn-primary btn-block">Получить смету</button>
          <p class="policy">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
        </form>
      </div>
    </div>
  </div>
</section>

<script src="../services.js"></script>
<script src="../main.js"></script>
</body>
</html>`;
}

// Генерация
let count = 0;
for (const s of services) {
  const html = renderPage(s);
  const file = path.join(OUT_DIR, `${s.slug}.html`);
  fs.writeFileSync(file, html, 'utf8');
  console.log(`✓ ${s.slug}.html`);
  count++;
}
console.log(`\nГотово: ${count} страниц в папке services/`);