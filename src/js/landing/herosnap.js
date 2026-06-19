/* ==========================================================================
   HERO SNAP — el hero se comporta como un panel de pantalla completa.
   · Estando en el hero, un pequeño giro de la rueda sale de inmediato hacia el
     contenido (igual que pulsar "Conoce el proyecto" o la flecha de scroll).
   · Al subir cerca del hero, salta para mostrarlo completo.
   · Nunca se descansa a la mitad del hero (cubre rueda, teclado, touch e inercia).
   ========================================================================== */
(function () {
  var hero = document.getElementById("hero");
  if (!hero) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var animating = false, unlockT, settleT, prevY = window.pageYOffset, dir = 1;

  function loaderUp() {
    var l = document.getElementById("loader");
    if (!l) return false;
    if (l.classList.contains("is-done")) return false;
    return getComputedStyle(l).visibility !== "hidden";
  }
  function contentTop() {
    var m = document.getElementById("manifiesto");
    return m ? Math.round(m.getBoundingClientRect().top + window.pageYOffset) : hero.offsetHeight;
  }
  function snapTo(y) {
    animating = true;
    clearTimeout(unlockT);
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    unlockT = setTimeout(function () { animating = false; prevY = window.pageYOffset; }, reduce ? 20 : 560);
  }

  /* ---- Rueda del mouse: intención inmediata ---- */
  window.addEventListener("wheel", function (e) {
    if (loaderUp()) return;
    var y = window.pageYOffset, ct = contentTop();
    if (animating) { if (y < ct + 2) e.preventDefault(); return; }
    if (e.deltaY > 0 && y < ct - 2) {            // bajando dentro del hero -> al contenido
      e.preventDefault(); snapTo(ct);
    } else if (e.deltaY < 0 && y > 2 && y < ct + window.innerHeight * 0.35) {
      e.preventDefault(); snapTo(0);             // subiendo cerca del hero -> hero completo
    }
  }, { passive: false });

  /* ---- Teclado cerca del hero ---- */
  window.addEventListener("keydown", function (e) {
    if (animating || loaderUp()) return;
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
    var y = window.pageYOffset, ct = contentTop();
    var down = e.key === "PageDown" || e.key === "ArrowDown" || (e.key === " " && !e.shiftKey);
    var up = e.key === "PageUp" || e.key === "ArrowUp" || (e.key === " " && e.shiftKey);
    if (down && y < ct - 2) { e.preventDefault(); snapTo(ct); }
    else if (up && y > 2 && y < ct + window.innerHeight * 0.35) { e.preventDefault(); snapTo(0); }
  });

  /* ---- Asentamiento: un solo gesto/clic resuelve EN SU DIRECCION (rueda, flechas de la barra, touch, inercia). Nunca descansar a mitad del hero. ---- */
  window.addEventListener("scroll", function () {
    if (animating || loaderUp()) return;
    var y = window.pageYOffset;
    if (y > prevY + 1) dir = 1; else if (y < prevY - 1) dir = -1;
    prevY = y;
    clearTimeout(settleT);
    settleT = setTimeout(function () {
      if (animating) return;
      var yy = window.pageYOffset, ct = contentTop();
      if (yy > 6 && yy < ct - 6) snapTo(dir >= 0 ? ct : 0);
    }, 80);
  }, { passive: true });
})();
