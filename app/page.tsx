import CryptoWrapper from "./components/CryptoWrapper";

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-[#10251e] px-6 py-10 text-white shadow-xl shadow-emerald-950/10 sm:px-10 sm:py-14 lg:px-14">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 left-1/3 -z-10 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl"
        />
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          Tržní přehled · USD
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Krypto trh,
          <span className="block text-emerald-300">bez zbytečného šumu.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Ceny, změny a vývoj na jednom místě. Přehled největších kryptoměn podle
          tržní kapitalizace s daty obnovovanými přibližně každou minutu.
        </p>
        <div className="mt-9 flex flex-wrap gap-3 text-sm">
          <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <strong className="mr-2 text-white">Top 10</strong>
            podle tržní kapitalizace
          </span>
          <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <strong className="mr-2 text-white">7 dní</strong>
            cenového vývoje
          </span>
        </div>
      </section>

      <section aria-labelledby="market-heading" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Aktuální přehled
            </p>
            <h2 id="market-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Tržní lídři
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Vyhledejte minci nebo změňte řazení
          </p>
        </div>
        <CryptoWrapper />
      </section>
    </div>
  );
};

export default Home;
