/* ==========================================
   ROUTER
========================================== */

const router = {

    rutaActual: "inicio",

    ir(ruta, datos = null) {

        this.rutaActual = ruta;

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

                mostrarInicio();

        }

    }

};

/* ==========================================
   COMPATIBILIDAD
========================================== */

function navegar(ruta) {

    router.ir(ruta);

}