const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const REQUIRED_FIELDS = ['id', 'slug', 'name', 'title', 'category', 'image', 'novena', 'status', 'days'];
const DAY_FIELDS = ['theme', 'title', 'virtue', 'reflection', 'intention', 'action'];
const V2_CATALOGS = ['paises', 'santos', 'maria', 'devociones'];
const TERRITORIAL_FIELDS = ['origin', 'historicalLinks', 'specialDevotion'];
let errors = 0;

function report(file, message) {
  errors++;
  console.error('✖ ' + file + ': ' + message);
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    report(label, 'JSON inválido: ' + err.message);
    return null;
  }
}

function validateDays(data, file) {
  if (!Array.isArray(data.days) || data.days.length !== 9) {
    report(file, 'days debe contener exactamente 9 días.');
    return;
  }

  const seenDays = new Set();

  for (let index = 0; index < data.days.length; index++) {
    const day = data.days[index];
    const expected = index + 1;

    if (!day || typeof day !== 'object' || Array.isArray(day)) {
      report(file, 'el día ' + expected + ' no es un objeto válido.');
      continue;
    }

    if (Number(day.day) !== expected) {
      report(file, 'el día ' + expected + ' debe tener day=' + expected + '.');
    }

    if (seenDays.has(Number(day.day))) {
      report(file, 'día duplicado: ' + day.day + '.');
    }

    seenDays.add(Number(day.day));

    for (const field of DAY_FIELDS) {
      const value = day[field];
      const valido =
        typeof value === 'string'
          ? value.trim().length > 0
          : value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            Object.values(value).some(item =>
              typeof item === 'string' && item.trim().length > 0
            );

      if (!valido) {
        report(file, 'el día ' + expected + ' no tiene "' + field + '" con contenido válido.');
      }
    }

    const tieneOracion =
      ['prayer', 'prayerAdapted', 'eternalFather'].some(field => {
        const value = day[field];

        if (typeof value === 'string') {
          return value.trim().length > 0;
        }

        return Boolean(
          value &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          Object.values(value).some(item =>
            typeof item === 'string' && item.trim().length > 0
          )
        );
      });

    if (!tieneOracion) {
      report(file, 'el día ' + expected + ' no tiene una oración válida.');
    }
  }
}

