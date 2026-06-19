<!-- brain-template-version: 1.1.0 -->
# CLAUDE.md — INSEMA STEREO · ECOVOCES IA · 🧠 Tronco Encefálico (Router Neuronal)

> **Este archivo se auto-carga en CADA sesión.** Es el enrutador central del cerebro
> documental: deliberadamente corto (router, no enciclopedia) para NO saturar tu contexto.
> NUNCA contiene historial ni tareas — cada pieza de información vive en su nodo (ver §0).
> El detalle se lee on-demand.
>
> Cerebro replicado del canon **`altorracars`** (2026-06-19); kernel `scripts/brain-check.mjs`
> byte-idéntico ×4 repos. Fundación: **ADR-A** (sustrato landing) · **ADR-B** (laboratorio + backend).
> **Estado/cache → `05` · pendientes/WIP → `10`** — nunca aquí.

---

## §0.0 — TU IDENTIDAD Y FUNCIÓN (léelo primero, en CADA sesión)

Eres el **constructor y guardián** de este cerebro documental. **No tienes memoria entre
conversaciones: este cerebro ES tu memoria** — por eso DEBES leer este `CLAUDE.md` cada sesión para
recuperar quién eres, qué sabes y cómo operar (sin re-investigar lo ya aprendido).

**Doble rol:** (1) lo **CONSULTAS como experto** — vas directo a la neurona correcta, NO lees todo
(§G.1 + §G.2); (2) lo **CONSTRUYES y ALIMENTAS bajo tu juicio** (§G.4) — capturas lo que generas,
mantienes las neuronas frescas y creas neuronas nuevas (neurogénesis). **Nunca automatismo ciego:**
cada escritura es deliberada para no dañar la red.

**Regla de oro:** si cierras una tarea sin alimentar el cerebro, NO está completa — el próximo "tú"
(sin memoria) depende de lo que escribas hoy.

---

## §0 — Mapa de nodos de memoria (índice de enrutamiento)

Auto-cargas SOLO `CLAUDE.md` + `05` + `10` (§G.1); el resto se lee on-demand por trigger (§G.2).

| Nodo neuronal | Archivo | Auto-carga | Cuándo leerlo |
|---|---|---|---|
| 🧠 **Tronco Encefálico** | `CLAUDE.md` (este) | ✅ Siempre | Router + identidad + doctrinas + gobernanza. |
| 🩺 **Estado Global (signos vitales)** | `docs/05-ESTADO-GLOBAL.md` | ✅ Siempre (boot) | Snapshot de salud: qué está LIVE, cache `?v=w11-N` vigente, branch, flags de riesgo. "¿Dónde estoy parado?" antes de tocar nada. |
| ⚡ **Corto Plazo (WIP)** | `docs/10-MEMORIA-CORTO-PLAZO.md` | ✅ Siempre (2ª lectura) | Sprint actual, pendientes (TODO-NN), bitácora. (El estado técnico vive en 05.) |
| 🛰️ **Consejo Externo** | `docs/15-CONSEJO-EXTERNO.md` | ❌ on-demand | Trigger de Decisión Fuerte: antes de algo caro de revertir (arquitectura, datos, seguridad/legal, fork 50/50), pedir crítica adversarial externa (Gemini/Antigravity). |
| 🗺️ **Espacial** | `docs/20-MEMORIA-ESPACIAL.md` | ❌ on-demand | Trigger de Desorientación: dónde vive un componente, sección, flujo, asset, el handoff de diseño, arquitectura del mirror. |
| 🧪 **Procedimental (experiencia)** | `docs/30-LECCIONES.md` | ❌ on-demand | Trigger de Experiencia: ANTES de una op riesgosa/repetitiva (publicar a Pages, git add, cache-bust, GSAP). Gotchas + recetas. |
| 🗂️ **Índice sináptico** | `docs/00-INDICE.md` | ❌ on-demand | ANTES de leer el historial (offset exacto) Y para el enrutamiento semántico (síntoma → neurona). |
| 📚 **Largo Plazo** | `docs/99-HISTORIAL-ADR.md` | ❌ on-demand | Trigger de Error / detalle histórico de un §/ADR. NUNCA completo — usa offset/limit vía 00. |
| 🎯 **Lóbulos de Dominio** | `docs/40-LOBULOS-DOMINIO.md` | ❌ on-demand | Trigger 🔵: registry de dominios especializados; lóbulos hijos (`41-SEGURIDAD`, `42-LEGAL`, `43-UX`, `44-SEO`, `48-A11Y`…) nacen on-demand con contenido real. |
| 🛠️ **Skills externas** | tool Skill | ❌ on-demand | Expertise de terceros (arquitecto-software, comite-expertos, frontend-design, seo-audit, accessibility-audit, legal-colombia, publicar-web-produccion…). Consultar al disparar Trigger 🔵. |

