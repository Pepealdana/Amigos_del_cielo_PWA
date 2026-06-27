/* ==========================================
   CONFIGURACIÓN
========================================== */

function renderConfiguracion() {

    return `

        <section class="home">

            <h2>

                ⚙ Configuración

            </h2>

            <p>

                Personaliza la experiencia de
                <strong>${APP_CONFIG.nombre}</strong>.

            </p>

            <div class="divider"></div>

            <h3>

                Apariencia

            </h3>

            <ul class="settings-list">

                <li>

                    🎨 Tema claro (Próximamente)

                </li>

                <li>

                    🌙 Tema oscuro (Próximamente)

                </li>

            </ul>

            <div class="divider"></div>

            <h3>

                Oración

            </h3>

            <ul class="settings-list">

                <li>

                    🔔 Recordatorios diarios (Próximamente)

                </li>

                <li>

                    🔊 Audio de oraciones (Próximamente)

                </li>

            </ul>

            <div class="divider"></div>

            <h3>

                Aplicación

            </h3>

            <ul class="settings-list">

                <li>

                    📱 Uso sin conexión

                </li>

                <li>

                    💾 Guardado automático del progreso

                </li>

                <li>

                    ⭐ Gestión de favoritos

                </li>

            </ul>

            <div class="divider"></div>

            <p class="version">

                Versión ${APP_CONFIG.version}

            </p>

        </section>

    `;

}