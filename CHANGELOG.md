## [1.4.1] — Endurecimiento, navegación y pruebas

- Se endurecen componentes compartidos de renderizado para escapar datos textuales antes de insertarlos en HTML.
- Se eliminan handlers JavaScript inline de los botones compartidos; las acciones utilizan atributos declarativos.
- Se elimina la duplicación de renderOracion() en el renderizador específico de novenas y queda como fuente única el componente compartido.
- Se elimina la configuración APP_CONFIG.storage obsoleta; el almacenamiento real continúa centralizado en STORAGE_KEYS.
- El router sincroniza las rutas internas con la URL mediante ?ruta= y conserva compatibilidad con ?novena=.
- Se incorpora historial Atrás/Adelante mediante History API y popstate.
- Se admiten deep links directos a portada, historia y días de una novena.
- Se incorporan pruebas E2E de navegación, deep links y offline con Service Worker.
- Se añade emulación móvil Pixel 5 a la suite automatizada.
- Se documenta la prueba física Android/iOS como validación complementaria.
- Se actualiza la documentación operativa y se marcan como históricos los documentos de estabilización 1.3.6.
- Service Worker actualizado a **v269**.
- Versión de aplicación: **1.4.1**.

## [1.3.6] — Cierre de estabilización y preparación para publicación

- Se completa la revisión de experiencia de usuario iniciada sobre Biblioteca, Catálogo, novenas, Mi Camino, Favoritos y Mi progreso.
- Se consolidan las rutas de retorno contextual de las novenas y la jerarquía de acciones principales y secundarias.
- Se revisan estados de carga, vacío y error, procurando que los fallos visibles indiquen qué ocurrió y qué acción de recuperación está disponible.
- Se mejora la accesibilidad de modales, menú lateral, buscadores, estados de carga y explorador de Biblioteca.
- Se refuerza la navegación mediante teclado, el manejo del foco y el soporte de la preferencia de reducción de movimiento.
- Se mantiene la configuración de tema claro/oscuro y tamaño de texto como parte de la experiencia accesible.
- Se corrigen y sincronizan versiones de recursos para evitar que el Service Worker conserve archivos incompatibles después de las mejoras.
- El Service Worker queda actualizado a **v230**.
- Se mantiene la versión de aplicación en **1.3.6**.
- La siguiente versión se definirá a partir de la interacción y retroalimentación de usuarios reales; no se fija todavía un alcance cerrado para 1.4.

## [1.3.3] — Rediseño de Biblioteca

- Biblioteca deja de funcionar como un segundo catálogo de santos.
- Nuevo enfoque de Biblioteca espiritual: oración, descubrimiento, continuidad y calendario.
- Nueva sección dinámica “Para hoy” con el santo del día cuando existe en el catálogo.
- Accesos diferenciados a Novenas, Devociones, María y Conocer santos.
- Nueva sección de continuidad para retomar una novena en curso.
- Nueva sección “Próximamente” basada en las celebraciones próximas del catálogo.
- El buscador de Biblioteca pasa a mostrar resultados bajo demanda, sin repetir todo el catálogo al entrar.
- Se conserva Santos como espacio especializado de exploración del catálogo.
- Versión de aplicación: 1.3.3.
- Caché del Service Worker: v223.

## [1.3.2] — Navegación y Mi camino

- Simplificación del menú lateral mediante grupos: Inicio, Explorar, Mi camino, Comunidad y Aplicación.
- Nueva navegación inferior: Inicio, Santos, Biblioteca y Mi camino.
- Las rutas secundarias de Biblioteca y Mi camino mantienen su contexto activo en la navegación inferior.
- Nuevo espacio **Mi camino** para reunir favoritos, progreso y el amigo del cielo del año.
- Nuevo sorteo anual de un santo entre los santos publicados del catálogo.
- El santo recibido queda guardado localmente por año y no se vuelve a sortear durante ese mismo año.
- Se incorpora una breve oración al Espíritu Santo antes del sorteo.
- La experiencia se presenta como una adaptación de la tradición de recibir un patrono especial para el año, documentada en el Diario de Santa Faustina y promovida actualmente por Faustinum.
- Versión de aplicación: 1.3.2.
- Caché del Service Worker: v221.

# Historial de cambios — Amigos del Cielo

## [1.3.1] — Cierre técnico posterior a auditoría

- Los catálogos V2 pasan a ser la única fuente de metadatos del catálogo en tiempo de ejecución.
- Los ocho registros de Beatos incorporan `sourceFile` explícito.
- Service Worker actualizado a `v214`.
- Se incorpora `santo-domingo-savio.json` al caché offline.
- Se centraliza la versión de aplicación en `APP_CONFIG.version`.
- Los recursos del HTML utilizan `?v=214`.
- El progreso distingue entre días visitados y novena completada.
- Se incorpora focus trap para modales, menú lateral y panel de filtros.
- Se actualiza la documentación y el roadmap.
- `data/novenas.json` queda como registro histórico y deja de participar en la carga del catálogo.


