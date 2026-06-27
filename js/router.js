/* ==========================================
   ROUTER
   Amigos del Cielo
========================================== */

const router = {

    rutaActual: "inicio",

    rutaAnterior: null,

    datos: null,

    rutas: {

        inicio: mostrarInicio,

        biblioteca: mostrarBiblioteca,

        portada: mostrarPortadaNovena,

        historia: mostrarHistoria,

        favoritas: mostrarFavoritas,

        progreso: mostrarProgreso,

        configuracion: mostrarConfiguracion,

        acerca: mostrarAcerca

    },

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

        const vista =

            this.rutas[ruta];

        if (

            typeof vista === "function"

        ) {

            vista(datos);

            return;

        }

        console.warn(

            `Ruta inexistente: ${ruta}`

        );

        mostrarInicio();

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