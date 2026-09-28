# Acompañamiento espiritual en Biblioteca

## Objetivo

Permitir que una persona llegue a santos, beatos, advocaciones, novenas o devociones a partir de una situación que está viviendo o de una virtud que desea cultivar.

La función no debe presentar a un santo como una garantía de obtener un resultado. Debe ofrecerlo como **compañero de oración, ejemplo de vida cristiana e intercesor**, cuando exista una relación documentada.

## Distinción de datos

### 1. Patronazgo

Usar `patronages` únicamente cuando exista una base histórica, litúrgica, eclesial o devocional claramente identificable.

### 2. Situaciones e intenciones

Usar `interventions` para describir situaciones en las que la vida, ministerio o tradición devocional de una figura puede resultar especialmente significativa.

Una intervención puede basarse en:
- experiencia biográfica;
- misión o ministerio;
- patronazgo documentado;
- devoción tradicional claramente identificada.

No debe convertirse automáticamente en un patronazgo formal.

### 3. Virtudes

Usar `virtues` para las virtudes que pueden contemplarse e imitarse a partir de la vida del santo.

## Taxonomía inicial

### Situaciones e intenciones

- `salud` — Salud, enfermedad y cuidado de los enfermos
- `familia` — Familia, matrimonio, hijos y seres queridos
- `trabajo` — Trabajo, empleo y sustento
- `estudios` — Estudios, conocimiento y búsqueda de la verdad
- `vocacion` — Vocación, discernimiento y decisiones importantes
- `dificultades` — Pruebas, adversidad y momentos difíciles
- `esperanza` — Esperanza ante incertidumbre, pérdida o desánimo
- `fe` — Fe, conversión y vida espiritual
- `oracion` — Oración, contemplación y vida interior
- `familiares` — Orar por la conversión o necesidades de otra persona
- `servicio` — Servicio, caridad y ayuda al prójimo
- `juventud` — Jóvenes, adolescentes y formación
- `paz` — Paz, reconciliación y conflictos
- `necesidades-urgentes` — Situaciones urgentes y decisiones que requieren serenidad
- `mision` — Evangelización, misión y testimonio
- `persecucion` — Fidelidad en medio de oposición o persecución
- `sufrimiento` — Dolor, duelo y sufrimiento
- `pobres` — Pobreza, necesidades materiales y solidaridad

### Virtudes

- `fe`
- `esperanza`
- `caridad`
- `fortaleza`
- `prudencia`
- `justicia`
- `templanza`
- `humildad`
- `obediencia`
- `paciencia`
- `perseverancia`
- `confianza`
- `oracion`
- `discernimiento`
- `generosidad`
- `compasion`
- `misericordia`
- `servicio`
- `fidelidad`
- `sencillez`
- `pureza`
- `alegria`
- `valentia`
- `sabiduria`

## Experiencia de usuario prevista

Biblioteca podrá presentar:

### ¿Qué estás viviendo?

La persona selecciona una situación o intención.

### ¿Qué virtud quieres cultivar?

La persona selecciona una virtud.

### Resultados

Cada resultado deberá explicar brevemente **por qué aparece**, por ejemplo:

> San José — Su vida ofrece un ejemplo de trabajo, responsabilidad, obediencia, cuidado de la familia y confianza en Dios.

Acciones:
- **Conocer su historia**
- **Conocer sus virtudes**
- **Ver su novena**, si existe
- **Ver contenido relacionado**

## Regla editorial

No utilizar expresiones como:

- "este santo te conseguirá trabajo";
- "este santo cura enfermedades";
- "reza esta novena y obtendrás X";
- "este es el santo que necesitas".

Preferir:

- "puede acompañarte en tu oración";
- "su vida puede inspirarte";
- "es una figura especialmente vinculada a...";
- "puedes conocer cómo vivió esta situación";
- "esta novena puede ayudarte a dedicar un tiempo de oración por esta intención".

## Proceso de construcción

1. Auditar las 63 fichas actuales de santos.
2. Revisar `virtues` e `interventions` existentes.
3. Normalizar etiquetas hacia esta taxonomía.
4. Verificar cada asociación con fuentes fiables.
5. Separar claramente patronazgos formales, tradición devocional y relaciones biográficas.
6. Completar los santos que actualmente no tengan suficiente información.
7. Repetir el proceso para beatos y, posteriormente, contenidos marianos/devocionales.
8. Construir el motor de recomendaciones de Biblioteca.
9. Diseñar la interfaz y probar búsquedas representativas.
10. Auditar resultados para evitar asociaciones arbitrarias o promesas espirituales.

## Principio de fondo

La función debe responder a:

> **"Estoy viviendo esto. ¿Qué amigo del cielo puedo conocer y qué puedo aprender de su camino?"**

No a:

> **"¿Qué santo me va a solucionar esto?"**

## Referencias doctrinales de base

- Catecismo de la Iglesia Católica, virtudes humanas y teologales:
  https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_7.html
- Catecismo de la Iglesia Católica, comunión de los santos:
  https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_9.html


## Estado de implementación — 1.3.4

La primera versión funcional ya está integrada en Biblioteca.

- Se incorporó el selector de **situaciones/intenciones**.
- Se incorporó el selector de **virtudes**.
- Las relaciones se calculan usando los campos existentes de las fichas: `interventions`, `virtues`, `patronages`, `search`, `searchTerms`, `tags`, título y descripción.
- La carga de contenido completo es diferida hasta que el usuario solicita una relación.
- Los resultados indican si la relación procede principalmente de la vida/misión, de una tradición devocional o de las virtudes.
- Si el contenido tiene días de novena, el resultado ofrece **Ver novena**; de lo contrario, ofrece **Conocerlo**.
- El buscador general de Biblioteca también considera las virtudes.

La siguiente etapa editorial será revisar las relaciones con fuentes una por una y ajustar los casos que requieran una relación más precisa.
