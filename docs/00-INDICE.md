# 00 — ÍNDICE SINÁPTICO (enrutamiento + mapa § → ADR)

> **Nodo: índice sináptico.** Capa "síntoma/tema → neurona" (consulta rápida) + índice de los ADR del
> Largo Plazo (`99`). On-demand (Trigger de Error/Historia, `CLAUDE.md §G`).
> **Cerebro**: 🧠 `CLAUDE.md` · 🩺 `05` · ⚡ `10` · 🛰️ `15` · 🗺️ `20` · 🧪 `30` · 🔁 `60` (workflows; W-11=flujo fuerte) · 🗂️ este · 🎯 `40` · 📚 `99`.
> Regla de oro: para leer `99`, busca el § aquí y `Read docs/99-HISTORIAL-ADR.md offset=<línea> limit=~150`
> (regenera líneas con `grep -n "^## " docs/99-HISTORIAL-ADR.md`).

---

## 🧭 Enrutamiento semántico (síntoma → neurona) — CONSULTA ESTO PRIMERO

| Tu situación / síntoma | Ve a |
|---|---|
| Decisión Fuerte / auditoría / revisión / diseño-UI no trivial (¿aplico el flujo del dueño?) | 🔁 `60-WORKFLOWS` **W-11** (COMPLETO o nada + 3 artefactos: mockup·prompt-Gemini·prompt-Chrome) + skill `proceso-decision-fuerte` |
| ¿Dónde vive una sección / asset / módulo JS / el handoff? | 🗺️ `20-MEMORIA-ESPACIAL` |
| Especificación pixel-perfect del diseño (tokens, 18 secciones, interacciones) | `design_handoff_ecovoces_landing/README.md` |
| Voy a **publicar** a GitHub Pages / `.nojekyll` / 404 transitorio | 🧪 `30` L-01 + `CLAUDE.md §3.5` |
| Cache / `?v=w11-N` / el dueño no ve el cambio | 🧪 `30` L-02 + `CLAUDE.md §4` (la N vigente → `05`) |
| El motion no se ve / GSAP / cómo verificar animaciones | 🧪 `30` L-03 + L-04 (verificar en navegador real; `preview_eval`+console, NO `preview_screenshot`) |
| ¿Por qué vanilla y no Astro/React? | 📚 `99` §1 (ADR-A) + bóveda comité |
| Laboratorio / migrarlo / Firebase / datos de menores | 📚 `99` §2 (ADR-B) + 🎯 `40`→`41-SEGURIDAD` |
| 🔵 Audita SEGURIDAD / rules / datos de menores | 🎯 `41-SEGURIDAD` (on-demand) + skill `arquitecto-software` |
| 🔵 LEGAL / privacidad / Habeas Data / Ley 1581 / menores | 🎯 `42-LEGAL` + skill **`legal-colombia`** (Colombia, gate abogado) |
| 🔵 UX / SEO / Performance / Accesibilidad | 🎯 `40-LOBULOS` → 43/44/45/48 + skills (`frontend-design`, `seo-audit`, `accessibility-audit`) |
| 🧠 Monta el comité / mejora ×3 / 2ª opinión interna | Skill **`comite-expertos`** (+ `15` para Gemini) |
| 🛰️ Decisión fuerte / cara de revertir | 🛰️ `docs/15-CONSEJO-EXTERNO.md` |
| Video del proyecto / página de presentación / enlace de entrega al docente | 📚 `99` §3 (ADR-C) + 🗺️ `20` → `ecovoces-ia.html` |
| El `pre-commit` me BLOQUEA por una deuda que no la causa mi cambio | 📚 `99` §8 (ADR-H): se paga, no se salta — `brain:pull` + re-copiar la skill canónica |
| Busco una lección de aquí y su cuerpo ya no está en `30` (solo el titular + un stub) | 🧪 `30` → `_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (punto de retorno) y `brain-private/maestro/` — 9 migradas al maestro, cola en CERO (📚 `99` §7 · §9) |
| ¿Qué hay pendiente? estado del sprint | ⚡ `10` (TODO-NN) |
| El "por qué" de una decisión / detalle de un § | tabla § → ADR abajo → 📚 `99` |

---

## 📚 Mapa § → ADR (Largo Plazo `99-HISTORIAL-ADR.md`)

> Sin línea fija (cerebro nuevo, `99` corto): usa `grep -n "^## " docs/99-HISTORIAL-ADR.md`.

| § | ADR / Tema | Origen |
|---|---|---|
| §1 | ADR-A — Sustrato landing: vanilla sin build; Astro descartado; Vite condicional | comité 2026-06-19 |
| §2 | ADR-B — Laboratorio + backend (futuro): reescritura de estado + seguridad Firebase/menores | comité 2026-06-19 |
| §3 | ADR-C — Página de presentación en video (`ecovoces-ia.html`, YouTube `NnoYIhtW9MA`) + enlace en footer; contenido leído vía Canva MCP | dueño 2026-06-20 |
| §4 | ADR-D — Consejo Externo: Gemini vía Antigravity SÍ ve el código (solo-lectura); §15 corregido. De cars §224. ⟦OPUS-4.8⟧ | 2026-06-21 |
| §5 | ADR-E — Guardián del índice (cars TODO-32) **N/A aquí**: índice por-proveniencia, sin columna de línea por diseño (`99` corto). De cars §229. ⟦OPUS-4.8⟧ | 2026-06-22 |
| §6 | ADR-F — **Auditoría Nivel-2 #1 REAL**: el `05` mentía sobre git 42 días (decía main sincronizado; el trabajo vivía en `cerebro/todo-32`). El heartbeat ya generaba la verdad y ningún nodo la enrutaba. Kernel sin gobernanza: 2 canones declarados, ambos falsos. 36 hallazgos → 14. | auditoría 2026-08-01 |
| §7 | ADR-G — **Lote 3 del CEREBRO MAESTRO**: `L-04`, `L-05` y `M-01` mudan su cuerpo a la bóveda; aquí quedan titular + stub + `_legacy/`. Censo sha 3/3; kernel v1.20 MEDIDO. | rama `f2/lote-inse` 2026-09-01 |
| §8 | ADR-H — **La deuda AJENA se paga igual**: kernel v1.20→v1.29.0 + las 14 skills DERIVADAS re-copiadas desde la canónica, sin subir `skillDriftBaseline`. Desbloquea el lote 3 sin `--no-verify`. | rama `f2/lote-inse` 2026-09-01 |
| §9 | ADR-I — **Lote 16 y la cola en CERO**: `L-01`, `L-06`, `M-09` y los puntos 1/3/4 del bloque de gobernanza (`GOB-1`/`GOB-3`/`GOB-4`, forma §4.2) mudan su cuerpo a la bóveda. `L-02` **RETENIDA** por el guardián. Censo sha 6/6. | `main` 2026-09-02 |
