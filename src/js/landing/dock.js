/* ==========================================================================
   DOCK ISLA — barra de acciones flotante (estilo Aqua)
   · Aparece con buena sincronización al salir del hero, se oculta al volver.
   · Asume las funciones del header: inicio, secciones, emisora en vivo,
     comunidad, idioma e ingresar.
   · Píldora indicadora deslizante (scrollspy) + hoja de secciones.
   ========================================================================== */
(function () {
  var dock = document.getElementById("dock-island");
  if (!dock) return;

  var hero = document.getElementById("hero");
  var bar = dock.querySelector(".ev-dock__bar");
  var sheet = document.getElementById("dock-sheet");
  var ind = document.getElementById("dock-ind");
  var liveBtn = dock.querySelector(".ev-dock__btn--live");
  var secBtn = dock.querySelector('[data-act="secciones"]');
  var langTxt = document.getElementById("dock-langtxt");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Mostrar / ocultar segun el hero ---------------- */
  var shown = false, ticking = false, curAct = null;

  function setShown(s) {
    if (s === shown) return;
    shown = s;
    dock.classList.toggle("is-shown", s);
    dock.setAttribute("aria-hidden", s ? "false" : "true");
    document.body.classList.toggle("ev-dock-on", s);
    if (!s) closeSheet();
    if (s) { positionIndicator(true); }
  }

  function inView(id, topF, botF) {
    var e = document.getElementById(id); if (!e) return false;
    var r = e.getBoundingClientRect(), vh = window.innerHeight;
    return r.top < vh * topF && r.bottom > vh * botF;
  }

  function currentAct() {
    if (inView("lab", 0.7, 0.18)) return "ingresar";
    if (inView("emisora", 0.62, 0.34)) return "emisora";
    var m = document.getElementById("manifiesto");
    if (m && m.getBoundingClientRect().top > window.innerHeight * 0.25) return "inicio";
    return "secciones";
  }

  /* ---------------- Indicador deslizante ---------------- */
  function positionIndicator(instant) {
    if (!ind || !curAct) return;
    var btn = dock.querySelector('.ev-dock__btn[data-act="' + curAct + '"]');
    // Solo botones simples reciben la pildora (no logo/live/lang/auth)
    if (!btn || btn.classList.contains("ev-dock__btn--logo") ||
        btn.classList.contains("ev-dock__btn--live") ||
        btn.classList.contains("ev-dock__btn--lang") ||
        btn.classList.contains("ev-dock__btn--auth")) {
      dock.classList.remove("has-active");
      return;
    }
    dock.classList.add("has-active");
    var left = btn.offsetLeft, w = btn.offsetWidth, h = btn.offsetHeight, top = btn.offsetTop;
    if (instant) ind.style.transition = "none";
    ind.style.width = w + "px";
    ind.style.height = h + "px";
    ind.style.top = top + "px";
    ind.style.transform = "translateX(" + left + "px)";
    if (instant) { ind.offsetHeight; ind.style.transition = ""; }
  }

  function setActive(act) {
    if (act === curAct) return;
    curAct = act;
    var btns = dock.querySelectorAll(".ev-dock__btn[data-act]");
    for (var i = 0; i < btns.length; i++)
      btns[i].classList.toggle("is-active", btns[i].getAttribute("data-act") === act);
    positionIndicator(false);
  }

  /* ---------------- Scroll sincronizado ---------------- */
  function update() {
    var hb = hero ? hero.getBoundingClientRect().bottom : window.innerHeight;
    var footer = document.querySelector(".ev-footer");
    var atFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 24;
    document.body.classList.toggle("ev-at-footer", !!atFooter);
    setShown(hb <= 84 && !atFooter);
    if (shown) setActive(currentAct());
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { positionIndicator(true); });

  /* ---------------- Hoja de secciones ---------------- */
  function openSheet() {
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    if (secBtn) secBtn.setAttribute("aria-expanded", "true");
  }
  function closeSheet() {
    if (!sheet) return;
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    if (secBtn) secBtn.setAttribute("aria-expanded", "false");
  }
  function toggleSheet() {
    sheet.classList.contains("is-open") ? closeSheet() : openSheet();
  }

  /* ---------------- Navegacion suave ---------------- */
  function goTo(id) {
    var el = document.getElementById(id); if (!el) return;
    var y = el.getBoundingClientRect().top + (window.pageYOffset || 0) - 16;
    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
  }

  /* ---------------- Emisora en vivo (play = inicia + desplaza; pausa = alterna) ---------------- */
  function openEmisora() {
    var em = document.getElementById("emisora");
    var playBtn = document.getElementById("player-play");
    var player = document.getElementById("player");
    if (!playBtn) { if (em) goTo("emisora"); return; }
    var isPlaying = player && player.getAttribute("data-playing") === "true";
    if (isPlaying) { playBtn.click(); return; }            // ya suena -> pausa, sin desplazar
    if (em) goTo("emisora");                                 // inicia -> desplaza a la seccion
    if (inView("emisora", 0.7, 0.25)) {
      playBtn.click();
    } else {
      setTimeout(function () {
        if (!player || player.getAttribute("data-playing") !== "true") playBtn.click();
      }, reduce ? 0 : 720);
    }
  }

  /* Refleja el estado sonando/pausa en el boton central */
  var player = document.getElementById("player");
  if (player && liveBtn) {
    var sync = function () {
      liveBtn.classList.toggle("is-playing", player.getAttribute("data-playing") === "true");
    };
    new MutationObserver(sync).observe(player, { attributes: true, attributeFilter: ["data-playing"] });
    sync();
  }

  /* ---------------- Sesion (Ingresar / Cerrar sesion) ---------------- */
  var AUTH_KEY = "ecovoces:auth";
  function isAuthed() { try { return localStorage.getItem(AUTH_KEY) === "1"; } catch (e) { return false; } }
  function applyAuth() {
    var btn = dock.querySelector('[data-act="ingresar"]');
    if (!btn) return;
    var authed = isAuthed();
    btn.classList.toggle("is-authed", authed);
    btn.setAttribute("data-es", authed ? "Cerrar sesi\u00f3n" : "Ingresar");
    btn.setAttribute("data-en", authed ? "Sign out" : "Sign in");
  }
  function setAuthed(v) {
    try { v ? localStorage.setItem(AUTH_KEY, "1") : localStorage.removeItem(AUTH_KEY); } catch (e) {}
    applyAuth(); applyDockLang();
  }

  /* ---------------- Idioma ---------------- */
  function applyDockLang() {
    var lang = (document.documentElement.lang || "es").slice(0, 2);
    var es = lang === "es";
    if (langTxt) langTxt.textContent = es ? "EN" : "ES";
    // Tooltips (CSS usa data-es) + textos visibles de la hoja segun idioma
    var btns = dock.querySelectorAll(".ev-dock__btn[data-es],.ev-dock__link[data-es]");
    for (var j = 0; j < btns.length; j++) {
      var el = btns[j];
      var label = es ? el.getAttribute("data-es") : el.getAttribute("data-en");
      if (!label) continue;
      if (el.classList.contains("ev-dock__link")) {
        var span = el.querySelector("span"); if (span) span.textContent = label;
      } else {
        el.setAttribute("aria-label", label);
        if (el.hasAttribute("data-tip")) el.setAttribute("data-tip", label);
      }
    }
    var title = document.getElementById("dock-sheet-title");
    if (title) title.textContent = es ? "Ir a una sección" : "Jump to a section";
  }

  /* ---------------- Click handler ---------------- */
  dock.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act]");
    if (!t) return;
    var act = t.getAttribute("data-act");
    if (act === "inicio") { e.preventDefault(); closeSheet(); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); }
    else if (act === "secciones") { e.preventDefault(); toggleSheet(); }
    else if (act === "emisora") { e.preventDefault(); closeSheet(); openEmisora(); }
    else if (act === "idioma") {
      e.preventDefault();
      var lt = document.getElementById("lang-toggle");
      if (lt) lt.click();
      setTimeout(applyDockLang, 30);
    }
    else if (act === "ingresar") {
      e.preventDefault(); closeSheet();
      if (isAuthed()) { setAuthed(false); }       // cerrar sesion
      else { setAuthed(true); goTo("lab"); }        // ingresar (demo) + ir al CTA del laboratorio
    }
  });

  // Enlaces dentro de la hoja
  if (sheet) sheet.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    e.preventDefault();
    goTo(a.getAttribute("href").slice(1));
    closeSheet();
  });

  // Cerrar la hoja al tocar fuera o con Escape
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#dock-island")) closeSheet();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });

  // Mantener idioma sincronizado si el header cambia el idioma
  var headerLang = document.getElementById("lang-toggle");
  if (headerLang) headerLang.addEventListener("click", function () { setTimeout(applyDockLang, 30); });

  /* ---------------- Init ---------------- */
  applyAuth();
  applyDockLang();
  update();
})();
