# Convenciones del proyecto

Este documento reúne las reglas generales utilizadas durante el desarrollo de **Amigos del Cielo**.

Su objetivo es mantener un proyecto uniforme y fácil de mantener.

---

# 1. Idioma

Todo el código utiliza:

Inglés

Ejemplos:

renderCard()

renderBadge()

openMenu()

closeMenu()

Los textos visibles para el usuario permanecen en español.

---

# 2. Archivos

Los nombres siempre estarán en:

kebab-case

Ejemplos:

san-jose.json

santa-rita.json

service-worker.js

date-utils.js

---

# 3. Variables

camelCase

Ejemplos

currentDay

currentNovena

catalogoNovenas

openingPrayer

---

# 4. Constantes

MAYÚSCULAS

Ejemplo

MAX_FAVORITES

DEFAULT_IMAGE

DEFAULT_COLOR

---

# 5. IDs

Todos los identificadores deben ser únicos.

Ejemplos

san-jose

santa-rita

san-francisco

virgen-del-carmen

Nunca utilizar espacios.

---

# 6. Fechas

Formato

MM-DD

Ejemplos

01-01

03-19

05-22

10-07

Esto permite ordenar automáticamente las festividades.

---

# 7. Imágenes

Formato:

WebP

Resolución recomendada:

800 × 1000 px

Peso recomendado:

menos de 250 KB

Relación:

4:5

---

# 8. Categorías

Valores permitidos

Santos

Virgen María

Jesús

Espíritu Santo

Adviento

Navidad

Cuaresma

Pascua

Devociones

Otros

---

# 9. Organización del código

Nunca colocar HTML directamente dentro de app.js.

Todo el HTML pertenece a:

render/

---

Toda la lógica pertenece a:

services/

state/

utils/

---

# 10. Componentes

Todo elemento reutilizable debe vivir en

render/shared/

Ejemplos

Card

Button

Badge

Loader

Modal

Divider

---

# 11. JSON

Nunca escribir código JavaScript.

Solo datos.

---

# 12. CSS

Utilizar variables definidas en

:root

Evitar colores escritos directamente.

Correcto

var(--color-primary)

Incorrecto

#2C4A6B

---

# 13. Accesibilidad

Todas las imágenes deben incluir:

alt

Todos los botones deben tener un texto claro.

Evitar depender únicamente del color para transmitir información.

---

# 14. Rendimiento

Evitar imágenes pesadas.

Evitar duplicar información.

Reutilizar componentes siempre que sea posible.

---

# 15. Escalabilidad

Cada nueva funcionalidad debe cumplir estas reglas:

- No modificar código existente si puede extenderse.
- Favorecer componentes reutilizables.
- Separar datos, lógica y presentación.
- Mantener funciones pequeñas y con una sola responsabilidad.

---

# 16. Filosofía del proyecto

Amigos del Cielo busca ser una aplicación:

- Gratuita.
- Clara.
- Fácil de mantener.
- Escalable.
- Accesible.
- Funcional sin conexión.
- Centrada en la oración y el crecimiento espiritual.

Cada decisión técnica debe apoyar estos principios.
