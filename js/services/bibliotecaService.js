/* ==========================================
   RELACIONES DE BIBLIOTECA
   Amigos del Cielo
========================================== */

const BIBLIOTECA_INTENCIONES = [
    { id:"salud", label:"Salud y enfermedad", icon:"✚", description:"Orar por quienes atraviesan enfermedad, recuperación o cuidado.", keywords:["salud","enfermo","enfermos","enfermedad","hospital","médico","medico","cura","cuidado","epidemia","epidemias"] },
    { id:"familia", label:"Familia y hogar", icon:"⌂", description:"Poner en oración la familia, el matrimonio, los hijos y el hogar.", keywords:["familia","familias","madre","padre","padres","hijo","hijos","matrimonio","esposa","esposo","hogar"] },
    { id:"trabajo", label:"Trabajo y sustento", icon:"✦", description:"Orar por el trabajo, el empleo, las responsabilidades y las necesidades materiales.", keywords:["trabajo","empleo","sustento","trabajador","trabajadores","oficio","profesion","profesión","economía","economia","pobreza","necesidades materiales"] },
    { id:"estudios", label:"Estudios y aprendizaje", icon:"⌘", description:"Buscar inspiración para estudiar, enseñar y crecer en conocimiento.", keywords:["estudios","estudiar","educación","educacion","educador","educadores","enseñanza","enseñanza","ciencia","cientificos","científicos","conocimiento","sabiduria","sabiduría"] },
    { id:"vocacion", label:"Vocación y decisiones", icon:"◇", description:"Buscar luz para discernir una vocación o una decisión importante.", keywords:["vocacion","vocación","discernimiento","decisiones","decision","decisión","llamada","llamado","consagracion","consagración","sacerdote","religiosa","religioso","laico","futuro"] },
    { id:"dificultades", label:"Pruebas y dificultades", icon:"◇", description:"Acompañar momentos de adversidad, obstáculos y situaciones difíciles.", keywords:["dificultad","dificultades","difícil","dificil","prueba","pruebas","adversidad","obstaculos","obstáculos","problemas","crisis","urgente","urgencias","imposible","desesperada","desesperado","perseverancia"] },
    { id:"esperanza", label:"Esperanza y desánimo", icon:"☼", description:"Encontrar testimonios de confianza y esperanza en medio de la incertidumbre.", keywords:["esperanza","confianza","desanimo","desánimo","desaliento","incertidumbre","consuelo","ánimo","animo","angustia","tribulacion","tribulación"] },
    { id:"fe", label:"Fe y conversión", icon:"✧", description:"Profundizar la fe, volver a Dios y crecer en la vida cristiana.", keywords:["fe","conversion","conversión","pecadores","evangelio","evangelizacion","evangelización","testimonio","vida cristiana","confesion","confesión","penitencia"] },
    { id:"oracion", label:"Oración y vida interior", icon:"♡", description:"Aprender de vidas marcadas por la oración, la contemplación y la unión con Dios.", keywords:["oracion","oración","rezar","plegaria","contemplacion","contemplación","vida interior","rosario","eucaristia","eucaristía"] },
    { id:"seres-queridos", label:"Por otra persona", icon:"♡", description:"Orar por la conversión, salud, necesidades o camino de alguien que amas.", keywords:["conversion de","conversión de","seres queridos","familiares","por otros","intercesion","intercesión","oracion por","oración por"] },
    { id:"servicio", label:"Caridad y servicio", icon:"♧", description:"Descubrir testimonios de entrega, misericordia y servicio al prójimo.", keywords:["caridad","servicio","ayuda","pobres","pobreza","misericordia","compasion","compasión","necesitados","solidaridad"] },
    { id:"juventud", label:"Jóvenes y adolescentes", icon:"✦", description:"Conocer testimonios especialmente cercanos a la juventud y su formación.", keywords:["joven","jóvenes","jovenes","adolescente","adolescentes","niño","niños","educacion","educación","juventud"] },
    { id:"paz", label:"Paz y reconciliación", icon:"☼", description:"Orar por la paz, el perdón, la reconciliación y los conflictos.", keywords:["paz","reconciliacion","reconciliación","perdon","perdón","conflicto","conflictos","guerra","dialogo","diálogo"] },
    { id:"mision", label:"Evangelización y misión", icon:"➜", description:"Encontrar testimonios de anuncio del Evangelio, misión y servicio a la Iglesia.", keywords:["mision","misión","misionero","misioneros","evangelizacion","evangelización","apostolado","apostol","apóstol","catequesis"] },
    { id:"sufrimiento", label:"Dolor, duelo y sufrimiento", icon:"◇", description:"Acompañar el dolor con testimonios de fe, fortaleza y esperanza.", keywords:["sufrimiento","dolor","duelo","muerte","muerte de","persecucion","persecución","martir","mártir","martires","mártires"] }
];

