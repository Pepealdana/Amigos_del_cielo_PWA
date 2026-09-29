const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
let errors = 0;
let warnings = 0;

function fail(file, message) {
  errors++;
  console.error("✖ " + file + ": " + message);
}

function warn(file, message) {
  warnings++;
  console.warn("⚠ " + file + ": " + message);
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel.replace(/^\.\//, "")));
}

function readJson(rel) {
  const file = path.join(ROOT, rel.replace(/^\.\//, ""));
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(rel, "JSON inválido: " + error.message);
    return null;
  }
}

function checkJsonFiles() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".json")) files.push(path.relative(ROOT, full));
    }
  }
  walk(path.join(ROOT, "data"));
  files.push("manifest.json");

  for (const file of files) readJson(file);
  console.log("✓ JSON: " + files.length + " archivos revisados.");
}

function checkJavaScriptSyntax() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js")) files.push(path.relative(ROOT, full));
    }
  }
  walk(path.join(ROOT, "js"));
  files.push("service-worker.js");
  files.push("scripts/validate-data.js");
  files.push("scripts/validate-app.js");

  for (const file of files) {
    try {
      execFileSync(process.execPath, ["--check", file], { cwd: ROOT, stdio: "pipe" });
    } catch (error) {
      fail(file, "JavaScript con error de sintaxis.");
      if (error.stderr) console.error(String(error.stderr).trim());
    }
  }
  console.log("✓ JavaScript: " + files.length + " archivos revisados con node --check.");
}

function checkCatalogs() {
  const catalogNames = ["santos", "beatos", "maria", "devociones", "paises"];
  const paises = readJson("data/catalog/paises.json");
  const paisIds = new Set((paises?.items || []).map(item => item?.id).filter(Boolean));
  const globalIds = new Map();
  let published = 0;

  for (const name of catalogNames) {
    const file = "data/catalog/" + name + ".json";
    const data = readJson(file);
    if (!data || !Array.isArray(data.items)) {
      fail(file, "items debe ser un array.");
      continue;
    }

    const localIds = new Set();

    for (const item of data.items) {
      const label = file + "#" + (item?.id || "?");

      if (!item || typeof item !== "object") {
        fail(file, "contiene una entrada inválida.");
        continue;
      }

      if (name !== "paises" && (!item.id || !item.name || !item.status || !item.category)) {
        fail(label, "faltan campos básicos (id, name, status o category).");
      }

      if (localIds.has(item.id)) fail(label, "id duplicado dentro del catálogo.");
      localIds.add(item.id);

      if (globalIds.has(item.id)) {
        fail(label, "id duplicado también en " + globalIds.get(item.id) + ".");
      } else if (item.id) {
        globalIds.set(item.id, label);
      }

      if (name !== "paises") {
        const territorial = item.territorial;
        if (!territorial || typeof territorial !== "object" || Array.isArray(territorial)) {
          fail(label, "territorial debe ser un objeto.");
        } else {
          for (const field of ["origin", "historicalLinks", "specialDevotion"]) {
            if (!Array.isArray(territorial[field])) {
              fail(label, "territorial." + field + " debe ser un array.");
            } else {
              for (const country of territorial[field]) {
                if (!paises || !paisIds.has(country)) {
                  fail(label, "país no definido: " + country + ".");
                }
              }
            }
          }
        }
      }

      if (item.status === "published") {
        published++;
        if (name !== "paises" && !item.sourceFile) {
          fail(label, "contenido publicado sin sourceFile.");
        }
        if (item.sourceFile) {
          if (!exists(item.sourceFile)) {
            fail(label, "sourceFile no encontrado: " + item.sourceFile);
          } else {
            const source = readJson(item.sourceFile);
            if (!source) continue;
            if (Array.isArray(source.days) && source.days.length !== 9) {
              fail(item.sourceFile, "days debe contener 9 días.");
            }
          }
        }
        if (item.image && !/^https?:\/\//i.test(item.image) && !exists(item.image)) {
          fail(label, "imagen no encontrada: " + item.image);
        }
      }
    }
  }

  console.log("✓ Catálogos: " + catalogNames.length + " catálogos; " + published + " contenidos publicados revisados.");
}

function checkLegacyCatalog() {
  const file = "data/novenas.json";
  const data = readJson(file);
  if (!Array.isArray(data)) {
    fail(file, "debe ser un array.");
    return;
  }

  const ids = new Set();
  for (const item of data) {
    if (!item?.id || !item?.file) {
      fail(file, "entrada sin id o file.");
      continue;
    }
    if (ids.has(item.id)) fail(file, "id duplicado: " + item.id);
    ids.add(item.id);

    if (!exists(item.file)) fail(file, "archivo no encontrado: " + item.file);
    if (item.image && !/^https?:\/\//i.test(item.image) && !exists(item.image)) {
      fail(file, "imagen no encontrada: " + item.image);
    }
  }
  console.log("✓ Catálogo histórico: " + data.length + " entradas revisadas.");
}

