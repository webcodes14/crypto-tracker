import { CoinDetail } from "@/lib/api";
import CoinGraph from "./CoinGraph";
import Image from "next/image";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface CoinDetailProps {
    coinData: CoinDetail;
}

const CoinDetailPage = ({ coinData }: CoinDetailProps) => {
    const coinDetailPrice = new Intl.NumberFormat("en-US", {
        style: "currency", 
        currency: "USD",
        maximumFractionDigits: 2,
    });
    
    const formattedCoinPrice = coinDetailPrice.format(coinData.market_data.current_price.usd);
    const formattedCoinLowPrice = coinDetailPrice.format(coinData.market_data.low_24h.usd);
    const formattedCoinHighPrice = coinDetailPrice.format(coinData.market_data.high_24h.usd);
    
    const isGrowing = coinData.market_data.price_change_percentage_24h > 0;

    const rangeProgressBar = coinData.market_data.high_24h.usd - coinData.market_data.low_24h.usd;
    const positionPriceProgressBar = rangeProgressBar !== 0 ? ((coinData.market_data.current_price.usd - coinData.market_data.low_24h.usd) / rangeProgressBar) * 100 : 50;

    const formattedMarketCap = coinDetailPrice.format(coinData.market_data.market_cap.usd);
    const formattedValuation = coinDetailPrice.format(coinData.market_data.fully_diluted_valuation.usd);
    const formattedCirculatingSupply = coinDetailPrice.format(coinData.market_data.circulating_supply);
    const formattedTotalSupply = coinDetailPrice.format(coinData.market_data.total_supply);
    const formattedMaxSupply = coinDetailPrice.format(coinData.market_data.max_supply);

    return (
        <>
            <section className="xl:flex xl:gap-8">
                <div className="xl:basis-2/7">
                    <div className="flex items-end gap-1.5">
                        <Image 
                            src={coinData.image.small}
                            alt={coinData.id}
                            width={32}
                            height={32}
                        />
                        <h4><strong>{coinData.name}</strong></h4>
                        <p className="text-gray-400 text-sm">
                            {`${coinData.symbol.toLocaleUpperCase()} Price`} <span className="bg-gray-200 p-0.5 rounded-sm">#{coinData.market_data.market_cap_rank}</span>
                        </p>
                    </div>
                    <h2 className="font-bold text-2xl mt-4 mb-6 flex items-center gap-1">
                        {formattedCoinPrice} 
                        
                        <span className={`text-sm flex items-center ${isGrowing ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                            {isGrowing ? (
                                <>
                                    <IoMdArrowDropup className="text-lg" /> {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                                </>
                            ) : (
                                <>
                                    <IoMdArrowDropdown className="text-lg" /> {(coinData.market_data.price_change_percentage_24h * -1).toFixed(2)}%
                                </>
                            )}        
                        </span> 

                        <span className={`text-sm ${isGrowing ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                            (24h)
                        </span>
                    </h2>
                    <div>
                        <div className="block h-2 rounded-sm overflow-hidden bg-gray-200">
                            <span 
                                className={`block h-full bg-linear-to-r from-[#C8CF65] to-[#57C77C] transition-all duration-500 ease-out`}
                                style={{width: `${positionPriceProgressBar.toFixed(2)}%`}}>
                            </span>
                        </div>
                        <div className="flex justify-between text-xs font-bold my-3">
                            <span>{formattedCoinLowPrice}</span> <span>24h Range</span> <span>{formattedCoinHighPrice}</span>
                        </div>
                    </div>
                    {coinData.market_data.market_cap && 
                        <p className="flex flex-col gap-1 justify-center text-sm text-center my-4 pb-1 border-b-2 border-solid border-gray-200 md:flex-row md:justify-between">Market Cap <strong>{formattedMarketCap}</strong></p>
                    }
                    {coinData.market_data.fully_diluted_valuation && 
                        <p className="flex flex-col gap-1 justify-center text-sm text-center my-4 pb-1 border-b-2 border-solid border-gray-200 md:flex-row md:justify-between">Fully Diluted Valuation <strong>{formattedValuation}</strong></p>
                    }
                    {coinData.market_data.circulating_supply && 
                        <p className="flex flex-col gap-1 justify-center text-sm text-center my-4 pb-1 border-b-2 border-solid border-gray-200 md:flex-row md:justify-between">Circulating Supply <strong>{formattedCirculatingSupply}</strong></p>
                    }
                    {coinData.market_data.total_supply && 
                        <p className="flex flex-col gap-1 justify-center text-sm text-center my-4 pb-1 border-b-2 border-solid border-gray-200 md:flex-row md:justify-between">Total Supply <strong>{formattedTotalSupply}</strong></p>
                    }
                    {coinData.market_data.max_supply && 
                        <p className="flex flex-col gap-1 justify-center text-sm text-center my-4 pb-1 border-b-2 border-solid border-gray-200 md:flex-row md:justify-between">Max Supply <strong>{formattedMaxSupply}</strong></p>
                    }
                </div>    
                
                <div className="xl:basis-5/7 xl:h-120">
                    <CoinGraph data={coinData.market_data?.sparkline_7d?.price || []} />
                </div>
            </section>
        </>
    )
}

export default CoinDetailPage;
