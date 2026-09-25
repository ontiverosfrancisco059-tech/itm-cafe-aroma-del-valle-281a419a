// Café Aroma Del Valle — interacciones de presentación únicamente.
// No contiene lógica de comentarios, tienda, carrito, checkout ni pedidos:
// comments.js y el runtime ITM hidratan esos componentes.
(function () {
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
