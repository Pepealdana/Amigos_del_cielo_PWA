# Plan UX — Amigos del Cielo 1.4

## Propósito

La versión 1.4 se centrará en experiencia de usuario, interacción, navegación, reducción de errores y estabilidad percibida.

No se incorporarán nuevas novenas como objetivo de esta versión. El contenido existente será la base para mejorar la manera en que las personas descubren a los santos, exploran sus historias y rezan las novenas.

### Objetivo rector

> Que la navegación deje de sentirse como una tarea y se convierta en un medio transparente para descubrir, conocer y rezar.

## Principios de diseño

### 1. Claridad antes que cantidad
- Cada pantalla debe tener un propósito principal reconocible.
- Las acciones secundarias deben tener menor peso visual.
- Evitar controles que no tengan una función clara.

### 2. Reconocimiento antes que memoria
- Preferir etiquetas claras.
- Mantener nombres consistentes.
- Mostrar el contexto actual.
- Evitar iconos ambiguos sin texto cuando puedan generar dudas.

### 3. Navegación predecible
- Un elemento que parece botón debe comportarse como botón.
- Un enlace debe llevar al lugar esperado.
- Volver debe devolver a un contexto razonable.
- Acciones equivalentes deben comportarse de manera consistente.

### 4. El sistema debe responder
- Guardar debe mostrar confirmación.
- Favoritos deben cambiar de estado visiblemente.
- Avanzar de día debe identificar claramente el nuevo día.
- Los errores deben explicar qué ocurrió y ofrecer recuperación.
- Los indicadores de carga solo deben aparecer cuando exista una espera real.

### 5. Reducir la carga de navegación
Pregunta de auditoría: ¿podemos llegar al objetivo con menos pasos sin perder claridad?

No se reducirán clics de forma artificial. Se eliminarán pasos que no aportan valor.

### 6. Jerarquía simple
Los recorridos deben seguir una estructura comprensible:

Inicio → descubrimiento → contenido → detalle → acción.

Ejemplos:
- Biblioteca → Santo → Ficha
- Biblioteca → Novena → Día
- Mi Camino → Novena en curso → Continuar

No se crearán niveles adicionales salvo necesidad real.

### 7. Volver debe ser natural
Se distinguirá entre volver al contexto anterior, subir en la jerarquía y cambiar de sección principal. El botón atrás del dispositivo y los controles internos deben producir resultados previsibles.

### 8. La navegación no debe competir con el contenido
La navegación inferior y el menú lateral deben orientar, no convertirse en protagonistas. Los destinos principales deben ser fáciles de encontrar y los secundarios deben mantenerse fuera del camino habitual.

### 9. Interfaz limpia
Reducir elementos decorativos innecesarios, textos repetidos, botones duplicados, tarjetas que no aportan, separaciones excesivas y jerarquías visuales contradictorias.

### 10. Diseñar para recorridos reales
Se auditarán recorridos completos, no solamente pantallas aisladas:
- descubrir un santo;
- conocer su historia;
- iniciar una novena;
- continuar una novena;
- completar una novena;
- guardar un contenido;
- retomar desde Mi Camino;
- explorar y regresar sin perder contexto.

## Áreas prioritarias

### Biblioteca
Debe funcionar como espacio de descubrimiento, no como un segundo catálogo. Revisar jerarquía, carga inicial, exploración, testimonios, búsqueda, continuidad y retorno.

### Catálogo
Revisar búsqueda, filtros, tarjetas, estados vacíos, consistencia entre Santos, Beatos, María, Devociones y Todos, y entrada y salida de fichas.

### Ficha del santo
Debe responder rápidamente quién es, por qué puede interesar y qué puede hacer el usuario después. Evitar convertir la ficha en una pared de texto.

### Novenas
El usuario debe reconocer inmediatamente qué novena está rezando, en qué día está, cuánto falta, qué puede hacer ahora, cómo avanzar, cómo volver y cómo continuar posteriormente.

