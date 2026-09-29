# Matriz técnica — V1.5

**Proyecto:** Amigos del Cielo  
**Versión objetivo:** 1.5  
**Estado:** arquitectura técnica definida para implementación incremental  
**Base:** estado real del repositorio al iniciar V1.5

## 1. Principio técnico

V1.5 no requiere reescribir la aplicación.

La base actual ya separa:
- `js/app.js`
- `js/router.js`
- `js/state/state.js`
- `js/services/`
- `js/utils/`
- `js/render/`
- componentes compartidos bajo `js/render/shared/`
- catálogos bajo `data/catalog/`

La estrategia es **reforzar responsabilidades y reutilización**, manteniendo compatibilidad con la aplicación existente.

## 2. Arquitectura objetivo

Flujo:

**UI → Router → Estado/Servicios → Datos → Render**

Reglas:
- Los renderizadores no deben conocer detalles de LocalStorage.
- Los servicios no deben generar HTML de presentación.
- Los datos de catálogo siguen siendo la fuente de metadatos en runtime.
- Las acciones de usuario pasan por servicios/estado cuando modifican persistencia.
- Las rutas existentes deben mantenerse compatibles.

## 3. Estado y persistencia

Mantener:
- `js/state/state.js`
- `js/services/storage.js`
- claves existentes de LocalStorage.

Auditar y documentar semántica de:
- `PROGRESS`
- `FAVORITES`
- `SETTINGS`
- `INTENTIONS`
- `ANNUAL_PATRON`

Separar conceptualmente:
- **PROGRESS:** días de novena realmente rezados.
- **SAVED/FAVORITES:** contenido que el usuario guarda explícitamente.
- **PREFERENCES:** configuración.
- **CAMINO:** composición de información derivada para la vista «Mi camino».

No renombrar claves sin migración.

## 4. Servicio de progreso

Crear:

`js/services/progressService.js`

Responsabilidades propuestas:
- `obtenerProgreso()`
- `marcarDiaRezado()`
- `desmarcarDia()`
- `obtenerDiaContinuacion()`
- `reiniciarNovena()`
- `obtenerNovenasEnCurso()`
- `obtenerNovenasTerminadas()`

El servicio debe ser la única capa de dominio que gestione el progreso de novenas.

El renderizador no debe llamar directamente a LocalStorage para progreso.

## 5. Búsqueda

Crear:

`js/services/searchService.js`

Normalizar resultados a una forma común:

```js
{
  id,
  type,
  title,
  subtitle,
  image,
  action: {
    type,
    target
  }
}
```

Tipos:
- `saint`
- `blessed`
- `maria`
- `devotion`
- `novena`
- `prayer`

La búsqueda debe normalizar acentos y mayúsculas/minúsculas y admitir coincidencias parciales.

No duplicar índices de búsqueda innecesarios si pueden derivarse del catálogo y servicios existentes.

## 6. Componentes compartidos

La implementación debe reutilizar primero los componentes ya existentes en:

`js/render/shared/`

No crear una segunda jerarquía de componentes paralela sin necesidad.

Componentes que pueden evolucionar o crearse cuando exista reutilización real:
- Button.
- Card.
- Chip.
- Modal.
- Oracion.
- SaintCard.
- NovenaCard.
- ContentCard.
- ProgressCard.
- SearchBox.
- EmptyState.
- ErrorState.
- LoadingState.
- SectionHeader.
- Icon.

La prioridad es **comportamiento y consistencia**, no fragmentar archivos.

## 7. Inicio

Archivo principal:
`js/render/home/inicio.js`

Refactorizar para componer:
- Santo del día.
- Progreso/continuación.
- búsqueda.
- exploración.

Eliminar duplicación con Biblioteca.

No implementar esta pantalla antes de cerrar las dependencias de Biblioteca y búsqueda.

## 8. Biblioteca

Archivos:
- `js/render/home/biblioteca.js`
- `js/services/bibliotecaService.js`

