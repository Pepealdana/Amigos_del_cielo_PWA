/* ==========================================
   CARD NOVENA
========================================== */

function renderCard(novena){

    return `

        <article class="novena-card">

            <img

                src="${novena.image}"

                alt="${novena.name}"

                class="novena-card-image">

            <div class="novena-card-content">

                <h3>

                    ${novena.name}

                </h3>

                <p>

                    ${novena.title}

                </p>

                <button

                    onclick="abrirNovena('${novena.id}')">

                    Abrir Novena

                </button>

            </div>

        </article>

    `;

}