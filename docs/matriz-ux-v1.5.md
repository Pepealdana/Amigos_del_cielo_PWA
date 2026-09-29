# Matriz UX — V1.5

**Proyecto:** Amigos del Cielo  
**Versión objetivo:** 1.5  
**Estado:** matriz UX cerrada para implementación incremental  
**Principio rector:** **CONOCE → ORA → CAMINA**

## 1. Propósito de V1.5

V1.5 no cambia la naturaleza de Amigos del Cielo ni convierte la aplicación en un sistema de hábitos o gamificación. La evolución busca que la experiencia comunique con claridad tres movimientos:

1. **Conoce:** descubrir santos, beatos, advocaciones y sus historias reales.
2. **Ora:** acceder a novenas, oraciones y devociones con una experiencia limpia.
3. **Camina:** continuar una oración, conservar explícitamente aquello que el usuario quiere seguir conociendo y llevar el testimonio a la vida.

La idea editorial central es que los santos fueron personas reales. Algunos comenzaron desde muy jóvenes; otros tuvieron conversiones, recomenzaron después de una vida difícil, vivieron una vida ordinaria o atravesaron pruebas. La santidad se presenta como un camino de seguimiento de Cristo, no como perfección inalcanzable.

## 2. Inicio

**Objetivo:** responder rápidamente: «¿Qué puedo conocer hoy?», «¿Dónde continúo?» y «¿Qué estoy buscando?».

### Mantener
- Santo del día / «Un santo para conocer hoy».
- Novena activa y continuación cuando exista progreso relevante.
- Búsqueda.
- Acceso contextual a instalación de la PWA.

### Reducir o eliminar
- Conteos y estadísticas como protagonistas.
- Contenido duplicado de Biblioteca.
- Exceso de tarjetas.
- CTAs secundarios que compitan con la acción principal.

### Orden propuesto
1. Santo del día.
2. Continúa tu oración, solo cuando corresponda.
3. Búsqueda.
4. Enlaces de exploración secundarios.

### Búsqueda
Texto: **«Busca un santo, una novena o una devoción»**.

## 3. Biblioteca

**Objetivo:** convertirse en el espacio editorial principal de descubrimiento.

### Encabezado
**Biblioteca**  
**Conoce. Ora. Camina.**

### Marco editorial
«Los santos también tuvieron un camino».

Las cuatro rutas actuales («Desde muy joven», «Después de comenzar de nuevo», «En medio de la vida», «A través de la prueba») no deben permanecer como cuatro tarjetas grandes permanentes. Se convierten en un marco editorial breve que conduce a conocer historias.

### Exploración por virtudes
Sustituir el enfoque de «problema → santo que lo resuelve» por:

**«¿Qué quieres aprender de un santo?»**

Ejemplos:
- Perseverar.
- Recomenzar.
- Servir.
- Perdonar.
- Esperanza.
- Amar a la familia.
- Afrontar una dificultad.
- Sencillez.

Son puertas de descubrimiento, no promesas de solución ni sistemas de puntos.

### Explora
Accesos:
- Novenas.
- Oraciones.
- Santos.
- Beatos.
- María.
- Devociones.

### Contenido secundario
- «Continúa tu oración», solo si existe progreso.
- «Un santo para conocer hoy», en formato secundario o enlace.
- Próxima celebración.
- Búsqueda.

### Eliminar del protagonismo
- Conteos de registros.
- Lenguaje técnico como «contenido», «resultados relacionados» o «coincidencias».
- Dashboard de estadísticas.

## 4. Santos

### Catálogo
Mantener descubrimiento inmediato. No obligar a configurar filtros antes de conocer contenido.

### Tarjeta
Una tarjeta reutilizable debe contener:
- Imagen.
- Nombre.
- Título o subtítulo.
- Acción principal: **«Conocer su historia»**.

Evitar decoración basada en caracteres Unicode arbitrarios.

### Ficha
La ficha debe sentirse editorial, no como una ficha técnica o una página tipo Wikipedia.