**Hojas de detalle** (on-demand): `design_handoff_ecovoces_landing/README.md` (especificación pixel-perfect
del diseño + tokens + 18 secciones + interacciones — la fuente de verdad visual del mirror).

### 🏆 Regla de oro anti-saturación (CÓMO leer el Largo Plazo)
NUNCA leas `docs/99-HISTORIAL-ADR.md` completo. En su lugar:
1. `Read docs/00-INDICE.md` → encuentra la línea del § que buscas.
2. `Read docs/99-HISTORIAL-ADR.md offset=<línea> limit=~150` → lee SOLO ese tramo.
> ⚠️ La línea es pista, no verdad absoluta: si el tramo no arranca en el `## NN` esperado, regenera con `grep -n "^## "` o corre `npm run brain:check`.

---

## §1 — Identidad y arquitectura (exprés)

- **Marca**: **INSEMA** = la Institución Educativa (Cartagena de Indias, Colombia). **INSEMA STEREO** =
  la emisora escolar. **Ondas Verdes** = la radio del proyecto. **ECOVOCES IA** = el proyecto/laboratorio
  estrella (radio escolar + IA + cultura Maker para la sostenibilidad). Brand verde eco `#0f7a49`;
  gradiente firma `#0f7a49→#0a7ea4`; tema **Windows 11 Mica** claro.
- **Naturaleza**: **DEMO educativo**. IA, voz, cifras de impacto y contadores = **simulados a propósito**
  (metas piloto 2026, parten de cero). La sección "Honestidad técnica" lo explicita. NO presentarlos como reales.
- **Stack (DECISIÓN ADR-A · comité 2026-06-19)**: **HTML/CSS/JS vanilla SIN build** (sin framework, sin
  bundler). **Astro DESCARTADO** por incompatibilidad medida con el i18n runtime (muta-y-reconstruye el DOM)
  + grafo de scripts global (toda la landing = 1 isla). **Vite = CONDICIONAL** (no inevitable): solo si el
  dueño se compromete POR ESCRITO a mantener la GitHub Action.
- **Motion**: GSAP + ScrollTrigger **vendorizados local** (offline), `<script defer>` en orden estricto.
  Degrada con gracia: sin GSAP, el IntersectionObserver revela todo; `prefers-reduced-motion` apaga el motion.
- **i18n**: ES (default) + EN, **runtime por id** de elemento (diccionario `{es,en}`); tras togglear,
  rebuild de marquee + texto animado. Cada id debe ser **único globalmente**.
- **Hosting**: GitHub Pages **user-site** `insemastereo.github.io` → sirve en la **RAÍZ** del dominio →
  **rutas relativas, 0 paths root-absolutos, sin base-path**. Deploy = push a `main` (sin CI).
  `.nojekyll` en el commit de publicación. Repo PÚBLICO. Costo **$0** (sin dominio, sin servidor).
- **Cache**: bust manual `?v=w11-N` en assets (respuesta correcta a Pages `max-age=600` / CDN Fastly).
  La **N vigente vive SOLO en `05`** (§4). Dueño invalida con **Ctrl+Shift+R**.
- **Futuro (ADR-B)**: migrar el **LABORATORIO** (hoy en el repo `PROTOTIPO`, app-like: estado global, cero
  ESM, `onclick` inline) con el nuevo diseño → es **REESCRITURA** a estado encapsulado, NO "envoltura".
  Luego panel admin + Firebase client-side. ⚠️ **JAMÁS history-router en Pages** (deep-link = 404 DURO) →
  multi-page o hash-router. ⚠️ Firebase + **datos de MENORES** en repo público → Security Rules = única
  barrera, decidir desde el primer endpoint.

Detalle profundo de cualquier subsistema → `docs/00-INDICE.md` + tramo del historial.

---

## §2 — Protocolo de documentación (OBLIGATORIO en cada commit relevante)

**Dónde documentar**
- **WIP / tarea en curso**: Corto Plazo (`docs/10-MEMORIA-CORTO-PLAZO.md`).
- **NUEVOS ADRs**: al cerrar una tarea, se APENDEN al final del Largo Plazo (`docs/99-HISTORIAL-ADR.md`)
  + fila en `docs/00-INDICE.md`. NUNCA a este CLAUDE.md.
