function navegar(ruta) {

    const menu =
        document.getElementById(
            "side-menu"
        );

    const overlay =
        document.getElementById(
            "menu-overlay"
        );

    if (menu) {

        menu.classList.remove(
            "open"
        );

    }

    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }

    switch (ruta) {

        case "inicio":

            mostrarInicio();

            break;

        case "biblioteca":

            mostrarBiblioteca();

            break;

        case "favoritas":

            mostrarFavoritas();

            break;

        case "progreso":

            mostrarProgreso();

            break;

        case "configuracion":

            mostrarConfiguracion();

            break;

        case "acerca":

            mostrarAcerca();

            break;

        default:

            mostrarInicio();

    }

}