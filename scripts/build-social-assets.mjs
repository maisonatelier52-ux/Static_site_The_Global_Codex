import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const base = new URL("../public/images/businessstandard-social-base.png", import.meta.url);
const cards = {
  home: ["BUSINESS STANDARD", "Independent news for an informed America"],
  about: ["ABOUT BUSINESS STANDARD", "Evidence, context and visible corrections"],
  world: ["WORLD", "Global events, explained for U.S. readers"],
  "u.s": ["U.S.", "The decisions shaping American life"],
  business: ["BUSINESS", "Companies, workers and the real economy"],
  finance: ["FINANCE", "Markets, money and economic policy"],
  technology: ["TECHNOLOGY", "Innovation, power and accountability"],
  politics: ["POLITICS", "Policy, elections and public institutions"],
  health: ["HEALTH", "Public health, medicine and access"],
  sports: ["SPORTS", "Competition, culture and the games that matter"],
  investigation: ["INVESTIGATION", "Documents, oversight and public accountability"],
};

await mkdir(new URL("../public/og/", import.meta.url), { recursive: true });
for (const [slug, [title, deck]] of Object.entries(cards)) {
  const overlay = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="rgba(8,22,36,.18)"/>
    <rect x="74" y="70" width="9" height="490" fill="#8d1f2d"/>
    <text x="116" y="135" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="5" fill="#f1c9ce">BUSINESSSTANDARD.ORG</text>
    <text x="116" y="310" font-family="Georgia, Times New Roman, serif" font-size="74" font-weight="700" fill="#fffefa">${title}</text>
    <text x="116" y="375" font-family="Arial, Helvetica, sans-serif" font-size="29" fill="#d8e0e6">${deck}</text>
    <line x1="116" y1="437" x2="720" y2="437" stroke="#fffefa" stroke-opacity=".45"/>
    <text x="116" y="485" font-family="Arial, Helvetica, sans-serif" font-size="21" fill="#d8e0e6">Sources visible. Uncertainty labeled. Corrections preserved.</text>
  </svg>`);
  await sharp(fileURLToPath(base)).resize(1200, 630, { fit: "cover" }).composite([{ input: overlay }]).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL(`../public/og/${slug}.png`, import.meta.url)));
}
