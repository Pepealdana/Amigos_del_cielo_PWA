/* ==========================================
   MI PROGRESO
========================================== */

function renderProgreso(progreso = []) {

    if (!progreso || progreso.length === 0) {

        return `

            <section class="home">

                <h2>

                    📖 Mi progreso

                </h2>

                <p>

                    Aquí podrás continuar
                    las novenas que hayas
                    comenzado.

                </p>

                ${crearEmptyState(

                    "Todavía no has iniciado ninguna novena."

                )}

            </section>

        `;

    }

    return `

        <section class="library">

            <h2 class="library-title">

                📖 Mi progreso

            </h2>

            <p class="library-subtitle">

                Continúa tus novenas exactamente
                donde las dejaste.

            </p>

            <div class="library-grid">

                ${progreso.map(

                    item => `

                        <article class="novena-card">

                            <img

                                src="${item.image}"

                                alt="${item.name}"

                                class="novena-card-image">

                            <div class="novena-card-content">

                                <span class="novena-category">

                                    Día ${item.day} de ${APP_CONFIG.diasNovena}

                                </span>

                                <h3>

                                    ${item.name}

                                </h3>

                                <p>

                                    ${item.title}

                                </p>

                                <button
                                    class="btn-primary btn-continuar-novena"
                                    data-id="${item.id}">

                                    Continuar

                                </button>

                            </div>

                        </article>

                    `

                ).join("")}

            </div>

        </section>

    `;

}