# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico → `99` (ADR). Tope ~25 líneas / ~4k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-19**) |
|---|---|
| **Build** | 🧠 Cerebro ✅. 🎨 **Mirror de la landing CONSTRUIDO y VERIFICADO** en navegador real: 18 secciones · GSAP corriendo · i18n ES↔EN · **0 errores de consola** · fuentes self-hosted (Outfit 800 + Plus Jakarta Sans) · assets cargan · hero video `readyState=4`. Laboratorio = futuro (ADR-B). |
| **LIVE / publicado** | ✅ **AL AIRE** en `https://insemastereo.github.io/` (verificado 2026-06-19: H1 "La radio que enciende el cambio" + INSEMA STEREO/ECOVOCES/Ondas Verdes; assets `src/` sirviendo). GitHub Pages activo desde `main` /root. Repo en GitHub Desktop (altorracars). |
| **Cache vigente** | **`w11-1`** (primer build del mirror). Vive SOLO aquí (SSoT). Bump en cada cambio de comportamiento (§4 · L-02). |
| **Branch / git** | Local `main` == `origin/main` (**pusheado ✓** 2026-06-19, 3 commits). `altorracars` = colaborador del repo. Verificado vs git real (§3.3). |
| **Sustrato** | **Vanilla sin build** (ADR-A · comité ×3). Astro descartado. Vite CONDICIONAL. |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo: Opus 4.8**.
- 🔒 **ADR-B (futuro)**: Firebase client-side + datos de MENORES en repo público → Security Rules = única barrera. Tensión repo público vs privado.
- 📋 **Decisiones del dueño**: SEO bilingüe (TODO-05; default adoptado = toggle runtime, fuera de alcance del demo) · 2ª opinión Gemini (TODO-06, opcional).
- ✅ **Verificación del mirror (2026-06-19)**: corrige un supuesto del comité — el preview de Claude **SÍ corre GSAP**; lo que se cuelga es `preview_screenshot` (→ L-04).

## 🧩 Sub-sistemas
cerebro ✅ · kernel ×4 ✅ · **landing mirror ✅ AL AIRE** · laboratorio (ADR-B) 🔮 ← siguiente capítulo
