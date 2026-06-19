# 🧪 30 — LECCIONES (memoria procedimental · recetas + gotchas)

> **Nodo: experiencia.** On-demand (Trigger de Experiencia: ANTES de una op riesgosa/repetitiva). Cada lección
> = disparador + receta. Hijas por saturación (§G.5): `31-LECCIONES-GIT`, etc. **§Meta** = meta-lecciones del cerebro.

---

### L-01 — Publicar a GitHub Pages (user-site) sin sustos
**Disparador**: vas a publicar / activar Pages por primera vez.
- `.nojekyll` vacío **EN el mismo commit de publicación** (no después; si no, Jekyll ya procesó/ignoró recursos y el CDN sirve esa versión ~10 min).
- `git add` **SELECTIVO** (NUNCA `-A`/`.`): confirma que `Multimedia/` (58M) y `_archive/` quedan fuera (gitignored).
- Rama `main`; `Settings > Pages > Source = 'Deploy from a branch' > main/(root)` **a mano** (no se activa solo).
- El **1er deploy tarda hasta ~10 min** y sirve un **404 transitorio** mientras aprovisiona el cert `*.github.io` → **NO es un fallo**; avisar al dueño.
- user-site en la raíz → **rutas relativas, 0 paths root-absolutos**, sin base-path.

### L-02 — Cache-bust `?v=w11-N` (no es inmadurez)
**Disparador**: cambiaste comportamiento y el dueño "no ve" el cambio.
- Pages sirve con `max-age=600` (CDN Fastly ~10 min) y NO deja setear cache-headers → el `?v=w11-N` manual es la respuesta CORRECTA.
- Bumpea la `N` en los assets afectados; **la N vigente vive SOLO en `05`** (SSoT). El dueño invalida con **Ctrl+Shift+R**.
- Desaparecería solo con el content-hashing de Vite (si se adopta; ADR-A).

### L-03 — El preview NO corre GSAP → verifica en el navegador real
**Disparador**: vas a confiar en una captura/preview para validar el motion.
- `deploy=push` elimina staging y el preview no ejecuta GSAP. **Verifica el motion en el navegador REAL local** antes de cada push.
- Construye el mirror **por bloques, commit por bloque**. Degradación: sin GSAP, el IntersectionObserver revela todo; `prefers-reduced-motion` apaga el motion (ya cubierto en el CSS del handoff — no re-tocar el marquee).

---

## §Meta — Meta-lecciones del cerebro

### M-01 — Cita el número exacto o no lo cites (verifica, no asumas)
**Disparador**: vas a afirmar una cifra/hecho del código.
- Origen: el comité fundacional (2026-06-19) corrigió "108 window.appState" (real: `appState`=142, `window.appState`=6)
  y desmintió un "riesgo del marquee" que `landing.css:373` ya cubría. **Un riesgo inventado mina la credibilidad
  igual que un bug.** Lee el archivo y cita `archivo:línea`, o di "no verificado/creo".
