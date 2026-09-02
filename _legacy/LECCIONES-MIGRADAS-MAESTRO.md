# 🗄️ Lecciones MIGRADAS AL CEREBRO MAESTRO — cuarentena §G.4 (cuerpo íntegro)

> Estas lecciones **no se han perdido ni se han editado**: su cuerpo íntegro está aquí y su copia
> consultable vive en el maestro (`brain-private/maestro/lecciones/migradas/INSE/<ID>.md`), donde
> se lee desde CUALQUIER proyecto. En `docs/30-LECCIONES.md` sigue su titular —que es lo que hace
> resolver cualquier `[[L-NN]]` del repo— y allí mismo queda su stub con el puntero a este fichero.
>
> **Para qué sirve este fichero**: es el punto de retorno. El ABORT del lote reconstruye el cuerpo
> DESDE AQUÍ, a propósito y no con `git checkout` — un checkout restaura blobs de git y no probaría
> nada del mecanismo (`brain-private/cerebro-maestro/ENSAYO-ROLLBACK-F2.md §5`).

> Lote 3 · migrado 2026-09-01 · 3 lecciones. Migradas en la rama `f2/lote-inse`: aquí Claude NUNCA
> toca `main` — el merge es del dueño.

---
> Origen: INSE `docs/30-LECCIONES.md` (cuerpo Y titular en la MADRE, sin hoja hija) · pagada en INSE en la verificación del mirror (2026-06-19): el `99` no le dedica `§NN` — consta en `docs/05-ESTADO-GLOBAL.md` («Verificación del mirror») y como callejón (e) del `docs/10` · migrado 2026-09-01 lote 3

### L-04 — `preview_screenshot` se cuelga en páginas de animación continua
**Disparador**: vas a verificar visualmente con `preview_screenshot`.
- En páginas con animación en bucle (canvas de follaje rAF + video autoplay + marquee), `preview_screenshot` **se cuelga (timeout 30s)**. Gotcha heredado del cerebro hermano altorracars.
- **Receta**: verifica con `preview_eval` (estado del DOM, `naturalWidth` de imágenes = asset realmente cargado, `document.fonts.check`, colores computados, disparar el toggle i18n por `.click()`) + `preview_console_logs level=error` (0 errores = sin 404s ni JS roto). Más fiable que una captura.

> Origen: INSE `docs/30-LECCIONES.md` (cuerpo Y titular en la MADRE, sin hoja hija) · pagada en INSE en el 1er push a GitHub Pages (2026-06-19): sin `§NN` — bitácora del `docs/10`, «cerebro fundacional + comité de sustrato → push y Pages AL AIRE. El dueño revocó el token expuesto (→ L-05)» · migrado 2026-09-01 lote 3

### L-05 — Push 403: el credential helper cachea la cuenta equivocada
**Disparador**: `git push` a un repo de OTRA cuenta GitHub da `403 Permission denied to <otra-cuenta>`.
- En esta máquina, Git Credential Manager (`credential.helper=manager`) cachea la cuenta **`altorracars`**, que NO tiene escritura en el repo de la cuenta **`insemastereo`** → push 403. `gh` NO está instalado.
- **No lo resuelve Claude** (autenticarse = acción del dueño). Fix (uno de): (a) añadir `altorracars` como **colaborador** del repo `insemastereo` (GitHub → repo → Settings → Collaborators); (b) limpiar la credencial cacheada (Windows → Administrador de credenciales → quitar `git:https://github.com`) y re-loguear como `insemastereo` en el próximo push; (c) usar un **PAT** de `insemastereo`. Luego `git push -u origin main`.

> Origen: INSE `docs/30-LECCIONES.md` (§Meta; cuerpo Y titular en la MADRE, sin hoja hija) · pagada en INSE §1 (ADR-A: el comité fundacional ×3 leyó el código real, 2026-06-19) y reforzada en la verificación del mirror; citada como anti-pattern en INSE §3.5 · migrado 2026-09-01 lote 3

