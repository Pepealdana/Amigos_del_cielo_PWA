/* ==========================================
   RENDER DÍA DE NOVENA
========================================== */

function renderDia(
    novena,
    numeroDia
) {

    if (!novena) {

        return crearEmptyState(

            "No fue posible cargar la novena."

        );

    }

    const dia = novena.days.find(

        item => item.day === numeroDia

    );

    if (!dia) {

        return crearEmptyState(

            "El día solicitado no existe."

        );

    }

    return `

        <section class="home">

            ${renderCabeceraNovena(

                novena

            )}

            ${crearBadge(

                "Día " +
                dia.day +
                " de " +
                APP_CONFIG.diasNovena

            )}

            <h3>

                ${dia.title}

            </h3>

            ${crearChip(

                dia.virtue

            )}

            <div class="divider"></div>

            ${renderOracion(

                "Reflexión",

                dia.reflection

            )}

            <div class="divider"></div>

            ${renderOracion(

                "Oración",

                dia.prayer

            )}

            <div class="divider"></div>

            ${renderListaSeccion(

                "Compromiso del día",

                [

                    dia.action

                ]

            )}

            <div class="button-group">

                <button
                    class="btn-secondary"
                    id="btn-dia-anterior">

                    ← Anterior

                </button>

                <button
                    class="btn-primary"
                    id="btn-dia-siguiente">

                    Siguiente →

                </button>

            </div>

        </section>

    `;

}