# Amigos del Cielo — Guía de desarrollo

## Estado

**Versión:** 1.4.1  
**Service Worker:** v269  
**Catálogo:** 112 registros publicados

La aplicación es una PWA estática construida con HTML, CSS, JavaScript y JSON. No requiere backend para las funciones actuales.

## Tecnologías

- HTML5
- CSS3
- JavaScript Vanilla ES6+
- JSON
- LocalStorage
- Service Worker
- GitHub Pages
- GitHub Actions
- Playwright para pruebas E2E

## Arquitectura

El flujo principal es:

Usuario → Router → Estado/Servicios → JSON → Render → Pantalla

La aplicación separa:

- datos en data/;
- estado en js/state/;
- servicios en js/services/;
- utilidades en js/utils/;
- renderizado en js/render/;
- navegación en js/router.js.

## Navegación

El router utiliza URLs internas mediante el parámetro ?ruta= y conserva compatibilidad con ?novena=.

Ejemplos:

- ?ruta=biblioteca
- ?ruta=santos
- ?ruta=portada&novena=san-jose
- ?ruta=dia&novena=san-jose&dia=2

El router sincroniza estas URLs con el historial del navegador mediante History API y responde a Atrás/Adelante.

## Cómo ejecutar

Puede utilizarse un servidor estático local:

python3 -m http.server 4173

o GitHub Pages.

## Validaciones

- node scripts/validate-data.js
- node scripts/validate-app.js
- npm run test:e2e

Las pruebas E2E requieren Playwright y Chromium.

## Service Worker

Toda modificación que afecte código de aplicación, estilos, datos, recursos o comportamiento PWA debe incrementar CACHE_NAME en service-worker.js.

La versión vigente es v269.

## Pruebas móviles

La suite E2E incluye Chromium de escritorio y perfil emulado Pixel 5. La prueba física de Android/iOS sigue siendo manual y está documentada en docs/PRUEBAS-MOVILES.md.
