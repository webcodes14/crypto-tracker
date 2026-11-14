"use client";

import { useMemo, useState } from "react";
import type { Coin } from "@/lib/api";
import { filterAndSortCoins, type CoinSortMode } from "@/lib/coin-utils";
import CoinCard from "./CoinCard";
import SearchBar from "./SearchBar";
import classes from "./CryptoList.module.css";

interface CryptoListProps {
    initialData: Coin[];
}

const CryptoList = ({ initialData }: CryptoListProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortMode, setSortMode] = useState<CoinSortMode>("market-cap");

    const filteredCoins = useMemo(
        () => filterAndSortCoins(initialData, searchTerm, sortMode),
        [initialData, searchTerm, sortMode],
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-end sm:p-4">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <label className="flex w-full flex-col gap-1.5 text-sm font-medium text-slate-600 sm:w-56">
                    Seřadit podle
                    <select
                        className="h-11 rounded-xl border-slate-200 bg-slate-50 text-sm text-slate-900 focus:border-emerald-500 focus:ring-emerald-500"
                        value={sortMode}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (value === "market-cap" || value === "price-desc" || value === "price-asc") {
                                setSortMode(value);
                            }
                        }}
                    >
                        <option value="market-cap">Tržní kapitalizace</option>
                        <option value="price-desc">Nejvyšší cena</option>
                        <option value="price-asc">Nejnižší cena</option>
                    </select>
                </label>
            </div>

            <p className="px-1 text-sm text-slate-500" role="status" aria-live="polite">
                Zobrazeno {filteredCoins.length} z {initialData.length} kryptoměn
            </p>

            {filteredCoins.length > 0 ? (
                <ul className={classes["coin-list"]} aria-label="Seznam kryptoměn">
                    {filteredCoins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </ul>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <p className="font-semibold text-slate-900">Nic jsme nenašli</p>
                    <p className="mt-1 text-sm text-slate-500">
                        Zkuste jiný název nebo symbol kryptoměny.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CryptoList;
