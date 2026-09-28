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
- Selección de contexto regional hispanohablante como base para la expansión del catálogo.

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
│   └── 06-pwa.css
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

### 5. Service Worker

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

### Próximas líneas de trabajo

- ampliar y revisar el catálogo hispanohablante;
- mejorar el calendario litúrgico;
- ampliar las fichas biográficas;
- mejorar búsqueda y filtros;
- fortalecer accesibilidad;
- mejorar rendimiento y tamaño de la carga inicial;
- ampliar el funcionamiento offline;
- mejorar recordatorios y continuidad;
- incorporar más recursos de formación espiritual;
- evaluar internacionalización a otros idiomas después de consolidar el contenido en español.

El crecimiento del proyecto se realizará de forma incremental para mantener la estabilidad de la aplicación.

## Principios del proyecto

1. **Cristocéntrico:** los santos se presentan como testigos que orientan hacia Cristo.
2. **Realista:** las biografías muestran procesos de conversión, lucha, servicio y crecimiento, no una imagen de perfección humana inicial.
3. **Católico:** el contenido procura respetar la doctrina, la tradición y el calendario de la Iglesia.
4. **Original:** se evita reproducir literalmente contenido de terceros.
5. **Simple:** se prioriza una arquitectura mantenible y con pocas dependencias.
6. **Accesible:** la aplicación busca ser usable desde teléfonos, tabletas y computadores.
7. **Progresivo:** las nuevas funciones se incorporan después de validar las existentes.

## Calidad y estado de publicación

La versión 1.3.6 ha completado la fase principal de estabilización técnica. Las validaciones automáticas de integridad, CodeQL, Lighthouse CI y el despliegue de GitHub Pages se ejecutan mediante GitHub Actions. La prueba funcional manual de navegación, novenas, favoritos, progreso, Biblioteca, configuración, funcionamiento offline y acciones principales se utiliza como complemento de estas verificaciones.

Antes de una publicación pública conviene mantener una revisión final de los Pull Requests de Dependabot y crear una etiqueta/release para la versión publicada.

## Estado del proyecto

**Versión de aplicación:** 1.3.6

**Estado:** lista para publicación y pruebas con usuarios reales

**Service Worker:** caché v229

**Tipo:** Progressive Web App

**Idioma principal:** español

**Plataforma de despliegue:** GitHub Pages

**Licencia:** actualmente no se ha definido una licencia de software para el repositorio. El código, contenido y recursos gráficos no deben reutilizarse como si estuvieran bajo una licencia abierta hasta que se publique una licencia explícita.

## Autoría y propósito

Amigos del Cielo nace como un proyecto de software orientado a reunir oración, conocimiento de los santos y acompañamiento espiritual en una herramienta digital sencilla.

El propósito de la aplicación es servir como apoyo para la vida de oración y el conocimiento de la fe, no sustituir la participación en la vida sacramental, el acompañamiento pastoral ni el discernimiento personal.
