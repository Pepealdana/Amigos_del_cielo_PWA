/* ==========================================
   HISTORIA
========================================== */

function renderHistoria(novena) {

    if (!novena) {

        return crearEmptyState(

            "No fue posible cargar la historia."

        );

    }

    return `

        <section class="home">

            ${renderCabeceraNovena(

                novena

            )}

            ${renderFestividad(

                novena

            )}

            <div class="divider"></div>

            ${renderOracion(

                "Historia",

                novena.history.short

            )}

            <div class="divider"></div>

            ${renderPatronazgos(

                novena

            )}

            <div class="divider"></div>

            ${renderVirtudes(

                novena

            )}

            <div class="button-group">

                <button
                    class="btn-secondary"
                    id="btn-volver-portada">

                    ← Volver

                </button>

                <button
                    class="btn-primary"
                    id="btn-comenzar-novena">

                    Comenzar novena

                </button>

            </div>

        </section>

    `;

}