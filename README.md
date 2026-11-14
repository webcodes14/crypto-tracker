# Crypto Tracker

A responsive cryptocurrency dashboard built with Next.js 16. It shows the
ten coins with the highest market capitalization, supports search and sorting,
and provides a detail page with a seven-day price chart.

The Czech version of this documentation is available in
[README_CZ.md](./README_CZ.md).

## Features

- Server-side CoinGecko market data with 60-second revalidation.
- Runtime API response validation with Zod.
- Search by coin name or symbol and accessible native sorting controls.
- Coin detail pages with 24-hour change and range, supply statistics, and a
  seven-day price chart.
- Responsive layouts, loading and empty states, and a retryable error screen.

## Tech stack

- Next.js 16 App Router and React 19
- TypeScript and Zod
- Tailwind CSS 4 and CSS Modules
- Chart.js and `react-chartjs-2`
- Node.js built-in test runner

## Requirements

- Node.js 20.9 or newer
- npm
- Internet access for the CoinGecko API and remote coin images

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

GitHub Actions runs these checks on every push and pull request.

## AI tools

GitHub Copilot was used as a supporting tool during development and code
updates. AI-generated suggestions were adapted and checked with tests, linting,
and a production build.

## Project structure

```text
app/
  coin/[id]/page.tsx       Coin detail page and metadata
  components/              Server and client UI components
  tech-stack/page.tsx      Technology and design decisions
  page.tsx                 Dashboard
lib/
  api.ts                   Zod schemas and CoinGecko server helpers
  coin-utils.ts            Formatting and price-range calculation
  api.test.ts              Validation and utility tests
```

## Data and limitations

All prices are shown in USD. CoinGecko data may be delayed, unavailable, or
affected by API rate limits. Responses are validated, and missing numeric
values are shown as unavailable. This is a read-only portfolio project with no
accounts, database, or persisted user preferences.

No license has been selected for this repository. Add one explicitly before
redistributing the project.