const BIBLIOTECA_VIRTUDES = [
    { id:"fe", label:"Fe", icon:"✧", keywords:["fe","fidelidad","creer"] },
    { id:"esperanza", label:"Esperanza", icon:"☼", keywords:["esperanza","confianza"] },
    { id:"caridad", label:"Caridad", icon:"♡", keywords:["caridad","amor","misericordia","compasion","compasión"] },
    { id:"fortaleza", label:"Fortaleza", icon:"◇", keywords:["fortaleza","valentia","valentía","firmeza","valor"] },
    { id:"prudencia", label:"Prudencia", icon:"⌘", keywords:["prudencia","discernimiento","sabiduria","sabiduría"] },
    { id:"justicia", label:"Justicia", icon:"⚖", keywords:["justicia","rectitud"] },
    { id:"templanza", label:"Templanza", icon:"◌", keywords:["templanza","moderacion","moderación","sobriedad"] },
    { id:"humildad", label:"Humildad", icon:"⌄", keywords:["humildad","sencillez","pequeñez","pequenez"] },
    { id:"obediencia", label:"Obediencia", icon:"↳", keywords:["obediencia","docilidad","fidelidad"] },
    { id:"paciencia", label:"Paciencia", icon:"◷", keywords:["paciencia","mansedumbre","serenidad"] },
    { id:"perseverancia", label:"Perseverancia", icon:"↗", keywords:["perseverancia","constancia","fidelidad","firmeza"] },
    { id:"oracion", label:"Oración", icon:"♡", keywords:["oracion","oración","contemplacion","contemplación","plegaria"] },
    { id:"discernimiento", label:"Discernimiento", icon:"◇", keywords:["discernimiento","prudencia","decisiones","sabiduria","sabiduría"] },
    { id:"generosidad", label:"Generosidad", icon:"♧", keywords:["generosidad","entrega","donacion","donación","servicio"] },
    { id:"compasion", label:"Compasión", icon:"♡", keywords:["compasion","compasión","misericordia","cuidado"] },
    { id:"servicio", label:"Servicio", icon:"♧", keywords:["servicio","caridad","ayuda","apostolado"] },
    { id:"fidelidad", label:"Fidelidad", icon:"✦", keywords:["fidelidad","perseverancia","constancia"] },
    { id:"sencillez", label:"Sencillez", icon:"⌄", keywords:["sencillez","humildad","simpleza"] },
    { id:"pureza", label:"Pureza de corazón", icon:"✧", keywords:["pureza","castidad","virginidad","limpieza de corazon","limpieza de corazón"] },
    { id:"alegria", label:"Alegría", icon:"☼", keywords:["alegria","alegría","gozo"] },
    { id:"sabiduria", label:"Sabiduría", icon:"⌘", keywords:["sabiduria","sabiduría","conocimiento","discernimiento"] }
];

const bibliotecaContenidoCache = new Map();

