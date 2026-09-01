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
