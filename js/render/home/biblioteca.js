/* ==========================================
   RENDER BIBLIOTECA
========================================== */

function renderBiblioteca(catalogo) {

    if (!catalogo || catalogo.length === 0) {

        return `

            <section class="library">

                <h2 class="library-title">

                    Biblioteca de Novenas

                </h2>

                ${crearEmptyState(

                    "No hay novenas disponibles."

                )}

            </section>

        `;

    }

    return `

        <section class="library">

            <h2 class="library-title">

                Biblioteca de Novenas

            </h2>

            <p class="library-subtitle">

                Explora las novenas disponibles
                y acompaña tu vida espiritual
                durante todo el año.

            </p>

            <div class="library-grid">

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

                                <span
                                    class="novena-category">

                                    ${novena.category}

                                </span>

                                <h3>

                                    ${novena.name}

                                </h3>

                                <p>

                                    ${novena.title}

                                </p>

                                <p
                                    class="novena-feast">

                                    📅
                                    ${formatearFechaLiturgica(
                                        novena.feast
                                    )}

                                </p>

                                <button
                                    class="btn-primary btn-abrir-novena"
                                    data-id="${novena.id}">

                                    Abrir novena

                                </button>

                            </div>

                        </article>

                    `

                ).join("")}

            </div>

        </section>

    `;

}