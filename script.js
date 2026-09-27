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

  /* ---------- Botão flutuante de WhatsApp ---------- */
  var whatsapp = document.createElement('a');
  whatsapp.className = 'whatsapp-flutuante';
  whatsapp.href = 'https://wa.me/5548988105199?text=' +
    encodeURIComponent('Olá! Quero saber mais sobre o minisitee.');
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener';
  whatsapp.setAttribute('aria-label', 'Conversar no WhatsApp');
  whatsapp.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46Zm8.06-17.53A11.32 11.32 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.7L.55 23.63l6.04-1.58a11.37 11.37 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05Z"/></svg>';
  document.body.appendChild(whatsapp);

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
    // O botão de WhatsApp sobe enquanto o aviso estiver na tela
    function medirAviso() {
      document.body.style.setProperty('--altura-aviso', aviso.offsetHeight + 'px');
    }
    aviso.querySelector('button').addEventListener('click', function () {
      try { localStorage.setItem(CHAVE_COOKIES, 'visto'); } catch (e) {}
      aviso.remove();
      document.body.classList.remove('com-aviso-cookies');
      window.removeEventListener('resize', medirAviso);
    });
    document.body.appendChild(aviso);
    document.body.classList.add('com-aviso-cookies');
    medirAviso();
    window.addEventListener('resize', medirAviso);
  }

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
