import Link from "next/link";

export default function NotFound() {
    return (
        <section className="mx-auto my-12 max-w-xl rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">404</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Tuto stránku jsme nenašli
            </h1>
            <p className="mt-3 text-sm text-slate-500">
                Zkontrolujte adresu nebo se vraťte na přehled kryptoměn.
            </p>
            <Link
                className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#10251e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#19382d]"
                href="/"
            >
                Zpět na přehled
            </Link>
        </section>
    );
}