Estructura:
1. Imagen.
2. Nombre.
3. Tipo y celebración.
4. **Su historia**.
5. **Su camino**.
6. Patronazgo, cuando corresponda.
7. Virtudes.
8. Cita verificada.
9. Santos relacionados.
10. CTA de novena cuando exista.

«Su camino» debe explicar cómo la persona llegó a vivir su fe, no limitarse a fechas y hechos.

### Virtudes y patronazgo
Se presentan como contenido editorial, no como una colección de chips decorativos.

## 5. Beatos

Reutilizar la arquitectura de fichas de santos, pero conservar con precisión la categoría **Beato/Beata**.

La condición canónica nunca debe inferirse de que exista una ficha, una novena o una devoción.

## 6. María

María tiene sección propia.

### Ficha de advocación
- Imagen.
- Nombre.
- Celebración.
- Historia.
- Devoción/tradición.
- Significado.
- Oración.
- Novena, cuando exista.

No convertir una advocación mariana en una copia estructural de una ficha de santo.

## 7. Devociones

Las devociones tienen sección propia.

La **Divina Misericordia** conserva la relación entre devoción y novena, sin mezclar todas las devociones con santos o advocaciones.

## 8. Oraciones

Las oraciones comunes tienen experiencia propia y reutilizan la infraestructura existente:
- `data/oraciones.json`
- `oracionesService.js`

No duplicar textos de oración dentro de cada novena cuando ya exista una oración común reutilizable.

La lectura debe ser limpia. Compartir y copiar son acciones secundarias.

## 9. Novenas

La novena es el núcleo de «Ora».

### Semántica de progreso
Abrir un día **no** significa haberlo rezado.

La acción explícita es:

**«Marcar día como rezado»**

El progreso principal debe expresarse como:

**«4 de 9 días rezados»**

No usar porcentajes como semántica principal.

### Navegación
- Día anterior.
- Día siguiente.
- La navegación no modifica el progreso automáticamente.
- «Continuar» debe llevar al día relevante para continuar la oración.
- «Reiniciar» es secundario y requiere confirmación.
- Al completar la novena, usar una respuesta sobria, no gamificada.
- Compartir permanece como acción secundaria.

### Estructura orientativa
- Volver.
- Nombre de la novena.
- «9 días de oración».
- Día actual.
- Progreso.
- Contenido del día.
- «¿Ya rezaste este día?»
- Marcar día como rezado.
- Navegación anterior/siguiente.

### Compatibilidad
Conservar:
- `?novena=`
- `?dia=`
- funcionamiento offline.
- deep links existentes.

Las novenas especiales no deben quedar forzadas a una plantilla rígida.

## 10. Mi camino

No es un habit tracker.

### Preguntas que responde
1. ¿Qué estoy rezando?
2. ¿Qué santos estoy conociendo?
3. ¿Qué quiero cultivar?

### Conservar
- Novenas activas.
- Novenas completadas.
- Santos guardados explícitamente.
- Virtudes guardadas opcionalmente.

### No incorporar
- Puntos.
- XP.
- Rachas.
- Niveles.
- Insignias.
- Rankings.
- Porcentajes globales de «espiritualidad».
- Retos diarios.

Abrir un santo no significa automáticamente «conocerlo». Guardarlo debe ser una acción explícita.

### Estado vacío
**«Tu camino comienza aquí»**

Acciones:
- Explorar santos.
- Explorar novenas.

## 11. Búsqueda

La búsqueda global debe encontrar:
- Santos.
- Beatos.
- Advocaciones marianas.
- Devociones.
- Novenas.
- Oraciones.

Debe tolerar:
- mayúsculas/minúsculas.
- acentos.
- coincidencias parciales.
- nombres compuestos.

### Acciones por tipo
- Santo → **Conocer su historia**.
- Beato → **Conocer su historia**.
- Advocación → **Conocer**.
- Devoción → **Conocer la devoción**.
- Novena → **Abrir novena**.
- Oración → **Leer oración**.

