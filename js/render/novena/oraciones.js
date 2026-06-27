/* ==========================================
   RENDER ORACIÓN
   Amigos del Cielo
========================================== */

/**
 * Renderiza cualquier oración de la aplicación.
 *
 * Puede utilizarse para:
 * - Oración inicial
 * - Oración final
 * - Oración del día
 * - Oraciones especiales
 *
 * @param {string} titulo
 * @param {string} texto
 * @returns {string}
 */

function renderOracion(titulo, texto) {

    return `

        <section class="novena-page">

            ${crearHeaderPagina(
                titulo
            )}

            <article class="prayer-card">

                <div class="prayer-text">

                    <p>

                        ${texto}

                    </p>

                </div>

            </article>

            <div class="button-group">

                ${crearBotonSecundario(

                    "Volver",

                    "mostrarPortadaNovena()"

                )}

            </div>

        </section>

    `;

}

/* ==========================================
   ORACIÓN INICIAL
========================================== */

function renderOracionInicial(novena) {

    return renderOracion(

        "Oración Inicial",

        novena.openingPrayer

    );

}

/* ==========================================
   ORACIÓN FINAL
========================================== */

function renderOracionFinal(novena) {

    return renderOracion(

        "Oración Final",

        novena.closingPrayer

    );

}