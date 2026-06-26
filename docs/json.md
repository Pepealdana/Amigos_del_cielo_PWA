# Arquitectura

La aplicación sigue una arquitectura modular basada en responsabilidades.

---

# Flujo principal

```

Usuario

↓

index.html

↓

router.js

↓

app.js

↓

render/

↓

services/

↓

JSON

```

---

# index.html

Contiene únicamente la estructura base.

No incluye contenido dinámico.

---

# app.js

Es el controlador principal.

Se encarga de:

- iniciar la aplicación
- cargar datos
- cambiar pantallas
- coordinar servicios
- mantener el flujo

No genera HTML directamente.

---

# router.js

Controla la navegación.

Su única responsabilidad es decidir qué vista mostrar.

---

# state/

Contiene el estado global de la aplicación.

Ejemplo:

- catálogo
- novena actual
- progreso
- favoritos
- configuraciones

---

# services/

Encapsula el acceso a los datos.

Nunca genera HTML.

Nunca modifica la interfaz.

---

# render/

Contiene todas las vistas.

Cada archivo genera únicamente HTML.

No modifica datos.

---

# utils/

Funciones reutilizables.

No dependen de ninguna vista.

---

# assets/

Recursos gráficos.

- imágenes
- iconos
- audio

---

# data/

Información de la aplicación.

Toda la información está almacenada como archivos JSON.

---

# docs/

Documentación técnica del proyecto.
