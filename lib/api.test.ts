import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { coinDetailSchema, coinSchema } from "./api";
import type { Coin } from "./api";
import {
    filterAndSortCoins,
    formatPercentage,
    formatUsd,
    getRangePosition,
} from "./coin-utils";

const makeCoin = (
    id: string,
    name: string,
    symbol: string,
    current_price: number | null,
): Coin => ({
    id,
    name,
    symbol,
    image: `https://example.com/${id}.png`,
    current_price,
    price_change_percentage_24h: null,
    market_cap: null,
    market_cap_rank: null,
});

describe("CoinGecko response schemas", () => {
    it("accepts nullable market values for a market-list coin", () => {
        const result = coinSchema.safeParse({
            id: "ethereum",
            symbol: "eth",
            name: "Ethereum",
            image: "https://example.com/ethereum.png",
            current_price: 3200,
            price_change_percentage_24h: null,
            market_cap: 100,
            market_cap_rank: 2,
        });

        assert.equal(result.success, true);
    });

    it("accepts a null maximum supply in a detail response", () => {
        const result = coinDetailSchema.safeParse({
            id: "ethereum",
            symbol: "eth",
            name: "Ethereum",
            image: { small: "https://example.com/ethereum.png" },
            market_data: {
                market_cap_rank: 2,
                sparkline_7d: { price: [3200, 3250] },
                current_price: { usd: 3200 },
                low_24h: { usd: 3100 },
                high_24h: { usd: 3300 },
                market_cap: { usd: 100 },
                fully_diluted_valuation: { usd: 110 },
                price_change_percentage_24h: 1.5,
                total_supply: 100,
                circulating_supply: 90,
                max_supply: null,
            },
        });

        assert.equal(result.success, true);
    });

    it("rejects malformed external data", () => {
        const result = coinSchema.safeParse({
            id: "bitcoin",
            symbol: "btc",
            name: "Bitcoin",
            image: "not-a-url",
            current_price: "unknown",
        });

        assert.equal(result.success, false);
    });
});

describe("display helpers", () => {
    it("formats absent values without showing zero", () => {
        assert.equal(formatUsd(null), "—");
        assert.equal(formatPercentage(null), "—");
    });

    it("keeps a price position within the displayed 24-hour range", () => {
        assert.equal(getRangePosition(105, 100, 110), 50);
        assert.equal(getRangePosition(120, 100, 110), 100);
        assert.equal(getRangePosition(90, 100, 110), 0);
        assert.equal(getRangePosition(100, 100, 100), null);
    });

    it("filters by name or symbol and sorts missing prices last", () => {
        const coins = [
            makeCoin("bitcoin", "Bitcoin", "btc", 100),
            makeCoin("tether", "Tether", "usdt", 1),
            makeCoin("new-coin", "New Coin", "new", null),
        ];

        assert.deepEqual(
            filterAndSortCoins(coins, " BTC ", "market-cap").map((coin) => coin.id),
            ["bitcoin"],
        );
        assert.deepEqual(
            filterAndSortCoins(coins, "", "price-asc").map((coin) => coin.id),
            ["tether", "bitcoin", "new-coin"],
        );
        assert.deepEqual(coins.map((coin) => coin.id), ["bitcoin", "tether", "new-coin"]);
    });
});
