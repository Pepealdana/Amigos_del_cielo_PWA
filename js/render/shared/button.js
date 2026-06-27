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
 * @returns {string}
 */

function crearBoton(

    texto,

    accion = "",

    tipo = "primary",

    icono = ""

) {

    const contenido = icono
        ? `${icono} ${texto}`
        : texto;

    const atributoAccion = accion
        ? `onclick="${accion}"`
        : "";

    return `

        <button

            class="btn btn-${tipo}"

            ${atributoAccion}

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