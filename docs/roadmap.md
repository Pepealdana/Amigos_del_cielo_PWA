# Roadmap — Amigos del Cielo

## Estado actual

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

## Criterio de versión

La versión funcional se mantiene en APP_CONFIG.version.

La aplicación está en **1.4.1**. El Service Worker utiliza **v270** como identificador de caché. La navegación interna utiliza ?ruta= y los enlaces directos de novenas mantienen compatibilidad con ?novena=.

La versión funcional y la generación de caché son conceptos distintos: la primera identifica cambios de producto; la segunda invalida recursos del navegador.

No deben utilizarse números antiguos de cache-busting salvo que exista una razón documentada.

El splash nativo se mantiene sujeto a la selección de iconos que realiza el navegador a partir del manifest; no existe un campo estándar independiente para definir un icono exclusivo del splash.
