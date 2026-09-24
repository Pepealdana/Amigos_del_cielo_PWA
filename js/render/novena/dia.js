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
        item => Number(item.day) === Number(numeroDia)
    );

    if (!dia) {
        return crearEmptyState(
            "El día solicitado no existe."
        );
    }

    const total =
        Number(novena?.novena?.days) ||
        APP_CONFIG.diasNovena;

    const estadoCalendario =
        obtenerEstadoNovena(novena.feast);

    const mensajeCalendario =
        estadoCalendario?.estado === "en-curso"
            ? `Calendario litúrgico · Día ${estadoCalendario.dia} de ${total}`
            : "";

    const anteriorDisponible =
        numeroDia > 1;

    const siguienteDisponible =
        numeroDia < total &&
        Boolean(
            novena.days.find(
                item => Number(item.day) === Number(numeroDia) + 1
            )
        );

    return `

        <section class="home">

            ${renderCabeceraNovena(novena)}

            ${crearBadge(
                "Día " + dia.day + " de " + total
            )}

            ${mensajeCalendario ? `
                <p class="calendar-status">
                    ${escaparHTML(mensajeCalendario)}
                </p>
            ` : ""}

            <h3>
                ${escaparHTML(dia.title)}
            </h3>

            ${crearChip(
                escaparHTML(dia.virtue || "")
            )}

            <div class="divider"></div>

            ${dia.life?.text
                ? renderOracion(
                    "Conozcamos su vida",
                    dia.life.text
                )
                : ""}

            ${dia.learning?.text
                ? renderOracion(
                    "¿Qué podemos aprender?",
                    dia.learning.text
                )
                : ""}

            ${dia.reflection
                ? renderOracion(
                    "Reflexión",
                    dia.reflection
                )
                : ""}

            ${dia.intention?.text
                ? renderOracion(
                    "Intención del día",
                    dia.intention.text
                )
                : ""}

            ${dia.prayer?.text
                ? renderOracion(
                    "Oración del día",
                    dia.prayer.text
                )
                : (dia.prayer
                    ? renderOracion(
                        "Oración",
                        dia.prayer
                    )
                    : "")}

            ${dia.action
                ? renderListaSeccion(
                    "Compromiso del día",
                    [dia.action]
                )
                : ""}

            <div class="button-group">

                <button
                    class="btn btn-secondary"
                    type="button"
                    data-action="previous-day"
                    ${anteriorDisponible ? "" : "disabled"}>
                    ← Anterior
                </button>

                <button
                    class="btn btn-primary"
                    type="button"
                    data-action="next-day"
                    ${siguienteDisponible ? "" : "disabled"}>
                    Siguiente →
                </button>

            </div>

        </section>

    `;
}
