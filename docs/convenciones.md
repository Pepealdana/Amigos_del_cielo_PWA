# Convenciones del proyecto

## 1. Idioma

Los nombres de funciones, variables y archivos existentes siguen una convención mixta heredada. Las nuevas modificaciones deben mantener el idioma y estilo del módulo que amplían, evitando renombrados masivos sin necesidad.

Los textos visibles para el usuario permanecen en español.

## 2. Archivos

Usar kebab-case para nuevos archivos, salvo archivos existentes cuya compatibilidad deba conservarse.

## 3. Variables

Usar camelCase.

## 4. Constantes

Usar MAYÚSCULAS para constantes globales.

## 5. IDs

Los identificadores de contenido deben ser únicos y no contener espacios.

## 6. Separación de responsabilidades

- HTML estructural en index.html.
- Lógica de aplicación en js/app.js, js/router.js y servicios/estado.
- Presentación dinámica en js/render/.
- Datos en JSON.
- Estilos en css/.

## 7. Renderizado seguro

Todo dato procedente de catálogos, JSON, estado o entrada de usuario debe escapar antes de insertarse como texto HTML.

No usar interpolación de datos para ejecutar JavaScript inline. Las acciones de interacción deben utilizar data-action y atributos de datos.

Los componentes compartidos deben mantener este contrato de seguridad.

## 8. CSS

Priorizar variables definidas en :root y evitar colores arbitrarios cuando ya existe una variable equivalente.

## 9. Accesibilidad

Las imágenes deben incluir alt apropiado. Los botones deben tener nombres claros. No depender únicamente del color.

## 10. Service Worker

Toda modificación que afecte código, estilos, datos, recursos o comportamiento PWA debe incrementar CACHE_NAME.

## 11. Pruebas

Los cambios de navegación o PWA deben incluir o actualizar una prueba E2E cuando sea razonable.

La prueba física móvil no se considera sustituida por emulación.