### Mi Camino
Debe responder a una pregunta sencilla: ¿qué puedo retomar desde aquí? La información relevante debe aparecer primero.

### Menú lateral y navegación inferior
Mantener el rediseño actual como base y revisar claridad de grupos, cantidad de opciones, nombres, estado activo, facilidad de cierre y ausencia de duplicidades.

## Interacción y estados
Revisar sistemáticamente los estados normal, activo, foco, deshabilitado, carga, éxito, error y vacío. Toda acción relevante debe tener una respuesta visual coherente.

Las animaciones serán discretas y funcionales. No se añadirán efectos únicamente por estética.

## Errores y recuperación
Cada error visible debe responder: qué ocurrió, qué significa para el usuario y qué puede hacer ahora. Ningún error debe dejar una pantalla sin salida.

## Rendimiento percibido
La pregunta principal será: ¿la aplicación se siente inmediata? Se prestará especial atención a Biblioteca, fichas, novenas, navegación entre días, búsqueda, regreso y funcionamiento offline.

## Accesibilidad
Revisar contraste, tamaño de texto, foco visible, etiquetas, áreas táctiles, orden de navegación, modales, mensajes de error y compatibilidad con preferencias de tamaño.

## Regla para aceptar un cambio
Antes de modificar una interfaz se debe responder:
1. ¿Qué problema del usuario resuelve?
2. ¿Qué objetivo de la 1.4 cumple?
3. ¿Reduce pasos, dudas, errores o carga cognitiva?
4. ¿Hace más clara la acción principal?
5. ¿Mantiene la consistencia con el resto de la aplicación?
6. ¿Introduce complejidad nueva?
7. ¿Cómo comprobaremos que mejoró?

Si no existe una respuesta clara, el cambio no entra automáticamente en 1.4.

## Criterios de aceptación
- Un usuario nuevo debe poder entender la navegación sin explicación.
- Las acciones principales deben ser reconocibles.
- Los botones deben responder de manera evidente.
- Volver debe ser predecible.
- No deben existir pantallas sin salida.
- Los errores deben tener recuperación.
- Los estados vacíos deben ser comprensibles.
- Una novena debe poder iniciarse y continuarse sin confusión.
- Mi Camino debe permitir retomar actividades.
- Biblioteca debe facilitar descubrir contenido.
- La interfaz no debe estar sobrecargada.
- La navegación no debe distraer del contenido espiritual.

## Recorridos de prueba obligatorios

### A — Descubrir
Inicio → Biblioteca → explorar → santo → ficha → volver.

### B — Conocer
Inicio → Santos → buscar → santo → historia → volver al catálogo.

### C — Rezar
Inicio → Novenas → novena → iniciar → día 1 → día 2 → volver → continuar.

### D — Retomar
Inicio → Mi Camino → novena en curso → continuar.

### E — Favoritos
Santo → favorito → Mi Camino → favoritos → santo → volver.

### F — Error
Provocar un fallo de carga → leer mensaje → reintentar → recuperar o volver.

### G — Offline
Abrir contenido disponible → activar modo sin conexión → navegar → continuar novena → volver.

## Auditoría final
- validación de datos;
- validación de aplicación;
- revisión de JavaScript y rutas;
- revisión de recursos y Service Worker;
- PWA;
- CodeQL;
- Lighthouse CI;
- pruebas móviles;
- pruebas offline;
- revisión UX;
- revisión de accesibilidad;
- revisión editorial;
- documentación.

La versión solo pasará a 1.4.0 cuando estos criterios estén cerrados y los cambios tengan una justificación clara desde la experiencia del usuario.

## Referencias de diseño
- Nielsen Norman Group — 10 Usability Heuristics for User Interface Design.
- Material Design — Navigation y Navigational transitions.
- Android Developers — Principles of navigation y Layouts and navigation patterns.