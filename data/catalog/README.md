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

## Metadatos territoriales

El campo `countries` representa una asociación territorial concreta del contenido, no todos los lugares donde existe devoción.

- Un código como `CO`, `MX` o `PE` permite que el contenido aparezca al filtrar ese país.
- `AMERICA` se reserva para contenidos de alcance regional americano que no deben atribuirse automáticamente a cada país.
- El filtro de un país **no convierte `AMERICA` en coincidencia para todos los países**.
- La vista **Todos** continúa mostrando todo el catálogo.

Esto evita que un santo o una advocación de alcance universal aparezca artificialmente como una tradición propia de cada país.

Los vínculos territoriales deben incorporarse de forma conservadora: origen, patronazgo, título mariano, santuario, celebración o tradición especialmente documentada. La existencia de devoción popular en un país, por sí sola, no debe convertirlo automáticamente en una asociación territorial del registro.

