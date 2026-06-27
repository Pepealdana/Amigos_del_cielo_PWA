/* ==========================================
   RENDER INICIO
   Amigos del Cielo
========================================== */

function renderInicio(catalogo = []) {

    const destacada =

        catalogo.length > 0

            ? catalogo[0]

            : null;

    if (!destacada) {

        return renderEmptyState(

            "No hay novenas disponibles",

            "Agrega una novena al catálogo para comenzar."

        );

    }

    return `

        <section class="dashboard">

            ${renderHeader(

                "Amigos del Cielo",

                "Camina junto a los santos cada día"

            )}

            <section class="dashboard-card">

                <h2>

                    ⭐ Novena destacada

                </h2>

                <img

                    src="${destacada.image}"

                    alt="${destacada.name}"

                    class="dashboard-image">

                <h3>

                    ${destacada.name}

                </h3>

                <p>

                    ${destacada.title}

                </p>

                ${renderBadge(

                    "Festividad: " +

                    formatearFechaLiturgica(

                        destacada.feast

                    )

                )}

                <div class="button-group">

                    ${crearBoton(

                        "Abrir novena",

                        `abrirNovena('${destacada.id}')`,

                        "primary",

                        "🙏"

                    )}

                </div>

            </section>

            <section class="dashboard-card">

                <h2>

                    ❤️ Continuar novena

                </h2>

                <p>

                    Continúa la última novena
                    que hayas iniciado.

                </p>

                <div class="button-group">

                    ${crearBoton(

                        "Continuar",

                        "continuarNovena()",

                        "secondary",

                        "📖"

                    )}

                </div>

            </section>

            <section class="dashboard-card">

                <h2>

                    ⚡ Accesos rápidos

                </h2>

                <div class="quick-actions">

                    ${crearBoton(

                        "Biblioteca",

                        "router.ir('biblioteca')",

                        "outline",

                        "🙏"

                    )}

                    ${crearBoton(

                        "Favoritas",

                        "router.ir('favoritas')",

                        "outline",

                        "⭐"

                    )}

                    ${crearBoton(

                        "Mi progreso",

                        "router.ir('progreso')",

                        "outline",

                        "📖"

                    )}

                </div>

            </section>

        </section>

    `;

}