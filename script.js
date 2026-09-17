/* minisitee — landing. Sem dependências: só o necessário para a página respirar. */
(function () {
  'use strict';

  /* ---------- Menu no celular ---------- */
  var hamburguer = document.getElementById('hamburguer');
  var menu = document.getElementById('menu');

  function fecharMenu() {
    if (!menu) return;
    menu.classList.remove('aberto');
    hamburguer.setAttribute('aria-expanded', 'false');
    hamburguer.setAttribute('aria-label', 'Abrir menu');
  }

  if (hamburguer && menu) {
    hamburguer.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      hamburguer.setAttribute('aria-expanded', String(aberto));
      hamburguer.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) fecharMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('aberto')) return;
      if (e.target.closest('#menu') || e.target.closest('#hamburguer')) return;
      fecharMenu();
    });
  }

  /* ---------- Sombra do cabeçalho ao rolar ---------- */
  var cabecalho = document.getElementById('cabecalho');
  var ticking = false;

  function aoRolar() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      cabecalho.classList.toggle('grudado', window.scrollY > 8);
      ticking = false;
    });
  }

  if (cabecalho) {
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
  }

  /* ---------- Um item de FAQ aberto por vez (para navegadores sem name em details) ---------- */
  var perguntas = document.querySelectorAll('.faq details');
  var suportaNome = 'name' in document.createElement('details');

  if (!suportaNome) {
    perguntas.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        perguntas.forEach(function (outro) {
          if (outro !== item) outro.open = false;
        });
      });
    });
  }

  /* ---------- Aviso de cookies: só informa, não pede permissão ---------- */
  // O Google Analytics mede desde o carregamento (tag no <head>); o aviso
  // aparece até o visitante clicar em "Entendi".
  var CHAVE_COOKIES = 'minisitee-cookies';
  var jaViu = null;
  try { jaViu = localStorage.getItem(CHAVE_COOKIES); } catch (e) {}

  if (!jaViu) {
    var aviso = document.createElement('section');
    aviso.className = 'aviso-cookies';
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<p>Este site usa cookies para saber quantas pessoas nos visitam e melhorar a página. ' +
      '<a href="/cookies/" target="_blank" rel="noopener">Saiba mais</a></p>' +
      '<div class="aviso-cookies-botoes">' +
        '<button type="button" class="btn btn-contorno">Entendi</button>' +
      '</div>';
    aviso.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(CHAVE_COOKIES, 'visto'); } catch (e) {}
      aviso.remove();
    });
    document.body.appendChild(aviso);
  }

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