Cambios:
- eliminar conteos como contenido principal.
- reducir duplicación de Santo del día.
- convertir las rutas editoriales en contenido breve.
- incorporar intenciones/virtudes como descubrimiento.
- conservar búsqueda.
- reutilizar componentes comunes.
- estados vacíos y de progreso solo cuando correspondan.

La Biblioteca debe seguir siendo una pantalla editorial, no un dashboard.

## 9. Santos y Beatos

Crear o consolidar:

`js/render/santos/santos.js`

y una ficha reutilizable:

`js/render/santo/ficha.js`

La arquitectura de ficha debe admitir:
- `type: "saint"`
- `type: "blessed"`

La presentación debe distinguir «Santo» y «Beato/Beata».

No duplicar la lógica completa de fichas para cada categoría.

## 10. María

Usar:
- `data/catalog/maria.json`
- `dataService`

Crear/ajustar vista de advocaciones y ficha específica.

No convertir las advocaciones en registros de santos.

## 11. Devociones

Usar:
- `data/catalog/devociones.json`

Crear/ajustar ficha de devoción.

La Divina Misericordia mantiene relación con su novena especial sin forzar el modelo de santo.

## 12. Oraciones

Mantener:
- `data/oraciones.json`
- `js/services/oracionesService.js`
- `js/render/novena/oraciones.js`

Añadir vista independiente de oración cuando corresponda.

No duplicar textos comunes en los JSON de novenas.

## 13. Novenas

Mantener la familia:
- `js/render/novena/portada.js`
- `js/render/novena/dia.js`
- `js/render/novena/oraciones.js`
- `js/render/novena/componentes.js`

Separar progresivamente:
- cabecera.
- progreso.
- contenido del día.
- acción «Marcar día como rezado».
- navegación.
- acciones secundarias.

El render no debe modificar persistencia directamente.

Las novenas especiales deben poder declarar estructuras distintas.

## 14. Mi camino

Consolidar:

`js/render/home/camino.js`

y derivar su información desde servicios.

Secciones:
- Novenas activas.
- Novenas completadas.
- Santos guardados.
- Virtudes guardadas, si existen.

No añadir métricas de gamificación.

Auditar primero la semántica actual de `FAVORITES` antes de separar o migrar almacenamiento.

## 15. Router

Mantener `js/router.js`.

Rutas a soportar:
- `?ruta=santos`
- `?ruta=camino`
- `?ruta=maria`
- `?ruta=devociones`
- `?ruta=oraciones`

Compatibilidad obligatoria:
- `?ruta=`
- `?novena=`
- `?dia=`

No incorporar un framework.

El historial debe conservar contexto de navegación.

## 16. Menú y accesibilidad

Centralizar progresivamente comportamiento de navegación si actualmente está repartido.

Debe conservar:
- focus trap.
- Escape.
- `aria-expanded`.
- foco inicial.
- retorno del foco al elemento disparador.
- navegación por teclado.

No añadir navegación inferior en paralelo.

## 17. Ajustes

Mantener `js/render/home/configuracion.js`.

Preferencias:
- `theme: auto | light | dark`
- `textSize`
- `reducedMotion`

No romper claves existentes.

El tema automático debe seguir la preferencia del sistema solo cuando el usuario haya seleccionado «Automático».

## 18. Seguridad de renderizado

Regla obligatoria:

**datos → normalización → escape → HTML**

Mantener y reforzar `escaparHTML()`.

No insertar datos externos o de catálogo directamente en `innerHTML` sin escape.

Los componentes compartidos deben respetar esta regla.

## 19. Sistema visual

No reescribir todo CSS.

Introducir progresivamente tokens:
- colores.
- superficies.
- texto.
- muted.
- radios.
- espaciado.
- foco.
- transición.

Archivos principales actuales:
- `css/style.css`
- `css/01-base.css`
- `css/02-layout.css`
- `css/03-components.css`
- `css/04-utilities.css`
- `css/05-themes.css`
- `css/06-pwa.css`

