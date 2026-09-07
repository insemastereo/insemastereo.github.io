/**
 * ECOVOCES IA — core.js  (rediseño cinético)
 * Motor base SIN dependencia de GSAP: loader, i18n por id, reveal, contadores,
 * glow al cursor, mega-menú, nav que se oculta al bajar, barras de rúbrica,
 * puente con wipe. Si GSAP falla, TODO sigue visible y funcional.
 */
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  /* ---------------- LOADER ---------------- */
  (function loader() {
    var el = document.getElementById("loader");
    if (!el) return;
    var countEl = el.querySelector(".ev-loader__count");
    var wordEl = el.querySelector(".ev-loader__word");
    var barEl = el.querySelector(".ev-loader__bar i");
    var words = ["Escucha", "Crea", "Transforma"];
    var done = false;
    function finish() {
      if (done) return; done = true;
      el.classList.add("is-done");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 460);
      document.removeEventListener("click", finish);
      document.removeEventListener("keydown", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchmove", finish);
    }
    if (reduced || !window.requestAnimationFrame) { finish(); return; }
    document.addEventListener("click", finish);
    document.addEventListener("keydown", finish);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchmove", finish, { passive: true });
    setTimeout(finish, 2600);
    var DUR = 1600, start = null, lw = -1;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      var e = 1 - Math.pow(1 - p, 2);
      var n = Math.round(e * 100);
      if (countEl) countEl.textContent = ("00" + n).slice(-3);
      if (barEl) barEl.style.transform = "scaleX(" + e + ")";
      var wi = Math.min(words.length - 1, Math.floor(p * words.length));
      if (wordEl && wi !== lw) { lw = wi; wordEl.textContent = words[wi]; }
      if (p < 1 && !done) requestAnimationFrame(tick); else setTimeout(finish, 180);
    }
    requestAnimationFrame(tick);
  })();

  /* ---------------- i18n ---------------- */
  var DICT = window.landingTranslations || { es: {}, en: {} };
  function readLang() {
    try { var p = new URLSearchParams(location.search).get("lang"); if (p === "es" || p === "en") return p; } catch (e) {}
    return "es";
  }
  var lang = readLang();
  // Snapshot del español original desde el DOM (para restaurar al volver a ES
  // sin tener que duplicar el markup ES en el diccionario; solo se autora EN).
  var ORIG = {};
  Object.keys(DICT.en || {}).forEach(function (k) {
    if (k === "doc-title") return;
    var el = document.getElementById(k);
    if (el && !(k in ORIG)) ORIG[k] = el.innerHTML;
  });
  function applyLang(l) {
    var map = l === "en" ? (DICT.en || {}) : ORIG;
    Object.keys(map).forEach(function (k) {
      var el = document.getElementById(k); if (!el) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.placeholder = map[k];
      else el.innerHTML = map[k];
    });
    var title = (DICT[l] && DICT[l]["doc-title"]);
    if (title) document.title = title;
    document.documentElement.lang = l;
    var span = document.querySelector("#lang-toggle .lang-text");
    if (span) span.textContent = l === "es" ? "EN" : "ES";
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.setAttribute("aria-label", l === "es" ? "Switch language to English" : "Cambiar idioma a español");
    var links = document.querySelectorAll(".js-lab-link");
    for (var i = 0; i < links.length; i++) links[i].setAttribute("href", "#lab?lang=" + l);
    lang = l;
    if (window.AWARD_MOTION && window.AWARD_MOTION.rebuild) window.AWARD_MOTION.rebuild();
    if (window.__rebuildDrawer) window.__rebuildDrawer();
  }
  var lt = document.getElementById("lang-toggle");
  if (lt) lt.addEventListener("click", function () { applyLang(lang === "es" ? "en" : "es"); });
  if (lang === "en") applyLang("en"); else applyLang("es");

  /* ---------------- REVEAL ---------------- */
  (function reveal() {
    var items = [].slice.call(document.querySelectorAll(".ev-reveal"));
    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("is-in"); }); return; }
    items.forEach(function (el) {
      var sibs = el.parentElement ? el.parentElement.querySelectorAll(":scope > .ev-reveal") : [el];
      var idx = [].indexOf.call(sibs, el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 70, 420) + "ms";
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------- COUNTERS + RUBRIC BARS ---------------- */
  function animateCount(el, target) {
    if (reduced) { el.textContent = String(target); return; }
    var dur = 1300, start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = String(target);
    }
    requestAnimationFrame(tick);
  }
  (function counters() {
    var nums = [].slice.call(document.querySelectorAll(".js-count"));
    var bars = [].slice.call(document.querySelectorAll(".ev-bar i[data-val]"));
    if (reduced || !("IntersectionObserver" in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute("data-target") || el.textContent; });
      bars.forEach(function (el) { el.style.width = el.getAttribute("data-val") + "%"; });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        if (t.classList.contains("js-count")) animateCount(t, parseInt(t.getAttribute("data-target"), 10) || 0);
        else t.style.width = t.getAttribute("data-val") + "%";
        io.unobserve(t);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
    bars.forEach(function (el) { io.observe(el); });
  })();

  /* ---------------- CURSOR GLOW ---------------- */
  if (!reduced && !isTouch) {
    var ticking = false, last = null, lx = 0, ly = 0;
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest(".ev-role, .ev-step, .ev-kpi");
      if (!card) return;
      last = card; var r = card.getBoundingClientRect(); lx = e.clientX - r.left; ly = e.clientY - r.top;
      if (!ticking) { ticking = true; requestAnimationFrame(function () { if (last) { last.style.setProperty("--mx", lx + "px"); last.style.setProperty("--my", ly + "px"); } ticking = false; }); }
    }, { passive: true });
  }

  /* ---------------- MEGA-MENÚ ---------------- */
  (function mega() {
    var triggers = [].slice.call(document.querySelectorAll("[data-mega]"));
    var megas = {};
    [].slice.call(document.querySelectorAll(".ev-mega")).forEach(function (m) { megas[m.getAttribute("data-mega-panel")] = m; });
    var openKey = null;
    function close() {
      if (!openKey) return;
      if (megas[openKey]) megas[openKey].classList.remove("is-open");
      triggers.forEach(function (t) { if (t.getAttribute("data-mega") === openKey) t.setAttribute("aria-expanded", "false"); });
      openKey = null;
    }
    function open(k) {
      if (openKey && openKey !== k) close();
      var m = megas[k]; if (!m) return;
      m.classList.add("is-open");
      triggers.forEach(function (t) { if (t.getAttribute("data-mega") === k) t.setAttribute("aria-expanded", "true"); });
      openKey = k;
    }
    triggers.forEach(function (t) {
      var k = t.getAttribute("data-mega");
      t.addEventListener("click", function (e) { e.preventDefault(); if (openKey === k) close(); else open(k); });
      t.addEventListener("mouseenter", function () { if (!isTouch) open(k); });
    });
    var nav = document.querySelector(".ev-nav");
    if (nav) nav.addEventListener("mouseleave", function () { if (!isTouch) close(); });
    document.addEventListener("click", function (e) { if (!e.target.closest(".ev-nav")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    // cerrar al navegar a un ancla
    [].slice.call(document.querySelectorAll(".ev-mega a")).forEach(function (a) { a.addEventListener("click", close); });
  })();

  /* ---------------- NAV hide/show ---------------- */
  (function navScroll() {
    var nav = document.querySelector(".ev-nav"); if (!nav) return;
    var lastY = window.pageYOffset, ticking = false;
    function update() {
      var y = window.pageYOffset;
      var vh = window.innerHeight;
      nav.classList.toggle("is-scrolled", y > vh * 0.72);
      nav.classList.remove("is-hidden");
      lastY = y; ticking = false;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  })();

  /* ---------------- BRIDGE wipe ---------------- */
  (function bridge() {
    var b = document.querySelector(".js-bridge"), wipe = document.getElementById("wipe");
    if (!b) return;
    b.addEventListener("click", function (e) {
      var href = b.getAttribute("href") || "#hero";
      if (reduced || !wipe) return;
      // demo: solo efecto visual + scroll arriba (no hay laboratorio aparte)
      e.preventDefault();
      wipe.classList.add("is-active");
      setTimeout(function () { wipe.classList.remove("is-active"); location.hash = "#hero"; }, 520);
    });
  })();

  /* ---------------- SCROLL PROGRESS ---------------- */
  (function progress() {
    var bar = document.getElementById("progressbar"); if (!bar) return;
    var t = false;
    function upd() { var h = document.documentElement.scrollHeight - window.innerHeight; bar.style.transform = "scaleX(" + (h > 0 ? Math.min(window.pageYOffset / h, 1) : 0) + ")"; t = false; }
    window.addEventListener("scroll", function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  })();

  /* ---------------- SCROLLSPY (nav activo) ---------------- */
  (function spy() {
    if (!("IntersectionObserver" in window)) return;
    var map = { manifiesto: "nav-proyecto", reto: "nav-proyecto", retos: "nav-proyecto", metodo: "nav-metodo", evaluacion: "nav-metodo", programa: "nav-programa", roles: "nav-equipo", maker: "nav-maker", metas: "nav-impacto", cronograma: "nav-impacto", honestidad: "nav-impacto" };
    var cur = null;
    function setActive(id) { if (cur === id) return; var ls = document.querySelectorAll(".ev-navlink"); for (var i = 0; i < ls.length; i++) ls[i].classList.toggle("is-active", ls[i].id === id); cur = id; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { var lid = map[en.target.id]; if (lid) setActive(lid); } }); }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  })();

  /* ---------------- MOBILE DRAWER ---------------- */
  (function drawer() {
    var burger = document.getElementById("burger"), d = document.getElementById("drawer");
    if (!burger || !d) return;
    var inner = d.querySelector(".ev-drawer__nav");
    function close() { d.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); burger.classList.remove("is-x"); document.body.style.overflow = ""; }
    function open() { d.classList.add("is-open"); burger.setAttribute("aria-expanded", "true"); burger.classList.add("is-x"); document.body.style.overflow = "hidden"; }
    function build() { inner.innerHTML = ""; [].slice.call(document.querySelectorAll(".ev-nav__links .ev-navlink")).forEach(function (l) { var a = document.createElement("a"); a.href = l.getAttribute("href"); a.textContent = l.textContent.trim(); a.addEventListener("click", close); inner.appendChild(a); }); }
    burger.addEventListener("click", function () { d.classList.contains("is-open") ? close() : open(); });
    d.addEventListener("click", function (e) { if (e.target === d) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    window.__rebuildDrawer = build; build();
  })();

  /* ---------------- PARRILLA carrusel (flechas) ---------------- */
  (function parrilla() {
    var rail = document.querySelector(".ev-parrilla__rail"); if (!rail) return;
    var scroller = rail.querySelector(".ev-parrilla__scroller");
    var prev = rail.querySelector(".ev-parrilla__arrow--prev");
    var next = rail.querySelector(".ev-parrilla__arrow--next");
    if (!scroller || !prev || !next) return;
    function step() {
      var card = scroller.querySelector(".ev-ep");
      var w = card ? card.getBoundingClientRect().width + 14 : 260;
      return Math.max(w, Math.round(scroller.clientWidth * 0.85));
    }
    function sync() {
      var max = scroller.scrollWidth - scroller.clientWidth - 2;
      prev.disabled = scroller.scrollLeft <= 2;
      next.disabled = scroller.scrollLeft >= max;
    }
    prev.addEventListener("click", function () { scroller.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { scroller.scrollBy({ left: step(), behavior: reduced ? "auto" : "smooth" }); });
    scroller.addEventListener("scroll", function () { requestAnimationFrame(sync); }, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();
  })();
})();
