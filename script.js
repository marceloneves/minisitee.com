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

      // Mesmo mínimo do app: o endereço precisa ter de 7 a 30 caracteres.
      if (apelido.length < 7) {
        if (nota) {
          nota.textContent = 'Escolha um endereço com pelo menos 7 caracteres — ex.: doceriadaana.';
          nota.classList.add('alerta');
        }
        campo.focus();
        return;
      }

      window.open(APP + '?u=' + encodeURIComponent(apelido), '_blank', 'noopener');
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

  /* ---------- Aviso de cookies: o Google Analytics só grava com o aceite ---------- */
  // O consentimento começa negado no <head> de cada página; aqui a escolha é
  // pedida, guardada e repassada ao gtag.
  var CHAVE_COOKIES = 'minisitee-cookies';
  var aviso = null;

  function lerEscolha() {
    try { return localStorage.getItem(CHAVE_COOKIES); } catch (e) { return null; }
  }

  function apagarCookiesAnalytics() {
    var dominio = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (par) {
      var nome = par.split('=')[0].trim();
      if (nome !== '_ga' && nome.indexOf('_ga_') !== 0) return;
      ['', '; domain=' + dominio, '; domain=.' + dominio].forEach(function (sufixo) {
        document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + sufixo;
      });
    });
  }

  function fecharAviso() {
    if (!aviso) return;
    aviso.remove();
    aviso = null;
  }

  function escolher(valor) {
    try { localStorage.setItem(CHAVE_COOKIES, valor); } catch (e) {}
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: valor === 'aceito' ? 'granted' : 'denied' });
    }
    if (valor === 'recusado') apagarCookiesAnalytics();
    fecharAviso();
  }

  function abrirAviso() {
    if (aviso) return;
    aviso = document.createElement('section');
    aviso.className = 'aviso-cookies';
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<p>Com a sua permissão, usamos o Google Analytics para contar visitas e entender o que funciona no site. ' +
      '<a href="/cookies/" target="_blank" rel="noopener">Política de cookies</a></p>' +
      '<div class="aviso-cookies-botoes">' +
        '<button type="button" class="btn btn-contorno" data-escolha="recusado">Recusar</button>' +
        '<button type="button" class="btn btn-contorno" data-escolha="aceito">Aceitar</button>' +
      '</div>';
    aviso.addEventListener('click', function (e) {
      var botao = e.target.closest('[data-escolha]');
      if (botao) escolher(botao.getAttribute('data-escolha'));
    });
    document.body.appendChild(aviso);
  }

  if (!lerEscolha()) abrirAviso();

  document.querySelectorAll('[data-preferencias-cookies]').forEach(function (botao) {
    botao.addEventListener('click', abrirAviso);
  });

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
