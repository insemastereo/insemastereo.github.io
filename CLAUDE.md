# CLAUDE.md — insemastereo · 🌉 PUENTE (este repo es el SITIO, no el cerebro)

## Tu cerebro NO está aquí

Este repo es **solo el sitio** (ECOVOCES IA · INSEMA STEREO). Tu memoria vive en
`../brain-private/insemastereo/`: `CLAUDE.md` (el router), `docs/05-ESTADO-GLOBAL.md`,
`docs/10-MEMORIA-CORTO-PLAZO.md` y las demás.

Los tres primeros entran **ENTEROS** por los imports de abajo (desde el 17-nov-2026). El hook de arranque
añade los avisos vivos y no los repite; su eco llega **cortado** si pasa de 10.000 c: no te fíes de él para
el router, el `05` ni el `10`. **Si no los ves en tu contexto, falta el permiso de imports externos de esta
carpeta: LÉELOS POR RUTA antes de tocar nada** y avísale a Daniel. Aquí no hay memoria que valga.

@../brain-private/insemastereo/CLAUDE.md
@../brain-private/insemastereo/docs/05-ESTADO-GLOBAL.md
@../brain-private/insemastereo/docs/10-MEMORIA-CORTO-PLAZO.md

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