- **Este CLAUDE.md**: solo cuando cambia algo always-on (una doctrina, el esquema de nodos, una regla de
  gobernanza). NUNCA historial ni pendientes ni el número de cache.

**Cómo documentar (formato canónico ADR)**: encabezado `## NN. ADR-NNN — <título>` (+ cita del cliente
si reportó) y 7 puntos: **.1** causa raíz (verificada) · **.2** solución estructural · **.3** no-regresión ·
**.4** tests/verificación · **.5** anti-patterns evitados · **.6** archivos modificados/INTACTOS · **.7**
doctrina + cache bump. Si hubo deliberación: línea-ancla `Deliberación: <crudo> · <síntesis>`.

**Reglas git**
- **Claude commitea Y PUSHEA** la rama al cerrar trabajo verificado; **el dueño mergea/publica**.
- `git add` archivos específicos (**NUNCA `git add -A` / `.`** — arrastraría `Multimedia/` 58M al repo
  público para siempre). Confirmar que `Multimedia/` y `_archive/` quedan fuera.
- Footer `Co-Authored-By: Claude <noreply@anthropic.com>` + `Modelo:`. NUNCA `--amend`/`--no-verify` sin pedido.
- NUNCA commitear secrets (.env, credentials.json).

---

## §3 — Doctrinas always-on (resumen ejecutable; detalle en historial)

### 3.1 Performance
- NUNCA `transition: all` ni `* { transition }` global. NUNCA animar layout props (width/height/top/left/
  margin/padding) — solo `transform`/`opacity`. NUNCA `backdrop-filter` en grids/listas de N elementos.
- Imágenes: `loading="lazy"` + `decoding="async"` below-fold; `fetchpriority="high"` solo LCP.
- **Preloads de LCP (fix del comité, hoy ausente)**: `<link rel=preload as=font crossorigin>` de la woff2
  del H1 (Outfit 800) + `<link rel=preload as=image fetchpriority=high>` del hero (ecovox-cuerpo.webp).
- `<picture>` srcset: verifica FÍSICAMENTE que las variantes existan (el optimizer no hace upscaling).

### 3.2 HTML/CSS estable
- NUNCA renombrar IDs/clases existentes (el i18n por-id se rompe en silencio). Cambios aditivos.
- Preservar nombres de función y globals exportados (`window.LANDING_MOTION/MARQUEE`, callsites dependen).

### 3.3 Verifica, no asumas — evidencia antes de afirmar (UNIVERSAL)
- Antes de afirmar CUALQUIER hecho (código, git/remoto, config, estado, mis capacidades): cita la evidencia
  que leíste ESTE turno (archivo/comando). Si no lo verificaste → di "no verificado/creo" o ve a verificar.
- **Cita el número exacto o no lo cites** (lección fundacional: el comité corrigió "108 window.appState"
  cuando el real era `appState`=142 / `window.appState`=6, y desmintió un "riesgo del marquee" que
  `landing.css:373` ya cubría). Un riesgo inventado mina la credibilidad igual que un bug.

### 3.4 IAP — Impact Analysis Previo
Antes de CUALQUIER commit: 5 secciones → (A) archivos a modificar, (B) archivos INTACTOS (verificado),
(C) código muerto, (D) alcance del refactor, (E) riesgos + rollback + tests.

### 3.5 Sustrato y publicación (ADR-A)
- **Vanilla, sin build**. Vite **CONDICIONAL** (disparador por escrito + el dueño mantiene la Action;
  build rojo = sitio congelado, el mismo fallo que descalificó a Astro). El "script Node que ensambla los
  HTML" está PROHIBIDO suelto (mini-Astro frágil de falla silenciosa): si hay paso Node, que sea Vite con git-hook.
- **user-site en la RAÍZ → rutas relativas, 0 paths root-absolutos** (verificable). `.nojekyll` **en el
  commit de publicación** (no después). 1er deploy tarda ~10 min + 404 transitorio = **NO es fallo**.
- **Verificar en el navegador REAL local antes de cada push** (el preview no corre GSAP; `deploy=push`
  elimina staging). Construir el mirror por **bloques, commit por bloque**.

### 3.6 Seguridad y datos (ADR-B — desde el primer endpoint, no al final)
- Firebase client-side + **datos de MENORES** + repo PÚBLICO → **Security Rules = única barrera**
  (legibles por cualquiera) → reglas restrictivas por defecto + **tests de reglas** + minimizar datos de menores.
- Tensión abierta a decidir: repo privado (apaga Pages gratis en org Free) vs público (exigido por Pages gratis).
- **⚖️ Legal SIEMPRE = jurisdicción Colombia** (Habeas Data Ley 1581; datos de menores = sensibilidad máxima):
  skill `legal-colombia` + lóbulo `42-LEGAL`; NUNCA publicar contenido legal sin revisión de abogado.

