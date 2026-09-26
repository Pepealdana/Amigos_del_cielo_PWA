/* ==========================================
   ROUTER
   Amigos del Cielo
========================================== */

const router = {

    rutaActual: "inicio",

    rutaAnterior: null,

    datos: null,

    ir(

        ruta,

        datos = null

    ) {

        this.rutaAnterior =

            this.rutaActual;

        this.rutaActual =

            ruta;

        this.datos =

            datos;

        actualizarNavegacionInferior(ruta);

        cerrarMenu();

        switch (ruta) {

            case "inicio":

                mostrarInicio();

                break;

            case "biblioteca":

                mostrarNovenas();

                break;

            case "todos":

                mostrarTodos();

                break;

            case "santos":

                mostrarSantos();

                break;

            case "maria":

                mostrarMaria();

                break;

            case "novenas":

                mostrarNovenas();

                break;

            case "devociones":

                mostrarDevociones();

                break;

            case "portada":

                mostrarPortadaNovena();

                break;

            case "historia":

                mostrarHistoria();

                break;

            case "favoritas":

                mostrarFavoritas();

                break;

            case "progreso":

                mostrarProgreso();

                break;

            case "configuracion":

                mostrarConfiguracion();

                break;

            case "participa":

                mostrarParticipa();

                break;

            case "acerca":

                mostrarAcerca();

                break;

            default:

                console.warn(

                    `Ruta inexistente: ${ruta}`

                );

                mostrarInicio();

        }

    }

};

/* ==========================================
   NAVEGACIÓN
========================================== */

function navegar(

    ruta,

    datos = null

) {

    router.ir(

        ruta,

        datos

    );

}

/* ==========================================
   NAVEGACIÓN INFERIOR
========================================== */

function actualizarNavegacionInferior(ruta) {

    document
        .querySelectorAll(".bottom-nav-item")
        .forEach(boton => {

            const activo =
                boton.dataset.route === ruta;

            boton.classList.toggle(
                "active",
                activo
            );

            if (activo) {
                boton.setAttribute(
                    "aria-current",
                    "page"
                );
            } else {
                boton.removeAttribute(
                    "aria-current"
                );
            }

        });
}
