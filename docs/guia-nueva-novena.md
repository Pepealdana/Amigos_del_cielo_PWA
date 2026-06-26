# Guía para agregar una nueva novena

Esta guía explica el proceso completo para incorporar una nueva novena a la aplicación **Amigos del Cielo**.

No es necesario modificar ningún archivo JavaScript.

---

# Paso 1

## Crear la imagen

Guardar la imagen en:

assets/images/

Ejemplo:

assets/images/santa-rita.webp

Formato recomendado:

- WebP
- Relación 4:5
- Peso menor a 250 KB
- Rostro del santo centrado
- Fondo limpio

---

# Paso 2

## Crear el archivo JSON

Dentro de:

data/

Ejemplo:

data/santa-rita.json

Tomar como plantilla:

san-jose.json

y modificar únicamente la información correspondiente.

---

# Paso 3

## Registrar la novena

Abrir

data/novenas.json

Agregar un nuevo objeto.

Ejemplo:

```json
{
    "id":"santa-rita",

    "name":"Santa Rita",

    "title":"Abogada de los casos imposibles",

    "feast":"05-22",

    "category":"Santos",

    "image":"assets/images/santa-rita.webp",

    "file":"data/santa-rita.json"
}
```

No es necesario modificar ningún otro archivo.

---

# Paso 4

## Verificar

Comprobar que:

- aparece en Biblioteca
- puede abrirse
- la imagen carga correctamente
- la historia aparece
- la novena inicia

---

# Estructura mínima

Toda novena debe contener:

- id
- name
- title
- subtitle
- feast
- image
- patronages
- virtues
- history
- openingPrayer
- closingPrayer
- days

---

# Cada día debe contener

- day
- title
- virtue
- quote
- reflection
- prayer
- action

---

# Recomendaciones

Las reflexiones deben ser originales.

No copiar textos protegidos por derechos de autor.

Las citas bíblicas pueden utilizar traducciones autorizadas.

---

# Buenas prácticas

Mantener un mismo estilo de escritura.

Utilizar un lenguaje sencillo.

Evitar párrafos excesivamente largos.

Las oraciones deben invitar al encuentro con Dios.

---

# Resultado

Una vez guardados los archivos, la aplicación reconocerá automáticamente la nueva novena.

No es necesario modificar el código JavaScript.
