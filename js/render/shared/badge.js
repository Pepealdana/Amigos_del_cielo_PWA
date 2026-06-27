/* ==========================================
   BADGE
   Amigos del Cielo
========================================== */

/**
 * Crea una insignia (badge).
 *
 * @param {string} texto
 * @param {string} tipo
 * @returns {string}
 */

function renderBadge(

    texto,

    tipo = "primary"

) {

    return `

        <span class="badge badge-${tipo}">

            ${texto}

        </span>

    `;

}

/**
 * Alias para mantener consistencia
 * con el resto de componentes.
 */

const crearBadge = renderBadge;