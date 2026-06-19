/* ==========================================================================
   ECOVOCES — Comunidad (chat demo)
   Chat de comunidad para miembros "registrados". Sin backend: la identidad y
   los mensajes persisten en localStorage. Mensajes semilla + composición en
   vivo. La composición está bloqueada hasta que el visitante se une (nombre).
   ========================================================================== */
(function () {
  'use strict';
  var feed = document.getElementById('chat-feed');
  if (!feed) return;

  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');
  var gate = document.getElementById('chat-gate');
  var join = document.getElementById('chat-join');
  var joinName = document.getElementById('join-name');
  var meav = document.getElementById('chat-meav');
  var onlineEl = document.getElementById('chat-online');
  var membersEl = document.getElementById('chat-members');

  var K_USER = 'ev-chat-user';
  var K_MSGS = 'ev-chat-msgs-v1';

  var PALETTE = ['#0f7a49', '#0a7ea4', '#b8530f', '#7a3ea4', '#0f6b6b', '#9a6b00'];

  // Miembros "en línea" (semilla)
  var ONLINE = [
    { n: 'Valentina · Directora', s: true },
    { n: 'Prof. Daniel', s: true },
    { n: 'Samuel · Maker', s: true },
    { n: 'Mariana · Locutora', s: false },
    { n: 'Orientadora', s: true },
    { n: 'Familia Pérez', s: false }
  ];

  // Mensajes semilla
  var SEED = [
    { u: 'Valentina · Directora', t: '¡Hoy salimos al aire con la línea base de EcoPuntos! Gracias al equipo de 7º 👏', d: -56 },
    { u: 'Samuel · Maker', t: 'El HC-SR04 ya mide bien el nivel del contenedor. Subo el diagrama al laboratorio.', d: -41 },
    { u: 'Prof. Daniel', t: 'Excelente. Recuerden registrar el peso de hoy para comparar la próxima quincena.', d: -33 },
    { u: 'Mariana · Locutora', t: 'Ensayando la cortina de apertura 🎙️ ¿alguien tiene el guion del bloque 3?', d: -18 },
    { u: 'Familia Pérez', t: 'Nos encantó la emisión. En casa ya separamos el plástico 💚', d: -7 }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function initials(name) {
    var parts = name.replace(/[·#@].*$/, '').trim().split(/\s+/);
    var a = (parts[0] || '?')[0] || '?';
    var b = parts.length > 1 ? (parts[1][0] || '') : '';
    return (a + b).toUpperCase();
  }
  function colorFor(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return PALETTE[h % PALETTE.length];
  }
  function ago(min) {
    if (min >= -1) return 'ahora';
    var m = Math.abs(min);
    if (m < 60) return 'hace ' + m + ' min';
    var h = Math.round(m / 60);
    return 'hace ' + h + ' h';
  }

  function load() {
    try { var r = JSON.parse(localStorage.getItem(K_MSGS)); if (Array.isArray(r) && r.length) return r; } catch (e) {}
    var now = Date.now();
    return SEED.map(function (s) { return { u: s.u, t: s.t, ts: now + s.d * 60000 }; });
  }
  function save(msgs) {
    try { localStorage.setItem(K_MSGS, JSON.stringify(msgs.slice(-80))); } catch (e) {}
  }
  function getUser() { try { return localStorage.getItem(K_USER) || ''; } catch (e) { return ''; } }
  function setUser(n) { try { localStorage.setItem(K_USER, n); } catch (e) {} }

  var msgs = load();
  var me = getUser();

  function rowHTML(m) {
    var mine = m.u === me;
    var col = colorFor(m.u);
    var min = Math.round((m.ts - Date.now()) / 60000);
    return '<li class="ev-cmsg' + (mine ? ' is-me' : '') + '">' +
      '<span class="ev-cmsg__av" style="background:' + col + '">' + esc(initials(m.u)) + '</span>' +
      '<div class="ev-cmsg__bubble">' +
      '<span class="ev-cmsg__top"><b>' + esc(m.u) + '</b><time>' + ago(min) + '</time></span>' +
      '<p>' + esc(m.t) + '</p></div></li>';
  }

  function render() {
    feed.innerHTML = msgs.map(rowHTML).join('');
    feed.scrollTop = feed.scrollHeight;
  }

  function renderMembers() {
    if (!membersEl) return;
    var list = ONLINE.slice();
    if (me && !list.some(function (x) { return x.n === me; })) list.unshift({ n: me, s: true, you: true });
    membersEl.innerHTML = list.map(function (x) {
      return '<li><span class="ev-chat__mav" style="background:' + colorFor(x.n) + '">' + esc(initials(x.n)) +
        (x.s ? '<i class="ev-chat__pres"></i>' : '') + '</span><span class="ev-chat__mname">' + esc(x.n) +
        (x.you ? ' <em>(tú)</em>' : '') + '</span></li>';
    }).join('');
    if (onlineEl) onlineEl.textContent = String(20 + list.filter(function (x) { return x.s; }).length);
  }

  function applyIdentity() {
    if (me) {
      if (gate) gate.style.display = 'none';
      if (meav) { meav.textContent = initials(me); meav.style.background = colorFor(me); }
      if (input) input.disabled = false;
    } else {
      if (gate) gate.style.display = '';
      if (input) input.disabled = true;
    }
    renderMembers();
  }

  // Unirse
  if (join) {
    join.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = (joinName.value || '').trim();
      if (n.length < 2) { joinName.focus(); return; }
      me = n; setUser(n);
      applyIdentity();
      if (input) input.focus();
    });
  }

  // Enviar
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!me) { if (joinName) joinName.focus(); return; }
      var t = (input.value || '').trim();
      if (!t) return;
      msgs.push({ u: me, t: t, ts: Date.now() });
      save(msgs);
      input.value = '';
      render();
    });
  }

  render();
  applyIdentity();
})();

