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

## 4. ADR-D — Consejo Externo: corrección factual "Gemini (vía Antigravity) SÍ ve el código" ⟦OPUS-4.8⟧ (2026-06-21)

Propagación cross-repo desde **cars §224**. El `docs/15` (§2 y §3) afirmaba "Gemini no lo ve → alucina" y "el modelo no ve el repo ni el cerebro". **FALSO**: vía **Antigravity** Gemini tiene acceso LOCAL al repo (solo-lectura), como Claude Code → PUEDE revisar código real; el prompt apunta a rutas. Corregido en `docs/15`. (insema NO tiene copia local de la skill `comite-expertos` → la corrección de la skill global byte-idéntica ×4 la cubre.) Preservado el límite VERDADERO: **NUNCA edita/implementa**. Sin cache bump. Decisión + matriz de cuándo consultar → cars §224 + bóveda.

## 5. ADR-E — Guardián del índice (cars TODO-32) N/A: índice por-proveniencia, sin columna de línea por diseño (`99` corto) ⟦OPUS-4.8⟧ (2026-06-22)

Propagación cross-repo de **cars TODO-32/§229**. El guardián `scripts/brain-index.mjs` (auto-reconcilia la columna §→línea del `00`) **NO se instala aquí** — sería código muerto. El índice de insema **no tiene columna de línea por diseño**: su última columna es "Origen"/proveniencia y el `99` es tan corto que se navega con `grep -n "^## "`, no por offset (así lo dice el propio `00`). El reconcile parsearía 0 filas con línea → 0 trabajo pero *parecería instalado* (falsa cobertura). **Decisión**: NO script, NO `kernelFiles`/`package.json`; si algún día `99` crece y se adopta el mapa §→línea, se reevalúa. **Tombstone** (`> ⛔ REEMPLAZADO POR §M`) queda como convención manual disponible (el validador vive en el guardián, ausente aquí). Kernel (`brain-check`/`brain-diff`) y `§G` INTACTOS. Sin cache bump. Matriz de compatibilidad ×4 cerebros → **cars §229**.

## 6. ADR-F — Auditoría Nivel-2 #1 REAL: el tablero mentía sobre git desde hacía 42 días ⟦OPUS-5⟧ (2026-08-01)

**Deliberación:** `research-archive/2026-08-01-auditoria-nivel2-hallazgos.md` (tabla curada, = `deepAudit.tableFile`)
· `-CRUDO.json` (7 sondas + drill de retrieval) · `-workflow.js` (reejecutable).

**6.1 Contexto.** El cerebro se instaló el 2026-06-19 y **nunca se había auditado en Nivel-2**: el `deepAudit.last`
del manifest era la fecha de instalación, no de una auditoría. A los 43 días el gate escaló a warn y empezó a
bloquear commits del cerebro. El linter estructural daba SANO en sus 16 chequeos — y aun así el nodo de arranque
mentía. Esa brecha es justo la razón de ser del Nivel-2.

**6.2 El hallazgo que manda (N2-01).** `05` declaraba *«Local `main` == `origin/main` (pusheado ✓ 2026-06-19,
3 commits) … Verificado vs git real»*. La realidad: HEAD en `cerebro/todo-32`, `main` local **24 commits detrás**
y `origin/main` con **45** commits, no 3. **Cinco sondas lo reportaron por separado** sin verse entre ellas. La
causa raíz no es descuido: es que un dato **volátil** vivía copiado a mano en un nodo que se lee en cada arranque.

**6.3 La ironía útil (N2-02).** La respuesta correcta **ya existía en el repo**: el heartbeat instalado ese mismo
día (§ADR de inmobiliaria §72) genera `docs/.estado-auto.md` con rama, HEAD, sucios y deuda de consolidación en
cada boot. Pero **ningún nodo de ruteo llegaba a él** — el gate #10 lo marcaba como huérfano. *El cerebro generaba
la verdad y no la entregaba.* Arreglo: la fila de git de `05` se sustituye por un puntero al sidecar, y el sidecar
entra al §0 de `CLAUDE.md` con la regla de desempate: **si contradice al `05`, manda el sidecar**.

**6.4 El kernel sin gobernanza (N2-03).** El cerebro nombraba **dos canones distintos y ambos falsos**
(`CLAUDE.md` decía cars, `20` y el manifest decían bersaglio) mientras el canon real es `../brain-private/kernel/`
v1.6.0. El procedimiento (`npm run brain:pull`) no existía en ninguna neurona: solo en `package.json`. Una sesión
que quisiera tocar el linter lo habría editado en el repo y roto el gate #0. Corregido en los tres sitios.

**6.5 Lo demás aplicado.** Tag de modelo desfasado (`Opus 4.8` → Fable 5 planifica / Opus 5 implementa) y su
footer `Modelo:` que llevaba muerto desde el 9-jul (N2-04) · bitácora congelada el 18-jul, ahora con el salto de
kernel v1.4.1→v1.6.0 y el trabajo del 1-ago (N2-06) · **TODO-10** declara los 7+ commits sin mergear y que
`origin/main` no tiene ni el stamp del kernel ni `brain:pull` (N2-05) · doctrina de preloads LCP que afirmaba
*«hoy ausente»* con 3 preloads puestos y nombraba un asset que no es el LCP (N2-07) · **lápida honesta** al crudo
del comité, que no existe y tres punteros prometían (N2-08) · la refutación del *«el preview no corre GSAP»*
retroanotada EN la síntesis, no solo en `05` (N2-14) · deliberación importada de cars indexada (N2-10) ·
config-teatro fuera del manifest: `peers` y `specsDir` no los lee ningún gate (N2-12) · entrada ya consolidada en
§3 retirada del `10`, que la conservaba contra §G.3 (N2-11).

**6.6 Lo que se auditó y NO está roto** (verificado, no cortesía). La **web publicada no está desactualizada**:
los 7 commits sin mergear son todos de cerebro, cero cambios en HTML/CSS/JS/assets. El `ssotFact` `w11-2` es real
en `index.html:36` y `ecovoces-ia.html:31`. Las 18 secciones son 18 y las fuentes son self-hosted sin Google
Fonts. El kernel local está íntegro y al día. Ningún `TODO-NN` abierto estaba en realidad resuelto. Y el bloque
**«🚫 Callejones sin salida» del `10` es el mejor activo del cerebro**: el drill de retrieval respondió *«¿qué NO
debo reintentar?»* con **cero saltos**, completo y correcto.

**6.7 Doctrina.** **Un dato volátil copiado a mano miente; el estado derivable se GENERA o no se guarda.** Y su
corolario, que es el que costó: **generar la verdad no basta — hay que ENRUTARLA**. Un artefacto correcto al que
ningún nodo apunta es, para el cerebro, como si no existiera. Los 6 chequeos de kernel que esta auditoría propone
(#17 git del propio repo · #18 cambio sin consolidar · #19 cobertura de fiabilidad invertida · #20 anclas fuera
de `archiveDir` · #21 `deepAudit` sin `tableFile` · #22 `ssotFact` del tag de modelo) suben al escritor único del
kernel — **inmobiliaria TODO-23**, porque el #17 habría cazado N2-01 el primer día.
