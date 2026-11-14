import type { Coin } from "./api";

const usdFormatter = new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("cs-CZ", {
    maximumFractionDigits: 2,
});

export type CoinSortMode = "market-cap" | "price-desc" | "price-asc";

export function filterAndSortCoins(
    coins: Coin[],
    searchTerm: string,
    sortMode: CoinSortMode,
): Coin[] {
    const cleanSearch = searchTerm.toLocaleLowerCase("cs-CZ").trim();
    const filtered = coins.filter((coin) =>
        coin.name.toLocaleLowerCase("cs-CZ").includes(cleanSearch) ||
        coin.symbol.toLocaleLowerCase("cs-CZ").includes(cleanSearch),
    );

    if (sortMode === "market-cap") {
        return filtered;
    }

    return filtered.sort((first, second) => {
        if (first.current_price == null) {
            return second.current_price == null ? 0 : 1;
        }
        if (second.current_price == null) {
            return -1;
        }

        return sortMode === "price-desc"
            ? second.current_price - first.current_price
            : first.current_price - second.current_price;
    });
}

export function formatUsd(value: number | null | undefined): string {
    return value == null ? "—" : usdFormatter.format(value);
}

export function formatNumber(value: number | null | undefined): string {
    return value == null ? "—" : numberFormatter.format(value);
}

export function formatPercentage(value: number | null | undefined): string {
    if (value == null) {
        return "—";
    }

    const formatted = new Intl.NumberFormat("cs-CZ", {
        maximumFractionDigits: 2,
        signDisplay: "always",
    }).format(value);

    return `${formatted} %`;
}

export function getRangePosition(
    current: number | null | undefined,
    low: number | null | undefined,
    high: number | null | undefined,
): number | null {
    if (current == null || low == null || high == null || high <= low) {
        return null;
    }

    return Math.min(100, Math.max(0, ((current - low) / (high - low)) * 100));
}