/* ==========================================================================
   Reproductor de emisora (visual / demo) + FAB de atajo
   ========================================================================== */
(function () {
  'use strict';
  var player = document.getElementById('player');
  var viz = document.getElementById('player-viz');
  var playBtn = document.getElementById('player-play');
  var statusEl = document.getElementById('player-status');
  var countEl = document.getElementById('player-count');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var playing = false, baseCount = 128, tick = null;

  // construir barras del ecualizador
  if (viz) {
    var N = 36, html = '';
    for (var i = 0; i < N; i++) {
      var dur = (0.55 + Math.random() * 0.7).toFixed(2);
      var del = (Math.random() * 0.6).toFixed(2);
      html += '<i style="--dur:' + dur + 's;animation-delay:' + del + 's"></i>';
    }
    viz.innerHTML = html;
  }

  function setStatus(t) { if (statusEl) statusEl.textContent = t; }

  function setPlaying(on) {
    playing = on;
    if (player) player.setAttribute('data-playing', on ? 'true' : 'false');
    if (playBtn) { playBtn.setAttribute('aria-pressed', on ? 'true' : 'false'); playBtn.setAttribute('aria-label', on ? 'Pausar la emisora' : 'Reproducir la emisora en vivo'); }
    setStatus(on ? 'Sonando ahora · en directo' : 'Toca para escuchar en vivo');
    if (fabLabel) fabLabel.textContent = on ? 'Sonando' : 'En vivo';
    if (on) {
      if (tick) clearInterval(tick);
      tick = setInterval(function () {
        if (!countEl) return;
        baseCount = Math.max(96, baseCount + (Math.random() < 0.5 ? -1 : 1) * (1 + (Math.random() * 3 | 0)));
        countEl.textContent = String(baseCount);
      }, 2600);
    } else if (tick) { clearInterval(tick); tick = null; }
  }

  if (playBtn) playBtn.addEventListener('click', function () { setPlaying(!playing); });

  // ---- FAB ----
  var fab = document.getElementById('fab');
  var fabLabel = document.getElementById('fab-label');
  var emisora = document.getElementById('emisora');

  if (fab && emisora) {
    fab.addEventListener('click', function () {
      var y = emisora.getBoundingClientRect().top + (window.pageYOffset || 0) - 70;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      if (!playing) setTimeout(function () { setPlaying(true); }, reduce ? 0 : 650);
    });

    var shown = false;
    function onScroll() {
      var trigger = window.innerHeight * 0.9;
      // ocultar el FAB cuando la propia sección de emisora está a la vista
      var r = emisora.getBoundingClientRect();
      var emisoraVisible = r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2;
      var should = (window.pageYOffset || 0) > trigger && !emisoraVisible;
      if (should !== shown) { shown = should; fab.classList.toggle('is-shown', should); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }
})();
