# The Global Dispatch

An evidence-based global affairs blog built around visible sources, useful context, and transparent review standards.

## Editorial model

- 48 posts with unique identities, review dates, takeaways, and source links
- 16 sourced analyses grounded in named primary documents and reputable coverage
- 32 evidence guides that replace unsupported demonstration stories
- Transparent collective topic-editor labels instead of invented personal bylines
- A visible format label, source panel, corrections note, and structured BlogPosting metadata on every post
- A standards page that explains sourcing, uncertainty, updates, and prototype limitations

The site synthesizes publicly available sources and does not claim original reporting unless a post explicitly says otherwise. Source links should be rechecked before later republication because external records can change.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev -- --port 3002
```

Open [http://localhost:3002](http://localhost:3002).

## Verify and build

```bash
npm run lint
node --test tests/project.test.mjs
npm run build
```

The production build uses Vinext and the OpenAI Sites Vite integration.

## Project structure

```text
app/                  Routes and editorial layouts
components/           Reusable story and navigation components
data/news.js           Normalized article data and helpers
public/data/           Article and editorial-desk records
public/og.png          Publication social preview
tests/                 Dataset and authority checks
.openai/hosting.json   Sites project binding
```
