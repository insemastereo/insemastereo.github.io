# 🗺️ 20 — MEMORIA ESPACIAL (dónde vive cada cosa)

> **Nodo: mapa de arquitectura.** On-demand (Trigger de Desorientación). Dónde viven secciones, assets,
> módulos, el handoff de diseño y el plan del mirror. Mantener fresco (§G.4 Reflejo de Frescura).

## §1 — Repos del ecosistema (en `Documents/GitHub/`)
- **`insemastereo.github.io/`** (ESTE) — repo público, GitHub Pages **user-site** (sirve en la raíz). Aquí vive el mirror + el cerebro.
- **`brain-private/insemastereo/`** — bóveda privada (`research-archive` = `archiveDir` del manifest). NUNCA público.
- **`altorracars.github.io` · `bersagliojewelry.github.io` · `altorrainmobiliaria.github.io`** — hermanos
  (kernel byte-idéntico; `peers` del manifest). Canon del cerebro = bersaglio.
- **`PROTOTIPO/`** (en `Desktop/`, repo aparte) — proyecto ECOVOCES EVOLUCIONADO: landing vieja + **laboratorio**
  (`laboratorio.html` + `src/js/laboratorio/app.js` 1427L + módulos ecovoz/conecta-sensor/evaluador-guion) + su
  propio cerebro (`docs/CEREBRO.md`, **NO replicar** — menos avanzado que el de los hermanos). **Fuente del
  laboratorio a migrar (ADR-B).**

## §2 — El diseño a espejar (fuente de verdad visual)
`design_handoff_ecovoces_landing/` (dentro de este repo) — export hi-fi de Claude Design. **Léelo entero antes
de tocar el mirror**: `README.md` (especificación completa: tokens, 18 secciones, interacciones, responsive, estado)
+ `site/` (réplica vanilla funcional de referencia):
- `site/tokens/` — colors (Win11 Mica), typography (Outfit + Plus Jakarta Sans), spacing, effects, fonts.
- `site/ui_kits/landing/` — `index.html` (markup de las 18 secciones) + `landing2.css` (clases `.ev-*`) + `js/`.
- **JS ACTIVO del handoff** (orden de carga): `landing2.i18n.js → core.js → magnet.js → award.motion.js →
  foliage.js → comunidad.js → dock.js → herosnap.js`. (LEGACY, ignorar: `landing.js / landing.i18n.js / landing.motion.js / loader.js`.)
- `site/assets/` — img (webp: escenas, mascota EcoVox, logo), video (`recorrido-laboratorio.mp4` 4.86M), fonts (16 woff2), vendor (gsap + ScrollTrigger).

## §3 — Las 18 secciones (orden de aparición)
hero · manifiesto+marquee · emisora+comunidad · reto local · 3 retos · método ABP · programa · 7 roles ·
evaluación · metas piloto 2026 · cronograma · maker · galería (bento) · beneficiarios · honestidad técnica ·
journal · redes (3×2) · cierre (CTA al laboratorio) · footer. (Detalle por sección → handoff `README §5`.)

## §4 — Arquitectura del mirror (ADR-A · vanilla, salida estática a la raíz)
Árbol objetivo del repo publicable:

    insemastereo.github.io/
      .nojekyll              (vacío, EN el commit de publicación)
      index.html            (espejo vanilla 1:1 del handoff)
      ecovoces-ia.html      (presentación en video · YouTube embed NnoYIhtW9MA · AUTOCONTENIDA: solo tokens.css, CSS+JS inline, SIN el JS del mirror; enlazada desde el footer de index.html)
      404.html  sitemap.xml  robots.txt  README.md  LICENSE  .gitignore
      src/
        styles/  tokens.css  fonts.css  landing.css   (clases .ev-*)
        js/landing/  (i18n, core, magnet, award.motion, foliage, comunidad, dock, herosnap) — vanilla, sin ESM
        assets/  img/(webp)  video/  fonts/(woff2)  js/vendor/(gsap, ScrollTrigger)
      docs/                 (cerebro — NO se sirve como contenido)
      laboratorio.html      (FUTURO, ADR-B — migración del lab de PROTOTIPO)

Reglas duras: **rutas RELATIVAS** (user-site en raíz, sin base-path) · **orden estricto** de scripts defer ·
**ids i18n únicos globales** · `?v=w11-N` en assets · **NO fragmentar en componentes/islas ahora** (espejo 1:1, riesgo mínimo).

## §5 — Contrato landing ↔ lab (respetar en la migración)
La landing propaga `?lang=` a `laboratorio.html` vía enlaces `.js-lab-link`; el lab lee `?lang=` por
`URLSearchParams`. Si el lab migra a otro toolchain/router, ese contrato `?lang=` se rompe → **restricción dura (ADR-B)**.
