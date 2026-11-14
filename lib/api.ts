import { z } from "zod";

const nullableNumber = z.number().nullable();

export const coinSchema = z.object({
    id: z.string().min(1),
    symbol: z.string(),
    name: z.string(),
    image: z.string().url(),
    current_price: nullableNumber,
    price_change_percentage_24h: nullableNumber,
    market_cap: nullableNumber,
    market_cap_rank: z.number().nullable(),
});

export type Coin = z.infer<typeof coinSchema>;

const usdValueSchema = z.object({
    usd: nullableNumber,
}).nullable().optional();

export const coinDetailSchema = z.object({
    id: z.string().min(1),
    symbol: z.string(),
    name: z.string(),
    image: z.object({
        small: z.string().url(),
    }),
    market_data: z.object({
        market_cap_rank: z.number().nullable().optional(),
        sparkline_7d: z.object({
            price: z.array(z.number()),
        }).nullable().optional(),
        fully_diluted_valuation: usdValueSchema,
        price_change_percentage_24h: z.number().nullable().optional(),
        market_cap: usdValueSchema,
        current_price: usdValueSchema,
        high_24h: usdValueSchema,
        low_24h: usdValueSchema,
        total_supply: nullableNumber.nullish(),
        max_supply: nullableNumber.nullish(),
        circulating_supply: nullableNumber.nullish(),
    }),
});

export type CoinDetail = z.infer<typeof coinDetailSchema>;

const BASE_URL = "https://api.coingecko.com/api/v3";

async function fetchCoinGecko<T>(url: string, schema: z.ZodType<T>): Promise<T> {
    const response = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!response.ok) {
        throw new Error(`CoinGecko request failed (${response.status} ${response.statusText})`);
    }

    const payload: unknown = await response.json();
    return schema.parse(payload);
}

export const getCoins = async (): Promise<Coin[]> => {
    const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
    return fetchCoinGecko(url, z.array(coinSchema));
};

export const getDetailCoin = async (id: string): Promise<CoinDetail> => {
    if (!id.trim()) {
        throw new Error("A coin ID is required.");
    }

    const url = `${BASE_URL}/coins/${encodeURIComponent(id)}?localization=false&sparkline=true`;
    return fetchCoinGecko(url, coinDetailSchema);
};
