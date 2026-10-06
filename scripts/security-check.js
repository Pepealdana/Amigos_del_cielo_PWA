const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const EXTENSIONS = new Set([".js", ".html", ".json"]);
const SELF = path.join(ROOT, "scripts", "security-check.js");
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase()) && full !== SELF) {
      inspect(full);
    }
  }
}

function inspect(file) {
  const relative = path.relative(ROOT, file);
  const source = fs.readFileSync(file, "utf8");

  const forbidden = [
    { regex: /\beval\s*\(/, label: "eval()" },
    { regex: /\bnew\s+Function\s*\(/, label: "new Function()" },
    { regex: /javascript\s*:/i, label: "javascript: URL" }
  ];

  for (const item of forbidden) {
    if (item.regex.test(source)) {
      findings.push(relative + ": patrón inseguro detectado: " + item.label);
    }
  }

  if (/<script[^>]+src=[^>]+http:\/\//i.test(source)) {
    findings.push(relative + ": script externo cargado por HTTP.");
  }
}

walk(ROOT);

if (findings.length) {
  console.error("Security check FAILED:");
  for (const finding of findings) console.error("✖ " + finding);
  process.exit(1);
}

console.log("✓ Security check superado.");
