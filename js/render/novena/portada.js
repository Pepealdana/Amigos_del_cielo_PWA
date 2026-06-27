/* ==========================================
   PORTADA DE NOVENA
   Amigos del Cielo
========================================== */

/**
 * Renderiza la portada principal
 * de una novena.
 *
 * @param {Object} novena
 * @returns {string}
 */

function renderPortadaNovena(novena) {

    return `

        <section class="novena-page">

            ${crearImagen(

                novena.image,

                novena.name

            )}

            ${crearTitulo(

                novena.name

            )}

            <p class="saint-subtitle">

                ${novena.subtitle}

            </p>

            <p class="saint-title">

                ${novena.title}

            </p>

            <p class="saint-feast">

                📅 ${novena.feast.text}

            </p>

            <p class="saint-description">

                ${novena.description}

            </p>

            ${crearDivider()}

            <blockquote class="saint-quote">

                <p>

                    "${novena.quote.text}"

                </p>

                <footer>

                    ${novena.quote.reference}

                </footer>

            </blockquote>

            ${renderListaSeccion(

                "Patronazgos",

                novena.patronages

            )}

            ${renderListaSeccion(

                "Virtudes",

                novena.virtues

            )}

            <div class="button-group">

                ${crearBotonSecundario(

                    "Historia",

                    "mostrarHistoria()"

                )}

                ${crearBotonPrimario(

                    "Comenzar Novena",

                    "iniciarNovena()"

                )}

            </div>

        </section>

    `;

}