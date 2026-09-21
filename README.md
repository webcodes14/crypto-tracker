# Crypto Tracker

A small responsive cryptocurrency dashboard built with Next.js. It displays
current market data from CoinGecko, lets users search and sort the listed
coins, and provides a detail page with market statistics and a seven-day price
chart.

The Czech version of this documentation is available in
[README_CZ.md](./README_CZ.md).

## Features

- Shows the top 10 cryptocurrencies ordered by market capitalization.
- Fetches current price, symbol, market-cap data, and coin images from the
  CoinGecko API.
- Searches coins by name or symbol.
- Sorts the currently filtered list by default order, highest price, or lowest
  price.
- Provides a detail page at `/coin/[id]` with:
  - current USD price and 24-hour change,
  - 24-hour low/high range,
  - market cap, fully diluted valuation, and supply statistics,
  - a seven-day price chart.
- Includes a `/tech-stack` page describing the technologies used.
- Uses responsive Tailwind CSS styling and CSS Modules where component-specific
  styles are needed.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Chart.js](https://www.chartjs.org/) with
  [react-chartjs-2](https://react-chartjs-2.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [CoinGecko API](https://docs.coingecko.com/reference/introduction)

## Requirements

- Node.js 20.9 or newer
- npm
- Internet access for requests to CoinGecko and for remote coin images

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run build` | Creates a production build. |
| `npm run start` | Serves the production build. Run `npm run build` first. |
| `npm run lint` | Runs ESLint. |

## Data and caching

Data is loaded server-side through the helpers in `lib/api.ts`:

- `GET /api/v3/coins/markets` loads the first 10 coins by market cap.
- `GET /api/v3/coins/{id}` loads the selected coin's detail data and
  seven-day sparkline.

The requests use Next.js server-side revalidation with a 60-second interval.
No application environment variables are currently required. CoinGecko
availability and rate limits can affect loading the dashboard; the app
surfaces failed requests through the relevant Next.js error handling.

Coin images are allowed from `coin-images.coingecko.com` in
`next.config.ts`.

## Project structure

```text
app/
  page.tsx                    Dashboard page
  coin/[id]/page.tsx          Coin detail route
  tech-stack/page.tsx         Technology overview
  components/                 UI components and client-side interactions
lib/
  api.ts                      CoinGecko types and server-side fetch helpers
public/
  data.json                   Static public data asset
  crypto-tracker.png          Application logo
```

The dashboard and coin detail pages use server components for data loading.
The search, sorting controls, and Chart.js visualization are implemented in
client components.

## Notes

- Prices and market values are displayed in USD.
- The dashboard intentionally shows only the first 10 coins returned by the
  market-cap query.
- The project does not include authentication, a database, or persistent user
  preferences.
- CoinGecko is an external service, so its data may change and its API limits
  apply.

## License

No license file is currently included in the repository.
