const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const REQUIRED_FIELDS = ['id', 'slug', 'name', 'title', 'category', 'image', 'novena', 'status', 'days'];
const DAY_FIELDS = ['theme', 'title', 'life', 'learning', 'virtue', 'reflection', 'intention', 'prayer', 'action'];
let errors = 0;

function report(file, message) {
  errors++;
  console.error('✖ ' + file + ': ' + message);
}

const files = fs.readdirSync(DATA_DIR).filter(function (file) {
  return file.endsWith('.json') && file !== 'novenas.json';
}).sort();

if (!files.length) {
  console.error('✖ No se encontraron archivos JSON de novenas en data/.');
  process.exit(1);
}

for (const file of files) {
  const fullPath = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(fullPath, 'utf8');
  let data;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    report(file, 'JSON inválido: ' + err.message);
    continue;
  }

  for (const field of REQUIRED_FIELDS) {
    if (!(field in data)) report(file, 'falta el campo requerido "' + field + '".');
  }

  if (!Array.isArray(data.days) || data.days.length !== 9) {
    report(file, 'debe contener exactamente 9 días.');
  }

  const seenDays = new Set();
  for (let index = 0; index < (data.days || []).length; index++) {
    const day = data.days[index];
    const expected = index + 1;
    if (!day || typeof day !== 'object') {
      report(file, 'el día ' + expected + ' no es un objeto válido.');
      continue;
    }
    if (Number(day.day) !== expected) report(file, 'el día ' + expected + ' debe tener day=' + expected + '.');
    if (seenDays.has(day.day)) report(file, 'día duplicado: ' + day.day + '.');
    seenDays.add(day.day);
    for (const field of DAY_FIELDS) {
      if (!day[field]) report(file, 'el día ' + expected + ' no tiene "' + field + '".');
    }
  }

  if (data.history) {
    for (const field of ['short', 'extended']) {
      if (typeof data.history[field] !== 'string' || !data.history[field].trim()) {
        report(file, 'history.' + field + ' está vacío o no es texto.');
      }
    }
  }

  // Detecta el problema que provocó los errores recientes: doble escape de saltos de línea.
  if (raw.includes('\\\\n')) {
    report(file, 'contiene saltos de línea doblemente escapados (\\\\n).');
  }

  if (raw.includes('cite')) report(file, 'contiene un marcador de citación interno que no debe estar en los datos.');
}

const catalogPath = path.join(DATA_DIR, 'novenas.json');
try {
  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  if (!Array.isArray(catalog)) {
    report('novenas.json', 'el catálogo debe ser un array.');
  } else {
    const ids = new Set();
    for (const item of catalog) {
      if (!item || !item.id || !item.file) {
        report('novenas.json', 'hay una entrada sin id o file.');
        continue;
      }
      if (ids.has(item.id)) report('novenas.json', 'id duplicado: ' + item.id + '.');
      ids.add(item.id);
      const referenced = path.join(process.cwd(), item.file.replace(/^\.\//, ''));
      if (!fs.existsSync(referenced)) report('novenas.json', 'archivo no encontrado: ' + item.file + '.');
    }
  }
} catch (err) {
  report('novenas.json', 'JSON inválido: ' + err.message);
}

if (errors > 0) {
  console.error('\nValidación fallida: ' + errors + ' error(es).');
  process.exit(1);
}

console.log('✓ Validación correcta: ' + files.length + ' novena(s) y catálogo.');