### M-01 — Cita el número exacto o no lo cites (verifica, no asumas)
**Disparador**: vas a afirmar una cifra/hecho del código o una capacidad de la herramienta.
- Origen: el comité fundacional (2026-06-19) corrigió "108 window.appState" (real: `appState`=142, `window.appState`=6)
  y desmintió un "riesgo del marquee" que `landing.css:373` ya cubría. **Refuerzo (verificación del mirror):** el
  comité afirmó "el preview no corre GSAP" y la prueba real mostró GSAP corriendo (`gsap: object`, L-04). **Un supuesto
  heredado equivocado mina igual que un bug.** Lee/ejecuta y cita evidencia (`archivo:línea`/output), o di "no verificado".

---

> Lote 16 · migrado 2026-09-02 · 6 lecciones (INSE) — cierre de la cola del programa. `L-02` queda RETENIDA por el guardián (veredicto en el ADR); las tres `GOB-N` son de UNA línea: el titular ES la lección, así que allí el `30` no descomprime, crece.

> Origen: INSE `docs/30-LECCIONES.md` (cuerpo Y titular en la MADRE, sin hoja hija) · pagada en INSE en el 1er push a GitHub Pages (2026-06-19): el `99` no le dedica `§NN` — consta en la bitácora del `docs/10` · migrado 2026-09-02 lote 16

### L-01 — Publicar a GitHub Pages (user-site) sin sustos
**Disparador**: vas a publicar / activar Pages por primera vez.
- `.nojekyll` vacío **EN el mismo commit de publicación** (no después; si no, Jekyll ya procesó/ignoró recursos y el CDN sirve esa versión ~10 min).
- `git add` **SELECTIVO** (NUNCA `-A`/`.`): confirma que `Multimedia/`, `_archive/` y `design_handoff_ecovoces_landing/` quedan fuera (gitignored).
- Rama `main`; `Settings > Pages > Source = 'Deploy from a branch' > main/(root)` **a mano** (no se activa solo).
- El **1er deploy tarda hasta ~10 min** y sirve un **404 transitorio** mientras aprovisiona el cert `*.github.io` → **NO es un fallo**; avisar al dueño.
- user-site en la raíz → **rutas relativas, 0 paths root-absolutos**, sin base-path.

> Origen: INSE `docs/30-LECCIONES.md` (cuerpo Y titular en la MADRE, sin hoja hija) · pagada en INSE §3 (ADR-C: el dueño detectó tarjetas inventadas en `ecovoces-ia.html`) · migrado 2026-09-02 lote 16

### L-06 — Leer el contenido REAL de una fuente externa antes de describirla (Canva / video / PDF)
**Disparador**: vas a describir/resumir lo que dice un video, una presentación de Canva o un PDF que NO has leído.
- **NUNCA lo infieras del proyecto** (la landing ≠ el video): produce afirmaciones falsas. El dueño detectó tarjetas inventadas en `ecovoces-ia.html` que no reflejaban su video (→ `99 §3` ADR-C). Companion de **M-01**.
- **Receta Canva (MCP)**: `resolve-shortlink <id>` → diseño `D…` → `get-presenter-notes` (guion, si existe) + `get-design-content richtexts`. Si vienen VACÍOS (narración por voz / texto incrustado en gráficos) → **`export-design` a JPG por página** → `curl` para descargar → `Read` cada imagen. (El `Read` de PDF necesita `pdftoppm`, AUSENTE en esta máquina, y `pdftotext` no extrae texto de gráficos → exporta JPG, no PDF.)
- **YouTube**: `WebFetch` a la página del video devuelve solo el footer (la página es JS) → NO sirve para el contenido; ve a la fuente (Canva) o pide el guion al dueño.

> Origen: INSE `docs/30-LECCIONES.md` (§Meta; cuerpo Y titular en la MADRE) · sin `§NN` propio: llegó por SINAPSIS desde INMO §84 y aquí se reescribió con su «cómo se aplica» local · migrado 2026-09-02 lote 16

