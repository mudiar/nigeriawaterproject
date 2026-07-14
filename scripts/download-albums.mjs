import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const audit = path.join(root, "site-audit");
const imgDir = path.join(root, "public", "assets", "images");
fs.mkdirSync(imgDir, { recursive: true });

const urls = new Set();
for (const file of fs.readdirSync(audit).filter((f) => f.startsWith("album-") && f.endsWith(".html"))) {
  const html = fs.readFileSync(path.join(audit, file), "utf8");
  for (const m of html.matchAll(/https:\/\/images\.squarespace-cdn\.com\/content\/v1\/[^"\\\s<>]+/g)) {
    let u = m[0].replace(/&amp;/g, "&").replace(/\\u0026/g, "&").split("?")[0];
    u = u.replace(/&quot;?,?$/g, "").replace(/\\$/, "");
    if (/favicon|Logo\.png/i.test(u)) continue;
    urls.add(u);
  }
}

console.log(`Found ${urls.size} album images`);
let ok = 0;
let fail = 0;
for (const url of urls) {
  const name = decodeURIComponent(path.basename(new URL(url).pathname)).replace(
    /[^a-zA-Z0-9._-]+/g,
    "-",
  );
  const dest = path.join(imgDir, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    ok++;
    continue;
  }
  try {
    const res = await fetch(`${url}?format=1500w`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log(`OK ${name}`);
  } catch (e) {
    fail++;
    console.log(`FAIL ${url} ${e.message}`);
  }
}
console.log(`DONE ok=${ok} fail=${fail} totalFiles=${fs.readdirSync(imgDir).length}`);
