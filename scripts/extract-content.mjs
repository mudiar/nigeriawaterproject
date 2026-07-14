import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const audit = path.join(root, "site-audit");
const out = path.join(audit, "extracted-content.json");

const pages = {};

for (const file of fs.readdirSync(audit).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(path.join(audit, file), "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const description =
    (html.match(
      /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i,
    ) || [])[1] ||
    (html.match(
      /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i,
    ) || [])[1] ||
    null;

  // Extract image resolver entries
  const images = [
    ...new Set(
      [...html.matchAll(/https:\/\/images\.squarespace-cdn\.com\/content\/v1\/[^"\\\s<>]+/g)].map(
        (m) => m[0].replace(/\\u0026/g, "&").split("?")[0],
      ),
    ),
  ];

  // Videos
  const videos = [];
  for (const m of html.matchAll(/data-config-video="([^"]+)"/g)) {
    const decoded = m[1]
      .replace(/&quot;/g, '"')
      .replace(/&#x2F;/g, "/")
      .replace(/&amp;/g, "&");
    try {
      videos.push(JSON.parse(decoded));
    } catch {
      videos.push(decoded);
    }
  }
  for (const m of html.matchAll(/data-config-video=\\"([^\\]+(?:\\.[^\\]+)*)\\"/g)) {
    // skip if already found
  }
  // JSON escaped in scripts
  for (const m of html.matchAll(
    /\\"alexandriaUrl\\":\\"([^\\]+)\\"[^}]*\\"systemDataVariants\\":\\"([^\\]+)\\"/g,
  )) {
    videos.push({
      alexandriaUrl: m[1].replace(/\\u002F/g, "/"),
      systemDataVariants: m[2],
    });
  }

  // section themes
  const themes = [
    ...html.matchAll(
      /data-section-theme="([^"]+)"[^>]*data-section-id="([^"]+)"/g,
    ),
  ].map((m) => ({ theme: m[1], id: m[2] }));

  // Rough text extraction from content blocks
  const textBlocks = [
    ...html.matchAll(
      /<(h[1-6]|p)[^>]*>([\s\S]*?)<\/\1>/gi,
    ),
  ]
    .map((m) => ({
      tag: m[1].toLowerCase(),
      text: m[2]
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&rsquo;/g, "’")
        .replace(/&lsquo;/g, "‘")
        .replace(/&rdquo;/g, "”")
        .replace(/&ldquo;/g, "“")
        .replace(/&mdash;/g, "—")
        .replace(/&ndash;/g, "–")
        .replace(/&hellip;/g, "…")
        .replace(/\s+/g, " ")
        .trim(),
    }))
    .filter((t) => t.text && t.text.length > 1 && !/cookie|squarespace/i.test(t.text))
    .slice(0, 80);

  pages[file] = { title, description, images, videos, themes, textBlocks };
}

fs.writeFileSync(out, JSON.stringify(pages, null, 2));
console.log(`Wrote ${out} pages=${Object.keys(pages).length}`);