El estado sin resultados debe usar lenguaje humano.

## 12. Navegación

Conservar los mecanismos actuales:
- `?ruta=`
- `?novena=`
- `?dia=`

Añadir únicamente las rutas necesarias para V1.5:
- `?ruta=santos`
- `?ruta=camino`
- `?ruta=maria`
- `?ruta=devociones`
- `?ruta=oraciones`

No introducir un framework de routing.

### Atrás
Debe respetar contexto:
Biblioteca → Santos → Santo → Novena → Día 4

No volver siempre a Inicio.

## 13. Menú

Menú principal simplificado:

- Inicio
- Biblioteca
- Santos
- Novenas
- Mi camino
- ---
- Ajustes
- Acerca de

Dentro de Biblioteca:
- Beatos.
- María.
- Devociones.
- Oraciones.

No añadir cada filtro o categoría como acceso principal.

No incorporar navegación inferior en V1.5 mientras exista el menú lateral como sistema principal.

## 14. Ajustes

Opciones:
- Apariencia: Automático / Claro / Oscuro.
- Tamaño de texto.
- Reducir movimiento.
- Instalar aplicación, cuando corresponda.
- Compartir aplicación.
- Acerca de / versión.

La apariencia automática no debe sobrescribir una elección explícita del usuario.

La tarjeta de instalación solo debe aparecer cuando la PWA todavía pueda instalarse.

## 15. Accesibilidad y estados

### Accesibilidad
- Contraste suficiente.
- Foco visible.
- Navegación por teclado.
- Lectores de pantalla.
- ARIA correcto.
- Touch targets adecuados.
- Escalado de texto.
- Tema oscuro.
- Reducir movimiento.
- Alt text.
- Jerarquía de encabezados.

### Estados
Diseñar explícitamente:
- Cargando.
- Vacío.
- Error.
- Deep link inválido.
- Sin resultados.
- Sin progreso.

Los errores no deben mostrar mensajes técnicos al usuario final.

## 16. PWA y responsive

- Mobile-first.
- Tablet y escritorio cómodos.
- Texto de oración con ancho de lectura controlado en pantallas grandes.
- Imágenes con dimensiones y alt para evitar saltos de layout.
- Mantener funcionamiento offline.
- Mantener instalación PWA.

## 17. Microinteracciones

Solo interacciones sutiles:
- transiciones cortas.
- estados de foco/pressed.
- cambios de navegación suaves.

No incorporar:
- confeti.
- partículas.
- corazones.
- recompensas visuales.
- efectos que conviertan la oración en gamificación.

## 18. Sistema visual

- Identidad azul celestial.
- Pocas superficies.
- Sombras discretas.
- Radios consistentes.
- Escala tipográfica limitada.
- Espaciado consistente.
- No convertir todo en una tarjeta.
- Iconografía unificada.

Acciones principales:
**Conocer · Rezar · Continuar · Explorar · Guardar · Compartir**

## 19. Criterios de aceptación V1.5

V1.5 se considera UX cerrada cuando:

- [ ] Inicio tiene una jerarquía clara.
- [ ] Biblioteca funciona como espacio editorial.
- [ ] Santos y Beatos comparten arquitectura sin perder su categoría.
- [ ] María y Devociones tienen experiencias propias.
- [ ] Oraciones reutilizan el servicio existente.
- [ ] Novenas distinguen abrir un día de rezarlo.
- [ ] Mi camino no funciona como habit tracker.
- [ ] Búsqueda global devuelve tipos y acciones coherentes.
- [ ] Atrás conserva contexto.
- [ ] Menú no duplica sistemas de navegación.
- [ ] Ajustes respetan tema automático y preferencias explícitas.
- [ ] Estados vacíos/error/loading/deep-link están definidos.
- [ ] Accesibilidad y responsive forman parte de la implementación.
- [ ] No se introducen elementos de gamificación.
