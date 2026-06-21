# 🎯 40 — LÓBULOS DE DOMINIO (registry de áreas especializadas)

> **Nodo: registry.** Mapa de los lóbulos donde el cerebro crece cuando se pide análisis especializado
> (Trigger 🔵 §G.2). NO contiene los análisis — es el ÍNDICE de los hijos (`41-SEGURIDAD`, etc.) que nacen
> on-demand con contenido REAL (§G.4 Neurogénesis: nada de archivos vacíos por anticipado). Al nacer un hijo:
> fila aquí + registro en `00` + actualizar estado 🟢→🟠.

## 🗂️ Categorías esperadas
| ID | Lóbulo | Disparador (cliente dice…) | Estado | Cubre |
|---|---|---|---|---|
| **41** | Seguridad | "audita seguridad", "Firebase rules", "datos de menores" | 🟢 vacío | Security Rules como única barrera (ADR-B), repo público, minimizar datos de menores, tests de reglas, authorized domains. |
| **42** | Legal/Compliance | "audita legal", "privacidad", "Habeas Data", "menores", "consentimiento" | 🟢 vacío | Ley 1581 (datos personales/menores), términos, consentimiento de acudientes. Skill `legal-colombia`, gate abogado. |
| **43** | UX/Diseño | "audita UX", "interfaz", "jerarquía visual" | 🟢 vacío | Fidelidad al handoff, dock/hero-snap, patrones de interfaz. Skill `frontend-design`. |
| **44** | SEO | "audita SEO", "ranking", "indexación", "bilingüe" | 🟢 vacío | canonical real, sitemap, metadatos, hreflang (TODO-05), JSON-LD EducationalOrganization. |
| **45** | Performance | "audita performance", "Core Web Vitals", "LCP/CLS" | 🟢 vacío | preloads, LCP del hero, peso de imágenes/video, móviles de gama baja (Cartagena). |
| **48** | Accesibilidad | "audita a11y", "WCAG", "teclado", "lector de pantalla" | 🟢 vacío | `aria-live` + foco en el toggle ES/EN, contraste WCAG AA del tema Mica, targets ≥44px. |

La numeración 41+ está reservada para lóbulos de dominio. No reutilizar.

## 🛠️ Recursos Externos (skills)
`skills/` + tool Skill = **expertise general de terceros** (NO es neurona; recurso paralelo). **Catálogo → `docs/skills-inventory.md`** (79 carpetas, set canónico ×4 incl. `caza-bugs`). Al disparar
Trigger 🔵, revisar la lista de skills disponibles (system reminders del arranque) y elegir la del dominio.
Relevantes para este proyecto: `arquitecto-software`, `comite-expertos`, `frontend-design`, `seo-audit`,
`accessibility-audit`, `legal-colombia`, `publicar-web-produccion`, `auditoria-cerebro`, `skill-creator`.
