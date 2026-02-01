import CryptoWrapper from "./components/CryptoWrapper";

const Home = () => {

  return (
    <>
      <section>
        <h2 className="text-2xl">
          <strong>Živé ceny kryptoměn</strong>
        </h2>
        <p className="text-justify">
          Sledujte pohyby na trhu v reálném čase. Data jsou aktualizována každou minutu skrze CoinGecko API.
        </p>
        <CryptoWrapper />
      </section>
    </>
  )
}

export default Home;
