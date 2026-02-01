import { getDetailCoin } from "@/lib/api";
import CoinDetailPage from "@/app/components/CoinDetailPage";

const coinDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const coin = await getDetailCoin(id);

    return (
        <>
            <CoinDetailPage coinData={coin} />
        </>
    )
}

export default coinDetail;

/* graf
https://www.tremor.so/charts
*/