function normalizarBibliotecaTexto(texto) {
    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function obtenerTextoContenidoBiblioteca(item) {
    const intervenciones = Array.isArray(item?.interventions)
        ? item.interventions.flatMap(intervencion => {
            if (typeof intervencion === "string") return [intervencion];
            return [
                intervencion?.id,
                intervencion?.label,
                ...(Array.isArray(intervencion?.keywords) ? intervencion.keywords : [])
            ];
        })
        : [];

    return [
        item?.name,
        item?.title,
        item?.subtitle,
        item?.description,
        ...(Array.isArray(item?.search) ? item.search : []),
        ...(Array.isArray(item?.searchTerms) ? item.searchTerms : []),
        ...(Array.isArray(item?.tags) ? item.tags : []),
        ...(Array.isArray(item?.patronages) ? item.patronages : []),
        ...(Array.isArray(item?.virtues) ? item.virtues : []),
        ...intervenciones
    ].filter(Boolean).join(" ");
}

async function cargarContenidoBibliotecaCompleto() {
    const publicados = obtenerContenidoBiblioteca();

    const pendientes = publicados.filter(item => {
        const clave = item.id;
        return clave && !bibliotecaContenidoCache.has(clave);
    });

    const lote = 8;

    for (let inicio = 0; inicio < pendientes.length; inicio += lote) {
        const grupo = pendientes.slice(inicio, inicio + lote);

        await Promise.all(
            grupo.map(async item => {
                try {
                    const contenido = await cargarJSONConRecuperacion(
                        "./" + String(item.sourceFile || item.file || "").replace(/^\.\//, "")
                    );
                    bibliotecaContenidoCache.set(item.id, {
                        ...item,
                        ...contenido,
                        id: item.id,
                        image: contenido?.image || item.image || "",
                        sourceFile: item.sourceFile || item.file
                    });
                } catch (error) {
                    bibliotecaContenidoCache.set(item.id, {
                        ...item,
                        _relacionesNoDisponibles: true
                    });
                }
            })
        );
    }

    return publicados
        .map(item => bibliotecaContenidoCache.get(item.id))
        .filter(Boolean);
}

function bibliotecaTextoContiene(texto, termino) {
    const valor = normalizarBibliotecaTexto(termino);
    if (!valor) return false;

    if (valor.length <= 4 && !valor.includes(" ")) {
        const escapado = valor.replace(/[.*+?^{}()|[\]\\]/g, "\\function obtenerDefinicionBiblioteca(tipo, id) {");
        return new RegExp("(^|\\s)" + escapado + "(?=\\s|$)", "i").test(texto);
    }

    return texto.includes(valor);
}

function obtenerDefinicionBiblioteca(tipo, id) {
    const lista = tipo === "virtud"
        ? BIBLIOTECA_VIRTUDES
        : BIBLIOTECA_INTENCIONES;

    return lista.find(item => item.id === id) || null;
}

function puntuarRelacionBiblioteca(item, definicion, tipo) {
    const intervenciones = Array.isArray(item?.interventions)
        ? item.interventions
        : [];

    const patronages = Array.isArray(item?.patronages)
        ? item.patronages
        : [];

    const virtues = Array.isArray(item?.virtues)
        ? item.virtues
        : [];

    const textoIntervenciones = normalizarBibliotecaTexto(
        intervenciones.map(intervencion =>
            typeof intervencion === "string"
                ? intervencion
                : [
                    intervencion?.id,
                    intervencion?.label,
                    ...(Array.isArray(intervencion?.keywords) ? intervencion.keywords : [])
                ].join(" ")
        ).join(" ")
    );

    const textoPatronages = normalizarBibliotecaTexto(patronages.join(" "));
    const textoVirtudes = normalizarBibliotecaTexto(virtues.join(" "));
    const textoGeneral = normalizarBibliotecaTexto(
        obtenerTextoContenidoBiblioteca(item)
    );

    let score = 0;
    const coincidencias = [];

    for (const keyword of definicion.keywords) {
        const termino = normalizarBibliotecaTexto(keyword);
        if (!termino) continue;

        if (bibliotecaTextoContiene(textoIntervenciones, termino)) {
            score += tipo === "intencion" ? 8 : 2;
            coincidencias.push("intervenciones");
        } else if (bibliotecaTextoContiene(textoPatronages, termino)) {
            score += tipo === "intencion" ? 6 : 1;
            coincidencias.push("tradición devocional");
        } else if (bibliotecaTextoContiene(textoVirtudes, termino)) {
            score += tipo === "virtud" ? 8 : 2;
            coincidencias.push("virtudes");
        } else if (bibliotecaTextoContiene(textoGeneral, termino)) {
            score += tipo === "intencion" ? 2 : 3;
            coincidencias.push("contenido");
        }
    }

    return {
        score,
        coincidencias: [...new Set(coincidencias)]
    };
}

async function obtenerResultadosBiblioteca(tipo, id) {
    const definicion = obtenerDefinicionBiblioteca(tipo, id);

    if (!definicion) {
        return { definicion: null, resultados: [] };
    }

    const contenidos = await cargarContenidoBibliotecaCompleto();

    const resultados = contenidos
        .map(item => {
            const relacion = puntuarRelacionBiblioteca(
                item,
                definicion,
                tipo
            );

            return {
                item,
                score: relacion.score,
                coincidencias: relacion.coincidencias
            };
        })
        .filter(resultado => resultado.score >= (tipo === "intencion" ? 4 : 3))
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return String(a.item.name || "").localeCompare(
                String(b.item.name || ""),
                "es"
            );
        })
        .slice(0, 8);

    return { definicion, resultados };
}
