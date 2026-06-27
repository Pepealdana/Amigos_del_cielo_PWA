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

        cerrarMenu();

        switch (ruta) {

            case "inicio":

                mostrarInicio();

                break;

            case "biblioteca":

                mostrarBiblioteca();

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