# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco, pendientes (TODO-NN),
> bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a ADR (`99`) + fila en `00`, lecciones
> a `30`, y PODAR al foco vivo (GC §G.4). El foco SIEMPRE incluye 🚫 callejones sin salida. **Última actualización: 2026-09-04.**

---

## 🎯 Foco actual
> 🤖 Modelo vigente **⟦OPUS-5⟧** (desde 2026-07-24) · footer `Modelo:` con el modelo REAL de la sesión, nunca copiado de un commit viejo.

> 🎨 **Mirror de la landing ✅ AL AIRE** (vanilla 1:1 del handoff, ADR-A) — el detalle verificado vive en `05`.
>
> 🎬 **`ecovoces-ia.html` AL AIRE** (entrega al docente): única excepción a la pausa → cerrada en `99 §3` (ADR-C); estado en `05`.
>
> ⏸️ **PROYECTO EN PAUSA (dueño 2026-06-19)**: el demo queda AL AIRE estable — **NO cambiar proactivamente**. Retomar = paso **demo→real** (streaming en vivo · cuentas usuario · chat real · video cabina → `99` ADR-B §8) + migrar el laboratorio. **El dueño avisará cuándo y cómo continuar.**
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO Astro / NO build** (ADR-A): incompatible con el i18n runtime (muta el DOM) + scripts globales.
> (b) **NO `git add -A`/`.`**: arrastraría `Multimedia/` (58M) y `design_handoff/` al repo público (L-01).
> (c) **NO history-router en Pages** (ADR-B): deep-link = 404 DURO → multi-page o hash-router.
> (d) **NO el "script Node que ensambla los HTML"**: mini-Astro frágil; si hay paso Node, que sea Vite con git-hook.
> (e) **`preview_screenshot` se cuelga** en páginas animadas (L-04) → verificar con `preview_eval`+`console_logs`. (El preview SÍ corre GSAP — verificado, contra el supuesto del comité.)

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-05** | **Decisión dueño**: SEO bilingüe real vs toggle runtime (default adoptado = toggle, fuera de alcance demo) | ⏳ dueño | — |
| **TODO-06** | 2ª opinión externa Gemini sobre el sustrato (opcional; comité ya con confianza alta) | 🔮 | dueño |
| **TODO-07** | **ADR-B — Migrar laboratorio** (de PROTOTIPO): reescritura a estado encapsulado (app.js 1427L, cero ESM, 21 onclick) + seguridad Firebase/menores | 🔒 futuro | post-landing |
| **TODO-08** | Deuda doc PROTOTIPO: `ARCHITECTURE.md:58/:85` cita `core/i18n.js` + `data-i18n` fantasma (no existen) | 🔮 | con ADR-B |
| **TODO-11** | **Al KERNEL canónico** (aquí no: gate #0) — N2 #2: `BRAIN_RE` de `session-handoff.mjs:98` acusa 8/14 commits de «producto sin ADR» con 0 producto tocado; + declarar `bootRealTarget` | 🔮 | canon |
| **TODO-12** | **N2 #2 cierre** (bóveda y raíz, aquí no): lápida ⚰️ + tachado in-line en la síntesis del comité (N2b-06) · el handoff de diseño no está en NINGÚN repo (N2b-07) · residuo de la doctrina de merge en `secretos.yml` y `MERGE-GUIA-DANIEL.md` (N2b-12) | 🔮 | — |
| **TODO-09** | **Epic demo→real** (visión dueño → `99` ADR-B §8): streaming audio en vivo · cuentas usuario (login/pass) · chat real · video cabina en vivo · +. Cada una = su propio ADR | 🔒 futuro | el dueño avisa |

> ✅ **CERRADOS y fuera del ledger** (§G.3) — dónde vive el registro de cada uno, sin inventar punteros:
> **TODO-01** cerebro fundacional → `99 §0` · **TODO-02** mirror de la landing → `99 ADR-A` (la decisión de
> sustrato) + bitácora 19-jun · **TODO-03** fixes ortogonales (preload · canonical · sitemap · robots · 404 ·
> OG+JSON-LD) → **sin ADR**: viven en los commits y en la bitácora · **TODO-04** publicación en Pages →
> estado LIVE en `05` + bitácora. **TODO-10** la rama del cerebro → **MERGEADA** en `094b08f`.

---

## 📝 Bitácora (efímera)

> - **2026-09-04 ⟦OPUS-5⟧**: 🔬 **auditoría Nivel-2 #2 CERRADA COMPLETA** en dos tandas (sondas 0-8; la 2ª corrió 3-en-frío/4/5/7/8.3) → `99 §10` + tabla en la bóveda. 14 heredados: 9 cerrados, 3 parciales, 1 con premisa corregida, 1 abierto; 0 reincidentes. Lo que cambia para ti: el `05` ya no dice que mergea el dueño (lo hace Claude), el banner del arranque acusa commits de «producto» que no lo son (TODO-11), y el documento de diseño del que nació la web **no está guardado en ningún repositorio** (TODO-12).

> 🐤 **26-ago — el canario acusó 19 commits sin arranque: FALSA ALARMA** (previos al heartbeat, o flota desde un repo hermano). Se juzga, no se regexea: si vuelve con trabajo LOCAL detrás, es real.
> - **2026-08-01 ⟦OPUS-5⟧**: 🔬 **auditoría Nivel-2 #1** (36 hallazgos → 14) + **heartbeat** instalado → **ADR-F**. Lo que cambia para ti: rama/HEAD/sucios ya NO se copian al `05`, los genera `docs/.estado-auto.md`.
> - **2026-07-18 ⟦sinapsis, FABLE-5⟧**: payloads de liderazgo + 15 skills re-sincronizadas con verdad de producción SEO (detalle: inmobiliaria ADR §33-§37).
> - **2026-06-19 ⟦Opus 4.8⟧**: cerebro fundacional (`2f3e0bc`) + comité de sustrato (vanilla > Astro) → mirror construido y verificado en navegador → push y **Pages AL AIRE**. El dueño revocó el token expuesto (→ L-05). Detalle → `99` ADR-A/ADR-C.
