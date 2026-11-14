import type { Metadata } from "next";
import { getDetailCoin } from "@/lib/api";
import CoinDetailPage from "@/app/components/CoinDetailPage";

type CoinPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CoinPageProps): Promise<Metadata> {
    const { id } = await params;
    const coin = await getDetailCoin(id);

    return {
        title: `${coin.name} (${coin.symbol.toUpperCase()})`,
        description: `Cena, tržní statistiky a sedmidenní vývoj kryptoměny ${coin.name}.`,
    };
}

const CoinDetail = async ({ params }: CoinPageProps) => {
    const { id } = await params;
    const coin = await getDetailCoin(id);

    return <CoinDetailPage coinData={coin} />;
};

export default CoinDetail;