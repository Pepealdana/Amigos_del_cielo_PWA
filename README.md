# Amigos del Cielo

**Camina junto a los santos cada día.**

Amigos del Cielo es una aplicación web progresiva (PWA) católica, en español, orientada a la oración, el conocimiento de los santos y beatos, las advocaciones marianas, las devociones y el acompañamiento del camino espiritual personal.

La aplicación busca presentar a los santos como personas reales que recorrieron un camino de fe: algunos comenzaron su entrega a Dios desde muy jóvenes; otros vivieron procesos de conversión; otros encontraron a Cristo en medio de la vida cotidiana, el sufrimiento, las dificultades o las responsabilidades de su época.

> La aplicación no pretende presentar a los santos como personas perfectas desde el comienzo, sino como testimonios de una vida orientada hacia Cristo.

## Objetivo

El objetivo de Amigos del Cielo es reunir en una sola herramienta digital contenidos de oración y formación católica que normalmente se encuentran dispersos entre páginas web, documentos y aplicaciones diferentes.

La aplicación está diseñada para:

- facilitar la oración de novenas;
- acompañar el progreso de una novena día a día;
- permitir conocer la vida, celebración, patronazgos y virtudes de santos y beatos;
- descubrir advocaciones marianas y devociones;
- ayudar a encontrar testimonios relacionados con una situación o una virtud que el usuario quiera cultivar;
- conservar favoritos y progreso de manera local;
- ofrecer una experiencia instalable como aplicación en dispositivos compatibles;
- funcionar parcialmente sin conexión gracias a su arquitectura PWA y Service Worker.

## Alcance actual

**Versión actual: 1.5.0**

La versión 1.5.0 consolida la experiencia de descubrimiento y continuidad: Mi Camino, exploración por virtudes e intenciones, descubrimiento variable del catálogo y adaptación responsive para pantallas móviles.

La versión actual integra:

- Biblioteca espiritual.
- Catálogo de santos.
- Catálogo de beatos.
- Catálogo de María y advocaciones marianas.
- Catálogo de devociones.
- Novenas de nueve días.
- Historias y fichas biográficas.
- Patronazgos y virtudes.
- Búsqueda y exploración.
- Favoritos.
- Mi Camino.
- Seguimiento del progreso de novenas.
- Mi amigo del año.
- Configuración de tema claro/oscuro y tamaño de texto.
- Compartir contenidos y la aplicación.
- Instalación como PWA.
- Soporte de funcionamiento offline mediante Service Worker.
- Sistema central de oraciones comunes mediante `data/oraciones.json`.
- Oraciones comunes compartidas entre las novenas mediante `prayerStructure`.
- Soporte de estructuras especiales para Divina Misericordia y Espíritu Santo.
- Selección de contexto regional hispanohablante como base para la expansión del catálogo.
- URLs internas con deep links mediante ?ruta=.
- Historial Atrás/Adelante integrado con el router.
- Pruebas E2E de navegación, deep links y offline en escritorio y Android emulado.

## Arquitectura

Amigos del Cielo utiliza una arquitectura web estática y modular.

No requiere un servidor backend propio ni una base de datos remota para las funciones principales.

### Tecnologías

- HTML5
- CSS3
- JavaScript
- JSON
- Progressive Web App (PWA)
- Service Worker
- Web Storage / localStorage
- GitHub Pages
- GitHub Actions
- CodeQL
- Dependabot
- Lighthouse CI

Se mantiene deliberadamente una arquitectura sencilla para reducir dependencias, facilitar el mantenimiento y permitir que la aplicación sea desplegada como sitio estático.

## Estructura del repositorio

```text
Amigos_del_cielo_PWA/
│
├── index.html
├── manifest.json
├── service-worker.js
│
├── assets/
│   ├── icons/
│   └── images/
│       └── santos/
│
├── css/
│   ├── style.css
│   ├── 01-base.css
│   ├── 02-layout.css
│   ├── 03-components.css
│   ├── 04-utilities.css
│   ├── 05-themes.css
│   ├── 06-pwa.css
│   ├── 07-design-system-v15.css
│   └── 08-visual-v15.css
│
├── data/
│   ├── catalog/
│   │   ├── santos.json
│   │   ├── beatos.json
│   │   ├── maria.json
│   │   ├── devociones.json
│   │   └── paises.json
│   │
│   └── *.json
│       └── contenidos detallados de santos,
│           beatos, advocaciones, devociones y novenas
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── config/
│   ├── state/
│   ├── services/
│   ├── utils/
│   └── render/
│       ├── home/
│       ├── novena/
│       └── shared/
│
├── scripts/
│   ├── validate-data.js
│   └── validate-app.js
│
├── docs/
│
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       ├── validate-data.yml
│       ├── codeql.yml
│       └── lighthouse.yml
│
├── .lighthouserc.js
├── CHANGELOG.md
├── SECURITY.md
└── README.md
```

