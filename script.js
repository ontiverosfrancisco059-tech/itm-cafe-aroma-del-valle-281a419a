// Café Aroma Del Valle — interacciones del sitio (sin sistema propio de login/comentarios).
(function () {
  "use strict";

  // Menú móvil
  var toggle = document.getElementById("navToggle");
  var list = document.getElementById("navList");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Resaltado de sección activa
  var links = Array.prototype.slice.call(document.querySelectorAll('.main-nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // Año dinámico si existe marcador
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Cantidad en ficha de producto (solo UX, sin pedidos ni pagos)
  var qty = document.getElementById("qty");
  var total = document.getElementById("totalLine");
  var unit = document.getElementById("unitPrice");
  function money(n) {
    return "$" + Number(n).toFixed(2) + " MXN";
  }
  if (qty && total && unit) {
    var update = function () {
      var q = Math.max(1, parseInt(qty.value || "1", 10));
      qty.value = String(q);
      total.textContent = "Total estimado: " + money(Number(unit.dataset.price || 189) * q) + " · pago y entrega se confirman en el local.";
    };
    qty.addEventListener("input", update);
    update();
  }
})();
