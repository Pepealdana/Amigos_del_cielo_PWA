/**
 * ============================================
 * SERVICIO DE DATOS
 * ============================================
 */

async function cargarCatalogo() {

    try {

        const response = await fetch("./data/novenas.json");

        if (!response.ok) {

            throw new Error(
                `Error ${response.status}`
            );

        }

        estado.catalogo = await response.json();

        return estado.catalogo;

    } catch (error) {

        console.error(
            "Error cargando catálogo:",
            error
        );

        return [];

    }

}

async function cargarNovena(id) {

    const novena = estado.catalogo.find(

        item => item.id === id

    );

    if (!novena) {

        return null;

    }

    try {

        const response = await fetch(

            novena.file

        );

        if (!response.ok) {

            throw new Error(
                `Error ${response.status}`
            );

        }

        estado.novenaActual =

            await response.json();

        estado.diaActual = 1;

        return estado.novenaActual;

    }

    catch(error){

        console.error(error);

        return null;

    }

}