### 3.7 Accesibilidad
- **`aria-live` + gestión de foco en el toggle ES/EN** (riesgo a11y REAL; un lector no anuncia el cambio de
  idioma). NO re-tocar el marquee por `prefers-reduced-motion`: ya cubierto en `landing.css:373`.
- Auditar contraste **WCAG AA** del tema Mica claro; `:focus-visible`; targets táctiles ≥44px.

### 3.8 Lente de Arquitecto (always-on; extiende §3.4 IAP)
En TODO trabajo de código piensa como **arquitecto, no solo programador**: decide por el sistema completo en
6 lentes — **negocio · escala · seguridad · costo · mantenibilidad · integración**. Modular > monolito;
diseña para el crecimiento de mañana; seguridad desde el inicio. *"El código hace que funcione; la
arquitectura hace que sobreviva."* (skill `arquitecto-software`; Decisión Fuerte → comité ×3 + ADR).

---

## §4 — Cache bump (OBLIGATORIO con cada cambio de comportamiento)
- Bumpear el query-string `?v=w11-N` de los assets afectados (CSS/JS/img). Formato `w11-N` incremental.
- **La N vigente vive SOLO en `docs/05-ESTADO-GLOBAL.md`** (el linter valida que NO se duplique aquí ni en `10`).
- Pages sirve con `max-age=600` (CDN Fastly ~10 min); el dueño invalida ya con **Ctrl+Shift+R**.
- El `?v=` desaparecería solo si se adopta Vite (content-hashing) — hoy es la respuesta CORRECTA, no inmadurez.

---

## §G — Gobernanza Neuronal (sistema nervioso · cómo operas la memoria) — VINCULANTE

### G.1 — Directiva de Ignorancia Selectiva (arranque)
Al iniciar una conversación nueva lees SOLO: (1) `CLAUDE.md`, (2) `docs/05-ESTADO-GLOBAL.md`,
(3) `docs/10-MEMORIA-CORTO-PLAZO.md`. **Imprime 2-3 líneas de signos vitales** de `05` (qué está LIVE,
cache, branch, flags). **IGNORA el resto** salvo que un trigger (§G.2) o el usuario lo pida. No leas el historial "por si acaso".

### G.2 — Triggers de Recuperación (Escalation Path)
- **🔴 Error / Saturación**: si fallas **2 veces** con el mismo bug, DETENTE y lee el Largo Plazo
  (`00` → tramo de `99`) buscando el § o un bug análogo ANTES de la 3ª solución (prohibido adivinar). Si
  detectas loops o contexto saturado: consolida `10` (con sus 🚫 callejones) y ofrece relevo de sesión.
- **🟡 Desorientación**: si dudas DÓNDE vive una sección/asset/flujo/componente → **Memoria Espacial** (`20`).
- **🧪 Experiencia**: ANTES de una op riesgosa o repetitiva (publicar a Pages, `git add`, cache-bust,
  portar GSAP, mover un bloque i18n) → **Lecciones** (`30`).
- **🟢 Historia**: si preguntan el "por qué" de una decisión o el detalle de un § → Índice → Largo Plazo.
- **🔵 Auditoría/Dominio**: si piden análisis especializado (seguridad/legal/UX/SEO/perf/a11y/copy) →
  (1) skill relevante vía tool Skill; (2) `40-LOBULOS` por lóbulo; (3) si no, neurogénesis del hijo
  (`41`,`42`,`43`,`44`,`48`…) CON contenido REAL; (4) capturar findings + QUÉ skill usé. **⚖️ Legal =
  Colombia** (Ley 1581, datos de menores; skill `legal-colombia` + `42-LEGAL`; nunca publicar sin abogado).
- **🛰️ Decisión Fuerte**: ANTES de una decisión cara de revertir (arquitectura, datos, seguridad/legal,
  fork 50/50, op irreversible) considera crítica adversarial externa (Gemini vía Antigravity: **asesora,
  NUNCA edita; YO decido+implemento**) → cuándo/modelo en `docs/15`. Captura la deliberación (§G.4).

**Enrutamiento semántico**: ante una duda, NO escanees el cerebro — ve al `docs/00-INDICE.md` (capa "síntoma → neurona").