## [1.3.0] — Estabilización y auditoría integral
- Integración de las 35 rutas de imagen que faltaban en los catálogos V2 y en sus fichas JSON, usando los nombres físicos definitivos de `assets/images/santos/`.
- Verificación de las 35 rutas contra los archivos físicos del repositorio.
- Eliminación de la relación de fecha móvil de Nuestra Señora del Rocío al no utilizarla para el cálculo automático del calendario.
- Service Worker actualizado a `amigos-del-cielo-v198` para invalidar las versiones anteriores de los datos.

- Auditoría de estructura, catálogo, navegación, filtros y lógica de carga.
- Verificación de los recursos precargados del Service Worker.
- Verificación de integración entre catálogo legado y catálogos V2.
- Corrección de la navegación inferior móvil: cuatro opciones distribuidas en cuatro columnas.
- Corrección del buscador para mostrar un marcador cuando un contenido no tiene imagen.
- Consolidación de la versión interna de la aplicación en 1.3.0.
- Revisión de tema claro, tema oscuro, tipografía, estados de foco y comportamiento responsive.
- Integración completa de las imágenes de la colección ampliada de la versión 1.3.0.
- Verificación de coincidencia entre nombres físicos, rutas de datos y Service Worker.
- La pasada global de recursos visuales queda cerrada para esta versión.

## [1.1.0] — Contenido

### Novenas y fichas
- Revisión estructural de las 43 novenas publicadas.
- Verificación de que las novenas contienen nueve días secuenciales.
- Revisión de historias, fuentes, festividades, patronazgos y virtudes.
- Compleción de las virtudes de Santo Tomás de Aquino.
- Se mantienen sin patronazgos artificiales las devociones o entidades para las que ese concepto no corresponde propiamente.

### Citas
- Revisión de las citas mostradas como textuales.
- Retiro de formulaciones devocionales o tradicionales que no debían presentarse como citas directas de San Martín de Porres, San Camilo de Lelis y San Expedito.
- Clasificación explícita de la cita bíblica de Mateo 6,33 en la ficha de San Cayetano.
- Mejora de la atribución de citas en la interfaz.
- Criterio editorial: una frase solo se presenta como cita textual cuando existe respaldo documental suficiente.

### Calendario litúrgico
- Revisión de los grados litúrgicos incluidos en el catálogo.
- Incorporación de datos propios del Calendario Litúrgico de Colombia cuando corresponde.
- San Pedro Claver y Santa Laura Montoya quedan identificados como memorias obligatorias en Colombia.
- San José y San Juan Bautista quedan identificados como solemnidades.

### Técnica
- Actualización de la versión de la aplicación a 1.1.0.
- Conservación de la arquitectura PWA y del contenido original de Amigos del Cielo.

## [1.0.0]

Primera versión estable de Amigos del Cielo.


## V1.2.0 — Internacionalización hispanohablante

Inicio de la transición de Amigos del Cielo hacia una aplicación católica dirigida a personas de habla española, sin limitarse a Colombia.

- Se separa idioma español de región o país.
- Se incorpora selección de país o región hispanohablante en Configuración.
- Se documenta la hoja de ruta hacia un catálogo de santos, beatos y advocaciones marianas de Hispanoamérica y España.
- Se mantiene la distinción entre información universal de la Iglesia e información propia de un contexto local.
- Se prepara el catálogo futuro para una ampliación regional antes de incorporar otros idiomas.
## [1.3.0] — Incorporación del Señor de los Milagros del Perú

- Incorporación de la novena original del Señor de los Milagros del Perú.
- Fecha de celebración: 28 de octubre, Solemnidad.
- Territorialidad: Perú (PE).
- Integración en el catálogo de devociones, catálogo legado y Service Worker.
- Cinco fuentes oficiales del Arzobispado de Lima utilizadas para documentar contexto histórico y devocional.
- Nueve días completos con reflexiones, intenciones, oración y acción originales.
- Imagen pendiente de la pasada global de recursos visuales.


## [1.3.0] — Incorporación de dos devociones marianas

- Incorporación de la novena original a Nuestra Señora del Perpetuo Socorro.
- Fiesta devocional: 27 de junio.
- Incorporación de la novena original a Nuestra Señora de la Dulce Espera.
- Fecha devocional: 18 de diciembre, señalada como fecha tradicional y no como solemnidad universal.
- Integración de ambas advocaciones en el catálogo mariano y el registro legado.
- Inclusión de ambas novenas en el Service Worker, cache v196.
- Integración de las imágenes `virgen_del_perpetuo_socorro.webp` y `virgen_de_la_dulce_espera.webp`.
- Corrección de la ubicación de las imágenes nuevas: `assets/icons/santos/` → `assets/images/santos/`.
- Normalización de la imagen de Chiquinquirá a `virgen_de_chiquinquira.webp` y eliminación del duplicado `virgen_de_copacabana (1).webp`.
- Cierre de la pasada global de recursos visuales de la versión 1.3.0.
