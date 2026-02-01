import { Coin } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

import classes from "./CoinCard.module.css";

interface CoinCardProps {
    coin: Coin;
}

const CoinCard = ({ coin }: CoinCardProps) => {
    const priceFormatter = new Intl.NumberFormat("en-US", {
        style: "currency", 
        currency: "USD",
        maximumFractionDigits: 2,
    });
    const formattedPrice = priceFormatter.format(coin.current_price);

    return (
        <li className={classes['coin-list__item']}>
            <Image 
                src={coin.image} 
                alt={coin.name} 
                width={32}
                height={32}
            />
            <h2 className="text-lg my-2">
                <strong>{coin.name}</strong>
            </h2>
            <p className={`md:w-24 md:text-right ${coin.price_change_percentage_24h > 0 ? classes['coin--color-up'] : classes['coin--color-down']}`}>
                {formattedPrice}
            </p>
            <p className="mt-4 md:mt-0">
                <Link 
                    className={classes['coin-list__detail-btn']}
                    href={`/coin/${coin.id}`}>
                        Zobrazit detail
                </Link>
            </p>
        </li>
    )
}

export default CoinCard;