/* ==========================================
   LOADER
   Amigos del Cielo
========================================== */

/**
 * Renderiza un indicador de carga.
 *
 * @param {string} mensaje
 * @returns {string}
 */

function renderLoader(

    mensaje = "Cargando..."

) {

    return `

        <section class="loader">

            <div

                class="spinner"

                aria-hidden="true">

            </div>

            <p class="loader-text">

                ${mensaje}

            </p>

        </section>

    `;

}

/**
 * Alias para mantener
 * consistencia.
 */

const crearLoader = renderLoader;