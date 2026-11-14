import type { CoinDetail } from "@/lib/api";
import { formatNumber, formatPercentage, formatUsd, getRangePosition } from "@/lib/coin-utils";
import Image from "next/image";
import Link from "next/link";
import CoinGraph from "./CoinGraph";

interface CoinDetailProps {
    coinData: CoinDetail;
}

interface StatisticProps {
    label: string;
    value: string;
    hint?: string;
}

const Statistic = ({ label, value, hint }: StatisticProps) => (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 break-words text-xl font-bold tracking-tight text-slate-950">{value}</p>
        {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </article>
);

const CoinDetailPage = ({ coinData }: CoinDetailProps) => {
    const marketData = coinData.market_data;
    const currentPrice = marketData.current_price?.usd;
    const lowPrice = marketData.low_24h?.usd;
    const highPrice = marketData.high_24h?.usd;
    const priceChange = marketData.price_change_percentage_24h;
    const rangePosition = getRangePosition(currentPrice, lowPrice, highPrice);
    const priceChangeClass = priceChange == null || priceChange === 0
        ? "text-slate-500"
        : priceChange > 0
            ? "text-emerald-700"
            : "text-rose-700";

    return (
        <div className="space-y-6">
            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950"
            >
                <span aria-hidden="true">←</span>
                Zpět na přehled
            </Link>

            <section className="flex flex-col gap-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex min-w-0 items-center gap-4">
                    <Image
                        src={coinData.image.small}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-full object-contain"
                    />
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                {coinData.name}
                            </h1>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                                {coinData.symbol}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                            {marketData.market_cap_rank == null
                                ? "Pořadí podle tržní kapitalizace není dostupné"
                                : `#${marketData.market_cap_rank} podle tržní kapitalizace`}
                        </p>
                    </div>
                </div>

                <div className="sm:text-right">
                    <p className="text-sm font-medium text-slate-500">Aktuální cena</p>
                    <div className="mt-1 flex flex-wrap items-baseline gap-3 sm:justify-end">
                        <p className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            {formatUsd(currentPrice)}
                        </p>
                        <p className={`font-semibold ${priceChangeClass}`}>
                            {formatPercentage(priceChange)}
                            <span className="ml-1 text-xs font-medium text-slate-500"> · 24 h</span>
                        </p>
                    </div>
                </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(18rem,0.8fr)]">
                <section className="min-w-0 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                            Historie trhu
                        </p>
                        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
                            Vývoj ceny
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">Posledních 7 dní · USD</p>
                    </div>
                    <div className="h-72 sm:h-80">
                        <CoinGraph data={marketData.sparkline_7d?.price ?? []} />
                    </div>
                </section>

                <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                        Denní rozpětí
                    </p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
                        Rozpětí ceny za 24 h
                    </h2>
                    <div className="mt-8">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Minimum</p>
                                <p className="mt-1 font-semibold tabular-nums text-slate-700">{formatUsd(lowPrice)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Maximum</p>
                                <p className="mt-1 font-semibold tabular-nums text-slate-700">{formatUsd(highPrice)}</p>
                            </div>
                        </div>
                        {rangePosition == null ? (
                            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                Rozpětí ceny nyní není k dispozici.
                            </p>
                        ) : (
                            <>
                                <div
                                    className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
                                    role="meter"
                                    aria-label="Aktuální cena v rozpětí za 24 hodin"
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={Math.round(rangePosition)}
                                    aria-valuetext={`${formatUsd(currentPrice)} z ${formatUsd(lowPrice)} až ${formatUsd(highPrice)}`}
                                >
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-600"
                                        style={{ width: `${rangePosition}%` }}
                                    />
                                </div>
                                <p className="mt-4 text-sm text-slate-500">
                                    Aktuální cena{" "}
                                    <strong className="font-semibold text-slate-900">{formatUsd(currentPrice)}</strong>
                                </p>
                            </>
                        )}
                    </div>
                </section>
            </div>

            <section aria-label="Tržní statistiky" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Statistic label="Tržní kapitalizace" value={formatUsd(marketData.market_cap?.usd)} />
                <Statistic
                    label="Plně zředěná valuace"
                    value={formatUsd(marketData.fully_diluted_valuation?.usd)}
                />
                <Statistic
                    label="Maximum za 24 h"
                    value={formatUsd(highPrice)}
                />
                <Statistic
                    label="Minimum za 24 h"
                    value={formatUsd(lowPrice)}
                />
            </section>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                        Tokenomika
                    </p>
                    <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
                        Nabídka v oběhu
                    </h2>
                </div>
                <dl className="divide-y divide-slate-100">
                    <div className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <dt className="text-sm text-slate-500">Obíhající nabídka</dt>
                        <dd className="font-semibold tabular-nums text-slate-900">
                            {formatNumber(marketData.circulating_supply)} {coinData.symbol.toUpperCase()}
                        </dd>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <dt className="text-sm text-slate-500">Celková nabídka</dt>
                        <dd className="font-semibold tabular-nums text-slate-900">
                            {formatNumber(marketData.total_supply)} {coinData.symbol.toUpperCase()}
                        </dd>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 py-3">
                        <dt className="text-sm text-slate-500">Maximální nabídka</dt>
                        <dd className="font-semibold tabular-nums text-slate-900">
                            {formatNumber(marketData.max_supply)} {coinData.symbol.toUpperCase()}
                        </dd>
                    </div>
                </dl>
            </section>
        </div>
    );
};

export default CoinDetailPage;