function validateLegacyRootFiles() {
  const catalogPath = path.join(DATA_DIR, 'novenas.json');
  const catalog = readJson(catalogPath, 'novenas.json');

  if (!Array.isArray(catalog)) {
    report('novenas.json', 'el catálogo debe ser un array.');
    return;
  }

  const ids = new Set();

  for (const item of catalog) {
    if (!item || !item.id || !item.file) {
      report('novenas.json', 'hay una entrada sin id o file.');
      continue;
    }

    if (ids.has(item.id)) {
      report('novenas.json', 'id duplicado: ' + item.id + '.');
    }

    ids.add(item.id);

    const relativePath = item.file.replace(/^\.\//, '');
    const referenced = path.join(process.cwd(), relativePath);

    if (!fs.existsSync(referenced)) {
      report('novenas.json', 'archivo no encontrado: ' + item.file + '.');
      continue;
    }

    const data = readJson(referenced, item.file);
    if (!data) continue;

    for (const field of REQUIRED_FIELDS) {
      if (!(field in data)) {
        report(item.file, 'falta el campo requerido "' + field + '".');
      }
    }

    validateDays(data, item.file);

    if (data.history) {
      for (const field of ['short', 'extended']) {
        if (typeof data.history[field] !== 'string' || !data.history[field].trim()) {
          report(item.file, 'history.' + field + ' está vacío o no es texto.');
        }
      }
    }

    const raw = fs.readFileSync(referenced, 'utf8');

    if (raw.includes('\\\\n')) {
      report(item.file, 'contiene saltos de línea doblemente escapados (\\\\n).');
    }

    if (raw.includes('cite')) {
      report(item.file, 'contiene un marcador de citación interno que no debe estar en los datos.');
    }
  }
}

function validateV2Catalogs() {
  const catalogos = {};
  const allIds = new Map();
  const paisIds = new Set();

  for (const name of V2_CATALOGS) {
    const file = 'data/catalog/' + name + '.json';
    const fullPath = path.join(process.cwd(), file);

    if (!fs.existsSync(fullPath)) {
      report(file, 'catálogo requerido no encontrado.');
      continue;
    }

    const data = readJson(fullPath, file);
    if (!data) continue;

    if (!Array.isArray(data.items)) {
      report(file, 'items debe ser un array.');
      continue;
    }

    catalogos[name] = data.items;

    if (name === 'paises') {
      for (const item of data.items) {
        if (!item || !item.id || !item.name) {
          report(file, 'hay un país sin id o name.');
          continue;
        }

        if (paisIds.has(item.id)) {
          report(file, 'id de país duplicado: ' + item.id + '.');
        }

        paisIds.add(item.id);
      }

      continue;
    }

    for (const item of data.items) {
      const label = file + '#' + (item?.id || '?');

      if (!item || typeof item !== 'object') {
        report(file, 'contiene una entrada inválida.');
        continue;
      }

      for (const field of ['id', 'name', 'status', 'category']) {
        if (!item[field]) {
          report(label, 'falta el campo requerido "' + field + '".');
        }
      }

      if (allIds.has(item.id)) {
        report(label, 'id duplicado también en ' + allIds.get(item.id) + '.');
      } else if (item.id) {
        allIds.set(item.id, label);
      }

      if (item.status === 'published') {
        if (!item.sourceFile) {
          report(label, 'un contenido publicado debe tener sourceFile.');
        } else {
          const sourcePath = path.join(process.cwd(), item.sourceFile.replace(/^\.\//, ''));

          if (!fs.existsSync(sourcePath)) {
            report(label, 'sourceFile no encontrado: ' + item.sourceFile + '.');
          } else {
            const source = readJson(sourcePath, item.sourceFile);

            if (source) {
              validateDays(source, item.sourceFile);

              const rawSource = fs.readFileSync(sourcePath, 'utf8');
              if (rawSource.includes('\\\\n')) {
                report(item.sourceFile, 'contiene saltos de línea doblemente escapados (\\\\n).');
              }

              if (rawSource.includes('cite')) {
                report(item.sourceFile, 'contiene un marcador de citación interno que no debe estar en los datos.');
              }
            }
          }
        }
      }

      const territorial = item.territorial;
      if (!territorial || typeof territorial !== 'object' || Array.isArray(territorial)) {
        report(label, 'territorial debe ser un objeto.');
        continue;
      }

      for (const field of TERRITORIAL_FIELDS) {
        if (!Array.isArray(territorial[field])) {
          report(label, 'territorial.' + field + ' debe ser un array.');
          continue;
        }

        for (const country of territorial[field]) {
          if (!paisIds.has(country)) {
            report(label, 'territorial.' + field + ' contiene país no definido: ' + country + '.');
          }
        }
      }
    }
  }

  const sourceFiles = new Set();
  for (const name of ['santos', 'maria', 'devociones']) {
    for (const item of catalogos[name] || []) {
      if (item.status === 'published' && item.sourceFile) {
        if (sourceFiles.has(item.sourceFile)) {
          report('data/catalog/' + name + '.json', 'sourceFile publicado duplicado: ' + item.sourceFile + '.');
        }
        sourceFiles.add(item.sourceFile);
      }
    }
  }
}

validateLegacyRootFiles();
validateV2Catalogs();

if (errors > 0) {
  console.error('\nValidación fallida: ' + errors + ' error(es).');
  process.exit(1);
}

console.log('✓ Validación correcta: catálogo legado, catálogos v2.1 y contenidos publicados.');
