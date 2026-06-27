/* ==========================================
   FAVORITAS
========================================== */

function renderFavoritas(favoritas = []) {

    if (!favoritas || favoritas.length === 0) {

        return `

            <section class="home">

                <h2>

                    ❤️ Favoritas

                </h2>

                <p>

                    Guarda aquí tus novenas
                    preferidas para acceder
                    rápidamente a ellas.

                </p>

                ${crearEmptyState(

                    "Todavía no tienes novenas favoritas."

                )}

            </section>

        `;

    }

    return `

        <section class="library">

            <h2 class="library-title">

                ❤️ Mis Favoritas

            </h2>

            <p class="library-subtitle">

                Tus novenas marcadas como favoritas.

            </p>

            <div class="library-grid">

                ${favoritas.map(

                    novena => `

                        <article class="novena-card">

                            <img

                                src="${novena.image}"

                                alt="${novena.name}"

                                class="novena-card-image">

                            <div class="novena-card-content">

                                <span class="novena-category">

                                    ${novena.category}

                                </span>

                                <h3>

                                    ${novena.name}

                                </h3>

                                <p>

                                    ${novena.title}

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