# 🛰️ 15 — CONSEJO EXTERNO (red team multi-modelo · Gemini/Antigravity)

> **Nodo: protocolo operativo.** CUÁNDO y CÓMO pedir crítica adversarial a un modelo externo (Gemini vía
> Antigravity, si el dueño lo tiene) antes de una Decisión Fuerte. No se auto-carga; su existencia está
> flagueada en `CLAUDE.md §0/§G.2` para que cada arranque sepa que existe.

## §1 — Qué es y por qué
Una segunda opinión de OTRA familia de modelos atrapa puntos ciegos que Claude no ve (diversidad de sesgos).
**Humano en el medio**: yo marco la decisión → el dueño corre el prompt → me pega la respuesta → la evalúo
como peer review (adopto lo correcto, refuto con razones). **Asesora, NUNCA edita; YO decido + implemento.**

## §2 — Cuándo SÍ / cuándo NO
**SÍ** (vale la fricción + tokens): arquitectura/datos cara de revertir · fork 50/50 · operación irreversible ·
seguridad/legal (datos de menores, Firebase rules) · incertidumbre que quiera un desempate.
**NO**: trabajo rutinario/reversible · trabajo que el comité interno (automático) ya cubre · cuando los tokens estén bajos.
(Vía Antigravity, Gemini SÍ ve el repo/cerebro local solo-lectura → PUEDE revisar código real; aun así verifico YO sus afirmaciones, §3.3.)

## §3 — Anti-anclaje
En decisiones TOP, el prompt al externo NO incluye mi postura (que critique desde cero) y es autocontenido
— vía Antigravity el modelo SÍ ve el repo/cerebro local (solo-lectura), así que el prompt **apunta a rutas/archivos reales** (no se pega el código a mano).

## §4 — Estado / bitácora de consultas
- **2026-06-19 · Sustrato del proyecto** (Decisión Fuerte): resuelta por **comité interno ×3** (`comite-expertos`,
  confianza ALTA, verificada vs código real → ADR-A/ADR-B en `99`). 2ª opinión externa Gemini = **OFRECIDA y
  OPCIONAL** (el dueño decide; TODO-06). Si se corre: integrarla como un peer review más, nunca como oráculo.
