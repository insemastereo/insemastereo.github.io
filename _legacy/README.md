# 🗄️ _legacy — Cuarentena reversible

> Zona de cuarentena del cerebro neuronal. Aquí se conserva (NO se borra) lo que
> se reemplaza durante upgrades/migraciones, por si hay que rescatar información
> no migrada. Límite de guardián (`CLAUDE.md §G.4`): **cuarentenar antes que borrar**.

| Archivo | Qué es | Fecha | Motivo |
|---|---|---|---|
| `LECCIONES-MIGRADAS-MAESTRO.md` | Cuerpo íntegro de las 3 lecciones mudadas al **cerebro maestro** (F2 lote 3): `L-04` (`preview_screenshot` se cuelga), `L-05` (push 403 / credential helper) y `M-01` (cita el número exacto). | 2026-09-01 | **NO es código muerto**: es el **punto de retorno** del lote. La copia consultable vive en `brain-private/maestro/lecciones/migradas/INSE/`; aquí queda el original byte a byte para que el ABORT lo reconstruya **sin `git checkout`**. Los titulares siguen en `docs/30-LECCIONES.md` (es la tabla de resolución del kernel). |

> Esta carpeta nace con el lote 3 y la ignora el chequeo #27 del kernel (`SKIP_DIR`), igual que en
> los repos hermanos: lo cuarentenado no es el presente, y acusarlo de rutas viejas sería ruido.
