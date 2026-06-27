/* ==========================================
   EMPTY STATE
   Amigos del Cielo
========================================== */

/**
 * Crea un estado vacío.
 *
 * @param {string} titulo
 * @param {string} mensaje
 * @param {string} icono
 * @returns {string}
 */

function renderEmptyState(

    titulo,

    mensaje,

    icono = "📭"

) {

    return `

        <section class="empty-state">

            <div class="empty-state-icon">

                ${icono}

            </div>

            <h2>

                ${titulo}

            </h2>

            <p>

                ${mensaje}

            </p>

        </section>

    `;

}

/**
 * Alias para mantener
 * consistencia con los
 * demás componentes.
 */

const crearEmptyState = renderEmptyState;