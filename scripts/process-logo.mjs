import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(
  root,
  "..",
  ".cursor",
  "projects",
  "c-Users-Owner-Projects-nigeria-water-project",
  "assets",
  "c__Users_Owner_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Logo-a5936a91-9273-4e1c-8eec-757b27c9c5b6.png",
);
const altSrc = path.join(
  "C:/Users/Owner/.cursor/projects/c-Users-Owner-Projects-nigeria-water-project/assets/c__Users_Owner_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Logo-a5936a91-9273-4e1c-8eec-757b27c9c5b6.png",
);
const input = fs.existsSync(src) ? src : altSrc;
const out = path.join(root, "public", "assets", "images", "nwp-logo.png");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = Buffer.from(data);
for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  // Remove near-black background
  if (r < 28 && g < 28 && b < 28) {
    pixels[i + 3] = 0;
  }
}

await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(out);

// Also write favicon-sized version
await sharp(out).resize(64, 64).png().toFile(path.join(root, "public", "favicon.png"));

console.log(`Wrote transparent logo to ${out} (${info.width}x${info.height})`);