## Cómo funciona

### 1. Catálogos

Los archivos de `data/catalog/` contienen los metadatos utilizados para construir el catálogo.

Cada contenido publicado utiliza un identificador y una referencia `sourceFile` hacia su archivo detallado.

Esto permite separar:

- información necesaria para listar y buscar;
- contenido completo que se carga cuando el usuario lo necesita.

### Catálogo actual

La versión 1.5.0 contiene **112 registros publicados**:

- 63 santos.
- 8 beatos.
- 34 advocaciones marianas.
- 7 devociones.

Los 112 registros cuentan con `sourceFile` y estructura de oración configurada.

La distribución de estructuras de oración es:

- 105 `standard-novena`.
- 1 `divine-mercy`.
- 1 `holy-spirit`.
- 5 `devotion-novena`.

### 2. Contenido detallado

Los archivos JSON de `data/` contienen el contenido de cada santo, beato, advocación o devoción.

Las novenas incluyen sus días y elementos de oración correspondientes.

### 3. Estado de la aplicación

El estado se mantiene en módulos JavaScript y el almacenamiento local conserva información específica del usuario, como:

- favoritos;
- progreso de novenas;
- preferencias;
- configuraciones;
- santo elegido como amigo del año.

Los datos personales de uso no requieren una cuenta para las funciones actuales.

### 4. Navegación

`router.js` centraliza las rutas principales de la aplicación.

Entre ellas:

- Inicio
- Biblioteca
- Santos
- Beatos
- María
- Novenas
- Devociones
- Favoritos
- Mi Camino
- Progreso
- Configuración
- Participa
- Acerca de

### 5. Sistema central de oraciones

Las oraciones comunes se mantienen en `data/oraciones.json` para evitar duplicación de contenido entre las novenas.

El servicio `js/services/oracionesService.js` permite cargar y resolver las oraciones por identificador. Las novenas indican mediante `prayerStructure.closingPrayers` qué oraciones comunes utilizan.

Las oraciones propias de cada día continúan almacenadas en los archivos JSON de cada novena y se indican mediante `prayerStructure.dailyPrayerFields`.

Actualmente las oraciones comunes principales son:

- Padre Nuestro.
- Ave María.
- Gloria.

La matriz `docs/matriz-oraciones-v1.4.md` documenta la validación de las 112 estructuras de oración.

### 6. Service Worker

`service-worker.js` proporciona las funciones PWA y administra la caché.

La estrategia actual combina:

- precarga de recursos importantes;
- caché para recursos estáticos;
- actualización de determinados datos desde la red;
- recuperación desde caché cuando el dispositivo está sin conexión.

Cada actualización importante del Service Worker utiliza una nueva versión de caché para evitar que dispositivos con una versión anterior conserven recursos incompatibles.

## Calidad y validación

El repositorio incorpora validaciones automáticas mediante GitHub Actions.

### Validación de integridad

`validate-data.js` y `validate-app.js` comprueban, entre otros aspectos:

- JSON válido;
- sintaxis JavaScript;
- estructura de catálogos;
- identificadores;
- referencias `sourceFile`;
- rutas de imágenes;
- recursos locales;
- recursos del Service Worker;
- caché;
- acciones y rutas interactivas reconocibles.

### Code Scanning

CodeQL analiza el código JavaScript/TypeScript en busca de vulnerabilidades y problemas de seguridad.

### Dependabot

Dependabot supervisa las dependencias de GitHub Actions y puede proponer actualizaciones mediante Pull Requests.

En este proyecto se supervisan las Actions utilizadas por los workflows. No se añade npm como dependencia de la aplicación únicamente para utilizar Dependabot.

### Lighthouse CI

Lighthouse CI audita periódicamente la aplicación en:

- rendimiento;
- accesibilidad;
- buenas prácticas;
- SEO.

Los umbrales actuales funcionan como advertencias para permitir observar primero el comportamiento real de la aplicación antes de convertir las métricas en bloqueos de despliegue.

## Despliegue

La aplicación está preparada para ejecutarse como sitio estático mediante GitHub Pages.

El flujo general es:

```text
Cambio en el repositorio
        ↓
GitHub Actions
        ↓
Validación de datos e integridad
        ↓
CodeQL
        ↓
Lighthouse CI
        ↓
GitHub Pages
        ↓
Usuario
```

La aplicación no necesita un backend para las funciones actualmente implementadas.

## Seguridad

La aplicación no solicita actualmente una cuenta de usuario ni almacena contraseñas.

Las preferencias y el progreso se almacenan localmente en el dispositivo.

La política y las consideraciones de seguridad se documentan adicionalmente en [SECURITY.md](SECURITY.md).