La migración debe ser incremental y reversible.

## 20. Iconografía

Unificar iconos mediante una capa SVG/componente cuando sea necesario.

Evitar dispersar caracteres Unicode decorativos como lenguaje visual.

No incorporar una dependencia externa si una solución SVG local mantiene mejor el carácter de PWA estática y reduce complejidad.

## 21. PWA y caché

El Service Worker actual es **v269**.

Toda PR que cambie:
- JS.
- CSS.
- HTML.
- JSON.
- imágenes.
- manifest.
- comportamiento PWA.

debe incrementar `CACHE_NAME`.

La documentación de desarrollo exige mantener esta regla.

## 22. Catálogo y datos

Mantener `data/catalog/` como fuente canónica de metadatos de runtime.

No fusionar:
- `santos.json`
- `beatos.json`
- `maria.json`
- `devociones.json`

en un único archivo solo por conveniencia.

`sourceFile` debe seguir apuntando al JSON de contenido real.

Las validaciones existentes deben ejecutarse después de cambios de datos.

## 23. Documentación

V1.5 incorpora:
- `docs/matriz-ux-v1.5.md`
- `docs/matriz-tecnica-v1.5.md`

La documentación operativa actual debe seguir reflejando:
- versión.
- Service Worker.
- arquitectura real.
- comandos de validación.

Las matrices son documentos de diseño y no deben sustituir a README-DEV ni RELEASE.

## 24. Secuencia de PR

### PR-A — Arquitectura base
Objetivo: preparar la base sin rediseño visual.

Incluye:
1. Auditar semántica de estado y persistencia.
2. Crear `progressService.js`.
3. Crear `searchService.js`.
4. Normalizar estado derivado.
5. Consolidar pequeñas utilidades/componentes reutilizables.
6. Revisar responsabilidades de renderizadores.
7. Limpiar router sin cambiar URLs compatibles.
8. Preparar pruebas unitarias/funcionales de los servicios nuevos.
9. Incrementar Service Worker por los archivos nuevos/modificados.
10. Mantener comportamiento visual esencial de V1.4.1.

No incluye:
- rediseño completo de Inicio.
- rediseño completo de Biblioteca.
- migración masiva de carpetas.
- cambio de framework.
- nueva navegación inferior.

### PR-B — Sistema visual
- tokens CSS.
- tipografía.
- espaciado.
- superficies.
- botones.
- tarjetas.
- chips.
- iconografía.
- dark mode.
- responsive.

### PR-C — Inicio + Biblioteca
Implementar la matriz UX sobre la base estabilizada.

### PR-D — Santos + Beatos + María + Devociones
Unificar fichas y experiencias.

### PR-E — Novenas
Refinar progreso, lectura, navegación y acciones.

### PR-F — Mi camino
Separar claramente progreso, guardados y preferencias.

### PR-G — Búsqueda + navegación
Búsqueda global y navegación contextual.

### PR-H — Ajustes + PWA + accesibilidad
Completar preferencias, instalación, compartir, estados y auditoría de accesibilidad.

### PR-I — Auditoría V1.5
Validación funcional, datos, E2E, Lighthouse, offline, responsive, accesibilidad y regresión.

## 25. Criterio de aceptación técnico de PR-A

PR-A estará terminado cuando:

- [ ] El progreso de novenas tenga una única capa de servicio.
- [ ] Abrir un día no marque progreso.
- [ ] La continuación se pueda calcular de forma determinista.
- [ ] La búsqueda pueda devolver tipos normalizados.
- [ ] Los renderizadores no dependan directamente de LocalStorage para estas funciones.
- [ ] Las rutas actuales sigan funcionando.
- [ ] No se rompa la carga offline.
- [ ] No se dupliquen fuentes de catálogo.
- [ ] Las nuevas responsabilidades tengan validaciones.
- [ ] El Service Worker tenga caché coherente con los cambios.
- [ ] La documentación siga alineada con el repositorio.
