# 📚 99 — HISTORIAL ADR (Largo Plazo · decisiones)

> **Nodo: largo plazo.** On-demand por offset (vía `00`). NUNCA leer entero. Cada decisión cerrada = ADR
> `## N. ADR-X — título` (formato §2 del `CLAUDE.md`). Índice → `00-INDICE.md`.

---

## §0 — Génesis del cerebro (2026-06-19)
Cerebro de `insemastereo` instalado replicando el canon **altorracars** (kernel `brain-check.mjs` / `brain-diff.mjs`
byte-idéntico ×4 repos; manifest INSTANCE propio). Estructura: `CLAUDE.md` (router) + nodos `00/05/10/15/20/30/40/99`
+ bóveda `brain-private/insemastereo/`. Proyecto: **mirror de la landing ECOVOCES IA (INSEMA STEREO)** → publicar en
GitHub Pages. Secuencia del dueño: cerebro → documentar → mirror → publicar; laboratorio después (ADR-B).

## 1. ADR-A — Sustrato de la landing: VANILLA sin build (Astro descartado)
> Decisión Fuerte. Cliente: *"la forma más completa y mejor… $0 al iniciar… escalable… lo mejor"*.
> **Deliberación**: `research-archive/2026-06-19-comite-substrato-ecovoces-SINTESIS.md` (CRUDO: workflow `wf_b6beb5e3-b44`).
- **.1 Causa/contexto**: elegir el sustrato del mirror con $0 hoy + escalabilidad futura. Candidato a batir: Astro.
- **.2 Decisión**: **HTML/CSS/JS vanilla SIN build** ahora; **espejo 1:1** del handoff; publica ya. **Vite CONDICIONAL**
  (no inevitable): solo con compromiso ESCRITO del dueño de mantener la GitHub Action (build rojo = sitio congelado).
- **.3 Astro DESCARTADO** — no por "divergencia de stack" (débil; el kernel del cerebro es agnóstico al stack) sino por
  **incompatibilidad MEDIDA** con el i18n runtime que muta-y-reconstruye el DOM + grafo de 8 scripts `defer` con globals
  (`window.LANDING_MOTION/MARQUEE`; toda la landing = 1 isla). Reabrible solo si se pivota a CMS editorial multilingüe `/es`+`/en` en build.
- **.4 Verificación**: comité ×3 leyó el código real (cero ESM; i18n por id; GSAP global; marquee ya cubierto en `landing.css:373`). Confianza ALTA.
- **.5 Anti-patterns evitados**: "script Node que ensambla los HTML" (mini-Astro frágil de falla silenciosa); `git add -A`; history-router en Pages.
- **.6 Archivos**: este ADR + `.brain-manifest.json` + `CLAUDE.md §1/§3.5/§4`. La landing aún NO está construida (Fase 3).
- **.7 Doctrina + cache**: `CLAUDE.md §3.5` (sustrato/publicación) · cache `?v=w11-N` (L-02). Disidencia honesta preservada en
  la síntesis (vanilla-puro-permanente / Astro-solo-si-CMS-bilingüe / lab con toolchain propio).

## 2. ADR-B — Laboratorio + Backend (el riesgo de 2 años): REESCRITURA + seguridad de datos
> Decisión de arquitectura DIFERIDA (futuro), separada de ADR-A a propósito (no mezclar las dos decisiones).
- **.1 Contexto**: el laboratorio (hoy en `PROTOTIPO`) migrará al nuevo diseño. Es app-like: `app.js` 1427 líneas,
  estado global (`appState` ×142), 21 `onclick` inline, **cero ESM**, getUserMedia/AudioContext.
- **.2 Decisión**: migrarlo es **REESCRITURA a estado encapsulado + `addEventListener`**, NO "envoltura"; decidir
  ESM/bundler ANTES de cualquier Vite. Datos/permisos se fijan **desde el primer endpoint**.
- **.3 Seguridad**: Firebase client-side + **datos de MENORES** + repo PÚBLICO → **Security Rules = única barrera**
  (legibles por cualquiera) → reglas restrictivas por defecto + **tests de reglas** + minimizar datos. Tensión abierta:
  repo privado (apaga Pages gratis en org Free) vs público (exigido por Pages gratis).
- **.4 Reglas duras**: **JAMÁS history-router en Pages** (deep-link = 404 DURO) → multi-page o hash-router. Respetar el
  contrato `?lang=` landing↔lab (la landing lo propaga vía `.js-lab-link`; el lab lo lee por `URLSearchParams`).
- **.5 Pendiente**: TODO-07 (migración) · TODO-08 (deuda doc del PROTOTIPO: `core/i18n.js` + `data-i18n` fantasma) · decisión público/privado · Git LFS vs blob para el mp4 (4.86M; blob defendible ahora).
- **.6 Archivos**: este ADR; el laboratorio vive aún en `PROTOTIPO` (no se toca su lógica en la Fase 3).
- **.7 Doctrina**: `CLAUDE.md §3.6` (seguridad/datos) + §1 (futuro). Legal → `42-LEGAL` (Ley 1581, datos de menores).
