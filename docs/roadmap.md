# Roadmap — Amigos del Cielo

## Dirección tecnológica permanente

**Objetivo de arquitectura a medio plazo: PWA + TWA para distribución en Google Play.**

La aplicación continuará desarrollándose como una **PWA multiplataforma**, pero todas las decisiones estructurales futuras deben preservar la posibilidad de empaquetarla posteriormente como **Trusted Web Activity (TWA)** para Android y publicarla en Google Play.

### Consigna de desarrollo
- [x] Mantener la PWA como aplicación principal.
- [ ] Preparar progresivamente la PWA para una futura TWA.
- [ ] Mantener **un solo repositorio y una sola base de código** como fuente de verdad.
- [ ] No crear una aplicación Android independiente ni duplicar la lógica de negocio.
- [ ] Cuando llegue la etapa de distribución, añadir únicamente la capa Android/TWA necesaria.
- [ ] Mantener GitHub Pages/web como canal de distribución de la PWA.
- [ ] Añadir Google Play como canal adicional, no como sustituto de la PWA.

### Requisitos que deben preservarse desde ahora
- [x] HTTPS estable.
- [x] Manifest válido.
- [x] Service Worker.
- [x] Diseño responsive y multiplataforma.
- [x] Arquitectura web independiente de Android.
- [ ] URL de producción estable para la TWA.
- [ ] Digital Asset Links (`/.well-known/assetlinks.json`).
- [ ] Identidad de aplicación Android y firma.
- [ ] Generación de Android App Bundle (AAB).
- [ ] Pruebas específicas de TWA/Android.
- [ ] Preparación de ficha y requisitos de Google Play.

> **Regla:** ninguna mejora futura debe introducir una dependencia que obligue a mantener una versión web y una versión Android separadas, salvo que exista una necesidad técnica explícita y documentada.

## Estado actual

**Versión actual: 1.5.0**

La versión 1.5.0 cierra una etapa centrada en descubrimiento, continuidad de oración y adaptación móvil.

### Arquitectura
- [x] HTML
- [x] CSS
- [x] Router
- [x] Estado
- [x] Servicios
- [x] Renderizado
- [x] Utilidades
- [x] Catálogo maestro V2
- [x] PWA

### Experiencia
- [x] Inicio
- [x] Mi Camino y amigo del cielo anual
- [x] Explorador de experiencias y virtudes
- [x] Descubrimiento variable del catálogo
- [x] Diseño responsive para pantallas móviles
- [x] Biblioteca
- [x] Catálogo
- [x] Búsqueda
- [x] Favoritos
- [x] Mi progreso
- [x] Compartir
- [x] Configuración
- [x] Temas claro/oscuro/automático
- [x] Tamaño de texto
- [x] Calendario litúrgico
- [x] Filtros por país y tema
- [x] Historia extendida

### Contenido
- [x] Más de 70 novenas publicadas
- [x] Catálogo ampliado de Santos
- [x] Catálogo de Beatos
- [x] Catálogo de María
- [x] Catálogo de Devociones
- [x] Fuentes y metadatos territoriales
- [x] Imágenes normalizadas

### PWA
- [x] Manifest
- [x] Service Worker
- [x] Caché offline
- [x] Instalación
- [x] Actualización de caché por versión

## Pendiente

### Próxima etapa
- [ ] Contexto regional efectivo en calendario y celebraciones
- [ ] Notificaciones locales o push
- [ ] Auditoría WCAG más profunda
- [ ] Optimización de imágenes y rendimiento
- [x] Pruebas automatizadas de navegación
- [x] Pruebas automatizadas offline con Service Worker
- [x] Pruebas móviles emuladas con perfil Pixel 5
- [ ] Pruebas físicas offline en Android/iOS

### Evolución
- [ ] Biblioteca espiritual
- [ ] Audio
- [ ] Lectura por voz
- [ ] Sincronización entre dispositivos
- [ ] Multiidioma

### Distribución Android — TWA / Google Play
**Plan de medio plazo; no forma parte de la implementación inmediata de V1.5.**

- [ ] Confirmar la PWA como base estable para empaquetado.
- [ ] Validar instalación y comportamiento real en Android.
- [ ] Definir URL de producción estable.
- [ ] Preparar Trusted Web Activity (TWA).
- [ ] Configurar Digital Asset Links.
- [ ] Crear la capa Android dentro del mismo repositorio.
- [ ] Configurar identidad, firma y generación de AAB.
- [ ] Probar la aplicación empaquetada frente a la PWA instalada.
- [ ] Preparar requisitos de publicación de Google Play.
- [ ] Publicar Amigos del Cielo en Google Play sin abandonar la PWA.

## Criterio de versión

La versión funcional se mantiene en APP_CONFIG.version.

La aplicación está en **1.5.0**. El Service Worker utiliza **v316** como identificador de caché. La navegación interna utiliza ?ruta= y los enlaces directos de novenas mantienen compatibilidad con ?novena=.

La versión funcional y la generación de caché son conceptos distintos: la primera identifica cambios de producto; la segunda invalida recursos del navegador.

No deben utilizarse números antiguos de cache-busting salvo que exista una razón documentada.

El splash nativo se mantiene sujeto a la selección de iconos que realiza el navegador a partir del manifest; no existe un campo estándar independiente para definir un icono exclusivo del splash.