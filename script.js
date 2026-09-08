/* minisitee — landing. Sem dependências: só o necessário para a página respirar. */
(function () {
  'use strict';

  var APP = 'https://app.minisitee.com/login';

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

  /* ---------- Endereço escolhido no hero ---------- */
  var form = document.getElementById('formUsuario');
  var campo = document.getElementById('usuario');
  var url = document.getElementById('urlPreview');
  var nota = document.getElementById('notaUsuario');
  var notaPadrao = nota ? nota.textContent : '';

  // Mesma regra do app: minúsculas, sem acento, só letras, números e hífen.
  function apelidar(valor) {
    return valor
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30);
  }

  function atualizarPreview() {
    if (!url) return;
    var apelido = apelidar(campo.value) || 'seunome';
    url.textContent = 'minisitee.com/' + apelido;
  }

  if (campo) {
    campo.addEventListener('input', function () {
      atualizarPreview();
      if (nota) {
        nota.textContent = notaPadrao;
        nota.classList.remove('alerta');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var apelido = apelidar(campo.value);

      if (apelido.length < 3) {
        if (nota) {
          nota.textContent = 'Escolha um endereço com pelo menos 3 letras — ex.: doceriadaana.';
          nota.classList.add('alerta');
        }
        campo.focus();
        return;
      }

      window.location.href = APP + '?u=' + encodeURIComponent(apelido);
    });
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

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
