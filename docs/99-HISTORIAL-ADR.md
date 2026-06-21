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
- **.8 Alcance demo→real (visión del dueño, 2026-06-19)** — al pasar de DEMO a proyecto real, el sistema debe sumar: (1) **streaming de audio EN VIVO** de la emisora desde la web; (2) **cuentas de usuario** reales (acceso + contraseña); (3) **chat real** ligado a esas cuentas (reemplaza el demo localStorage); (4) **video EN VIVO de la cabina** de transmisión; (5) lo demás que conlleve el proyecto. **Implicaciones de arquitectura** (cada feature = su propio diseño/ADR): auth + chat con datos de MENORES → gate de seguridad §3.6 + legal `42`; **streaming audio/video EN VIVO sale del free-tier estático de Pages** (necesita servidor de medios / proveedor de streaming + ancho de banda) → re-evaluar hosting/costos y el disparador de Vite (ADR-A). El dueño avisará cuándo arrancar; HOY el proyecto queda en PAUSA con el demo al aire.

## 3. ADR-C — Página de presentación en video (`ecovoces-ia.html`) + enlace en footer
> Tarea SOLICITADA por el dueño (entrega calificable al docente). NO es Decisión Fuerte (aditiva, reversible).
> Cliente: *"vincular el video de Canva a la web… el enlace que le dé al docente lo lleve exacto al video y la página… sorpréndeme con algo top"*.
- **.1 Contexto/causa**: el dueño tiene una presentación-video del proyecto (Canva → YouTube `NnoYIhtW9MA`) que entrega al docente como UN enlace web. Necesita: video incrustado + página contextualizada + acceso desde la landing.
- **.2 Decisión**: nueva página **`ecovoces-ia.html`** en la raíz (URL de entrega `https://insemastereo.github.io/ecovoces-ia.html`), **AUTOCONTENIDA**: enlaza SOLO `tokens.css` (fuentes+variables) + CSS/JS inline propios; YouTube en `youtube-nocookie` 16:9; reveal propio degradable. **Apartado destacado (tarjeta-CTA) en el footer** de `index.html` ("ECOVOCES IA" → la página) con `<style>` scoped + clave i18n `footer-feat-d` (ES/EN).
- **.3 No-regresión**: autocontenida = NO hereda el JS del mirror (loader / scroll-lock / `.ev-reveal` invisible-sin-GSAP / dock) → cero riesgo de pantalla en blanco. Footer aditivo, SIN renombrar ids (§3.2). i18n: `core.js` solo toca ids con clave EN (verificado `core.js:60-72`) → ids nuevos sin clave quedan intactos.
- **.4 Verificación / contenido REAL**: el 1er intento describió las tarjetas desde la WEB (inventado) → el dueño lo corrigió. Se leyó el video REAL vía **Canva MCP**: `resolve-shortlink ecovocesiaproferosmy` → diseño `DAHMtlst19U` (15 diapositivas) → `export-design` JPG + lectura visual (notas de orador VACÍAS; texto incrustado en gráficos, no richtext). Tarjetas reescritas al video real (Problema · Reto/pregunta de investigación · Solución-laboratorio · 4 Pilares · EcoVox/lab vivo · Impacto-ODS-visión); **pensamiento crítico = pilar central**; chips movidos DEBAJO del video; cita de cierre añadida. Verificado en navegador (0 errores) y en vivo (200).
- **.5 Anti-patterns evitados**: describir el contenido de una fuente externa SIN leerla (→ L-06 / M-01); reusar `landing.css` con su loader/scroll-lock; 4ª columna en el footer (grid `repeat(3,1fr)` → desbalance) → se usó tarjeta-CTA full-width.
- **.6 Archivos**: `ecovoces-ia.html` (NUEVO); `index.html` (footer feature + `<style>` scoped + bump de `landing2.i18n.js`, N vigente → `05`); `src/js/landing/landing2.i18n.js` (+`footer-feat-d` EN). INTACTOS: `tokens.css` / `landing.css` / resto del JS. Commits `dfcec2e` (página) + `07117cc` (corrección de fidelidad).
- **.7 Doctrina + cache**: cache bumpeada (N vigente → `05`, L-02). Lección **L-06** (leer la fuente externa antes de describirla). **Mascota oficial = EcoVox** ("La voz que transforma"). El video enmarca el proyecto en **4 pilares (Comunicación · Pensamiento crítico · IA · Sostenibilidad)** — distinto del marco "Maker / sensores / Ondas Verdes / metas piloto" de la landing: la página de video usa el lenguaje del VIDEO, no el de la landing.
