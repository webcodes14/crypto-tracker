import { getCoins } from "@/lib/api";
import CryptoList from "./CryptoList";

const CryptoWrapper = async () => {
    const coins = await getCoins();

    return (
        <>
            <CryptoList initialData={coins} />
        </>
    )
}

export default CryptoWrapper;