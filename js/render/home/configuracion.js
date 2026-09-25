/* ==========================================
   CONFIGURACIÓN
   Amigos del Cielo
========================================== */

function renderConfiguracion() {

    const temaActual =
        state.configuracion?.tema || "claro";

    return `
        <section class="page-shell">

            <header class="page-header">
                <h2 class="page-title">
                    Configuración
                </h2>

                <p class="page-subtitle">
                    Personaliza la apariencia y la experiencia
                    de oración.
                </p>
            </header>

            <section class="simple-panel text-size-panel">

                <h3>
                    Tamaño del texto
                </h3>

                <p>
                    Ajusta el tamaño de los textos de la aplicación
                    según tu comodidad de lectura.
                </p>

                <div
                    class="text-size-options"
                    role="group"
                    aria-label="Tamaño del texto">

                    <button
                        class="btn btn-text-size ${state.configuracion?.tamanoTexto === "pequeno" ? "active" : ""}"
                        type="button"
                        data-action="text-size"
                        data-size="pequeno"
                        aria-pressed="${state.configuracion?.tamanoTexto === "pequeno" ? "true" : "false"}">
                        Pequeño
                    </button>

                    <button
                        class="btn btn-text-size ${state.configuracion?.tamanoTexto === "normal" ? "active" : ""}"
                        type="button"
                        data-action="text-size"
                        data-size="normal"
                        aria-pressed="${state.configuracion?.tamanoTexto === "normal" ? "true" : "false"}">
                        Normal
                    </button>

                    <button
                        class="btn btn-text-size ${state.configuracion?.tamanoTexto === "grande" ? "active" : ""}"
                        type="button"
                        data-action="text-size"
                        data-size="grande"
                        aria-pressed="${state.configuracion?.tamanoTexto === "grande" ? "true" : "false"}">
                        Grande
                    </button>

                </div>

            </section>

            <section class="simple-panel appearance-panel">

                <h3>
                    Apariencia
                </h3>

                <p>
                    Elige cómo quieres ver Amigos del Cielo.
                </p>

                <div
                    class="appearance-options"
                    role="radiogroup"
                    aria-label="Apariencia">

                    <button
                        class="appearance-option ${temaActual === "claro" ? "active" : ""}"
                        type="button"
                        data-action="theme"
                        data-theme="claro"
                        role="radio"
                        aria-checked="${temaActual === "claro" ? "true" : "false"}">
                        <span class="appearance-option-title">Claro</span>
                        <span class="appearance-option-description">Usar siempre el tema claro.</span>
                    </button>

                    <button
                        class="appearance-option ${temaActual === "oscuro" ? "active" : ""}"
                        type="button"
                        data-action="theme"
                        data-theme="oscuro"
                        role="radio"
                        aria-checked="${temaActual === "oscuro" ? "true" : "false"}">
                        <span class="appearance-option-title">Oscuro</span>
                        <span class="appearance-option-description">Usar siempre el tema oscuro.</span>
                    </button>

                    <button
                        class="appearance-option ${temaActual === "automatico" ? "active" : ""}"
                        type="button"
                        data-action="theme"
                        data-theme="automatico"
                        role="radio"
                        aria-checked="${temaActual === "automatico" ? "true" : "false"}">
                        <span class="appearance-option-title">Automático</span>
                        <span class="appearance-option-description">Seguir la configuración del dispositivo.</span>
                    </button>

                </div>

            </section>

            <section class="simple-panel">

                <h3>
                    Aplicación
                </h3>

                <ul class="settings-list">
                    <li>Contenido disponible sin conexión después de la primera carga.</li>
                    <li>Guardado local del progreso y favoritos.</li>
                    <li>Calendario de festividades y novenas.</li>
                    <li>Preferencias visuales guardadas en el dispositivo.</li>
                </ul>

            </section>

            <p class="version">
                Versión ${APP_CONFIG.version}
            </p>

        </section>
    `;
}
