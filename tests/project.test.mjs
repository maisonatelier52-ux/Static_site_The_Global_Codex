import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { articles, authors } from "../data/news.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("keeps a complete, uniquely keyed blog", () => {
  assert.equal(articles.length, 48);
  assert.equal(new Set(articles.map((article) => article.id)).size, 48);
  assert.equal(new Set(articles.map((article) => `${article.category}/${article.slug}`)).size, 48);
});

test("every post exposes authority and utility fields", () => {
  for (const article of articles) {
    assert.ok(article.whyItMatters?.length >= 40, `${article.slug} needs a useful why-it-matters field`);
    assert.ok(article.whatToWatch?.length >= 40, `${article.slug} needs a useful what-to-watch field`);
    assert.ok(article.verificationNote?.length >= 40, `${article.slug} needs a review note`);
    assert.ok(article.updatedAt, `${article.slug} needs a review date`);
    assert.ok(article.sources.length >= 2, `${article.slug} needs at least two sources`);
    assert.ok(article.sources.every((item) => item.name && item.type && /^https:\/\//.test(item.url)));
    assert.ok(article.keyTakeaways.length >= 3);
    assert.ok(article.sections.length >= 3);
  }
});

test("the blog separates explainers from current-affairs analysis", () => {
  assert.equal(articles.filter((article) => article.newsType === "explainer").length, 32);
  assert.equal(articles.filter((article) => article.newsType !== "explainer").length, 16);
});

test("the content pass replaces boilerplate with post-specific guidance", () => {
  const boilerplate = /Use the source links below|A useful reading habit is/i;
  const explainers = articles.filter((article) => article.newsType === "explainer");

  for (const article of explainers) {
    const paragraphs = article.sections
      .flatMap((section) => section.blocks)
      .filter((block) => block.type === "paragraph")
      .map((block) => block.text);

    assert.doesNotMatch(paragraphs.join("\n"), boilerplate, `${article.slug} still contains generic guidance`);
    assert.ok(!paragraphs.includes(article.whatToWatch), `${article.slug} repeats its what-to-watch field verbatim`);
    assert.equal(article.updatedAt, "2026-09-02T00:00:00.000Z");
  }
});

test("sensitive current-affairs posts state the limits of their sourcing", () => {
  const visaPost = articles.find((article) => article.slug === "trump-administration-visa-revocations-asylum-seekers");
  const metaPost = articles.find((article) => article.slug === "meta-18-billion-settlement-children-social-media-addiction");

  assert.match(visaPost.title, /What Is Known/i);
  assert.match(visaPost.verificationNote, /Associated Press reporting|does not confirm a finalized policy/i);
  assert.ok(visaPost.sources.some((source) => /visitor-visa overview/i.test(source.name)));
  assert.match(metaPost.verificationNote, /characterize the payment amount differently/i);
});

test("editor labels are transparent collective roles", () => {
  assert.equal(authors.length, 6);
  assert.ok(authors.every((author) => author.kind === "editorial_team"));
  assert.ok(authors.every((author) => author.name.endsWith("Editor")));
  assert.ok(authors.every((author) => Object.keys(author.social).length === 0));
});

test("every post and editor uses an original illustration asset", async () => {
  for (const article of articles) {
    assert.match(article.image, /^\/images\/illustrations\/.+\.webp$/, `${article.slug} needs an illustration path`);
    assert.match(article.imageAlt, /^Editorial illustration /, `${article.slug} needs descriptive illustration alt text`);
    await access(path.join(projectRoot, "public", article.image));

    for (const block of article.sections.flatMap((section) => section.blocks)) {
      if (block.type !== "image") continue;
      assert.match(block.src, /^\/images\/illustrations\/.+\.webp$/);
      assert.match(block.alt, /^Editorial illustration /);
      await access(path.join(projectRoot, "public", block.src));
    }
  }

  for (const author of authors) {
    assert.match(author.image, /^\/images\/editors\/.+\.webp$/, `${author.slug} needs an editor emblem`);
    await access(path.join(projectRoot, "public", author.image));
  }
});

test("post routes render sources, format and corrections modules", async () => {
  const article = await readFile(path.join(projectRoot, "app/[category]/[slug]/page.jsx"), "utf8");
  for (const moduleName of ["Post format", "In this post", "Why it matters", "What to watch", "Sources & documents", "Corrections:"]) {
    assert.match(article, new RegExp(moduleName));
  }
  assert.match(article, /citation: article\.sources/);
  assert.match(article, /dateModified: article\.updatedAt/);
  assert.match(article, /"@type": "BlogPosting"/);
  assert.match(article, /Editorial illustration/);
  assert.match(article, /not a documentary photograph/);
  assert.doesNotMatch(article, /NewsArticle|NewsMediaOrganization/);
});

test("public framing identifies an evidence-based blog", async () => {
  const files = await Promise.all([
    readFile(path.join(projectRoot, "app/page.jsx"), "utf8"),
    readFile(path.join(projectRoot, "app/about/page.jsx"), "utf8"),
    readFile(path.join(projectRoot, "components/Header.jsx"), "utf8"),
    readFile(path.join(projectRoot, "components/Footer.jsx"), "utf8"),
  ]);
  const publicCopy = files.join("\n");
  assert.match(publicCopy, /current-affairs blog/i);
  assert.match(publicCopy, /original editorial illustrations/i);
  assert.doesNotMatch(publicCopy, /Search the newsroom|Story standard|Source-led reporting|Latest news/);
});

test("editor illustrations replace every initials placeholder", async () => {
  const files = await Promise.all([
    readFile(path.join(projectRoot, "app/page.jsx"), "utf8"),
    readFile(path.join(projectRoot, "app/about/page.jsx"), "utf8"),
    readFile(path.join(projectRoot, "app/author/[slug]/page.jsx"), "utf8"),
    readFile(path.join(projectRoot, "app/[category]/[slug]/page.jsx"), "utf8"),
  ]);
  const identitySurfaces = files.join("\n");
  assert.doesNotMatch(identitySurfaces, /author\.name\.split/);
  assert.match(identitySurfaces, /src=\{author\.image\}/);
  assert.match(identitySurfaces, /editorial emblem/);
});

test("site-wide social preview uses the publication card", async () => {
  const layout = await readFile(path.join(projectRoot, "app/layout.jsx"), "utf8");
  assert.match(layout, /\/og\.png/);
  assert.match(layout, /Evidence\. Context\. Consequence\./);
});

test("Vercel uses the native Next.js build while Sites keeps Vinext", async () => {
  const packageJson = JSON.parse(await readFile(path.join(projectRoot, "package.json"), "utf8"));
  const vercel = JSON.parse(await readFile(path.join(projectRoot, "vercel.json"), "utf8"));

  assert.equal(packageJson.engines.node, "22.x");
  assert.equal(packageJson.scripts.build, "vinext build");
  assert.equal(packageJson.scripts["build:vercel"], "next build");
  assert.equal(vercel.framework, "nextjs");
  assert.equal(vercel.buildCommand, "npm run build:vercel");
});
