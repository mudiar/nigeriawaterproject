import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const audit = path.join(root, "site-audit");
const imagesDir = path.join(root, "public", "assets", "images");
const videosDir = path.join(root, "public", "assets", "videos");

fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(videosDir, { recursive: true });

const urls = new Set();

function addUrl(raw) {
  if (!raw) return;
  let u = String(raw)
    .replace(/&amp;/g, "&")
    .replace(/\\u0026/g, "&")
    .replace(/\\\//g, "/")
    .replace(/\\$/g, "")
    .trim();
  if (!u.startsWith("http")) return;
  if (u.includes("{variant}")) {
    urls.add(u.replace("{variant}", "1908:1080"));
    urls.add(u.replace("{variant}", "1920:1080"));
    urls.add(u.replace("{variant}", "thumbnail"));
    return;
  }
  urls.add(u.split("?")[0]);
}

for (const file of fs.readdirSync(audit).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(path.join(audit, file), "utf8");
  for (const m of html.matchAll(
    /https:\/\/(?:images|video)\.squarespace-cdn\.com\/[^"\\\s<>]+/g,
  )) {
    addUrl(m[0]);
  }
  for (const m of html.matchAll(/alexandriaUrl\\":\\"([^\\]+)/g)) {
    addUrl(m[1].replace(/\\u002F/g, "/"));
  }
  for (const m of html.matchAll(/alexandriaUrl&quot;:&quot;([^&]+)/g)) {
    addUrl(m[1].replace(/&#x2F;/g, "/"));
  }
}

// Known video IDs discovered via browser crawl
const knownVideos = [
  "c2d9ae18-6720-497f-b9c3-35c4da61d0f1",
  "d927d8a6-31ee-4d55-8734-de9dd5a4306a",
  "249346e0-17a9-40df-92c7-86e8f0dece78",
];
for (const id of knownVideos) {
  addUrl(
    `https://video.squarespace-cdn.com/content/v1/6713770948a462333697c688/${id}/1920:1080`,
  );
  addUrl(
    `https://video.squarespace-cdn.com/content/v1/6713770948a462333697c688/${id}/thumbnail`,
  );
}

function filenameFromUrl(url) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  let name = parts.at(-1) || "asset";
  if (name === "thumbnail") name = `${parts.at(-2)}-thumb.jpg`;
  else if (/^\d+:\d+$/.test(name)) name = `${parts.at(-2)}.mp4`;
  name = decodeURIComponent(name).replace(/[^a-zA-Z0-9._-]+/g, "-");
  return name;
}

const manifest = [];

for (const url of [...urls].sort()) {
  const isVideoHost = url.includes("video.squarespace");
  const name = filenameFromUrl(url);
  const isMp4 = name.endsWith(".mp4");
  const dest = path.join(isMp4 ? videosDir : imagesDir, name);
  const local = `/assets/${isMp4 ? "videos" : "images"}/${name}`;
  let downloadUrl = url;
  if (!isVideoHost && url.includes("images.squarespace")) {
    downloadUrl = `${url}?format=2500w`;
  }
  try {
    if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
      const res = await fetch(downloadUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
    }
    const bytes = fs.statSync(dest).size;
    console.log(`OK ${name} (${bytes})`);
    manifest.push({ url, local, bytes, ok: true });
  } catch (err) {
    console.log(`FAIL ${url} :: ${err.message}`);
    manifest.push({ url, local: null, bytes: 0, ok: false, error: err.message });
  }
}

fs.writeFileSync(
  path.join(audit, "download-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(
  `DONE ok=${manifest.filter((m) => m.ok).length} fail=${manifest.filter((m) => !m.ok).length}`,
);
