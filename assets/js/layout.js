/* ============================================================
   Тюмень Транс Логистик — сквозные блоки (хэдер, футер, модалка)
   Подключение на странице:
     <script src=".../assets/js/layout.js" defer></script>
   Разметка ниже — единственный источник правок: изменения
   здесь применяются на всех страницах сайта.
   ============================================================ */
(function () {
  'use strict';

  /* базовый путь к корню сайта — вычисляется из адреса самого скрипта,
     поэтому работает и на файле, и на сервере, с любой вложенностью страниц */
  var BASE = new URL('../../', document.currentScript.src).href;

  function url(p) { return BASE + p; }

  var ICONS = {
    phone: '<svg class="i" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
    mobile: '<svg class="i" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
    mail: '<svg class="i" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg class="i" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    chev: '<svg class="i chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    max: '<svg class="i" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>',
    tg: '<svg class="i" viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>'
  };

  /* TODO: заменить href на реальные ссылки MAX и Telegram */
  var CONTACTS =
    '<div class="hcontacts">' +
      '<div class="hcontact">' +
        '<a href="tel:88003333172"><span class="ico">' + ICONS.phone + '</span>8 (800) 3333-172</a>' +
        '<a href="tel:+79129239077"><span class="ico">' + ICONS.mobile + '</span>+7 912 923-90-77</a>' +
      '</div>' +
      '<div class="hcontact">' +
        '<a href="https://max.ru/" target="_blank" rel="noopener"><span class="ico">' + ICONS.max + '</span>Написать в MAX</a>' +
        '<a href="https://t.me/" target="_blank" rel="noopener"><span class="ico">' + ICONS.tg + '</span>Написать в Telegram</a>' +
      '</div>' +
      '<div class="hcontact hcontact--right">' +
        '<a href="mailto:ttl@ttl72.ru"><span class="ico">' + ICONS.mail + '</span>ttl@ttl72.ru</a>' +
        '<span><span class="ico">' + ICONS.pin + '</span>г. Тюмень, ул. Камчатская, д. 194, с. 4</span>' +
      '</div>' +
    '</div>';

  var NAV =
    '<nav class="nav" id="nav" aria-label="Основная навигация">' +
      '<ul class="nav__list">' +
        '<li><a class="nav__link" href="' + url('hranenie-veshhej/') + '">Хранение вещей</a></li>' +
        '<li class="nav__item--has-sub">' +
          '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-sub-1">Виды хранения ' + ICONS.chev + '</button>' +
          '<ul class="nav__sub" id="nav-sub-1">' +
            '<li><a href="' + url('hranenie-na-teplom-sklade/') + '">Хранение на теплом складе</a></li>' +
            '<li><a href="' + url('hranenie-opasnyh-gruzov/') + '">Хранение опасных грузов</a></li>' +
            '<li><a href="' + url('hranenie-na-otkrytyh-skladah/') + '">Хранение на открытых складах</a></li>' +
            '<li><a href="' + url('hranenie-gruza-na-otkrytoj-ploshhadke/') + '">Хранение на открытой площадке</a></li>' +
            '<li><a href="' + url('otvetstvennoe-hranenie-gruza-na-svh/') + '">Хранение груза на СВХ</a></li>' +
            '<li><a href="' + url('otvetstvennoe-hranenie-v-morozilnoj-kamere/') + '">Хранение в морозильной камере</a></li>' +
          '</ul>' +
        '</li>' +
        '<li class="nav__item--has-sub">' +
          '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-sub-2">Виды продукции ' + ICONS.chev + '</button>' +
          '<ul class="nav__sub" id="nav-sub-2">' +
            '<li><a href="' + url('otvetstvennoe-hranenie-tehniki/') + '">Ответственное хранение техники</a></li>' +
            '<li><a href="' + url('otvetstvennoe-hranenie-produktov/') + '">Ответственное хранение продуктов</a></li>' +
            '<li><a href="' + url('otvetstvennoe-hranenie-mebeli/') + '">Ответственное хранение мебели</a></li>' +
            '<li><a href="' + url('otvetstvennoe-hranenie-metalla/') + '">Ответственное хранение металла</a></li>' +
            '<li><a href="' + url('skladskoe-hranenie-sypuchih-gruzov/') + '">Хранение сыпучих грузов</a></li>' +
            '<li><a href="' + url('professionalnoe-hranenie-negabaritnogo-gruza-na-sklade/') + '">Хранение негабаритного груза</a></li>' +
            '<li><a href="' + url('professionalnye-uslugi-hranenija-sbornyh-gruzov/') + '">Хранение сборных грузов</a></li>' +
          '</ul>' +
        '</li>' +
        '<li><a class="nav__link" href="' + url('stoimost-otvethranenija/') + '">Стоимость ответхранения</a></li>' +
        '<li><a class="nav__link" href="' + url('o-kompanii/') + '">О компании</a></li>' +
        '<li><a class="nav__link" href="' + url('kontakty/') + '">Контакты</a></li>' +
      '</ul>' +
    '</nav>';

  var HEADER =
    '<header class="header" id="header">' +
      '<div class="header__top">' +
        '<div class="wrap header__top-row">' +
          '<a class="brand" href="' + BASE + '" aria-label="Тюмень Транс Логистик — на главную">' +
            '<img class="brand__logo" src="' + url('img/123-1-1.png') + '" alt="Логотип Тюмень Транс Логистик" width="219" height="215">' +
            '<span class="brand__name">Тюмень Транс Логистик</span>' +
          '</a>' +
          '<p class="header__slogan">Единственный логистический<br>оператор в Тюмени</p>' +
          CONTACTS +
        '</div>' +
      '</div>' +
      '<div class="header__bar">' +
        '<div class="wrap header__bar-row">' +
          NAV +
          '<button class="btn btn--primary btn--sm header__cta" type="button" data-open-modal>Оставить заявку</button>' +
          '<button class="burger" id="burger" type="button" aria-label="Меню" aria-expanded="false"><i></i></button>' +
        '</div>' +
      '</div>' +
    '</header>';

  var FOOTER =
    '<footer class="footer" id="footer">' +
      '<div class="wrap">' +
        '<div class="footer__grid">' +
          '<a class="brand" href="' + BASE + '" aria-label="Тюмень Транс Логистик — на главную">' +
            '<img class="brand__logo" src="' + url('img/123-1-1.png') + '" alt="" width="219" height="215">' +
            '<span class="brand__name">Тюмень Транс Логистик</span>' +
          '</a>' +
          '<p class="footer__slogan">Единственный логистический<br>оператор в Тюмени</p>' +
          CONTACTS +
        '</div>' +
      '</div>' +
      '<div class="footer__map">' +
        '<iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=80859078392" loading="lazy" style="border:0" allowfullscreen title="Адрес: г. Тюмень, ул. Камчатская, д. 194, с. 4"></iframe>' +
      '</div>' +
      '<div class="wrap">' +
        '<div class="footer__bottom">' +
          '<span>© <span id="footer-year">2026</span> Тюмень Транс Логистик</span>' +
          '<div class="footer__legal">' +
            '<a href="' + url('politika-konfidencialnosti/') + '">Политика конфиденциальности</a>' +
            '<a href="' + url('soglashenie-o-personalnyh-dannyh/') + '">Соглашение о персональных данных</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var MODAL =
    '<div class="modal" id="modal" hidden>' +
      '<div class="modal__backdrop" data-close-modal></div>' +
      '<div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<button class="modal__close" type="button" data-close-modal aria-label="Закрыть">×</button>' +
        '<form class="form" id="modal-form" novalidate>' +
          '<h3 id="modal-title">Оставить заявку</h3>' +
          '<div class="field"><input id="m-name" name="name" placeholder=" " autocomplete="name"><label for="m-name">Ваше имя</label><span class="err">Укажите имя</span></div>' +
          '<div class="field"><input id="m-phone" name="phone" type="tel" placeholder=" " autocomplete="tel" inputmode="tel"><label for="m-phone">Телефон</label><span class="err">Проверьте номер</span></div>' +
          '<div class="field"><textarea id="m-msg" name="msg" rows="2" placeholder=" "></textarea><label for="m-msg">Что и сколько нужно хранить</label></div>' +
          '<button class="btn btn--primary" type="submit">Отправить заявку <span class="arrow">→</span></button>' +
          '<p class="fine">Нажимая кнопку, вы соглашаетесь на <a href="' + url('soglashenie-o-personalnyh-dannyh/') + '">обработку персональных данных</a> и с <a href="' + url('politika-konfidencialnosti/') + '">политикой конфиденциальности</a></p>' +
          '<div class="form__ok" role="status" aria-live="polite"><div class="tick">✓</div><h3>Заявка принята</h3><p>Мы свяжемся с вами в ближайшее время.</p></div>' +
        '</form>' +
      '</div>' +
    '</div>';

  /* ---------- вставка блоков ---------- */
  document.body.insertAdjacentHTML('afterbegin', HEADER);
  document.body.insertAdjacentHTML('beforeend', FOOTER + MODAL);

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var modal = document.getElementById('modal');
  var modalForm = document.getElementById('modal-form');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- скролл: компактный хэдер ---------- */
  function onScroll() {
    header.classList.toggle('is-scrolled', scrollY > 40);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- бургер-меню ---------- */
  function syncNavTop() {
    nav.style.top = header.offsetHeight + 'px';
  }
  function closeMenu() {
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
    if (open) syncNavTop(); else closeSubs();
  });
  addEventListener('resize', function () {
    if (document.body.classList.contains('menu-open')) syncNavTop();
    if (innerWidth > 1180) closeMenu();
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenu(); closeModal(); } });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  /* ---------- выпадающие пункты меню ---------- */
  var subs = [].slice.call(document.querySelectorAll('.nav__item--has-sub'));
  function closeSubs(except) {
    subs.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('is-open');
      li.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
    });
  }
  subs.forEach(function (li) {
    var toggle = li.querySelector('.nav__toggle');
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !li.classList.contains('is-open');
      closeSubs(li);
      li.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__item--has-sub')) closeSubs();
  });

  /* ---------- активный пункт меню ---------- */
  var here = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
  [].slice.call(nav.querySelectorAll('a')).forEach(function (a) {
    var href = a.getAttribute('href').replace(/\/$/, '');
    if (href === here) {
      a.classList.add('is-active');
      var topLi = a.closest('.nav__item--has-sub');
      if (topLi) topLi.querySelector('.nav__toggle').classList.add('is-active');
    }
  });

  /* ---------- модалка заявки ---------- */
  var lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add('is-in'); });
    document.body.classList.add('modal-open');
    closeMenu();
    var first = modal.querySelector('input');
    if (first) first.focus();
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('is-in');
    document.body.classList.remove('modal-open');
    var done = function () { modal.hidden = true; };
    if (reduce) done(); else setTimeout(done, 420);
    if (lastFocus) lastFocus.focus();
    setTimeout(function () {
      modalForm.classList.remove('is-sent');
      modalForm.reset();
      [].slice.call(modalForm.querySelectorAll('.field')).forEach(function (f) { f.classList.remove('is-bad'); });
    }, 500);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-modal]')) openModal();
    if (e.target.closest('[data-close-modal]')) closeModal();
  });
  modal.querySelector('.modal__dialog').addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = [].slice.call(this.querySelectorAll('button, input, textarea, a[href]')).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- форма (демо: без бэкенда) ---------- */
  modalForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('m-name');
    var phone = document.getElementById('m-phone');
    var okName = name.value.trim().length >= 2;
    var okPhone = phone.value.replace(/\D/g, '').length >= 10;
    name.parentElement.classList.toggle('is-bad', !okName);
    phone.parentElement.classList.toggle('is-bad', !okPhone);
    if (okName && okPhone) modalForm.classList.add('is-sent');
  });
  [].slice.call(modalForm.querySelectorAll('.field input')).forEach(function (i) {
    i.addEventListener('input', function () { i.parentElement.classList.remove('is-bad'); });
  });

  /* ---------- год в подвале ---------- */
  var y = document.getElementById('footer-year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
