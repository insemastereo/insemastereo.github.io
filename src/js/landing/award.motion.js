/**
 * ECOVOCES IA — award.motion.js  ·  Motor de MOTION premium (GSAP Core + ScrollTrigger).
 * 100% offline (vendorizado). Robusto: sin pin/scroll-hijack frágil. Capas:
 *  · Entrada del hero (clip-reveals línea a línea + fade-up + escala del retrato)
 *  · Mensaje que se revela palabra a palabra (scrub)
 *  · Parallax suave en imágenes [data-parallax] y en el retrato/ghost del hero
 *  · Botones primarios magnéticos (solo desktop puntero fino)
 *  · Realce de los reveal por sección (el IntersectionObserver de core.js es el fallback)
 * REGLA DE ORO: sin GSAP todo es visible; prefers-reduced-motion = estado final.
 */
(function () {
  "use strict";
  if (!window.gsap || !window.ScrollTrigger) return;
  try { gsap.registerPlugin(ScrollTrigger); } catch (e) { return; }
  document.documentElement.classList.add("gsap-on");
  var EASE = "power3.out";
  var mm = gsap.matchMedia();

  /* (Scroll nativo: sin smooth-scroll para máxima fluidez.) */

  /* ---------- Entrada del hero ---------- */
  function heroIntro() {
    var hero = document.querySelector(".ev-hero"); if (!hero) return;
    var lines = hero.querySelectorAll(".ev-hero__title .ev-line > span");
    var rest = [
      hero.querySelector(".ev-hero__hud"),
      hero.querySelector(".ev-hero__kicker"),
      hero.querySelector(".ev-hero__bar"),
      hero.querySelector(".ev-scrollcue")
    ].filter(Boolean);
    var media = hero.querySelector(".ev-hero__media");
    var tag = hero.querySelector(".ev-hero__tag");
    var badge = hero.querySelector(".ev-hero__badge");
    var tl = gsap.timeline({ defaults: { ease: EASE } });
    if (lines.length) tl.from(lines, { yPercent: 118, duration: 0.95, stagger: 0.1 }, 0.1);
    tl.from(rest, { autoAlpha: 0, y: 18, duration: 0.65, stagger: 0.08 }, 0.5);
    if (media) tl.from(media, { autoAlpha: 0, scale: 0.94, y: 10, duration: 0.95 }, 0.35);
    if (tag) tl.from(tag, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.95);
    if (badge) tl.from(badge, { autoAlpha: 0, scale: 0.6, duration: 0.5, ease: "back.out(2)" }, 1.0);
    setTimeout(function () { if (tl.progress() < 1) tl.progress(1); }, 2800);
  }

  /* ---------- Mensaje kinético ---------- */
  function kineticManifesto() {
    var el = document.querySelector(".ev-manifesto[data-split]"); if (!el) return;
    if (!el.dataset.built) {
      var text = el.textContent.trim();
      el.setAttribute("aria-label", text);
      var emWords = (el.getAttribute("data-em") || "").split("|").filter(Boolean);
      var frag = document.createDocumentFragment();
      text.split(" ").forEach(function (w, i, arr) {
        var span = document.createElement("span");
        span.className = "ev-word" + (emWords.indexOf(w.replace(/[.,]/g, "")) > -1 ? " em" : "");
        span.setAttribute("aria-hidden", "true");
        span.textContent = w;
        frag.appendChild(span);
        if (i < arr.length - 1) frag.appendChild(document.createTextNode(" "));
      });
      el.textContent = ""; el.appendChild(frag); el.dataset.built = "1";
    }
    var words = el.querySelectorAll(".ev-word");
    gsap.set(words, { opacity: 0.32 });
    gsap.to(words, { opacity: 1, ease: "none", stagger: 0.05,
      scrollTrigger: { trigger: el, start: "top 80%", end: "center 58%", scrub: true } });
  }

  /* ---------- Parallax suave ---------- */
  function parallax() {
    gsap.utils.toArray("[data-parallax]").forEach(function (el) {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el.closest("section, figure, article") || el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    // Retrato y palabra fantasma del hero (profundidad)
    var media = document.querySelector(".ev-hero__media");
    if (media) gsap.to(media, { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".ev-hero", start: "top top", end: "bottom top", scrub: true } });
    var ghost = document.querySelector(".ev-hero__ghost");
    if (ghost) gsap.to(ghost, { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".ev-hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ---------- Realce de reveal por sección ----------
     (Lo maneja el IntersectionObserver de core.js — robusto y sin conflictos.
      GSAP solo se ocupa de hero, mensaje, parallax y botones magnéticos.) */

  mm.add("(prefers-reduced-motion: no-preference)", function () {
    heroIntro();
    kineticManifesto();
    return function () {};
  });

  /* ---------- Botones magnéticos (desktop puntero fino) ---------- */
  mm.add("(min-width:769px) and (pointer:fine) and (prefers-reduced-motion: no-preference)", function () {
    var btns = gsap.utils.toArray(".ev-btn--primary, .ev-langbtn");
    var handlers = [];
    btns.forEach(function (btn) {
      var xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      var yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
      function move(e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      }
      function leave() { xTo(0); yTo(0); }
      btn.addEventListener("pointermove", move);
      btn.addEventListener("pointerleave", leave);
      handlers.push([btn, move, leave]);
    });
    return function () { handlers.forEach(function (h) { h[0].removeEventListener("pointermove", h[1]); h[0].removeEventListener("pointerleave", h[2]); gsap.set(h[0], { x: 0, y: 0 }); }); };
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
  window.AWARD_MOTION = { refresh: function () { ScrollTrigger.refresh(); }, rebuild: function () { ScrollTrigger.refresh(); } };
})();
