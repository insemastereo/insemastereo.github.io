# Guía de merge — tres ramas, en este orden

Orden **probado el 1-sep-2026** simulando los tres merges en un clon de usar y tirar:

1. `seguridad/escaner-secretos` — entra sola, *fast-forward*, sin rozar nada más.
2. `f2/lote-inse` — entra limpia detrás (lote 3 del cerebro maestro + kernel v1.29 + las 14 skills al día).
3. `cerebro/sello-verificado-vivo` — **esta da 2 conflictos**, los únicos de toda la secuencia.

## El conflicto: 2 ficheros, y los dos son el kernel

`scripts/brain-check.mjs` y `scripts/.kernel-version.json`. Es la misma cosa vista dos veces: la rama
del sello trae el kernel **v1.26** y la del lote lo trae **v1.29**. **Gana la más nueva.** En cada
bloque quédate con la parte de arriba (`HEAD`, la 1.29.0) y borra la de abajo — o, sin tocar
marcadores a mano, que es exactamente lo mismo:

```
git checkout --ours scripts/brain-check.mjs scripts/.kernel-version.json
git add scripts/brain-check.mjs scripts/.kernel-version.json && git commit
```

Comprobado: así los dos quedan **byte a byte iguales al kernel canónico v1.29** de la bóveda, sin
mezclas raras. Al terminar, corre `npm run brain:check`.

## Lo que NO va a pasar, aunque se avisó de lo contrario

Se anunció un conflicto en `docs/30-LECCIONES.md` (el `M-09` de la rama del sello va justo detrás del
`M-01` que el lote convierte en stub). **No ocurre**: git lo mezcla solo y quedan **los dos**. La
única skill que tocan las dos ramas (`auditoria-cerebro`) también se mezcla sola y queda correcta.

## Si algo se ve raro

Conflicto en cualquier otro fichero, o `docs/30-LECCIONES.md` con marcadores: **no lo resuelvas y no
mergees — avísame.** Querría decir que alguna rama se movió después del 1-sep y esta guía caducó.
Abortar es gratis: `git merge --abort`.
