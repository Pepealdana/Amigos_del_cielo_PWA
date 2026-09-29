# Documentación de publicación — Amigos del Cielo

## Estado actual

- Versión de aplicación: **1.4.1**
- Service Worker: **v267**
- Tipo: Progressive Web App (PWA)
- Plataforma: GitHub Pages
- Idioma principal: español
- Backend: no requerido para las funciones actuales

## Verificaciones automatizadas

Se mantienen automatizaciones para validación de JSON, sintaxis JavaScript, rutas, imágenes, recursos del Service Worker, acciones y rutas interactivas, CodeQL, Lighthouse CI y GitHub Pages.

V1.4.1 añade además pruebas E2E con Playwright para navegación, deep links, historial Atrás/Adelante, Service Worker y funcionamiento offline. El perfil Pixel 5 representa una emulación móvil de Chromium; no sustituye una prueba física.

## Verificaciones manuales pendientes

Antes de una publicación estable debe comprobarse en un dispositivo Android real, y cuando sea posible también en iOS:

1. instalación y apertura de la PWA;
2. icono y pantalla de inicio nativa;
3. navegación principal;
4. Atrás/Adelante;
5. apertura y continuación de una novena;
6. progreso;
7. funcionamiento sin conexión;
8. actualización del Service Worker después de una nueva publicación.

El procedimiento completo está en docs/PRUEBAS-MOVILES.md.

## Splash nativo

Chrome genera la pantalla de presentación a partir de name, background_color e icons del manifest y selecciona un icono según el dispositivo. La aplicación mantiene el isotipo como icono adaptativo y el logo horizontal como recurso adicional.

No se utiliza un splash HTML porque aparecería también durante recargas y no equivale al splash nativo de la PWA.

## Criterio de publicación

Una publicación estable requiere validaciones automáticas en verde, GitHub Pages desplegado con el commit esperado, documentación alineada con la versión y Service Worker incrementado cuando cambia código, estilos, datos, recursos o comportamiento PWA.

Las referencias a versiones anteriores se conservan como historial en CHANGELOG.md. La documentación operativa actual no debe reutilizar valores históricos como estado vigente.