### G.3 — Protocolo de Consolidación (sinapsis)
La memoria fluye en una sola dirección: Corto Plazo → Largo Plazo. **Regla de PROPIEDAD (SSoT)**: un hecho =
UN nodo dueño; el resto APUNTA (estado actual→`05` · dominio→lóbulo · WIP→`10` · decisión→`99`). Duplicar
estado = divergencia garantizada. Por cada tarea finalizada: actualiza `10`. Cuando se cierra del todo:
MUEVE el recuerdo a `99` como ADR `§NN` (formato §2) + fila en `00`, marca su `TODO-NN` ✅, y retíralo de `10`.

### G.4 — Sistema Autónomo de Auto-construcción (neuroplasticidad, bajo TU guía) — VINCULANTE
- **Captura**: TODO conocimiento reutilizable se escribe en su neurona ANTES de cerrar la tarea. Bug/lección
  → `30`. Cambio de arquitectura/sección → `20`. WIP → `10`. Decisión cerrada → `99` (ADR) + fila en `00`.
  **Deliberación** (comité / consejo externo / workflow, cara de reproducir) → CRUDO al `archiveDir` +
  SÍNTESIS (adoptado / refutado-y-por-qué / **callejones probados**) ANTES de cerrar.
- **Neurogénesis**: si un conocimiento reutilizable NO encaja Y crecerá, CREA `docs/NN-NOMBRE.md` y en el
  mismo acto: (1) fila en §0, (2) registro en `00`, (3) bitácora. Anti-fragmentación: si dudas, apéndalo.
  Lóbulos hijos (`41`+) nacen SOLO con contenido real de una auditoría concreta.
- **Frescura**: si mueves/creas/renombras/eliminas una sección/ruta/flujo, actualiza `20` en el MISMO cambio.
- **Higiene = GC**: `10` es pizarra (cap ~110). Al cerrar tarea, si `10` supera su cap → poda: consolida lo
  cerrado a `99`/`30`, actualiza `05`, recorta `10` al foco vivo. Nunca volcar a `99` sin convertir en ADR.
- **Auto-auditoría**: corre **`npm run brain:check`** al arrancar (tras leer `CLAUDE.md`+`05`+`10`) y antes de
  cerrar/quedar idle (barrido holístico + frescura vs git real). Que la próxima sesión herede un cerebro impecable.
- **Auto-mejora / Autocrítica / Desafío crítico**: llena vacíos; si el cerebro contribuyó a un error, nombra
  el defecto y corrígelo (+ meta-lección en `30 §Meta`); cuestiona una regla SOLO con evidencia verificable.
- **Cierre**: una tarea NO está cerrada hasta verificar: ¿`10` refleja el progreso? ¿`05` actualizado si
  cambió la salud? ¿decisión → ADR en `99` + fila en `00`? ¿lección → `30`? ¿cambio de comportamiento →
  cache `?v=` bumpeado §4? ¿`brain:check` SANO? ¿deliberación capturada (CRUDO+SÍNTESIS)?
- **Sugerencia de Skills**: si aprendes una capacidad PORTABLE (sirve en cualquier proyecto), sugiere crear
  una skill vía `skill-creator`; el cliente decide. Skill = capacidad general; neurona = conocimiento INSEMA.

**🛡️ Límite de guardián**: los reflejos ENRIQUECEN, nunca borran a la ligera. Ante la duda: **apendar, no
sobrescribir; cuarentenar en `_legacy/`, no borrar.** Proteger la red es prioritario sobre alimentarla.

### G.5 — Capacidad de neuronas y Sharding (economía de contexto)
Cada neurona tiene un TOPE BLANDO (señal, no muro; valores en `.brain-manifest.json`). Al acercarse al tope,
NO la dejes engordar: extrae una sub-categoría coherente a una neurona hermana nueva `docs/NN-NOMBRE.md`
(ej. `30`→`31-LECCIONES-GIT`, `20`→`21-ESPACIAL-LAB`). Como toda neurona nueva: fila en §0 + registro en `00`
+ puntero desde la madre. 🔗 **Nada huérfano: si una neurona existe y `CLAUDE.md` no la conoce, el cerebro está roto.**

---

## §7 — Cómo retomar (recap)
1. **Boot** (§G.1): `CLAUDE.md`+`05`+`10` + `npm run brain:check`; imprime signos vitales; pendientes → TODO-NN.
2. **Triggers** §G.2 · antes de código: IAP §3.4 · antes de commit: §2 · tras CADA tarea: §G.4 + cache §4.
3. **Entorno**: Windows + PowerShell; working dir ya en el repo (no `cd`); dueño invalida con **Ctrl+Shift+R**.
4. **Fase actual** → `10`. **Fundación** → `99` ADR-A/ADR-B. **Diseño a espejar** → `design_handoff_ecovoces_landing/README.md`.
