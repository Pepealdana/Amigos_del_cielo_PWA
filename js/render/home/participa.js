/* ==========================================
   PARTICIPA
   Amigos del Cielo
========================================== */

function renderParticipa() {

    return `

        <section class="page-shell participa-page">

            <div class="page-header">

                <p class="eyebrow">Amigos del Cielo</p>

                <h2 class="page-title">
                    Participa
                </h2>

                <p class="page-subtitle">
                    Tu sugerencia puede ayudar a enriquecer
                    futuras versiones de la aplicación.
                </p>

            </div>

            <div class="simple-panel participa-intro">

                <h3>
                    ¿Qué quieres proponernos?
                </h3>

                <p>
                    Puedes sugerir un santo para una futura novena,
                    compartir una idea o informar de un detalle que
                    podamos mejorar.
                </p>

                <p class="form-note">
                    El formulario no almacena tus datos en la aplicación.
                    Al enviarlo, se abrirá tu aplicación de correo con
                    el mensaje preparado para que puedas revisarlo antes
                    de enviarlo.
                </p>

            </div>

            <form
                id="participa-form"
                class="simple-panel participa-form"
                novalidate>

                <label for="participa-tipo">
                    Tipo de sugerencia
                </label>

                <select
                    id="participa-tipo"
                    name="tipo"
                    required>

                    <option value="">
                        Selecciona una opción
                    </option>

                    <option value="Sugerencia de un santo">
                        Sugerir un santo
                    </option>

                    <option value="Mejora de la aplicación">
                        Proponer una mejora
                    </option>

                    <option value="Corrección de contenido">
                        Informar una corrección
                    </option>

                    <option value="Otro">
                        Otro
                    </option>

                </select>

                <label for="participa-nombre">
                    Tu nombre
                    <span class="optional">(opcional)</span>
                </label>

                <input
                    id="participa-nombre"
                    name="nombre"
                    type="text"
                    maxlength="80"
                    autocomplete="name"
                    placeholder="¿Cómo te llamas?">

                <label for="participa-correo">
                    Tu correo
                    <span class="optional">(opcional)</span>
                </label>

                <input
                    id="participa-correo"
                    name="correo"
                    type="email"
                    maxlength="120"
                    autocomplete="email"
                    placeholder="Para poder responderte">

                <label for="participa-mensaje">
                    Tu mensaje
                </label>

                <textarea
                    id="participa-mensaje"
                    name="mensaje"
                    rows="6"
                    maxlength="1500"
                    required
                    placeholder="Cuéntanos tu sugerencia..."></textarea>

                <p
                    id="participa-aviso"
                    class="form-feedback"
                    role="alert"
                    hidden>
                </p>

                <button
                    class="btn btn-primary"
                    type="submit">
                    Preparar correo
                </button>

            </form>

            <p class="form-note participa-privacy">
                No incluyas contraseñas, datos bancarios ni información
                personal sensible. La aplicación solo prepara un correo
                en tu dispositivo; el envío queda bajo tu control.
            </p>

        </section>

    `;

}