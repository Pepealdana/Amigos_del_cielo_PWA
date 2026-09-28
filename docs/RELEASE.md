# Documentación de publicación — Amigos del Cielo

## Estado actual

- Versión de aplicación: **1.3.6**
- Service Worker: **v229**
- Tipo: Progressive Web App (PWA)
- Plataforma: GitHub Pages
- Idioma principal: español
- Backend: no requerido para las funciones actuales

## Verificaciones completadas

La rama principal cuenta con automatizaciones para:
- validación de JSON y estructura de datos;
- validación de sintaxis JavaScript;
- comprobación de rutas, imágenes y recursos locales;
- revisión de acciones y rutas interactivas;
- análisis de seguridad mediante CodeQL;
- auditoría mediante Lighthouse CI;
- despliegue mediante GitHub Pages.

Además de las comprobaciones automáticas, se realizó una prueba funcional manual de las principales áreas de la aplicación, incluyendo navegación, Biblioteca, catálogo, novenas, favoritos, progreso, configuración, compartir y funcionamiento sin conexión.

## Documentación del proyecto

- `README.md`: descripción general, arquitectura, alcance, seguridad, contenido y roadmap.
- `CHANGELOG.md`: historial de versiones y cambios.
- `SECURITY.md`: procedimiento para reportar vulnerabilidades.
- `.github/workflows/validate-data.yml`: validación de integridad.
- `.github/workflows/codeql.yml`: análisis de seguridad.
- `.github/workflows/lighthouse.yml`: auditorías de calidad web.
- `.github/dependabot.yml`: actualización de GitHub Actions.
- `.lighthouserc.js`: configuración de Lighthouse CI.

## Antes de la publicación pública

1. Revisar y, si corresponde, fusionar los Pull Requests de Dependabot pendientes.
2. Confirmar que los workflows de la rama principal terminan correctamente.
3. Confirmar que GitHub Pages publica el commit destinado a la versión 1.3.6.
4. Crear una etiqueta/release `v1.3.6`.
5. Verificar la URL pública desde un dispositivo móvil.
6. Comprobar instalación de la PWA en al menos un navegador compatible.
7. Hacer una última prueba de navegación y de modo offline después del despliegue.
8. Preparar una presentación pública con nombre, logotipo, propósito, funciones, capturas, enlace de la aplicación, instrucciones de instalación y, si se desea, enlace al repositorio.

## Después de publicar

La siguiente fase debe centrarse en observar el uso real y registrar errores funcionales, problemas de instalación, contenidos que deban corregirse, dificultades de navegación, accesibilidad, tiempos de carga percibidos y solicitudes de nuevas novenas, santos, beatos, advocaciones o devociones.

Las nuevas funciones deben priorizarse después de recopilar evidencia de uso, evitando introducir cambios grandes inmediatamente antes de una publicación estable.

## Licencia

Actualmente el repositorio no declara una licencia de software abierta. Hasta que se publique una licencia explícita, no debe asumirse que el código, contenido o recursos gráficos pueden reutilizarse libremente.

## Criterio de cierre de la versión 1.3.6

La versión se considera técnicamente preparada para publicación cuando las validaciones automáticas están en verde, GitHub Pages está correcto, no existen incidencias funcionales conocidas de alta prioridad, la documentación corresponde con la versión desplegada y la etiqueta/release identifica claramente la versión publicada.