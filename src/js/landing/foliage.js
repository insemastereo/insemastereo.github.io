/* ==========================================================================
   ECOVOCES — Follaje ambiental (canvas)  ·  HOJAS QUE CAEN (flutter realista)
   Modelo natural de hoja cayendo:
     · caída lenta (translación vertical) + planeo lateral con sin()  →  vaivén
     · GIRO 3D sobre su eje vertical (scaleX = cos(flip)) que muestra el envés
       más claro de la hoja  →  el detalle que la hace ver real
     · cabeceo/tumble suave en Z
   El MOUSE ES BRISA: empuja las hojas de costado y agita su planeo.
   Profundidad de campo: las lejanas más pequeñas, lentas y desenfocadas (bokeh).
   Detrás del contenido, motion-safe, ligero.
   ========================================================================== */
(function () {
  'use strict';
  var canvas = document.getElementById('flora');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;

  // Paletas (oscuro→claro) del haz de la hoja
  var GREENS = [
    ['#0b5e3c', '#26a86c'],
    ['#0f7a4a', '#52cf90'],
    ['#0a6e5e', '#22c2a4'],
    ['#2c7a32', '#7cbd5f'],
    ['#127a55', '#86dcab']
  ];

  function makeCanvas(w, h) {
    var c = document.createElement('canvas');
    c.width = Math.ceil(w); c.height = Math.ceil(h);
    return c;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function mix(hex, t) { // mezcla hacia blanco (t 0..1)
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(r + (255 - r) * t); g = Math.round(g + (255 - g) * t); b = Math.round(b + (255 - b) * t);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function leafPath(x, w, h, shape) {
    var cx = w / 2;
    x.beginPath();
    if (shape === 1) { // ovada ancha
      x.moveTo(cx, 0);
      x.bezierCurveTo(w * 1.12, h * 0.20, w * 0.98, h * 0.78, cx, h);
      x.bezierCurveTo(w * 0.02, h * 0.78, w * -0.12, h * 0.20, cx, 0);
    } else if (shape === 2) { // gota con hombros
      x.moveTo(cx, 0);
      x.bezierCurveTo(w * 0.96, h * 0.12, w * 1.02, h * 0.52, cx, h);
      x.bezierCurveTo(w * -0.02, h * 0.52, w * 0.04, h * 0.12, cx, 0);
    } else { // lanceolada
      x.moveTo(cx, 0);
      x.bezierCurveTo(w * 1.02, h * 0.30, w * 0.74, h * 0.90, cx, h);
      x.bezierCurveTo(w * 0.26, h * 0.90, w * -0.02, h * 0.30, cx, 0);
    }
    x.closePath();
  }

  // face: 0 = haz (cara superior, rica), 1 = envés (cara inferior, pálida/mate)
  function spriteLeaf(size, pair, shape, face) {
    var aspect = shape === 1 ? 1.06 : (shape === 2 ? 1.18 : 1.34);
    var w = size * (shape === 1 ? 0.92 : 0.78), h = w * aspect, pad = size * 0.2;
    var c = makeCanvas(w + pad * 2, h + pad * 2), x = c.getContext('2d');
    x.translate(pad, pad);
    var cx = w / 2;

    if (face === 1) {
      // envés: degradado pálido (verde grisáceo), midrib marcado, casi sin brillo
      var gb = x.createLinearGradient(w * 0.1, 0, w * 0.9, h);
      gb.addColorStop(0, mix(pair[1], 0.5)); gb.addColorStop(1, mix(pair[0], 0.42));
      leafPath(x, w, h, shape); x.fillStyle = gb; x.fill();
      // venación más visible en el envés
      x.strokeStyle = 'rgba(60,90,70,.18)'; x.lineWidth = Math.max(1, size * 0.014); x.lineCap = 'round';
      x.beginPath(); x.moveTo(cx, h * 0.05); x.lineTo(cx, h * 0.96); x.stroke();
      x.strokeStyle = 'rgba(60,90,70,.10)'; x.lineWidth = Math.max(0.8, size * 0.009);
    } else {
      // haz: degradado vivo + sheen
      var g = x.createLinearGradient(w * 0.08, 0, w * 0.92, h);
      g.addColorStop(0, pair[1]); g.addColorStop(1, pair[0]);
      leafPath(x, w, h, shape); x.fillStyle = g; x.fill();
      var hl = x.createLinearGradient(0, 0, w, 0);
      hl.addColorStop(0, 'rgba(255,255,255,0)');
      hl.addColorStop(0.45, 'rgba(255,255,255,.18)');
      hl.addColorStop(0.78, 'rgba(255,255,255,.04)');
      hl.addColorStop(1, 'rgba(0,0,0,.10)');
      leafPath(x, w, h, shape); x.fillStyle = hl; x.fill();
      x.strokeStyle = 'rgba(255,255,255,.14)'; x.lineWidth = Math.max(1, size * 0.012); x.lineCap = 'round';
      x.beginPath(); x.moveTo(cx, h * 0.05); x.lineTo(cx, h * 0.96); x.stroke();
      x.strokeStyle = 'rgba(255,255,255,.09)'; x.lineWidth = Math.max(0.8, size * 0.008);
    }
    // nervaduras laterales (ambas caras)
    var nv = 5;
    for (var i = 1; i <= nv; i++) {
      var ty = h * (0.12 + (i / (nv + 1)) * 0.74);
      var spread = (shape === 1 ? 0.42 : 0.3) * w * (1 - (i / (nv + 2)) * 0.5);
      x.beginPath(); x.moveTo(cx, ty); x.quadraticCurveTo(cx + spread * 0.5, ty - h * 0.02, cx + spread, ty - h * 0.06); x.stroke();
      x.beginPath(); x.moveTo(cx, ty); x.quadraticCurveTo(cx - spread * 0.5, ty - h * 0.02, cx - spread, ty - h * 0.06); x.stroke();
    }
    // sombra de volumen en la base
    var sg = x.createRadialGradient(cx, h * 0.92, 0, cx, h * 0.92, h * 0.4);
    sg.addColorStop(0, 'rgba(0,0,0,.08)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    leafPath(x, w, h, shape); x.fillStyle = sg; x.fill();
    // feather de bordes
    x.globalCompositeOperation = 'destination-in';
    var fg = x.createRadialGradient(cx, h * 0.48, size * 0.05, cx, h * 0.5, h * 0.62);
    fg.addColorStop(0, '#000'); fg.addColorStop(0.66, '#000'); fg.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = fg; x.fillRect(-pad, -pad, w + pad * 2, h + pad * 2);
    x.globalCompositeOperation = 'source-over';
    return c;
  }

  var SHAPES = 3;
  // SET[tier][face][shape][col]
  var SET = [];
  var BLURPX = [0, 4, 9];
  var BOKEH_SP = {};
  var BOKEH_HUES = ['175,230,185', '150,235,210', '210,248,205', '120,210,170'];

  function blurCopy(src, px) {
    if (px <= 0) return src;
    var c = makeCanvas(src.width, src.height), x = c.getContext('2d');
    x.filter = 'blur(' + px + 'px)'; x.drawImage(src, 0, 0); return c;
  }
  function buildSprites() {
    var base = [[], []]; // base[face][shape][col]
    for (var fc = 0; fc < 2; fc++) {
      for (var s = 0; s < SHAPES; s++) {
        base[fc][s] = GREENS.map(function (p) { return spriteLeaf(230, p, s, fc); });
      }
    }
    SET = BLURPX.map(function (px) {
      return base.map(function (faceArr) {
        return faceArr.map(function (shapeArr) {
          return shapeArr.map(function (sp) { return blurCopy(sp, px); });
        });
      });
    });
    BOKEH_SP = {};
    BOKEH_HUES.forEach(function (hue) {
      var R = 128, c = makeCanvas(R * 2, R * 2), x = c.getContext('2d');
      var g = x.createRadialGradient(R, R, 0, R, R, R);
      g.addColorStop(0, 'rgba(' + hue + ',1)');
      g.addColorStop(0.45, 'rgba(' + hue + ',0.28)');
      g.addColorStop(1, 'rgba(' + hue + ',0)');
      x.fillStyle = g; x.beginPath(); x.arc(R, R, R, 0, 6.2832); x.fill();
      BOKEH_SP[hue] = c;
    });
  }
  function tierForDepth(d) { return d > 0.66 ? 0 : (d > 0.38 ? 1 : 2); }

  var leaves = [], bokeh = [];

  function spawnLeaf(atTop) {
    var depth = rnd(0.18, 1);
    var small = window.innerWidth < 820;
    return {
      x: rnd(-40, W + 40),
      y: atTop ? rnd(-H * 0.4, -30) : rnd(-30, H),
      depth: depth, tier: tierForDepth(depth),
      shape: (Math.random() * SHAPES) | 0,
      col: (Math.random() * GREENS.length) | 0,
      scale: (0.16 + depth * 0.46) * (small ? 0.82 : 1),
      vy: (12 + depth * 30) * rnd(0.8, 1.2),     // caída (px/s) — cercanas caen más
      swayAmp: rnd(26, 64) * (0.6 + depth * 0.6), // amplitud del planeo
      swayFq: rnd(0.4, 0.9),                       // frecuencia del vaivén
      swayPh: rnd(0, 6.28),
      baseX: 0,                                    // se fija abajo
      driftX: 0,                                   // empuje lateral del viento
      flip: rnd(0, 6.28), flipSp: rnd(0.5, 1.3),  // giro 3D (muestra el envés)
      rot: rnd(-0.4, 0.4), rotSp: rnd(-0.5, 0.5),  // cabeceo en Z
      tilt: rnd(0.1, 0.32),
      gustX: 0, gustY: 0, gvx: 0, gvy: 0,          // empuje de la ráfaga (resorte)
      react: rnd(0.55, 1.55),                       // cada hoja responde distinto
      swirl: rnd(0.5, 1.5) * (Math.random() < 0.5 ? -1 : 1), // remolino por hoja
      alpha: depth > 0.66 ? rnd(0.18, 0.3) : (depth > 0.38 ? rnd(0.13, 0.22) : rnd(0.08, 0.14))
    };
  }

  function buildScene() {
    var small = window.innerWidth < 820;
    leaves = [];
    var n = small ? 14 : 22;
    for (var k = 0; k < n; k++) { var L = spawnLeaf(false); L.baseX = L.x; leaves.push(L); }

    bokeh = [];
    var bn = small ? 9 : 14;
    for (var b = 0; b < bn; b++) {
      var dp = rnd(0.15, 1);
      bokeh.push({
        x: rnd(0, 1), y: rnd(0, 1), r: rnd(28, 128) * (0.5 + dp), depth: dp,
        drift: rnd(0.004, 0.02), sway: rnd(0.01, 0.045), swPh: rnd(0, 6.28), swSpd: rnd(0.1, 0.4),
        a: rnd(0.05, 0.16), twPh: rnd(0, 6.28), twSpd: rnd(0.3, 0.9),
        hue: BOKEH_HUES[(Math.random() * BOKEH_HUES.length) | 0]
      });
    }
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // ---- Mouse = BRISA -----------------------------------------------------
  var mPx = { x: -9999, y: -9999 }, mNorm = { x: 0, y: 0 }, mCur = { x: 0, y: 0 };
  var mVx = 0, mVy = 0, lastMx = 0, lastMy = 0, lastMt = 0;
  var hasMouse = false;
  window.addEventListener('pointermove', function (e) {
    var nowt = performance.now();
    if (hasMouse) {
      var ddt = (nowt - lastMt) / 1000;
      if (ddt > 0 && ddt < 0.1) {
        mVx = mVx * 0.6 + ((e.clientX - lastMx) / ddt) * 0.4;
        mVy = mVy * 0.6 + ((e.clientY - lastMy) / ddt) * 0.4;
      }
    }
    lastMx = e.clientX; lastMy = e.clientY; lastMt = nowt;
    mPx.x = e.clientX; mPx.y = e.clientY; hasMouse = true;
    mNorm.x = e.clientX / window.innerWidth - 0.5;
    mNorm.y = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  window.addEventListener('pointerout', function () { hasMouse = false; mPx.x = mPx.y = -9999; }, { passive: true });
  window.addEventListener('deviceorientation', function (e) {
    if (e.gamma == null) return;
    mNorm.x = Math.max(-0.5, Math.min(0.5, (e.gamma || 0) / 45));
  }, { passive: true });

  // viento ambiental lento (corriente global suave que oscila de dirección)
  function ambientWind(t) { return Math.sin(t * 0.13) * 14 + Math.sin(t * 0.057 + 1.7) * 9; }

  var last = performance.now(), t0 = last;
  var GUST_R = 320;
  function frame(now) {
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    var t = (now - t0) / 1000;
    var sy = window.pageYOffset || 0;
    mCur.x += (mNorm.x - mCur.x) * 0.05;
    mCur.y += (mNorm.y - mCur.y) * 0.05;
    mVx *= 0.92; mVy *= 0.92;

    ctx.clearRect(0, 0, W, H);

    // BOKEH al fondo
    ctx.globalCompositeOperation = 'lighter';
    for (var b = 0; b < bokeh.length; b++) {
      var K = bokeh[b];
      var by = (K.y - t * K.drift - sy / H * 0.05 * K.depth + mCur.y * 0.06 * K.depth);
      by = ((by % 1.2) + 1.2) % 1.2 - 0.1;
      var bx = K.x + Math.sin(t * K.swSpd + K.swPh) * K.sway + mCur.x * 0.05 * K.depth;
      var rr = K.r, tw = K.a * (0.62 + 0.38 * Math.sin(t * K.twSpd + K.twPh));
      ctx.globalAlpha = tw;
      ctx.drawImage(BOKEH_SP[K.hue], bx * W - rr, by * H - rr, rr * 2, rr * 2);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';

    var amb = ambientWind(t);
    var pxr = sy * 0.04;

    for (var f = 0; f < leaves.length; f++) {
      var L = leaves[f];

      // caída
      L.y += L.vy * dt;

      // brisa ambiental: deriva lateral lenta (NO arrastra hacia el cursor)
      L.driftX += (amb * (0.3 + L.depth * 0.6) - L.driftX) * Math.min(1, 1.2 * dt);

      // posición actual (con todo aplicado) para medir distancia al cursor
      var sway = Math.sin(t * L.swayFq + L.swayPh) * L.swayAmp;
      var x = L.baseX + L.driftX + sway + L.gustX;
      var y = L.y - pxr * L.depth + L.gustY;

      // RÁFAGA del cursor: el viento sopla con el MOVIMIENTO del cursor.
      // Barrer el mouse lanza cada hoja en su propia dirección radial (+ remolino
      // + algo de viento direccional); con el cursor quieto apenas se inmutan,
      // así no tiemblan en el sitio.
      if (hasMouse) {
        var dx = x - mPx.x, dy = y - mPx.y;
        var dd = Math.hypot(dx, dy) || 0.001;
        if (dd < GUST_R) {
          var fall = (1 - dd / GUST_R); fall = fall * fall;
          var mSpeed = Math.hypot(mVx, mVy);
          var nx = dx / dd, ny = dy / dd;
          var prx = -ny * L.swirl, pry = nx * L.swirl;
          var accel = (mSpeed * 10 + 60) * fall * L.react;   // px/s², crece al barrer
          L.gvx += (nx * accel + prx * accel * 0.5 + mVx * 4 * fall * L.react) * dt;
          L.gvy += (ny * accel + pry * accel * 0.5 + mVy * 4 * fall * L.react) * dt;
        }
      }

      // amortiguación aérea + resorte SUAVE de retorno (planeo, sin trembleo)
      L.gvx += -L.gustX * 1.7 * dt;
      L.gvy += -L.gustY * 1.7 * dt;
      L.gvx *= 0.965; L.gvy *= 0.965;
      var gmag = Math.hypot(L.gvx, L.gvy);
      if (gmag > 900) { L.gvx = L.gvx / gmag * 900; L.gvy = L.gvy / gmag * 900; }
      L.gustX += L.gvx * dt; L.gustY += L.gvy * dt;
      var omag = Math.hypot(L.gustX, L.gustY);
      if (omag > 480) { L.gustX = L.gustX / omag * 480; L.gustY = L.gustY / omag * 480; }

      // giro 3D sobre eje vertical → muestra haz/envés (el empuje induce algo de giro)
      L.flip += L.flipSp * dt;
      var sx = Math.cos(L.flip);
      var face = sx >= 0 ? 0 : 1;
      L.rot += L.rotSp * dt + L.gvx * 0.0004;
      var zrot = L.rot + Math.sin(t * L.swayFq + L.swayPh) * L.tilt;

      // posición final de dibujo (con la ráfaga ya integrada este frame)
      x = L.baseX + L.driftX + sway + L.gustX;
      y = L.y - pxr * L.depth + L.gustY;

      // respawn al salir por abajo
      if (y > H + 90) { var nl = spawnLeaf(true); nl.baseX = rnd(-40, W + 40); leaves[f] = nl; continue; }
      var bx = L.baseX + L.driftX;
      if (bx < -180) L.baseX += W + 220;
      else if (bx > W + 180) L.baseX -= W + 220;

      var img = SET[L.tier][face][L.shape][L.col];
      var fw = img.width * L.scale, fh = img.height * L.scale;
      var sax = Math.max(0.06, Math.abs(sx)); // ancho según giro (no llega a 0)
      ctx.save();
      ctx.globalAlpha = L.alpha * (0.55 + 0.45 * sax); // al ponerse de canto, más tenue
      ctx.translate(x, y);
      ctx.rotate(zrot);
      ctx.scale(sax, 1);
      ctx.drawImage(img, -fw / 2, -fh / 2, fw, fh);
      ctx.restore();
    }

    if (!reduce) rafId = requestAnimationFrame(frame);
  }

  var rafId = null;
  function start() {
    resize(); buildSprites(); buildScene();
    if (reduce) frame(performance.now());
    else { cancelAnimationFrame(rafId); last = performance.now(); rafId = requestAnimationFrame(frame); }
  }
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { resize(); buildSprites(); buildScene(); if (reduce) frame(performance.now()); }, 200);
  });
  document.addEventListener('visibilitychange', function () {
    if (reduce) return;
    if (document.hidden) cancelAnimationFrame(rafId);
    else { last = t0 = performance.now(); rafId = requestAnimationFrame(frame); }
  });
  if (document.readyState === 'complete' || document.readyState === 'interactive') start();
  else window.addEventListener('DOMContentLoaded', start);
})();
