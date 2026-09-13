/* minisitee — site. Sem dependências: só o necessário para a página respirar. */
(function () {
  'use strict';

  var APP = 'https://app.minisitee.com/login';

  /* ---------- Menu no celular ---------- */
  var hamburguer = document.getElementById('hamburguer');
  var menu = document.getElementById('menu');

  function fecharMenu() {
    if (!menu) return;
    menu.classList.add('hidden');
    hamburguer.setAttribute('aria-expanded', 'false');
    hamburguer.setAttribute('aria-label', 'Abrir menu');
  }

  if (hamburguer && menu) {
    hamburguer.addEventListener('click', function () {
      var aberto = menu.classList.toggle('hidden') === false;
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
      if (menu.classList.contains('hidden')) return;
      if (e.target.closest('#cabecalho')) return;
      fecharMenu();
    });
  }

  /* ---------- Borda do cabeçalho ao rolar ---------- */
  var cabecalho = document.getElementById('cabecalho');
  var ticking = false;

  function aoRolar() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      cabecalho.setAttribute('data-rolado', String(window.scrollY > 8));
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
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30);
  }

  function avisar(texto, alerta) {
    if (!nota) return;
    nota.textContent = texto;
    nota.classList.toggle('text-destructive', alerta);
    nota.classList.toggle('text-muted-foreground', !alerta);
  }

  if (campo) {
    campo.addEventListener('input', function () {
      if (url) url.textContent = 'minisitee.com/' + (apelidar(campo.value) || 'seunome');
      avisar(notaPadrao, false);
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var apelido = apelidar(campo.value);

      if (apelido.length < 3) {
        avisar('Escolha um endereço com pelo menos 3 letras — ex.: doceriadaana.', true);
        campo.focus();
        return;
      }

      window.open(APP + '?u=' + encodeURIComponent(apelido), '_blank', 'noopener');
    });
  }

  /* ---------- Um item de FAQ aberto por vez (para navegadores sem name em details) ---------- */
  var perguntas = document.querySelectorAll('.accordion details');
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
