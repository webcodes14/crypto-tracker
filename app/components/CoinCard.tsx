import type { Coin } from "@/lib/api";
import { formatPercentage, formatUsd } from "@/lib/coin-utils";
import Image from "next/image";
import Link from "next/link";

import classes from "./CoinCard.module.css";

interface CoinCardProps {
    coin: Coin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
    const change = coin.price_change_percentage_24h;
    const changeClass = change == null
        ? classes["change-neutral"]
        : change > 0
            ? classes["change-positive"]
            : change < 0
                ? classes["change-negative"]
                : classes["change-neutral"];

    return (
        <li className={classes["coin-list__item"]}>
            <div className={classes.identity}>
                <span className={classes.rank}>
                    {coin.market_cap_rank == null ? "—" : `#${coin.market_cap_rank}`}
                </span>
                <Image
                    src={coin.image}
                    alt=""
                    width={40}
                    height={40}
                    className={classes.coinImage}
                />
                <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-950">{coin.name}</h3>
                    <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {coin.symbol}
                    </p>
                </div>
            </div>

            <div className={classes.metric}>
                <span className={classes.metricLabel}>Cena</span>
                <strong className={classes.price}>{formatUsd(coin.current_price)}</strong>
            </div>

            <div className={classes.metric}>
                <span className={classes.metricLabel}>Změna za 24 h</span>
                <strong className={`${classes.change} ${changeClass}`}>
                    {change != null && change > 0 ? (
                        <span aria-hidden="true">↗</span>
                    ) : change != null && change < 0 ? (
                        <span aria-hidden="true">↘</span>
                    ) : null}
                    {formatPercentage(change)}
                </strong>
            </div>

            <Link className={classes.detailLink} href={`/coin/${coin.id}`}>
                Detail
                <span aria-hidden="true">→</span>
                <span className="sr-only"> kryptoměny {coin.name}</span>
            </Link>
        </li>
    );
};

export default CoinCard;
