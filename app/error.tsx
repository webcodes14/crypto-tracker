"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section
            className="mx-auto my-12 max-w-xl rounded-[1.5rem] border border-rose-200 bg-white p-8 text-center shadow-sm"
            role="alert"
        >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-rose-700">Chyba při načítání</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Data se nepodařilo zobrazit
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
                Zdroj dat může být dočasně nedostupný. Zkuste stránku načíst znovu.
            </p>
            {error.digest && (
                <p                 className="mt-3 text-xs text-slate-500">
                    Kód chyby: <code>{error.digest}</code>
                </p>
            )}
            <button
                type="button"
                className="mt-6 rounded-xl bg-[#10251e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#19382d]"
                onClick={reset}
            >
                Zkusit znovu
            </button>
        </section>
    );
}
