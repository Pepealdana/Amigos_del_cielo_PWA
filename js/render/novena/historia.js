/* ==========================================
   HISTORIA
========================================== */

function renderHistoria(novena) {

    if (!novena) {

        return crearEmptyState(

            "No fue posible cargar la historia."

        );

    }

    const historiaBreve =
        novena.history?.short || "";

    const historiaExtendida =
        novena.history?.extended ||
        historiaBreve;

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

                historiaBreve

            )}

            <section class="history-extended">

                <button
                    class="history-extended-toggle"
                    type="button"
                    data-action="toggle-extended-history"
                    aria-expanded="false"
                    aria-controls="historia-extendida-contenido">

                    <span>
                        Historia extendida
                    </span>

                    <span
                        class="history-extended-icon"
                        aria-hidden="true">
                        ▾
                    </span>

                </button>

                <div
                    id="historia-extendida-contenido"
                    class="history-extended-content"
                    hidden>

                    <div class="history">

                        <p>
                            ${escaparHTML(historiaExtendida)}
                        </p>

                    </div>

                </div>

            </section>

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
                    class="btn btn-secondary"
                    type="button"
                    data-route="portada">

                    ← Volver

                </button>

                <button
                    class="btn btn-primary"
                    type="button"
                    data-action="start-novena">

                    Comenzar novena

                </button>

            </div>

        </section>

    `;

}