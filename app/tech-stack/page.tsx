import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FaReact } from "react-icons/fa";
import { RiLineChartLine, RiNextjsLine, RiTailwindCssLine } from "react-icons/ri";
import { SiCss3 } from "react-icons/si";
import { TbBrandTypescript } from "react-icons/tb";

export const metadata: Metadata = {
    title: "Jak je projekt postaven",
    description: "Použité technologie, datový tok a rozhodnutí v projektu Crypto Tracker.",
};

interface Technology {
    name: string;
    icon: ReactNode;
    description: string;
}

const technologies: Technology[] = [
    {
        name: "Next.js 16",
        icon: <RiNextjsLine aria-hidden="true" />,
        description: "App Router a serverové komponenty načítají data bez zbytečného klientského požadavku.",
    },
    {
        name: "TypeScript",
        icon: <TbBrandTypescript aria-hidden="true" />,
        description: "Typy oddělují tržní přehled od detailu mince a zpřesňují práci s volitelnými daty.",
    },
    {
        name: "Zod",
        icon: <span aria-hidden="true" className="text-sm font-black">Z</span>,
        description: "Ověření odpovědi CoinGecko při běhu aplikace brání tomu, aby chybná data prošla jako správná.",
    },
    {
        name: "React",
        icon: <FaReact aria-hidden="true" />,
        description: "Klientská část nabízí vyhledávání a řazení bez opětovného načtení stránky.",
    },
    {
        name: "Chart.js",
        icon: <RiLineChartLine aria-hidden="true" />,
        description: "Graf zobrazuje sedmidenní cenový vývoj s dynamickým měřítkem pro různé cenové úrovně.",
    },
    {
        name: "Tailwind CSS",
        icon: <RiTailwindCssLine aria-hidden="true" />,
        description: "Responzivní rozvržení doplňují CSS Modules pro styly karet a ovládacích prvků.",
    },
    {
        name: "CSS Modules",
        icon: <SiCss3 aria-hidden="true" />,
        description: "Lokální styly oddělují komponenty seznamu, karet a navigace.",
    },
];

const decisions = [
    {
        title: "Serverové načítání",
        description: "CoinGecko se volá ze serverových komponent a výsledek se znovu ověřuje každých 60 sekund.",
    },
    {
        title: "Ověření externích dat",
        description: "Odpovědi se validují před předáním do UI; chybějící údaje se zobrazují jako nedostupné místo nuly.",
    },
    {
        title: "Úzký rozsah",
        description: "Jde o read-only ukázku: bez účtů a ukládání uživatelských dat. Omezení CoinGecko jsou součástí návrhu.",
    },
];

const TechStackPage = () => (
    <div className="space-y-10">
        <section className="rounded-[1.75rem] bg-[#10251e] px-6 py-10 text-white sm:px-10 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                O projektu
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Jak je projekt postaven
            </h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Malá portfolio aplikace pro práci s externím API, validaci dat,
                responzivním UI a interaktivním grafem.
            </p>
        </section>

        <section aria-labelledby="technologies-heading">
            <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                    Technologie
                </p>
                <h2 id="technologies-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                    Použitý stack
                </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {technologies.map((technology) => (
                    <li
                        key={technology.name}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-2xl text-emerald-800">
                                {technology.icon}
                            </span>
                            <h3 className="font-bold text-slate-950">{technology.name}</h3>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{technology.description}</p>
                    </li>
                ))}
            </ul>
        </section>

        <section aria-labelledby="decisions-heading">
            <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                    Architektura a kompromisy
                </p>
                <h2 id="decisions-heading" className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                    Proč je aplikace navržená právě takto
                </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
                {decisions.map((decision) => (
                    <article key={decision.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="font-bold text-slate-950">{decision.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{decision.description}</p>
                    </article>
                ))}
            </div>
        </section>
    </div>
);

export default TechStackPage;
