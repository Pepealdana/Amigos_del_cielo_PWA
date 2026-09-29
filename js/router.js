/* ==========================================
   ROUTER
   Amigos del Cielo
========================================== */

const RUTAS_VALIDAS = new Set([
    "inicio",
    "biblioteca",
    "camino",
    "todos",
    "santos",
    "beatos",
    "maria",
    "novenas",
    "devociones",
    "portada",
    "historia",
    "dia",
    "favoritas",
    "progreso",
    "configuracion",
    "participa",
    "acerca"
]);

const router = {

    rutaActual: "inicio",

    rutaAnterior: null,

    datos: null,

    ir(

        ruta,

        datos = null,

        opciones = {}

    ) {

        const rutaNormalizada =
            RUTAS_VALIDAS.has(ruta)
                ? ruta
                : "inicio";

        this.rutaAnterior =
            this.rutaActual;

        this.rutaActual =
            rutaNormalizada;

        this.datos =
            datos;

        if (opciones.actualizarURL !== false) {

            this.actualizarURL(
                rutaNormalizada,
                datos,
                opciones.reemplazar === true
            );

        }

        actualizarNavegacionInferior(
            rutaNormalizada
        );

        cerrarMenu();

        switch (rutaNormalizada) {

            case "inicio":

                mostrarInicio();

                break;

            case "biblioteca":

                mostrarBiblioteca();

                break;

            case "camino":

                mostrarCamino();

                break;

            case "todos":

                mostrarTodos();

                break;

            case "santos":

                mostrarSantos();

                break;

            case "beatos":

                mostrarBeatos();

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

            case "dia":

                mostrarDia(
                    Number(datos?.dia) || 1,
                    false
                );

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

                mostrarInicio();

        }

    },

    actualizarURL(

        ruta,

        datos = null,

        reemplazar = false

    ) {

        if (
            typeof window === "undefined" ||
            !window.history?.pushState
        ) {
            return;
        }

        const url =
            new URL(
                window.location.href
            );

        url.search = "";
        url.hash = "";

        if (ruta !== "inicio") {

            url.searchParams.set(
                "ruta",
                ruta
            );

        }

        const novenaId =
            datos?.novenaId ||
            (
                ruta === "portada" ||
                ruta === "historia" ||
                ruta === "dia"
                    ? state?.novenaActual?.id
                    : null
            );

        if (novenaId) {

            url.searchParams.set(
                "novena",
                novenaId
            );

        }

        if (ruta === "dia") {

            const dia =
                Number(datos?.dia) ||
                Number(state?.diaActual) ||
                1;

            url.searchParams.set(
                "dia",
                String(dia)
            );

        }

        const estado =
            {
                ruta,
                datos: {
                    ...(datos || {}),
                    ...(novenaId
                        ? { novenaId }
                        : {})
                }
            };

        if (reemplazar) {

            window.history.replaceState(
                estado,
                "",
                url.href
            );

        } else {

            window.history.pushState(
                estado,
                "",
                url.href
            );

        }

    },

    obtenerDestinoURL() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const rutaSolicitada =
            params.get("ruta");

        const novenaId =
            params.get("novena");

        const dia =
            Number(
                params.get("dia")
            );

        if (
            novenaId &&
            buscarNovenaPorId(
                state.catalogo,
                novenaId
            )
        ) {

            const ruta =
                RUTAS_VALIDAS.has(
                    rutaSolicitada
                ) &&
                [
                    "portada",
                    "historia",
                    "dia"
                ].includes(rutaSolicitada)
                    ? rutaSolicitada
                    : "portada";

            return {
                ruta,
                datos: {
                    novenaId,
                    ...(ruta === "dia"
                        ? {
                            dia:
                                Number.isInteger(dia) &&
                                dia >= 1 &&
                                dia <= 9
                                    ? dia
                                    : 1
                        }
                        : {})
                }
            };

        }

        const ruta =
            RUTAS_VALIDAS.has(
                rutaSolicitada
            ) &&
            ![
                "portada",
                "historia",
                "dia"
            ].includes(rutaSolicitada)
                ? rutaSolicitada
                : "inicio";

        return {
            ruta,
            datos: null
        };

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

            const rutaNavegacion =
                ruta === "favoritas" || ruta === "progreso"
                    ? "camino"
                    : ["todos", "beatos", "maria", "novenas", "devociones"].includes(ruta)
                        ? "biblioteca"
                        : ruta;

            const activo =
                boton.dataset.route === rutaNavegacion;

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

/* ==========================================
   HISTORIAL DEL NAVEGADOR
========================================== */

function inicializarHistorialRouter() {

    if (
        typeof window === "undefined" ||
        !window.history?.replaceState
    ) {
        return;
    }

    window.addEventListener(
        "popstate",
        () => {

            restaurarRutaDesdeURL()
                .catch(error =>
                    console.error(
                        "Error restaurando navegación:",
                        error
                    )
                );

        }
    );

    const destino =
        router.obtenerDestinoURL();

    window.history.replaceState(
        {
            ruta: destino.ruta,
            datos: destino.datos
        },
        "",
        window.location.href
    );

}

async function restaurarRutaDesdeURL() {

    const destino =
        router.obtenerDestinoURL();

    if (
        destino.ruta === "portada" ||
        destino.ruta === "historia" ||
        destino.ruta === "dia"
    ) {

        const id =
            destino.datos?.novenaId;

        if (!id) {

            router.ir(
                "biblioteca",
                null,
                {
                    actualizarURL: false
                }
            );

            return;

        }

        if (
            !state.novenaActual ||
            state.novenaActual.id !== id
        ) {

            await cargarNovena(id);

        }

        if (!state.novenaActual) {

            router.ir(
                "biblioteca",
                null,
                {
                    actualizarURL: false
                }
            );

            return;

        }

        if (destino.ruta === "portada") {

            router.ir(
                "portada",
                {
                    novenaId: id
                },
                {
                    actualizarURL: false
                }
            );

            return;

        }

        if (destino.ruta === "historia") {

            router.ir(
                "historia",
                {
                    novenaId: id
                },
                {
                    actualizarURL: false
                }
            );

            return;

        }

        router.ir(
            "dia",
            {
                novenaId: id,
                dia: destino.datos?.dia || 1
            },
            {
                actualizarURL: false
            }
        );

        return;

    }

    router.ir(
        destino.ruta,
        null,
        {
            actualizarURL: false
        }
    );

}
