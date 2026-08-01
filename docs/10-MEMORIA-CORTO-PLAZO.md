# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco, pendientes (TODO-NN),
> bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a ADR (`99`) + fila en `00`, lecciones
> a `30`, y PODAR al foco vivo (GC §G.4). El foco SIEMPRE incluye 🚫 callejones sin salida.

---

## 🎯 Foco actual
> 🤖 Modelo vigente **⟦OPUS-5⟧** (desde 2026-07-24) · footer `Modelo:` con el modelo REAL de la sesión, nunca copiado de un commit viejo.

> 🧠 Cerebro insemastereo ✅ (2026-06-19, `brain:check` SANO, commit fundacional `2f3e0bc`).
> 🎨 **Mirror de la landing ✅ CONSTRUIDO y VERIFICADO** (vanilla 1:1 del handoff, ADR-A): `index.html` en la
> raíz + `src/{styles,js/landing,assets}`. Verificado en navegador real: 18 secciones, GSAP, i18n ES↔EN,
> 0 errores de consola, fuentes/assets OK. ✅ **PUBLICADO y AL AIRE** (`https://insemastereo.github.io/`).
>
> 🎬 **`ecovoces-ia.html` AL AIRE** (2026-06-20): presentación del proyecto en video (YouTube `NnoYIhtW9MA`) + apartado "ECOVOCES IA" en el footer. Entrega al docente → `https://insemastereo.github.io/ecovoces-ia.html`. Única excepción SOLICITADA a la pausa → cerrada en `99 §3` (ADR-C).
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
| ✅ **CERRADOS** | TODO-01 cerebro fundacional · TODO-02 mirror de la landing (18 secciones, dock, hero-snap, i18n, GSAP) · TODO-03 fixes ortogonales (preload · canonical · sitemap · robots · 404 · OG+JSON-LD) · TODO-04 publicación en Pages. Detalle → `99` ADR-A/ADR-C vía `00`. | ✅ | — |
| **TODO-05** | **Decisión dueño**: SEO bilingüe real vs toggle runtime (default adoptado = toggle, fuera de alcance demo) | ⏳ dueño | — |
| **TODO-06** | 2ª opinión externa Gemini sobre el sustrato (opcional; comité ya con confianza alta) | 🔮 | dueño |
| **TODO-07** | **ADR-B — Migrar laboratorio** (de PROTOTIPO): reescritura a estado encapsulado (app.js 1427L, cero ESM, 21 onclick) + seguridad Firebase/menores | 🔒 futuro | post-landing |
| **TODO-08** | Deuda doc PROTOTIPO: `ARCHITECTURE.md:58/:85` cita `core/i18n.js` + `data-i18n` fantasma (no existen) | 🔮 | con ADR-B |
| **TODO-10** | 🔀 **Rama `cerebro/todo-32` sin mergear** — 14+ commits SOLO ahí (kernel, `brain:pull`, heartbeat, la auditoría). `origin/main` corre un kernel viejo y un clon nuevo desde `main` nace roto. **El merge lo hace el dueño** (regla git de este repo). Detalle → ADR-F §6.5. | 🔴 abierto | dueño mergea |
| **TODO-09** | **Epic demo→real** (visión dueño → `99` ADR-B §8): streaming audio en vivo · cuentas usuario (login/pass) · chat real · video cabina en vivo · +. Cada una = su propio ADR | 🔒 futuro | el dueño avisa |

---

## 📝 Bitácora (efímera)
> - **2026-08-01 ⟦OPUS-5⟧**: 🔬 **auditoría Nivel-2 #1** (36 hallazgos → 14) + **heartbeat** instalado → **ADR-F**. Lo que cambia para ti: rama/HEAD/sucios ya NO se copian al `05`, los genera `docs/.estado-auto.md`.
> - **2026-07-20 → 07-23 ⟦FABLE-5⟧**: kernel v1.4.1 → v1.6.0 vía `brain:pull`; el canónico pasó a `../brain-private/kernel/` y este repo solo CONSUME sus `kernelFiles`.
> - **2026-07-18 ⟦sinapsis desde inmobiliaria, FABLE-5⟧**: payloads liderazgo aplicados (60-WORKFLOWS: escritor único kernel/§G = inmobiliaria-operador) + 15 skills re-sincronizadas con verdad de producción SEO (Offer-sin-price inválido, FAQPage sin rich result, AEM muerto, objetivo Mensajes retirado — detalle: inmobiliaria ADR §33-§37). Novedades disponibles para catalogar: refreshes paid-ads v2.2/ad-creative v2.8 (+ nuevas video/offers/marketing-loops/image en inmobiliaria).
> - **2026-06-19 ⟦Opus 4.8⟧**: cerebro fundacional (`2f3e0bc`) + comité de sustrato (vanilla > Astro) → mirror construido y verificado en navegador → push y **Pages AL AIRE**. El dueño revocó el token expuesto (→ L-05). Detalle → `99` ADR-A/ADR-C.
