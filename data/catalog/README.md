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

## Modelo territorial v2.1

La dimensión territorial **contextualiza y no limita la devoción**. Un santo o una advocación no pertenece exclusivamente a un país por aparecer asociado a él.

Cada registro de Santos, María y Devociones utiliza:

- `territorial.origin`: lugar o país de nacimiento/origen histórico de la persona, o lugar de origen documentado de la tradición o advocación. **No debe confundirse con nacionalidad cultural, lugar de residencia posterior o lugar donde se veneran sus reliquias.**
- `territorial.historicalLinks`: países donde la vida, misión, muerte, obra, institución fundada, santuario o culto histórico del contenido tenga un vínculo relevante y documentado.
- `territorial.specialDevotion`: países donde exista una relación devocional especialmente arraigada y documentable. Una devoción popular aislada no basta.

Los campos pueden contener códigos ISO de países que no forman parte del filtro hispanohablante; por ejemplo, el origen histórico de un santo puede estar fuera de Hispanoamérica.

El filtro por país consulta las tres relaciones territoriales. Por tanto, **Colombia** significa «contenidos con algún vínculo territorial registrado con Colombia», no «santos colombianos».

La vista **Todos** continúa mostrando el catálogo completo. Una persona puede tener devoción por cualquier santo o advocación independientemente de su país de origen o de los vínculos territoriales registrados.

Los vínculos territoriales deben incorporarse de forma conservadora y documentable. No se debe convertir automáticamente la popularidad de una devoción en una relación territorial sin fundamento.

### Compatibilidad

El campo antiguo `countries` queda eliminado del modelo v2.1. No debe volver a utilizarse para expresar pertenencia o exclusividad territorial.



## Navegación y búsqueda del catálogo

La navegación principal conserva cinco accesos:

- **Todos**: concentra todo el contenido publicado.
- **Santos**: santos canonizados, con filtros temáticos cuando los registros los tengan.
- **María**: advocaciones marianas, con filtro territorial.
- **Novenas**: contenidos de oración de nueve días.
- **Devociones**: devociones y expresiones de piedad que no son fichas de santos ni advocaciones.

Los grupos temáticos son etiquetas no excluyentes. Un santo puede pertenecer a varios grupos. Se contemplan, entre otros:

- `devocion-extendida`
- `latinoamericanos`
- `martires`
- `doctores`
- `fundadores`
- `jovenes`
- `franciscanos`
- `apostoles`

La interfaz solo muestra los grupos que existen en los datos de la sección activa.

La búsqueda del catálogo consulta nombre, título, descripción, `tags` y `searchTerms`. Puede combinarse con el filtro territorial y con un grupo temático.

Los filtros son acumulativos: **texto + país + grupo**. La clasificación principal de un registro (`santos`, `maria`, `devociones`) no se sustituye por los grupos.

## Nueva ampliación de Santos

La versión 2.2 registra como `pending` las nuevas novenas de la fase de ampliación. Se incorporan 19 candidatos:

- San Juan Pablo II
- San Maximiliano María Kolbe
- Santa Mónica
- Santa Bernardita Soubirous
- Santa Clara de Asís
- San Chárbel Makhlouf
- Santa Marta de Betania
- Santa Teresa de Calcuta
- San Francisco Javier
- San Luis Gonzaga
- Santa Lucía de Siracusa
- Santa Cecilia
- Santa Bárbara
- San Roque
- San Pancracio
- San Patricio
- San Pedro Apóstol
- San Pablo Apóstol
- Santiago Apóstol

**San Miguel Arcángel no se incorpora como santo canonizado**, porque pertenece a la categoría de los santos Ángeles. Su contenido ya puede mantenerse en la devoción de los Santos Arcángeles.