function checkHtmlReferences() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const refs = [
    ...[...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1].split("?")[0]),
    ...[...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)].map(m => m[1].split("?")[0])
  ];

  for (const ref of refs) {
    if (/^(https?:|data:|#)/i.test(ref)) continue;
    if (!exists(ref)) fail("index.html", "referencia inexistente: " + ref);
  }
  console.log("✓ index.html: " + refs.length + " referencias locales revisadas.");
}

function checkServiceWorker() {
  const file = "service-worker.js";
  const sw = fs.readFileSync(path.join(ROOT, file), "utf8");
  const refs = [...sw.matchAll(/["'](\.\/[^"']+)["']/g)]
    .map(m => m[1])
    .filter(ref => ref !== "./");

  const unique = [...new Set(refs)];
  for (const ref of unique) {
    const clean = ref.split("?")[0];
    if (!exists(clean)) fail(file, "APP_SHELL/referencia inexistente: " + clean);
  }

  const cacheMatch = sw.match(/CACHE_NAME\s*=\s*["']([^"']+)["']/);
  if (!cacheMatch) fail(file, "no se encontró CACHE_NAME.");

  console.log("✓ Service Worker: " + unique.length + " referencias locales revisadas.");
}

function checkRenderSecurity() {
  const dir = path.join(ROOT, "js", "render", "shared");
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".js")) {
        files.push(path.relative(ROOT, full));
      }
    }
  }

  walk(dir);

  for (const file of files) {
    const source = fs.readFileSync(path.join(ROOT, file), "utf8");

    if (/\bon[a-z]+\s*=\s*["']/i.test(source)) {
      fail(file, "no debe contener handlers HTML inline; use data-action.");
    }
  }

  console.log("✓ Render compartido: sin handlers HTML inline.");
}

function checkInteractiveActions() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js")) files.push(path.relative(ROOT, full));
    }
  }
  walk(path.join(ROOT, "js"));

  const actions = new Set();
  const routes = new Set();
  const handlers = new Set();
  const routerRoutes = new Set();

  for (const file of files) {
    const source = fs.readFileSync(path.join(ROOT, file), "utf8");

    for (const match of source.matchAll(/data-action\\s*=\\s*["']([^"']+)["']/g)) {
      if (!match[1].includes("${") && !match[1].includes("{")) actions.add(match[1]);
    }

    for (const match of source.matchAll(/data-action=\\?"([^"]+)\\?"/g)) {
      actions.add(match[1]);
    }

    for (const match of source.matchAll(/case\\s+["']([^"']+)["']\\s*:/g)) {
      handlers.add(match[1]);
    }

    for (const match of source.matchAll(/data-route\\s*=\\s*["']([^"']+)["']/g)) {
      routes.add(match[1]);
    }

    for (const match of source.matchAll(/case\\s+["']([^"']+)["']\\s*:/g)) {
      routerRoutes.add(match[1]);
    }
  }

  const knownDirectActions = new Set([
    "open-novena", "open-profile", "draw-patron", "open-patron-profile",
    "continue-novena", "next-day", "previous-day", "favorite-novena",
    "share-novena", "start-novena", "finish-novena", "restart-novena",
    "toggle-extended-history", "text-size", "theme", "retry-app",
    "go-library", "library-explorer-mode", "library-explorer-select",
    "library-explorer-reset", "go-novena", "share-app", "region"
  ]);

  for (const action of actions) {
    if (!knownDirectActions.has(action) && !handlers.has(action)) {
      warn("JavaScript", "data-action sin handler reconocido: " + action);
    }
  }

  const indexSource = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  for (const match of indexSource.matchAll(/data-route\s*=\s*["']([^"']+)["']/g)) {
    routes.add(match[1]);
  }

  for (const route of routes) {
    if (!routerRoutes.has(route)) {
      warn("JavaScript", "data-route sin ruta reconocida: " + route);
    }
  }

  console.log("✓ Interacciones: " + actions.size + " acciones y " + routes.size + " rutas detectadas.");
}

checkJsonFiles();
checkJavaScriptSyntax();
checkCatalogs();
checkLegacyCatalog();
checkHtmlReferences();
checkServiceWorker();
checkRenderSecurity();
checkInteractiveActions();

if (errors) {
  console.error("\nValidación de lanzamiento FALLIDA: " + errors + " error(es), " + warnings + " advertencia(s).");
  process.exit(1);
}

console.log("\n✓ Validación de lanzamiento superada: 0 errores, " + warnings + " advertencia(s).");
