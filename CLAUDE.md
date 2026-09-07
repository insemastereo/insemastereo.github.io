# CLAUDE.md — insemastereo · 🌉 PUENTE (este repo es el SITIO, no el cerebro)

## Tu cerebro NO está aquí

Este repo es **solo el sitio** (ECOVOCES IA · INSEMA STEREO). Tu memoria vive en
`../brain-private/insemastereo/`: `CLAUDE.md` (el router), `docs/05-ESTADO-GLOBAL.md`,
`docs/10-MEMORIA-CORTO-PLAZO.md` y las demás.

El hook de arranque te los **imprime enteros** (busca «EL CEREBRO DE ESTE PROYECTO VIVE EN OTRA
CARPETA»). **Si no los ves, el hook falló: LÉELOS POR RUTA antes de tocar nada** — router, `05`, `10`.
Aquí no hay memoria que valga.

## Dónde se commitea qué

- Cerebro (`docs/`, router, ADRs) → **en la bóveda** `../brain-private/`; su pre-commit corre el linter
  sobre esa carpeta. Aquí no hay linter.
- Sitio (`src/`, HTML, workflows) → **aquí**. Nunca los dos en el mismo commit.

## Reglas de oro DE ESTE SITIO

- User-site en la RAÍZ (`insemastereo.github.io`, sin CNAME): **rutas relativas, 0 root-absolutas**.
  Deploy = push a `main`. Cache: bump `?v=w11-N`; la N vigente vive en el `05` del cerebro.
- **NO borres `_config.yml`** ni vuelvas a poner `.nojekyll`: Jekyll está activo a propósito con
  `exclude` (E-00) para no servir este fichero ni tooling.
- `git add` específico, jamás `-A` (`Multimedia/` y `_archive/` NO entran). **NUNCA** `--amend`,
  `--no-verify` ni push forzado. **JAMÁS** secretos: repo PÚBLICO (`secretos.yml` lo escanea en CI).

*(Puente F8 · el kernel vive en `../brain-private/kernel/`; lo llaman los hooks de `.claude/settings.json`.)*
