/* ==========================================
   LISTA
   Amigos del Cielo
========================================== */

/**
 * Crea una lista.
 *
 * @param {Array<string>} items
 * @param {string} titulo
 * @returns {string}
 */

function renderLista(

    items = [],

    titulo = ""

) {

    if (

        !Array.isArray(items) ||

        items.length === 0

    ) {

        return "";

    }

    return `

        <section class="list-section">

            ${

                titulo

                    ? `

                    <h3 class="list-title">

                        ${escaparHTML(titulo)}

                    </h3>

                    `

                    : ""

            }

            <ul class="list">

                ${

                    items

                        .map(

                            item => `

                                <li>

                                    ${escaparHTML(item)}

                                </li>

                            `

                        )

                        .join("")

                }

            </ul>

        </section>

    `;

}

/**
 * Alias para mantener
 * consistencia.
 */

const crearLista = renderLista;