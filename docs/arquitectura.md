# Arquitectura — Amigos del Cielo

## Estado

**Versión:** 1.4.1  
**Service Worker:** v269

## Capas

### Datos

Los catálogos V2 de data/catalog/ contienen metadatos. Cada contenido publicado referencia su sourceFile.

### Estado

js/state/ conserva el estado de catálogo, novena actual, progreso, favoritos, preferencias y contexto de navegación.

### Servicios

js/services/ concentra carga de datos, oraciones, almacenamiento, Biblioteca y compartir.

### Renderizado

js/render/ genera la interfaz. Los componentes reutilizables viven en js/render/shared/.

Los componentes compartidos escapan el contenido textual antes de insertarlo en HTML. El HTML intencionalmente dinámico se mantiene explícito en los componentes que lo necesitan.

### Router

js/router.js centraliza las rutas y sincroniza el estado visual con la URL.

Las rutas internas utilizan el parámetro ?ruta=. Las novenas utilizan ?novena= y, cuando corresponde, ?dia=.

El router utiliza history.pushState/replaceState y escucha popstate para responder a Atrás y Adelante.

## PWA

manifest.json define la identidad instalable. service-worker.js mantiene el App Shell y las estrategias de caché.

El splash nativo depende de la selección de iconos realizada por el navegador a partir del manifest; no existe un campo estándar independiente para un icono exclusivo del splash.

## Pruebas

La validación estática se ejecuta mediante scripts/validate-data.js y scripts/validate-app.js.

La navegación, los deep links y el modo offline se prueban mediante Playwright. Las pruebas móviles automatizadas utilizan emulación Pixel 5; la validación física continúa siendo necesaria.
