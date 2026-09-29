# Pruebas móviles y offline — V1.4.1

## Qué queda automatizado

El proyecto incorpora pruebas E2E con Playwright para:

- navegación con URL interna;
- botón Atrás y Adelante del navegador;
- deep link directo a una novena y a un día concreto;
- carga mediante Service Worker;
- recarga sin conexión después de preparar el App Shell;
- ejecución con Chromium de escritorio;
- ejecución con el perfil emulado Pixel 5.

La prueba Pixel 5 es una emulación de navegador móvil. No equivale a una prueba física en un teléfono Android.

## Qué requiere una prueba física

Antes de cerrar una publicación de PWA debe comprobarse manualmente, al menos en un dispositivo Android real:

1. Abrir la aplicación instalada.
2. Confirmar que el icono y la pantalla de inicio nativa corresponden al manifest.
3. Abrir Biblioteca → Santos → una novena.
4. Avanzar de día y volver atrás.
5. Pulsar el botón físico o del sistema para volver y avanzar.
6. Cerrar y volver a abrir la aplicación.
7. Activar modo avión o desactivar datos/Wi-Fi.
8. Abrir una novena previamente visitada.
9. Navegar entre días sin conexión.
10. Confirmar que el progreso permanece guardado.
11. Volver a activar la conexión y comprobar que la nueva versión del Service Worker se instala.
12. Repetir la comprobación después de actualizar la PWA instalada.

## Limitación del splash nativo

Chrome genera la pantalla de presentación móvil a partir de los campos name, background_color e icons del manifest y selecciona un icono apropiado para la resolución del dispositivo. El estándar no proporciona un campo independiente para indicar «icono del launcher» frente a «icono exclusivo del splash».

Por ello, V1.4.1 mantiene:

- isotipo de 192 × 192 como icono general;
- isotipo de 512 × 512 como icono maskable;
- logo horizontal de 512 × 512 como recurso adicional any.

Esto evita cambiar el icono adaptativo de Android únicamente para intentar forzar un splash horizontal. El comportamiento exacto del splash debe verificarse en el dispositivo después de instalar o reinstalar la PWA.

## Criterio

No se considera «prueba Android física superada» por una emulación. La evidencia física debe registrarse como parte de la validación previa a una publicación estable.
