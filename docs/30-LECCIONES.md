# 🧪 30 — LECCIONES (memoria procedimental · recetas + gotchas)

> **Nodo: experiencia.** On-demand (Trigger de Experiencia: ANTES de una op riesgosa/repetitiva). Cada lección
> = disparador + receta. Hijas por saturación (§G.5): `31-LECCIONES-GIT`, etc. **§Meta** = meta-lecciones del cerebro.

---

### L-01 — Publicar a GitHub Pages (user-site) sin sustos
**Disparador**: vas a publicar / activar Pages por primera vez.
- `.nojekyll` vacío **EN el mismo commit de publicación** (no después; si no, Jekyll ya procesó/ignoró recursos y el CDN sirve esa versión ~10 min).
- `git add` **SELECTIVO** (NUNCA `-A`/`.`): confirma que `Multimedia/`, `_archive/` y `design_handoff_ecovoces_landing/` quedan fuera (gitignored).
- Rama `main`; `Settings > Pages > Source = 'Deploy from a branch' > main/(root)` **a mano** (no se activa solo).
- El **1er deploy tarda hasta ~10 min** y sirve un **404 transitorio** mientras aprovisiona el cert `*.github.io` → **NO es un fallo**; avisar al dueño.
- user-site en la raíz → **rutas relativas, 0 paths root-absolutos**, sin base-path.

### L-02 — Cache-bust `?v=w11-N` (no es inmadurez)
**Disparador**: cambiaste comportamiento y el dueño "no ve" el cambio.
- Pages sirve con `max-age=600` (CDN Fastly ~10 min) y NO deja setear cache-headers → el `?v=w11-N` manual es la respuesta CORRECTA.
- Bumpea la `N` en los assets afectados; **la N vigente vive SOLO en `05`** (SSoT). El dueño invalida con **Ctrl+Shift+R**.
- Desaparecería solo con el content-hashing de Vite (si se adopta; ADR-A).

### L-03 — Verifica ANTES de cada push (deploy=push, sin staging)
**Disparador**: vas a confiar en un solo vistazo antes de publicar.
- `deploy=push` elimina el staging → **verifica en navegador real ANTES de cada push**. Construye el mirror **por bloques, commit por bloque**.
- Degradación: sin GSAP, el IntersectionObserver revela todo; `prefers-reduced-motion` apaga el motion (ya cubierto en el CSS del handoff — no re-tocar el marquee).

### L-04 — `preview_screenshot` se cuelga en páginas de animación continua ⇒ **migrada al maestro**: [[INSE:L-04]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).

### L-05 — Push 403: el credential helper cachea la cuenta equivocada ⇒ **migrada al maestro**: [[INSE:L-05]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).

### L-06 — Leer el contenido REAL de una fuente externa antes de describirla (Canva / video / PDF)
**Disparador**: vas a describir/resumir lo que dice un video, una presentación de Canva o un PDF que NO has leído.
- **NUNCA lo infieras del proyecto** (la landing ≠ el video): produce afirmaciones falsas. El dueño detectó tarjetas inventadas en `ecovoces-ia.html` que no reflejaban su video (→ `99 §3` ADR-C). Companion de **M-01**.
- **Receta Canva (MCP)**: `resolve-shortlink <id>` → diseño `D…` → `get-presenter-notes` (guion, si existe) + `get-design-content richtexts`. Si vienen VACÍOS (narración por voz / texto incrustado en gráficos) → **`export-design` a JPG por página** → `curl` para descargar → `Read` cada imagen. (El `Read` de PDF necesita `pdftoppm`, AUSENTE en esta máquina, y `pdftotext` no extrae texto de gráficos → exporta JPG, no PDF.)
- **YouTube**: `WebFetch` a la página del video devuelve solo el footer (la página es JS) → NO sirve para el contenido; ve a la fuente (Canva) o pide el guion al dueño.

---

## §Meta — Meta-lecciones del cerebro

### M-01 — Cita el número exacto o no lo cites (verifica, no asumas) ⇒ **migrada al maestro**: [[INSE:M-01]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).

## 🧭 Decisiones de gobernanza 2026-06-24 (operador-cars → ×4 cerebros) [HONOR]
> De la sesión cars (PLAN UNIFICADO, cars §237). Mismo dueño/operación en los 4 repos.
1. **La extensión Claude-in-Chrome la maneja CLAUDE directamente** (no relay): tras merge+~5min de deploy el dueño avisa y Claude conduce la validación live SOLO (es los OJOS), caza diseño/bugs/regresiones. Skill `validacion-live-chrome` modo (b) = DEFAULT con navegador conectado. Login/credenciales = solo el dueño; cambios locales no-deployados → `preview_*`.
2. **NO preguntar "qué sigue" en un plan ya hecho + revisado estratégicamente por mí** (survey/comité/Gemini/arquitecto): yo manejo el ORDEN técnico; solo interrumpo por decisiones del DUEÑO (dinero/legal/go-no-go/irreversible) o su verificación final. Refuerzo emphático del dueño 24/06. Hablarle SIEMPRE en cristiano (es no-técnico).
3. **Un workflow/comité ACOTADO (in-cwd read-only, sin git, sin lecturas fuera de cwd) NO se cuelga** — lo que cuelga es la lectura GATEADA por permiso (git/fuera-de-cwd), NO el fan-out acotado en sí (survey de 5 agentes corrió limpio). La maquinaria pesada (comité/Gemini/workflow) se usa para Decisión Fuerte, acotada.
4. **Verificar TODO claim de un asesor externo (Gemini) contra el código** antes de adoptar — la joya: en cars Gemini revirtió su propio verdicto previo y sus 6 claims se confirmaron leyendo el código. Insumo, no oráculo.
