# Catálogo v2 — Amigos del Cielo

El catálogo v2 separa la navegación y los datos en cuatro áreas:

- **Santos**: santos canonizados.
- **María**: advocaciones marianas. Una advocación es una forma de veneración de la misma Virgen María; no se contabiliza como una persona distinta.
- **Novenas**: contenido de oración de nueve días, actualmente respaldado por `data/novenas.json`.
- **Devociones**: otras devociones y celebraciones.

## Estados

- `published`: existe contenido navegable en la aplicación.
- `pending`: está planificado, pero todavía no se debe abrir como contenido publicado.
- `alta`: prioridad de incorporación, no valoración religiosa.

## Beatos

No se amplía la categoría de beatos en esta etapa. Se conserva únicamente **Beata Clara Fey** como excepción histórica del proyecto.

## Regla de María

No duplicar una advocación por país. Los países relacionados viven en el campo `countries`; una sola ficha puede estar asociada a varios países.
