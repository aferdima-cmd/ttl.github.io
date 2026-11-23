/* ============================================================
   Лендинг главной страницы — интерактив секций
   (reveal, счётчики, marquee, проблемы, табы, аккордеон,
    форма секции контактов, прогресс, fab, tilt/magnetic/glow)
   Логика хэдера/футера/модалки — в layout.js, здесь не дублируется.
   Подключение: <script src=".../assets/js/landing.js" defer></script>
   ============================================================ */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  /* ---------- появление секций (reveal) ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    $$('[data-reveal]').forEach(function (el, i) {
      if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', String(i % 9));
      io.observe(el);
    });
    requestAnimationFrame(function () {
      $$('.hero [data-reveal], .hero__title, .hero__sub').forEach(function (el) { el.classList.add('is-in'); });
    });
  } else {
    $$('[data-reveal]').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- счётчики ---------- */
  var fmt = function (v) { return v.toLocaleString('ru-RU'); };
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        co.unobserve(e.target);
        var el = e.target, end = +el.dataset.count;
        var pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
        var t0 = performance.now(), d = reduce ? 1 : 1800;
        (function tick(t) {
          var p = Math.min((t - t0) / d, 1), v = Math.round(end * (1 - Math.pow(1 - p, 4)));
          el.textContent = pre + fmt(v) + suf;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: .5 });
    $$('[data-count]').forEach(function (el) { co.observe(el); });
  }

  /* ---------- бегущая строка ---------- */
  var mq = $('#marquee');
  if (mq) mq.innerHTML += mq.innerHTML;

  /* ---------- зацикленная анимация иконок преимуществ ---------- */
  $$('.benc__mark svg').forEach(function (svg) {
    var shapes = svg.querySelectorAll('path, circle, rect, ellipse, polyline, line');
    shapes.forEach(function (el, i) {
      var len;
      try { len = Math.ceil(el.getTotalLength()) || 1; } catch (e) { len = 1; }
      el.style.setProperty('--len', len + 'px');
      el.style.setProperty('--delay', (-i * 1.4) + 's');
    });
  });

  /* ---------- видео в шапке «проблемы» ---------- */
  $$('[data-video-play]').forEach(function (btn) {
    var host = btn.closest('.head-video');
    var video = host && host.querySelector('video');
    if (!video || !host) return;
    btn.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        host.classList.add('is-playing');
      } else {
        video.pause();
        host.classList.remove('is-playing');
      }
    });
    video.addEventListener('pause', function () { host.classList.remove('is-playing'); });
    video.addEventListener('ended', function () { host.classList.remove('is-playing'); video.load(); });
  });

  /* ---------- прогресс чтения + плавающая кнопка ---------- */
  var prog = $('#progress'), fab = $('#fab'), contact = $('#contact');
  function onScroll() {
    var y = scrollY;
    if (prog) {
      var max = document.documentElement.scrollHeight - innerHeight;
      prog.style.setProperty('--p', (max > 0 ? (y / max) * 100 : 0) + '%');
    }
    if (fab) {
      var nearContact = contact && contact.getBoundingClientRect().top < innerHeight * .6;
      fab.classList.toggle('is-on', y > 700 && !nearContact);
    }
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- карточки «проблемы» ---------- */
  $$('[data-prob]').forEach(function (c) {
    c.setAttribute('role', 'button');
    c.tabIndex = 0;
    c.setAttribute('aria-expanded', 'false');
    var toggle = function () {
      var o = c.classList.toggle('is-open');
      c.setAttribute('aria-expanded', String(o));
    };
    c.addEventListener('click', toggle);
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--px', (e.clientX - r.left) + 'px');
      c.style.setProperty('--py', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- преимущества (bento-сетка, статичная — без JS) ---------- */

  /* ---------- форма секции контактов (демо: без бэкенда) ---------- */
  var form = $('#form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#f-name'), phone = $('#f-phone');
      var okName = name.value.trim().length >= 2;
      var okPhone = phone.value.replace(/\D/g, '').length >= 10;
      name.parentElement.classList.toggle('is-bad', !okName);
      phone.parentElement.classList.toggle('is-bad', !okPhone);
      var agree = $('#f-agree');
      var okAgree = !agree || agree.checked;
      if (agree) agree.closest('.consent').classList.toggle('is-bad', !okAgree);
      if (okName && okPhone && okAgree) form.classList.add('is-sent');
    });
    $$('.field input', form).forEach(function (i) {
      i.addEventListener('input', function () { i.parentElement.classList.remove('is-bad'); });
    });
    var agree = $('#f-agree');
    if (agree) agree.addEventListener('change', function () {
      if (agree.checked) agree.closest('.consent').classList.remove('is-bad');
    });
  }

  /* ---------- курсор-свечение, магнитные кнопки, 3D-тильт ---------- */
  if (!reduce && fine) {
    var glow = $('#glow');
    if (glow) {
      addEventListener('pointermove', function (e) {
        glow.style.setProperty('--mx', e.clientX + 'px');
        glow.style.setProperty('--my', e.clientY + 'px');
      });
    }

    $$('[data-magnetic]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.setProperty('--bx', ((e.clientX - r.left - r.width / 2) * .22) + 'px');
        b.style.setProperty('--by', ((e.clientY - r.top - r.height / 2) * .32) + 'px');
      });
      b.addEventListener('pointerleave', function () {
        b.style.setProperty('--bx', '0px');
        b.style.setProperty('--by', '0px');
      });
    });

    $$('[data-tilt]').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ry', ((x - .5) * 8) + 'deg');
        c.style.setProperty('--rx', ((.5 - y) * 8) + 'deg');
        c.style.setProperty('--px', (x * 100) + '%');
        c.style.setProperty('--py', (y * 100) + '%');
      });
      c.addEventListener('pointerleave', function () {
        c.style.setProperty('--rx', '0deg');
        c.style.setProperty('--ry', '0deg');
      });
    });

    $$('[data-tilt-lite]').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--px', (e.clientX - r.left) + 'px');
        c.style.setProperty('--py', (e.clientY - r.top) + 'px');
      });
    });

    var m = $('[data-tilt3d]');
    if (m) {
      m.addEventListener('pointermove', function (e) {
        var r = m.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        m.style.setProperty('--ry', ((x - .5) * 10) + 'deg');
        m.style.setProperty('--rx', ((.5 - y) * 10) + 'deg');
      });
      m.addEventListener('pointerleave', function () {
        m.style.setProperty('--rx', '0deg');
        m.style.setProperty('--ry', '0deg');
      });
    }
  }

  /* ==================== КАЛЬКУЛЯТОР СТОИМОСТИ ==================== */
  (function () {
    var calc = document.getElementById('calc');
    if (!calc) return;
    var volume = calc.querySelector('[data-calc-volume]');
    var volumeOut = calc.querySelector('[data-calc-volume-out]');
    var months = calc.querySelector('[data-calc-months]');
    var monthsOut = calc.querySelector('[data-calc-months-out]');
    var rate = calc.querySelector('[data-calc-rate]');
    var extras = $$('[data-calc-extra]', calc);
    var outMonth = $('[data-calc-month]');
    var outDiscount = $('[data-calc-discount]');
    var outTotal = $('[data-calc-total]');
    var outNote = $('[data-calc-note]');

    function fmt(n) { return Math.round(n).toLocaleString('ru-RU'); }

    function calculate() {
      var v = parseFloat(volume.value);
      var m = parseInt(months.value, 10);
      var base = parseFloat(rate.value) * v;
      var extraRate = 0;
      extras.forEach(function (e) { if (e.checked) extraRate += parseFloat(e.getAttribute('data-extra')); });
      var perMonth = base * (1 + extraRate);
      var disc = m >= 18 ? 0.15 : m >= 12 ? 0.10 : m >= 6 ? 0.05 : 0;
      var total = perMonth * m * (1 - disc);
      volumeOut.textContent = String(v).replace('.', ',') + ' м³';
      monthsOut.textContent = m + ' мес';
      outMonth.textContent = fmt(perMonth) + ' ₽';
      outDiscount.textContent = Math.round(disc * 100) + ' %';
      outTotal.textContent = fmt(total) + ' ₽';
      if (outNote) {
        outNote.textContent = disc > 0
          ? 'Скидка ' + Math.round(disc * 100) + '% за предоплату от ' + (disc === 0.05 ? 6 : disc === 0.10 ? 12 : 18) + ' месяцев уже применена'
          : 'Оплатите от 6 месяцев сразу — и получите скидку до 15%';
      }
    }

    ['input', 'change'].forEach(function (ev) { calc.addEventListener(ev, calculate); });
    calculate();
  })();
})();
