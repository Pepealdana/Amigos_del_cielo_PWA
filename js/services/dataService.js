/* ==========================================
   DATA SERVICE
   Amigos del Cielo
========================================== */

/* ==========================================
   CARGAR CATÁLOGO
========================================== */

async function cargarCatalogo() {

    try {

        const response = await fetch(

            "./data/novenas.json"

        );

        if (!response.ok) {

            throw new Error(

                `Error ${response.status}`

            );

        }

        state.catalogo =

            await response.json();

        return state.catalogo;

    }

    catch (error) {

        console.error(

            "Error cargando catálogo:",

            error

        );

        state.catalogo = [];

        return [];

    }

}

/* ==========================================
   CARGAR NOVENA
========================================== */

async function cargarNovena(id) {

    try {

        const novena =

            state.catalogo.find(

                item => item.id === id

            );

        if (!novena) {

            throw new Error(

                `No existe la novena "${id}".`

            );

        }

        const response =

            await fetch(

                novena.file

            );

        if (!response.ok) {

            throw new Error(

                `Error ${response.status}`

            );

        }

        state.novenaActual =

            await response.json();

        state.diaActual = 1;

        return state.novenaActual;

    }

    catch (error) {

        console.error(

            "Error cargando novena:",

            error

        );

        state.novenaActual = null;

        return null;

    }

}

/* ==========================================
   OBTENER DÍA
========================================== */

function obtenerDia(numeroDia) {

    if (

        !state.novenaActual ||

        !state.novenaActual.days

    ) {

        return null;

    }

    return state.novenaActual.days.find(

        dia => dia.day === numeroDia

    );

}

/* ==========================================
   CAMBIAR DÍA
========================================== */

function cambiarDia(numeroDia) {

    state.diaActual = numeroDia;

    return obtenerDia(numeroDia);

}