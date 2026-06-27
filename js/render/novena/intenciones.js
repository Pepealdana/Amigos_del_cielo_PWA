/* ==========================================
   RENDER INTENCIONES
========================================== */

function renderIntenciones(novena) {

    const intenciones =

        novena.intentions || [

            "Por la Iglesia y el Santo Padre.",

            "Por nuestras familias.",

            "Por los enfermos y quienes sufren.",

            "Por quienes más necesitan la misericordia de Dios.",

            "Por la intención particular con la que realizo esta novena."

        ];

    return `

        <section class="home">

            <h2>

                🙏 Intenciones

            </h2>

            <p>

                Presentemos con confianza nuestras
                necesidades al Señor por intercesión
                de <strong>${novena.name}</strong>.

            </p>

            <div class="divider"></div>

            ${renderListaSeccion(

                "Oremos por:",

                intenciones

            )}

            <div class="divider"></div>

            <p class="text-center">

                Guarda unos instantes de silencio y
                presenta en tu corazón la intención
                particular por la cual realizas esta
                novena.

            </p>

        </section>

    `;

}