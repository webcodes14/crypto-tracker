export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
}

export interface CoinDetail extends Omit<Coin, 'image'> {
    description: { en: string };
    market_data: { 
        market_cap_rank: number;
        sparkline_7d: { price: number[] };
        fully_diluted_valuation: {usd: number};
        price_change_percentage_24h: number;
        market_cap: {usd: number};
        current_price: {usd: number};
        high_24h: {usd: number};
        low_24h: {usd: number};
        total_supply: number;
        max_supply: number;
        circulating_supply: number;
    };
    image: { 
        thumb: string;
        small: string;
        large: string;
    }
}

const BASE_URL = 'https://api.coingecko.com/api/v3';

async function handleFetch(url: string) {
    try {
        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log('Fetch failed', error);
        throw error;
    }
}

export const getCoins = async (): Promise<Coin[]> => {
    return handleFetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
}

export const getDetailCoin = async ( id: string ): Promise<CoinDetail> => {
    return handleFetch(`${BASE_URL}/coins/${id}?localization=false&sparkline=true`);
}