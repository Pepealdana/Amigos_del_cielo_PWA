/* ==========================================
   COMPARTIR
   Amigos del Cielo
========================================== */

/**
 * Devuelve la URL pública de la aplicación.
 * Conserva la ruta de GitHub Pages y elimina
 * parámetros internos que no forman parte del enlace.
 */
function obtenerUrlApp() {

    const url = new URL(window.location.href);

    url.search = "";
    url.hash = "";

    return url.href;

}

/**
 * Construye un enlace directo a una novena.
 * La aplicación ya reconoce el parámetro ?novena=
 * durante su inicialización.
 */
function obtenerUrlNovena(novenaId) {

    if (!novenaId) {
        return obtenerUrlApp();
    }

    const url = new URL(
        obtenerUrlApp()
    );

    url.searchParams.set(
        "novena",
        novenaId
    );

    return url.href;

}

/**
 * Comparte contenido mediante el sistema nativo
 * del dispositivo. Si no existe Web Share API,
 * copia el texto al portapapeles.
 */
async function compartirContenido({
    titulo = "Amigos del Cielo",
    texto = "",
    url = obtenerUrlApp()
} = {}) {

    const datos = {
        title: titulo,
        text: texto,
        url
    };

    if (
        typeof navigator.share === "function"
    ) {

        try {

            await navigator.share(datos);

            return {
                compartido: true,
                metodo: "nativo"
            };

        } catch (error) {

            if (error?.name === "AbortError") {

                return {
                    compartido: false,
                    cancelado: true
                };

            }

        }

    }

    const contenido = [
        texto,
        url
    ]
        .filter(Boolean)
        .join("\n\n");

    const copiado =
        await copiarTexto(contenido);

    return {
        compartido: copiado,
        metodo: "portapapeles"
    };

}

/**
 * Comparte una novena concreta.
 */
async function compartirNovena(novena) {

    if (!novena?.id) {
        return false;
    }

    const url =
        obtenerUrlNovena(novena.id);

    const texto = [
        `Te comparto la Novena a ${novena.name} en Amigos del Cielo.`,
        "Camina junto a los santos cada día."
    ].join("\n\n");

    return compartirContenido({
        titulo: `Novena a ${novena.name}`,
        texto,
        url
    });

}

/**
 * Comparte la aplicación completa.
 */
async function compartirAplicacion() {

    const url =
        obtenerUrlApp();

    const texto =
        "Te comparto Amigos del Cielo, una aplicación para caminar junto a los santos y acompañar la oración cada día.";

    return compartirContenido({
        titulo: "Amigos del Cielo",
        texto,
        url
    });

}

/**
 * Copia texto usando la API moderna cuando está disponible.
 * Incluye un método alternativo para navegadores antiguos.
 */
async function copiarTexto(texto) {

    if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    ) {

        try {

            await navigator.clipboard.writeText(
                texto
            );

            return true;

        } catch (error) {

            console.warn(
                "No fue posible usar el portapapeles:",
                error
            );

        }

    }

    try {

        const textarea =
            document.createElement("textarea");

        textarea.value = texto;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(
            textarea
        );

        textarea.select();

        const resultado =
            document.execCommand("copy");

        textarea.remove();

        return resultado;

    } catch (error) {

        console.warn(
            "No fue posible copiar el enlace:",
            error
        );

        return false;

    }

}