### M-09 — El always-on se ganó por importancia y nunca se perdió por desuso: el criterio es frecuencia × costo de omisión
**Disparador**: el router (`CLAUDE.md`) va apretado y estás a punto de recortar redacción para que quepa algo nuevo.
- **Patrón** (medido en inmobiliaria, 2026-08-30): el router llegó al **99,8%** del presupuesto de arranque
  y el diagnóstico escrito era *«los recortes de urgencia ya no dan más»*. Al medirlo, el problema no era el
  estilo: tres secciones de doctrina pesaban ~2,2k de 20,4k **y gobernaban un sitio ya RETIRADO**. Se
  auto-cargaban en CADA sesión para no usarse en casi ninguna.
- **Por qué el cerebro contribuye**: hay gate para el TECHO y doctrina para no subirlo, pero **ninguna regla
  dice qué se gana el derecho a estar siempre cargado**. Con criterio de entrada y sin criterio de salida, un
  always-on solo puede crecer: toda doctrina es importante para alguien, y **el que la escribe nunca paga su
  renta** — la pagan todas las sesiones siguientes.
- **Regla**: lo que se queda en el always-on se decide por **frecuencia de uso × costo de omitirlo**, no por
  importancia. Antes de recortar prosa, pregunta qué secciones gobiernan algo que ya no se toca y **múdalas a
  una hoja on-demand**; una doctrina que se lee cuando hace falta sigue vigente sin pagar renta diaria.
- **Cómo se aplica aquí**: este repo tiene un solo frente vivo. Cualquier sección del router que gobierne el
  otro —o una superficie retirada— es candidata a salir a `docs/` y quedarse con su puntero.

> Origen: INSE `docs/30-LECCIONES.md` (bloque «Decisiones de gobernanza 2026-06-24» [HONOR], punto 1 — sin ID ni header propios: el `GOB-N` lo asigna el censo del maestro) · pagada en CARS §237 (PLAN UNIFICADO) y replicada a los 4 cerebros · migrado 2026-09-02 lote 16

1. **La extensión Claude-in-Chrome la maneja CLAUDE directamente** (no relay): tras merge+~5min de deploy el dueño avisa y Claude conduce la validación live SOLO (es los OJOS), caza diseño/bugs/regresiones. Skill `validacion-live-chrome` modo (b) = DEFAULT con navegador conectado. Login/credenciales = solo el dueño; cambios locales no-deployados → `preview_*`.

> Origen: INSE `docs/30-LECCIONES.md` (bloque «Decisiones de gobernanza 2026-06-24» [HONOR], punto 3 — sin ID ni header propios: el `GOB-N` lo asigna el censo del maestro) · pagada en CARS §237 (PLAN UNIFICADO) y replicada a los 4 cerebros · migrado 2026-09-02 lote 16

3. **Un workflow/comité ACOTADO (in-cwd read-only, sin git, sin lecturas fuera de cwd) NO se cuelga** — lo que cuelga es la lectura GATEADA por permiso (git/fuera-de-cwd), NO el fan-out acotado en sí (survey de 5 agentes corrió limpio). La maquinaria pesada (comité/Gemini/workflow) se usa para Decisión Fuerte, acotada.

> Origen: INSE `docs/30-LECCIONES.md` (bloque «Decisiones de gobernanza 2026-06-24» [HONOR], punto 4 — sin ID ni header propios: el `GOB-N` lo asigna el censo del maestro) · pagada en CARS §237 (PLAN UNIFICADO) y replicada a los 4 cerebros · migrado 2026-09-02 lote 16

4. **Verificar TODO claim de un asesor externo (Gemini) contra el código** antes de adoptar — la joya: en cars Gemini revirtió su propio verdicto previo y sus 6 claims se confirmaron leyendo el código. Insumo, no oráculo.
