/* ==========================================
   RENDER AGRADECIMIENTO
========================================== */

function renderAgradecimiento(novena) {

    if (!novena) {

        return `

            <section class="home">

                <h2>

                    Gracias

                </h2>

            </section>

        `;

    }

    return `

        <section class="home">

            <img

                src="${novena.image}"

                alt="${novena.name}"

                class="saint-image">

            <h2>

                Novena finalizada

            </h2>

            <p class="saint-title">

                ${novena.name}

            </p>

            <p>

                Gracias por dedicar estos
                nueve días de oración junto
                a <strong>${novena.name}</strong>.

            </p>

            <div class="divider"></div>

            <p>

                Que el ejemplo de
                <strong>${novena.name}</strong>
                fortalezca tu fe, tu esperanza
                y tu caridad cada día.

            </p>

            <div class="divider"></div>

            <p>

                Continúa caminando con Cristo
                y descubre nuevas novenas para
                seguir creciendo espiritualmente.

            </p>

            <div class="button-group">

                <button
                    class="btn-primary"
                    id="btn-volver-inicio">

                    Ir al inicio

                </button>

                <button
                    class="btn-secondary"
                    id="btn-biblioteca">

                    Explorar novenas

                </button>

            </div>

        </section>

    `;

}