La ausencia de backend reduce la superficie de ataque asociada a autenticación, bases de datos y APIs privadas, pero no elimina riesgos propios de una aplicación web. Por ello se mantienen validaciones automáticas y análisis de código.

## Contenido

Amigos del Cielo busca mantener una línea editorial propia.

Los contenidos se redactan y adaptan para la aplicación y no se pretende reproducir literalmente textos protegidos de terceros.

Cuando una información, cita o dato requiere respaldo documental, debe procurarse una fuente adecuada y distinguir entre:

- cita textual;
- información histórica;
- tradición devocional;
- interpretación;
- contenido editorial de la aplicación.

## Alcance futuro

El proyecto contempla una evolución progresiva.

### V1.5 — experiencia y continuidad

La siguiente etapa prevista se orienta a mejorar la experiencia de uso y la continuidad de la oración. El alcance podrá ajustarse a partir de la validación con usuarios reales.

Entre las líneas previstas se encuentran:

- calendario litúrgico;
- santo del día;
- recordatorios;
- búsqueda y filtros mejorados;
- favoritos y recomendaciones por intención;
- mejoras de Mi Camino y continuidad de oración;
- compartir novenas y oraciones;
- refinamientos de accesibilidad y experiencia visual.

La internacionalización y la expansión multilingüe se mantienen como una etapa posterior de mayor alcance.

El documento histórico de auditoría UX puede consultarse en [docs/UX-1.4.md](docs/UX-1.4.md).

## V1.5 — experiencia de descubrimiento

Esta versión incorpora:

- Mi Camino como espacio de favoritos, progreso y continuidad espiritual.
- Amigo del cielo para el año, con elección anual persistente.
- Explorador de experiencias e intenciones integrado en Mi Camino.
- Cruce de las virtudes canónicas de las fichas con las virtudes y temas de los días de las novenas.
- Resultados variables de descubrimiento, sin presentarlos como ranking.
- Orden variable del catálogo al entrar en Santos, Beatos, María y Devociones.
- Navegación de categorías adaptada a pantallas móviles.
- Ajustes de contraste para modo oscuro y mejoras responsive.
- Validación manual en un segundo dispositivo Android con pantalla de menor tamaño.

## Principios del proyecto

1. **Cristocéntrico:** los santos se presentan como testigos que orientan hacia Cristo.
2. **Realista:** las biografías muestran procesos de conversión, lucha, servicio y crecimiento, no una imagen de perfección humana inicial.
3. **Católico:** el contenido procura respetar la doctrina, la tradición y el calendario de la Iglesia.
4. **Original:** se evita reproducir literalmente contenido de terceros.
5. **Simple:** se prioriza una arquitectura mantenible y con pocas dependencias.
6. **Accesible:** la aplicación busca ser usable desde teléfonos, tabletas y computadores.
7. **Progresivo:** las nuevas funciones se incorporan después de validar las existentes.

## Calidad y estado de publicación

La versión 1.5.0 consolida la experiencia de descubrimiento y continuidad, manteniendo el sistema central de oraciones y la estabilidad de la PWA. Se han revisado la estructura de los 112 registros, las referencias de contenido, las estructuras de oración, el renderizado diario, el progreso de las novenas, la navegación, la instalación PWA, el funcionamiento offline y la experiencia de lectura.

Las validaciones automáticas de integridad, CodeQL, Lighthouse CI y el despliegue de GitHub Pages se ejecutan mediante GitHub Actions. La revisión funcional manual complementa estas verificaciones.

La interfaz de las oraciones comunes utiliza un componente compartido, por lo que las mejoras de lectura se aplican a todas las novenas que utilizan esta estructura.

La navegación interna mantiene el contexto en la URL y permite utilizar Atrás/Adelante sin recargar la aplicación. Los enlaces ?novena= existentes siguen siendo compatibles.

## Estado del proyecto

**Versión de aplicación:** 1.5.0

**Estado:** V1.5.0 — experiencia de descubrimiento, Mi Camino y adaptación móvil

**Catálogo:** 112 registros publicados

**Service Worker:** caché v269

**Tipo:** Progressive Web App

**Idioma principal:** español

**Plataforma de despliegue:** GitHub Pages

**Licencia del código:** MIT, indicada en el archivo `LICENSE`.

**Contenido y recursos:** los archivos de contenido pueden indicar condiciones específicas, por lo que la licencia del código no implica automáticamente una licencia abierta para textos, imágenes u otros recursos.

## Autoría y propósito

Amigos del Cielo nace como un proyecto de software orientado a reunir oración, conocimiento de los santos y acompañamiento espiritual en una herramienta digital sencilla.

El propósito de la aplicación es servir como apoyo para la vida de oración y el conocimiento de la fe, no sustituir la participación en la vida sacramental, el acompañamiento pastoral ni el discernimiento personal.
