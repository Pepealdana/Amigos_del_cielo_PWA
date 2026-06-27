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

                src="${novena.image}"

                alt="${novena.name}"

                class="novena-card-image"

                loading="lazy">

            <div class="novena-card-content">

                <h3>

                    ${novena.name}

                </h3>

                <p class="novena-card-title">

                    ${novena.title}

                </p>

                ${

                    festividad

                        ? `

                        <p class="novena-card-feast">

                            📅 ${festividad}

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

                    `abrirNovena('${novena.id}')`

                )}

            </div>

        </article>

    `;

}

/**
 * Alias para mantener consistencia.
 */

const crearCard = renderCard;