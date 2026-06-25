function navegar(ruta) {

    switch(ruta) {

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