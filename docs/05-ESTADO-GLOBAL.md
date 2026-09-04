# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico → `99` (ADR). El tope REAL lo fija el BOOT (§G.5). **Última actualización: 2026-09-04.**

| Señal | Valor (re-verificado vs git real: **2026-08-01**, auditoría Nivel-2 §4) |
|---|---|
| **Build** | 🧠 Cerebro ✅. 🎨 **Mirror de la landing CONSTRUIDO y VERIFICADO** en navegador real: 18 secciones · GSAP corriendo · i18n ES↔EN · **0 errores de consola** · fuentes self-hosted (Outfit 800 + Plus Jakarta Sans) · assets cargan · hero video `readyState=4`. Laboratorio = futuro (ADR-B). 🎬 **`ecovoces-ia.html`** (presentación del proyecto en video, YouTube embed) AÑADIDA y verificada 2026-06-20. |
| **LIVE / publicado** | ✅ **AL AIRE** en `https://insemastereo.github.io/` (`verificado-vivo: 2026-08-27`: H1 "La radio que enciende el cambio" + INSEMA STEREO/ECOVOCES/Ondas Verdes; assets `src/` sirviendo). GitHub Pages activo desde `main` /root. Repo en GitHub Desktop (altorracars). **+ `/ecovoces-ia.html`** (video del proyecto, enlace de entrega al docente) 2026-06-20. |
| **Cache vigente** | **`w11-2`** (bump 2026-06-20: `landing2.i18n.js` +clave `footer-feat-d`; `ecovoces-ia.html` enlaza `tokens.css?v=w11-2`). Vive SOLO aquí (SSoT). Bump en cada cambio de comportamiento (§4 · L-02). |
| **Branch / git** | ⚙️ **No se escribe a mano — lo GENERA el heartbeat** → `docs/.estado-auto.md` (rama, HEAD, sucios). Un dato volátil copiado aquí se desincroniza siempre (N2-01). Lo estable desde 2026-09-04: **Claude commitea, pushea y MERGEA `main`** (orden nº 2 del C0); medido, 12/12 de los últimos commits fueron directos a `main`. Kernel → su stamp `scripts/.kernel-version.json`. |
| **Sustrato** | **Vanilla sin build** (ADR-A · comité ×3). Astro descartado. Vite CONDICIONAL. |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo: Fable 5 planifica/audita · Opus 5 implementa** (desde 2026-07-24). Los ⟦OPUS-4.8⟧ históricos NO se reescriben.
- 🔒 **ADR-B (futuro)**: Firebase client-side + datos de MENORES en repo público → Security Rules = única barrera. Tensión repo público vs privado.
- 📋 **Decisiones del dueño**: SEO bilingüe (TODO-05; default adoptado = toggle runtime, fuera de alcance del demo) · 2ª opinión Gemini (TODO-06, opcional).
- ✅ **Verificación del mirror (2026-06-19)**: corrige un supuesto del comité — el preview de Claude **SÍ corre GSAP**; lo que se cuelga es `preview_screenshot` (→ L-04).
- ⏸️ **PAUSA (dueño 2026-06-19)**: demo AL AIRE estable; **NO cambiar proactivamente**. Retomar = demo→real (streaming/auth/chat/video, `99` ADR-B §8) + laboratorio; el dueño avisará.

## 🧩 Sub-sistemas
cerebro ✅ · kernel ×4 ✅ · **landing mirror ✅ AL AIRE** · laboratorio (ADR-B) 🔮 ← siguiente capítulo
