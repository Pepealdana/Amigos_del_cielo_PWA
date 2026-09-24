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
                <strong>Amigos del Cielo</strong> es una aplicación
                gratuita creada para acompañar la oración diaria
                y ayudar a conocer la vida y el testimonio de los santos.
            </p>

            <p>
                Los santos son hombres y mujeres que buscaron seguir a
                <strong>Jesucristo</strong>, imitando su manera de amar,
                servir, perdonar y entregar la vida a Dios. Esta aplicación
                quiere ayudar a caminar junto a ellos, no para sustituir
                la fe ni la vida de la Iglesia, sino para disponer de un
                espacio sencillo de oración y reflexión.
            </p>

            <div class="divider"></div>

            <h3>
                Nuestro propósito
            </h3>

            <p>
                Reunir en un solo lugar novenas y recursos de oración
                para que puedas rezar con mayor facilidad, conocer a
                quienes dieron testimonio de Cristo y llevar sus virtudes
                a las decisiones concretas de cada día.
            </p>

            <div class="divider"></div>

            <h3>
                Sobre los textos de las novenas
            </h3>

            <p>
                <strong>Los textos de las novenas de esta aplicación son
                propios de Amigos del Cielo.</strong> No reproducimos de
                forma literal novenas publicadas por terceros. Esta
                decisión busca respetar los derechos de autor y la
                propiedad intelectual de sus autores y editores.
            </p>

            <p>
                Cada novena conserva, cuando corresponde, el sentido
                espiritual y la tradición de la devoción que representa,
                pero sus reflexiones, oraciones, intenciones y acciones
                han sido redactadas y adaptadas para esta aplicación,
                tomando como referencia fuentes de la Iglesia y
                documentación histórica y devocional.
            </p>

            <p>
                Cuando utilizamos una cita breve o una referencia
                procedente de una fuente, procuramos identificar su
                procedencia. El objetivo es respetar la tradición recibida
                sin presentar como propio un texto que pertenece a otro
                autor.
            </p>

            <div class="divider"></div>

            <h3>
                Una aplicación gratuita
            </h3>

            <p>
                <strong>Amigos del Cielo es gratuita.</strong> Su propósito
                es facilitar el acceso a la oración, sin convertir las
                novenas ni la devoción a los santos en un producto
                comercial.
            </p>

            <p>
                Los santos no ocupan el lugar de Dios. Los contemplamos
                como testigos de la fe y como personas que siguieron a
                Jesucristo. Su ejemplo nos recuerda que la oración debe
                conducir también al amor, al servicio, al perdón y a una
                vida coherente con el Evangelio.
            </p>

            <div class="divider"></div>

            <h3>
                Características
            </h3>

            <ul class="feature-list">

                <li>📖 Novenas organizadas en nueve días.</li>

                <li>🙏 Oraciones, reflexiones e intenciones propias.</li>

                <li>⭐ Santos y devociones organizados por festividad.</li>

                <li>❤️ Favoritos.</li>

                <li>📅 Seguimiento del progreso de cada novena.</li>

                <li>📱 Aplicación PWA adaptable a dispositivos móviles.</li>

                <li>☁️ Contenido preparado para poder utilizarse también sin conexión.</li>

            </ul>

            <div class="divider"></div>

            <h3>
                Participa
            </h3>

            <p>
                ¿Tienes una sugerencia para mejorar la aplicación
                o te gustaría proponer un santo para una futura novena?
                Puedes enviarnos tu propuesta desde la sección
                <strong>Participa</strong>.
            </p>

            <button
                class="btn btn-primary"
                type="button"
                data-route="participa">
                Participa o sugiere un santo
            </button>

            <div class="divider"></div>

            <p class="version">
                Versión
                ${APP_CONFIG.version}
            </p>

        </section>

    `;

}