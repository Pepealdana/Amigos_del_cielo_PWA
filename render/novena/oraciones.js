/* ==========================================
   ORACIONES
========================================== */

function renderOracion(texto, titulo) {

    return `

        <section class="home">

            <h2>

                ${titulo}

            </h2>

            <div class="history">

                <p>

                    ${texto}

                </p>

            </div>

        </section>

    `;

}