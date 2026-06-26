# Amigos del Cielo

## Descripción

**Amigos del Cielo** es una aplicación web progresiva (PWA) orientada a la oración y la formación espiritual católica mediante novenas, santos y devociones.

El proyecto busca ofrecer una experiencia sencilla, rápida y completamente gratuita, funcionando incluso sin conexión a Internet.

---

# Objetivos

- Facilitar la oración diaria.
- Presentar la vida y enseñanzas de los santos.
- Guiar novenas paso a paso.
- Recordar el progreso del usuario.
- Funcionar como una PWA.
- Mantener una arquitectura modular y escalable.

---

# Tecnologías

- HTML5
- CSS3
- JavaScript Vanilla (ES6+)
- JSON
- LocalStorage
- Service Worker
- GitHub Pages

---

# Estructura del proyecto

```

Amigos-del-Cielo/

assets/
css/
data/
docs/
js/
manifest.json
service-worker.js
index.html

```

---

# Arquitectura

La aplicación está dividida en cuatro grandes bloques:

- Datos
- Estado
- Renderizado
- Navegación

Cada bloque tiene una responsabilidad única.

---

# Flujo de funcionamiento

Usuario

↓

Router

↓

App

↓

Servicios

↓

JSON

↓

Render

↓

Pantalla

---

# Cómo ejecutar

Abrir mediante:

Live Server

o

GitHub Pages

No requiere backend.

---

# Cómo agregar una nueva novena

1. Crear un JSON.
2. Agregar la imagen.
3. Registrar la novena en `novenas.json`.

No es necesario modificar el código JavaScript.

---

# Estado actual

Actualmente el proyecto se encuentra en construcción.

La arquitectura principal ya está implementada y el siguiente paso será desarrollar el motor de las novenas y el sistema de progreso.
