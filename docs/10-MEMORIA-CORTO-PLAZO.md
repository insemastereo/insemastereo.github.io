# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco, pendientes (TODO-NN),
> bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a ADR (`99`) + fila en `00`, lecciones
> a `30`, y PODAR al foco vivo (GC §G.4). El foco SIEMPRE incluye 🚫 callejones sin salida.

---

## 🎯 Foco actual
> 🤖 **Opus 4.8** · commits footer `Modelo: Opus 4.8`.

> 🧠 Cerebro insemastereo ✅ (2026-06-19, `brain:check` SANO, commit fundacional `2f3e0bc`).
> 🎨 **Mirror de la landing ✅ CONSTRUIDO y VERIFICADO** (vanilla 1:1 del handoff, ADR-A): `index.html` en la
> raíz + `src/{styles,js/landing,assets}`. Verificado en navegador real: 18 secciones, GSAP, i18n ES↔EN,
> 0 errores de consola, fuentes/assets OK. ✅ **PUBLICADO y AL AIRE** (`https://insemastereo.github.io/`).
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
| **TODO-01** | Cerebro: 8 nodos + `brain:check` SANO + commit fundacional | ✅ | — |
| **TODO-02** | **Mirror de la landing** (vanilla 1:1: 18 secciones, dock, hero-snap, i18n, GSAP) | ✅ verificado | — |
| **TODO-03** | **Fixes ortogonales**: `rel=preload` (Outfit 800 + PJS + hero webp) · canonical real · sitemap.xml · robots.txt · 404.html · OG + JSON-LD (`aria-live` del toggle ya venía) | ✅ | — |
| **TODO-04** | **Publicar**: commit + push + **GitHub Pages ✅ AL AIRE** (`https://insemastereo.github.io/`, verificado). Repo en GitHub Desktop. | ✅ | — |
| **TODO-05** | **Decisión dueño**: SEO bilingüe real vs toggle runtime (default adoptado = toggle, fuera de alcance demo) | ⏳ dueño | — |
| **TODO-06** | 2ª opinión externa Gemini sobre el sustrato (opcional; comité ya con confianza alta) | 🔮 | dueño |
| **TODO-07** | **ADR-B — Migrar laboratorio** (de PROTOTIPO): reescritura a estado encapsulado (app.js 1427L, cero ESM, 21 onclick) + seguridad Firebase/menores | 🔒 futuro | post-landing |
| **TODO-08** | Deuda doc PROTOTIPO: `ARCHITECTURE.md:58/:85` cita `core/i18n.js` + `data-i18n` fantasma (no existen) | 🔮 | con ADR-B |
| **TODO-09** | **Epic demo→real** (visión dueño → `99` ADR-B §8): streaming audio en vivo · cuentas usuario (login/pass) · chat real · video cabina en vivo · +. Cada una = su propio ADR | 🔒 futuro | el dueño avisa |

---

## 📝 Bitácora (efímera)
> - **2026-06-19 ⟦Opus 4.8⟧**: cerebro fundacional (commit `2f3e0bc`) + comité de sustrato (vanilla > Astro).
>   Luego **mirror construido**: assets/CSS/JS verbatim del handoff → `src/`; `index.html` con rutas
>   reescritas + `<head>` mejorado (drop Google Fonts → self-hosted + preloads + canonical + OG + JSON-LD +
>   cache-bust `?v=w11-N`). **Verificado en navegador** (0 errores, fuentes/i18n/assets OK).
> - **2026-06-19 · push ✅**: el dueño revocó el token expuesto + añadió `altorracars` como colaborador (resuelto L-05) → push de los 3 commits a `origin/main`. Luego activó Settings>Pages → **web AL AIRE** en `https://insemastereo.github.io/` (verificado). Repo añadido a GitHub Desktop.
