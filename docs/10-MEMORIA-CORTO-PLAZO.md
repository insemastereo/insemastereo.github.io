# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco, pendientes (TODO-NN),
> bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a ADR (`99`) + fila en `00`, lecciones
> a `30`, y PODAR al foco vivo (GC §G.4). El foco SIEMPRE incluye 🚫 callejones sin salida.

---

## 🎯 Foco actual
> 🤖 **Opus 4.8** · commits footer `Modelo: Opus 4.8`.

> 🧠 **Cerebro insemastereo recién nacido (2026-06-19)**: replicado del canon altorracars; kernel copiado
> byte-idéntico. Cerrando con `npm run brain:check` SANO → commit fundacional.
> 🎨 **Proyecto = mirror de la landing ECOVOCES** (handoff en `design_handoff_ecovoces_landing/`) → **vanilla
> fiel 1:1** (ADR-A). Secuencia del dueño: cerebro → documentar → mirror → publicar; laboratorio después (ADR-B).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO Astro / NO build ahora** (ADR-A): incompatible con el i18n runtime (muta el DOM) + scripts globales.
> (b) **NO `git add -A`/`.`**: arrastraría `Multimedia/` (58M) al repo público para siempre (L-01).
> (c) **NO history-router en Pages** (ADR-B): deep-link = 404 DURO → multi-page o hash-router.
> (d) **NO el "script Node que ensambla los HTML"**: mini-Astro frágil de falla silenciosa; si hay paso Node, que sea Vite con git-hook.
> (e) **El preview NO corre GSAP** (L-03): verificar el motion en el navegador REAL local.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01** | Cerrar el cerebro: 8 nodos + `npm run brain:check` SANO + commit fundacional | 🔄 en curso | — |
| **TODO-02** | **Mirror de la landing** (vanilla 1:1 del handoff: 18 secciones, dock, hero-snap, i18n, GSAP) por bloques | 🔮 | TODO-01 |
| **TODO-03** | **Fixes ortogonales** (el "lo mejor" real): `rel=preload` woff2 H1 + hero webp · canonical real · sitemap.xml · robots.txt · 404.html · `aria-live`+foco en toggle ES/EN | 🔮 | con TODO-02 |
| **TODO-04** | **Publicar** (L-01): `.nojekyll` en el commit · add selectivo · push `main` · Settings>Pages a mano | 🔮 | TODO-02/03 |
| **TODO-05** | **Decisión dueño**: SEO bilingüe real (/es+/en+hreflang en build) vs toggle runtime una-URL (defendible para jurado presencial) | ⏳ dueño | decidir JUNTO al stack |
| **TODO-06** | 2ª opinión externa Gemini sobre el sustrato (opcional; comité ya con confianza alta) | 🔮 | dueño |
| **TODO-07** | **ADR-B — Migrar laboratorio** (de PROTOTIPO) al nuevo diseño: REESCRITURA a estado encapsulado (app.js 1427L, cero ESM, 21 onclick) + seguridad Firebase/datos de menores | 🔒 futuro | post-landing |
| **TODO-08** | Saldar deuda doc del PROTOTIPO: `ARCHITECTURE.md:58/:85` cita `core/i18n.js` + `data-i18n` fantasma (no existen) — corregir antes de propagar al admin | 🔮 | con ADR-B |

---

## 📝 Bitácora (efímera)
> - **2026-06-19 ⟦Opus 4.8⟧**: nace el cerebro insemastereo. Comité ×3 de sustrato (vanilla > Astro → ADR-A/ADR-B;
>   CRUDO/SÍNTESIS en bóveda). `git init` main + remoto + kernel byte-idéntico. Escritos `CLAUDE.md` + manifest +
>   8 nodos + bóveda. Siguiente: `brain:check` SANO + commit fundacional → arrancar el mirror (TODO-02).
