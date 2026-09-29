/* ==========================================
   CARD
   Amigos del Cielo
========================================== */

/**
 * Crea una tarjeta de una novena.
 *
 * @param {Object} novena
 * @returns {string}
 */

function renderCard(novena) {

    const festividad =

        novena.feast?.text ||

        novena.feast ||

        "";

    return `

        <article class="novena-card">

            <img

                src="${escaparHTML(novena.image)}"

                alt="${escaparHTML(novena.name)}"

                class="novena-card-image"

                loading="lazy">

            <div class="novena-card-content">

                <h3>

                    ${escaparHTML(novena.name)}

                </h3>

                <p class="novena-card-title">

                    ${escaparHTML(novena.title)}

                </p>

                ${

                    festividad

                        ? `

                        <p class="novena-card-feast">

                            📅 ${escaparHTML(festividad)}

                        </p>

                        `

                        : ""

                }

                ${

                    novena.featured

                        ? crearBadge(

                            "Destacada",

                            "gold"

                        )

                        : ""

                }

                ${crearBoton(

                    "Abrir Novena",

                    `abrirNovena('${escaparHTML(novena.id)}')`

                )}

            </div>

        </article>

    `;

}

/**
 * Alias para mantener consistencia.
 */

const crearCard = renderCard;