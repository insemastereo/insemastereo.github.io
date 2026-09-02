# 🧪 30 — LECCIONES (memoria procedimental · recetas + gotchas)

> **Nodo: experiencia.** On-demand (Trigger de Experiencia: ANTES de una op riesgosa/repetitiva). Cada lección
> = disparador + receta. Hijas por saturación (§G.5): `31-LECCIONES-GIT`, etc. **§Meta** = meta-lecciones del cerebro.

---

### L-01 — Publicar a GitHub Pages (user-site) sin sustos ⇒ **migrada al maestro**: [[INSE:L-01]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).

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

### L-06 — Leer el contenido REAL de una fuente externa antes de describirla (Canva / video / PDF) ⇒ **migrada al maestro**: [[INSE:L-06]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).

---

## §Meta — Meta-lecciones del cerebro

### M-01 — Cita el número exacto o no lo cites (verifica, no asumas) ⇒ **migrada al maestro**: [[INSE:M-01]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).

### M-09 — El always-on se ganó por importancia y nunca se perdió por desuso: el criterio es frecuencia × costo de omisión ⇒ **migrada al maestro**: [[INSE:M-09]]
Cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno del ABORT).


## 🧭 Decisiones de gobernanza 2026-06-24 (operador-cars → ×4 cerebros) [HONOR]
> De la sesión cars (PLAN UNIFICADO, cars §237). Mismo dueño/operación en los 4 repos.
1. **La extensión Claude-in-Chrome la maneja CLAUDE directamente** (no relay): tras merge+~5min de deploy el dueño avisa y Claude conduce la validación live SOLO (es los OJOS), caza diseño/bugs/regresiones. Skill `validacion-live-chrome` modo (b) = DEFAULT con navegador conectado. Login/credenciales = solo el dueño; cambios locales no-deployados → `preview_*`. ⇒ **migrado al maestro**: [[INSE:GOB-1]] · cuerpo en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`
2. **NO preguntar "qué sigue" en un plan ya hecho + revisado estratégicamente por mí** (survey/comité/Gemini/arquitecto): yo manejo el ORDEN técnico; solo interrumpo por decisiones del DUEÑO (dinero/legal/go-no-go/irreversible) o su verificación final. Refuerzo emphático del dueño 24/06. Hablarle SIEMPRE en cristiano (es no-técnico).
3. **Un workflow/comité ACOTADO (in-cwd read-only, sin git, sin lecturas fuera de cwd) NO se cuelga** — lo que cuelga es la lectura GATEADA por permiso (git/fuera-de-cwd), NO el fan-out acotado en sí (survey de 5 agentes corrió limpio). La maquinaria pesada (comité/Gemini/workflow) se usa para Decisión Fuerte, acotada. ⇒ **migrado al maestro**: [[INSE:GOB-3]] · cuerpo en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`
4. **Verificar TODO claim de un asesor externo (Gemini) contra el código** antes de adoptar — la joya: en cars Gemini revirtió su propio verdicto previo y sus 6 claims se confirmaron leyendo el código. Insumo, no oráculo. ⇒ **migrado al maestro**: [[INSE:GOB-4]] · cuerpo en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`
