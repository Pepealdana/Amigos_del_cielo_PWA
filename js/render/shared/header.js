/* ==========================================
   HEADER
   Amigos del Cielo
========================================== */

/**
 * Crea el encabezado de una sección.
 *
 * @param {string} titulo
 * @param {string} subtitulo
 * @param {string} icono
 * @returns {string}
 */

function renderHeader(

    titulo,

    subtitulo = "",

    icono = ""

) {

    return `

        <header class="page-header">

            ${

                icono

                    ? `

                    <div class="page-header-icon">

                        ${escaparHTML(icono)}

                    </div>

                    `

                    : ""

            }

            <h2 class="page-title">

                ${escaparHTML(titulo)}

            </h2>

            ${

                subtitulo

                    ? `

                    <p class="page-subtitle">

                        ${escaparHTML(subtitulo)}

                    </p>

                    `

                    : ""

            }

        </header>

    `;

}

/**
 * Alias para mantener
 * consistencia con los
 * demás componentes.
 */

const crearHeader = renderHeader;