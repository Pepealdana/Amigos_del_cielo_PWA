/* ==========================================
   CONFIGURACIÓN
   Amigos del Cielo
========================================== */

function renderConfiguracion() {

    const recordatorios =
        Object.values(state.recordatorios || {});

    const recordatorioActivo =
        recordatorios.find(item => item.activo) || null;

    const hora =
        recordatorioActivo?.hora ||
        state.configuracion.horaRecordatorio ||
        "19:00";

    const novenaSeleccionada =
        recordatorioActivo?.novenaId ||
        state.ultimaNovenaId ||
        state.catalogo[0]?.id ||
        "";

    const notificacionesDisponibles =
        "Notification" in window;

    return `

        <section class="page-shell">

            <header class="page-header">
                <h2 class="page-title">
                    Configuración
                </h2>

                <p class="page-subtitle">
                    Personaliza tus recordatorios y la experiencia
                    de oración.
                </p>
            </header>

            <section class="simple-panel settings-panel">

                <h3>
                    Recordatorio de novena
                </h3>

                <p>
                    Elige una novena y una hora para recibir un
                    recordatorio durante sus nueve días de oración.
                </p>

                <form
                    id="recordatorio-form"
                    class="settings-form">

                    <label for="recordatorio-novena">
                        Novena
                    </label>

                    <select
                        id="recordatorio-novena"
                        name="novena"
                        required>

                        <option value="">
                            Selecciona una novena
                        </option>

                        ${state.catalogo.map(novena => `
                            <option
                                value="${escaparHTML(novena.id)}"
                                ${novena.id === novenaSeleccionada ? "selected" : ""}>
                                ${escaparHTML(novena.name)}
                            </option>
                        `).join("")}

                    </select>

                    <label for="recordatorio-hora">
                        Hora del recordatorio
                    </label>

                    <input
                        id="recordatorio-hora"
                        name="hora"
                        type="time"
                        value="${escaparHTML(hora)}"
                        required>

                    <label class="setting-check">
                        <input
                            id="recordatorio-activo"
                            name="activo"
                            type="checkbox"
                            ${recordatorioActivo?.activo ? "checked" : ""}>
                        <span>
                            Activar recordatorio
                        </span>
                    </label>

                    <button
                        class="btn btn-primary"
                        type="submit">
                        Guardar recordatorio
                    </button>

                </form>

                <p
                    id="recordatorio-aviso"
                    class="form-feedback"
                    role="status"
                    hidden>
                </p>

                <p class="form-note">
                    ${notificacionesDisponibles
                        ? "La aplicación solicitará permiso para mostrar notificaciones."
                        : "Este navegador no ofrece notificaciones web compatibles."
                    }
                </p>

                <p class="form-note">
                    En una PWA web, el navegador no garantiza que una
                    alarma local se ejecute exactamente a una hora
                    determinada cuando la aplicación está completamente
                    cerrada. El recordatorio funciona mientras la PWA
                    permanece activa; para notificaciones exactas en
                    segundo plano sería necesario incorporar Web Push
                    con un servicio de entrega.
                </p>

                <button
                    class="btn btn-secondary"
                    type="button"
                    data-action="remove-reminder">
                    Desactivar recordatorio
                </button>

            </section>

            <section class="simple-panel">

                <h3>
                    Apariencia
                </h3>

                <p>
                    Tema claro disponible. El tema oscuro queda
                    preparado para una futura versión.
                </p>

            </section>

            <section class="simple-panel">

                <h3>
                    Aplicación
                </h3>

                <ul class="settings-list">
                    <li>Uso sin conexión.</li>
                    <li>Guardado local del progreso.</li>
                    <li>Gestión de favoritos.</li>
                    <li>Calendario de festividades y novenas.</li>
                </ul>

            </section>

            <p class="version">
                Versión ${APP_CONFIG.version}
            </p>

        </section>

    `;

}
