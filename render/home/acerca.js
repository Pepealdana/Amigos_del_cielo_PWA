/* ==========================================
   ACERCA DE
========================================== */

function renderAcerca() {

    return `

        <section class="home">

            <h2>

                ℹ Acerca de

            </h2>

            <p>

                <strong>Amigos del Cielo</strong>
                es una aplicación gratuita
                dedicada a la oración,
                el conocimiento de los santos
                y el acompañamiento espiritual
                mediante novenas y otras
                devociones de la Iglesia Católica.

            </p>

            <div class="divider"></div>

            <h3>

                Objetivo

            </h3>

            <p>

                Facilitar un espacio sencillo,
                bello y accesible para acercarse
                a Dios a través del ejemplo
                de los santos y la oración diaria.

            </p>

            <div class="divider"></div>

            <h3>

                Características

            </h3>

            <ul class="feature-list">

                <li>📖 Novenas completas.</li>

                <li>🙏 Oraciones tradicionales.</li>

                <li>⭐ Santos organizados por festividad.</li>

                <li>❤️ Favoritos.</li>

                <li>📅 Continuación automática del progreso.</li>

                <li>📱 Aplicación PWA para usar sin conexión.</li>

            </ul>

            <div class="divider"></div>

            <p class="version">

                Versión
                ${APP_CONFIG.version}

            </p>

        </section>

    `;

}