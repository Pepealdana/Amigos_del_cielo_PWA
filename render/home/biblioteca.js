/* ==========================================
   RENDER BIBLIOTECA
========================================== */

function renderBiblioteca(catalogo) {

    return `

        <section class="library">

            <h2 class="library-title">

                Biblioteca de Novenas

            </h2>

            ${catalogo.map(

                novena => `

                    <article
                        class="novena-card">

                        <img

                            src="${novena.image}"

                            alt="${novena.name}"

                            class="novena-card-image">

                        <div
                            class="novena-card-content">

                            <h3>

                                ${novena.name}

                            </h3>

                            <p>

                                ${novena.title}

                            </p>

                            ${crearBoton(

                                "Abrir",

                                `abrirNovena('${novena.id}')`

                            )}

                        </div>

                    </article>

                `

            ).join("")}

        </section>

    `;

}