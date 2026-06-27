/* ==========================================
   RENDER INICIO
========================================== */

function renderInicio(catalogo) {

    const destacada =
        obtenerNovenaDestacada(
            catalogo
        );

    if (!destacada) {

        return `

            <section class="home">

                <h2>

                    No hay novenas disponibles

                </h2>

            </section>

        `;

    }

    return `

        <section class="home">

            <section class="home-featured">

                <h2>

                    ⭐ Novena destacada

                </h2>

                ${crearImagen(

                    destacada.image,

                    destacada.name

                )}

                ${crearTitulo(

                    destacada.name

                )}

                <p class="saint-title">

                    ${destacada.title}

                </p>

                <p class="saint-feast">

                    Festividad:
                    ${formatearFechaLiturgica(
                        destacada.feast
                    )}

                </p>

                <button
                    class="btn-primary btn-abrir-novena"
                    data-id="${destacada.id}">

                    Abrir novena

                </button>

            </section>

            <section class="home-section">

                <h2>

                    ❤️ Continuar novena

                </h2>

                <p>

                    Continúa la última novena
                    que hayas iniciado.

                </p>

                <button
                    class="btn-secondary"
                    id="btn-continuar">

                    Continuar

                </button>

            </section>

            <section class="home-section">

                <h2>

                    🙏 Accesos rápidos

                </h2>

                <div class="home-actions">

                    <button
                        class="btn-action"
                        id="btn-ir-biblioteca">

                        Biblioteca

                    </button>

                    <button
                        class="btn-action"
                        id="btn-ir-favoritas">

                        Favoritas

                    </button>

                    <button
                        class="btn-action"
                        id="btn-ir-progreso">

                        Mi progreso

                    </button>

                </div>

            </section>

        </section>

    `;

}