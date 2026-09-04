import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { articles, categories } from "../data/news.js";
import { navCategories, siteConfig } from "../lib/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = ["world", "u.s", "business", "finance", "technology", "politics", "health", "sport", "investigation"];

test("publishes exactly ten stories in each requested section", () => {
  assert.deepEqual([...categories].sort(), [...required].sort());
  assert.equal(articles.length, 90);
  for (const category of required) assert.equal(articles.filter((a) => a.category === category).length, 10);
  assert.deepEqual(navCategories.map((name) => name.toLowerCase()), required);
});

test("every article is publication-ready and 600 to 900 words", async () => {
  const seen = new Set();
  for (const article of articles) {
    const key = `${article.category}/${article.slug}`;
    assert.ok(!seen.has(key), `duplicate route ${key}`);
    seen.add(key);
    const words = article.sections.flatMap((section) => section.blocks).filter((block) => block.type === "paragraph").flatMap((block) => block.text.trim().split(/\s+/)).length;
    assert.ok(words >= 600 && words <= 900, `${key} has ${words} words`);
    assert.ok(article.sources.length >= 2, `${key} needs sources`);
    assert.ok(article.sources.every((source) => /^https:\/\//.test(source.url)));
    assert.match(article.verificationNote, /Reviewed September 4, 2026/);
    assert.match(article.image, /^\/images\/illustrations\/.+\.webp$/);
    await access(path.join(root, "public", article.image));
  }
});

test("branding, domain metadata and article Open Graph are correct", async () => {
  assert.equal(siteConfig.name, "Business Standard");
  assert.equal(siteConfig.url, "https://www.businessstandard.org");
  const [layout, category, article] = await Promise.all([
    readFile(path.join(root, "app/layout.jsx"), "utf8"),
    readFile(path.join(root, "app/[category]/page.jsx"), "utf8"),
    readFile(path.join(root, "app/[category]/[slug]/page.jsx"), "utf8"),
  ]);
  assert.match(layout, /\/og\/home\.png/);
  assert.match(category, /\/og\/\$\{category\}\.png/);
  assert.match(article, /article\.image/);
  assert.match(article, /"@type": "NewsArticle"/);
});

test("required trust and legal pages exist", async () => {
  for (const page of ["about", "contact", "editorial-standards", "corrections", "privacy", "terms"]) {
    await access(path.join(root, "app", page, "page.jsx"));
  }
  for (const card of ["home", "about", ...required]) await access(path.join(root, "public", "og", `${card}.png`));
  await access(path.join(root, "public", "favicon.svg"));
});
