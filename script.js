/* Cafe Aroma Del Valle — script.js
 * Interacciones generales del home (presentacion).
 * Alcance permitido: navegacion movil, estado abierto/cerrado por horario,
 * resaltado de seccion activa, sombra de header y anio dinamico.
 * No incluye: logica de comentarios (comments.js), carrito, pedidos,
 * autenticacion, localStorage/sessionStorage ni WhatsApp.
 */
(function () {
  'use strict';

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  /* 1. Anio dinamico del footer (#year). */
  function initYear() {
    var el = document.getElementById('year');
    if (el) {
      el.textContent = String(new Date().getFullYear());
    }
  }

  /* 2. Menu movil: #menuBtn abre/cierra #navLinks. */
  function initMenu() {
    var btn = document.getElementById('menuBtn');
    var nav = document.getElementById('navLinks');
    if (!btn || !nav) return;

    function close() {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    if (!btn.hasAttribute('aria-expanded')) {
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.setAttribute('aria-controls', 'navLinks');

    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.closest && target.closest('a')) {
        close();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        close();
      }
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('open')) return;
      var target = event.target;
      if (target === btn || (btn.contains && btn.contains(target))) return;
      if (nav.contains && nav.contains(target)) return;
      close();
    });
  }

  /* 3. Sombra del header al hacer scroll (solo presentacion). */
  function initHeaderShadow() {
    var header = document.querySelector('header.nav');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 8) {
        header.style.boxShadow = '0 8px 24px rgba(0,0,0,.35)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 4. Estado abierto/cerrado segun horario publicado.
   * Lun-Vie 7:00-21:00, Sab 8:00-22:00, Dom 9:00-15:00.
   * Solo actualiza el texto informativo del hero ("Hoy: ...").
   */
  function getOpenStatus(now) {
    var day = now.getDay(); // 0=Dom .. 6=Sab
    var minutes = now.getHours() * 60 + now.getMinutes();
    var ranges = {
      0: [9 * 60, 15 * 60],
      1: [7 * 60, 21 * 60],
      2: [7 * 60, 21 * 60],
      3: [7 * 60, 21 * 60],
      4: [7 * 60, 21 * 60],
      5: [7 * 60, 21 * 60],
      6: [8 * 60, 22 * 60]
    };
    var range = ranges[day];
    if (!range) return { open: false, label: 'cerrado ahora' };
    var open = minutes >= range[0] && minutes < range[1];
    return { open: open, label: open ? 'abierto ahora' : 'cerrado ahora' };
  }

  function formatHour(totalMinutes) {
    var h = Math.floor(totalMinutes / 60);
    var m = totalMinutes % 60;
    var hh = h < 10 ? '0' + h : String(h);
    var mm = m < 10 ? '0' + m : String(m);
    return hh + ':' + mm;
  }

  function initOpenStatus() {
    var meta = document.querySelector('.hero-meta');
    if (!meta) return;
    var first = meta.querySelector('span');
    if (!first) return;
    // Evita duplicar si el inline u otra ejecucion ya lo actualizo.
    if (first.getAttribute('data-open-status') === 'done') return;

    var now = new Date();
    var status = getOpenStatus(now);
    var day = now.getDay();
    var closing = { 0: 15 * 60, 1: 21 * 60, 2: 21 * 60, 3: 21 * 60, 4: 21 * 60, 5: 21 * 60, 6: 22 * 60 }[day];

    var text = status.open
      ? 'Hoy: ' + status.label + ' · cerramos ' + formatHour(closing)
      : 'Hoy: ' + status.label + ' · consulta el horario';

    first.textContent = text;
    first.setAttribute('data-open-status', 'done');
  }

  /* 5. Resaltado de enlace activo segun seccion visible. */
  function initActiveLink() {
    var nav = document.getElementById('navLinks');
    if (!nav) return;
    var links = $all('a[href^="#"]', nav);
    if (!links.length) return;
    if (!('IntersectionObserver' in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href');
      if (id && id.length > 1) {
        map[id.slice(1)] = link;
      }
    });

    var sections = Object.keys(map)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.removeAttribute('aria-current'); });
            link.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* 6. Cierre del menu al navegar por anclas con scroll suave nativo. */
  function initAnchorOffset() {
    var nav = document.getElementById('navLinks');
    $all('a[href^="#"]', document).forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
        }
      });
    });
  }

  function init() {
    initYear();
    initMenu();
    initHeaderShadow();
    initOpenStatus();
    initActiveLink();
    initAnchorOffset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
