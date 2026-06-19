/**
 * ECOVOCES IA — magnet.js
 * Efecto "magnet" (Win11/surrealista): el elemento se atrae sutilmente hacia el
 * cursor dentro de su zona. Vanilla, solo transform (rAF + LERP). Sin librerías.
 * Se activa SOLO en desktop con puntero fino (lo gobierna landing.motion.js via
 * gsap.matchMedia). Expone .destroy() para revertir al cruzar el breakpoint.
 */
(function () {
  "use strict";

  function Magnet(el, opts) {
    opts = opts || {};
    this.el = el;
    this.zone = el.closest(".lp-hero__media") || el.parentElement || el;
    this.strength = opts.strength || 6;   // mayor = menos desplazamiento
    this.ease = opts.ease || 0.15;
    this.x = 0; this.y = 0; this.tx = 0; this.ty = 0;
    this.raf = null;
    this._move = this._move.bind(this);
    this._leave = this._leave.bind(this);
    this._tick = this._tick.bind(this);
    this.zone.addEventListener("pointermove", this._move);
    this.zone.addEventListener("pointerleave", this._leave);
  }

  Magnet.prototype._move = function (e) {
    var r = this.el.getBoundingClientRect();
    var cx = r.left + r.width / 2;
    var cy = r.top + r.height / 2;
    this.tx = (e.clientX - cx) / this.strength;
    this.ty = (e.clientY - cy) / this.strength;
    this._start();
  };

  Magnet.prototype._leave = function () { this.tx = 0; this.ty = 0; this._start(); };

  Magnet.prototype._start = function () {
    if (!this.raf) this.raf = requestAnimationFrame(this._tick);
  };

  Magnet.prototype._tick = function () {
    this.x += (this.tx - this.x) * this.ease;
    this.y += (this.ty - this.y) * this.ease;
    this.el.style.transform = "translate3d(" + this.x.toFixed(2) + "px," + this.y.toFixed(2) + "px,0)";
    if (Math.abs(this.tx - this.x) > 0.1 || Math.abs(this.ty - this.y) > 0.1) {
      this.raf = requestAnimationFrame(this._tick);
    } else {
      this.x = this.tx; this.y = this.ty;
      this.el.style.transform = "translate3d(" + this.x + "px," + this.y + "px,0)";
      this.raf = null;
    }
  };

  Magnet.prototype.destroy = function () {
    this.zone.removeEventListener("pointermove", this._move);
    this.zone.removeEventListener("pointerleave", this._leave);
    if (this.raf) cancelAnimationFrame(this.raf);
    this.el.style.transform = "";
  };

  window.Magnet = Magnet;
})();
