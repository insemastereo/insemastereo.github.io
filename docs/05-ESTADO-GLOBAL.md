# 🩺 05 — ESTADO GLOBAL (Heartbeat · Snapshot de salud)

> **Nodo: signos vitales.** AUTO-CARGA (con `CLAUDE.md` + `10`). Tablero, no bitácora: solo señales
> ACTUALES (pisar, no apilar); lo histórico → `99` (ADR). Tope ~25 líneas / ~4k chars (§G.5).

| Señal | Valor (última actualización: **2026-06-19**) |
|---|---|
| **Build** | 🧠 **Cerebro instalado** (`CLAUDE.md` + 8 nodos + kernel byte-idéntico + manifest). 🚧 **Landing (mirror) AÚN NO construida** — Fase 3 pendiente. Laboratorio = futuro (ADR-B). |
| **LIVE / publicado** | ❌ Nada público todavía. `https://insemastereo.github.io/` se activa al primer push + Settings>Pages (1er deploy ~10 min + 404 transitorio = normal, NO es fallo; L-01). |
| **Cache vigente** | **N/A** — se fija `?v=w11-N` al primer build del mirror (la N vivirá SOLO aquí, ADR-A §4 · L-02). |
| **Branch / git** | Local `main` (git init 2026-06-19); remoto `origin`=github.com/insemastereo/insemastereo.github.io **declarado, sin push**. Remoto VACÍO → push limpio sin reconciliación. Verificado vs git 2026-06-19 (§3.3). |
| **Sustrato** | **Vanilla sin build** (ADR-A · comité ×3). Astro descartado. Vite CONDICIONAL (Action por escrito). |

## ⚠️ Flags de riesgo activos
- 🤖 **Modelo: Opus 4.8** (entregas marcadas `Modelo: Opus 4.8`).
- 🔒 **ADR-B (futuro)**: Firebase client-side + datos de MENORES en repo público → Security Rules = única barrera (decidir desde el primer endpoint). Tensión repo público (Pages gratis) vs privado.
- 📋 **Decisiones del dueño pendientes**: SEO bilingüe real vs toggle runtime (TODO-05) · 2ª opinión externa Gemini sobre el sustrato (opcional; comité ya con confianza alta, TODO-06).
- 🧹 Pre-publicación (L-01): `.nojekyll` en el commit · `git add` SELECTIVO · `Multimedia/` gitignored (✅ ya).

## 🧩 Sub-sistemas
cerebro ✅ · kernel byte-idéntico ×4 ✅ · landing mirror 🚧 (Fase 3) · laboratorio (ADR-B) 🔮 · publicación 🔮
