/* ==========================================
   BUTTON
   Amigos del Cielo
========================================== */

/**
 * Crea un botón reutilizable.
 *
 * @param {string} texto
 * @param {string} accion
 * @param {string} tipo
 * @param {string} icono
 * @param {string} id
 * @returns {string}
 */

function crearBoton(

    texto,

    accion = "",

    tipo = "primary",

    icono = "",

    id = ""

) {

    const contenido = icono
        ? `${escaparHTML(icono)} ${escaparHTML(texto)}`
        : escaparHTML(texto);

    const atributosAccion = accion
        ? `
            data-action="${escaparHTML(accion)}"
            ${id ? `data-id="${escaparHTML(id)}"` : ""}
        `
        : "";

    return `

        <button

            class="btn btn-${escaparHTML(tipo)}"

            ${atributosAccion}

            type="button">

            ${contenido}

        </button>

    `;

}

/**
 * Alias para mantener consistencia
 * con otros componentes.
 */

const renderBoton = crearBoton;