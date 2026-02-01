import { ReactNode } from "react";

import { RiNextjsLine } from "react-icons/ri";
import { TbBrandTypescript } from "react-icons/tb";
import { RiTailwindCssLine } from "react-icons/ri";
import { FaIcons } from "react-icons/fa";
import { SiCss3 } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";

interface Technology {
    name: string;
    icon: ReactNode;
    description?: string;
}

const technologies: Technology[] = [
    {
        name: 'Next.js',
        icon: <RiNextjsLine className="text-5xl" />,
        description: 'Využití App Routeru a Serverových komponent pro bleskové načítání a optimální SEO.'
    },
    {
        name: 'TypeScript',
        icon: <TbBrandTypescript className="text-5xl" />,
        description: 'Statické typování celého projektu pro eliminaci chyb a zajištění stability datových modelů.'
    },
    {
        name: 'Tailwind CSS',
        icon: <RiTailwindCssLine className="text-5xl" />,
        description: 'Moderní utility-first framework pro tvorbu plně responzivního a čistého designu.'
    }
]

const secondaryTechnologies: Technology[] = [
    {
        name: 'React Hooks',
        icon: <FaReact className="text-4xl w-full" />
    },
    {
        name: 'React Icons',
        icon: <FaIcons className="text-4xl w-full" />
    },
    {
        name: 'CoinGecko API',
        icon: <FaBitcoin className="text-4xl w-full" />
    },
    {
        name: 'CSS Modules',
        icon: <SiCss3 className="text-4xl w-full" />
    },
]

const techStack = () => {

    return (
        <>
            <section>
                <h2 className="text-2xl">
                    <strong>Tech Stack</strong>
                </h2>
                <p className="text-justify">
                    Tento projekt slouží jako praktická ukázka moderního webového vývoje. Mým cílem bylo vytvořit rychlou a bezpečnou aplikaci pro sledování trhu s kryptoměnami, která kombinuje efektivní práci s daty a čisté uživatelské rozhraní. Níže naleznete přehled technologií, které jsem pro dosažení těchto cílů zvolil.
                </p>
                <ul className="my-8 mx-auto md:flex md:gap-4">
                    {
                        technologies.map(technology => 
                            <li className="my-4 mx-auto p-2 border" key={technology.name}>
                                {technology.icon}
                                <div>
                                    <h4 className="my-2 text-lg"><strong>{technology.name}</strong></h4>
                                    <p className="text-justify">{technology.description}</p>
                                </div>
                            </li>
                        )
                    }
                </ul>
                <h3 className="text-2xl italic text-blue-400 mt-20"><strong>Další nástroje & API</strong></h3>
                <ul className="my-8 mx-auto flex gap-4 flex-wrap">
                    {
                        secondaryTechnologies.map(technology => 
                            <li className="my-4 p-2 border" key={technology.name}>
                                <div>
                                    {technology.icon}
                                    <h4 className="my-2 text-lg mb-0"><strong>{technology.name}</strong></h4>
                                </div>
                            </li>
                        )
                    }
                </ul>
                <div className="mt-20 mb-20">
                    <h3 className="text-2xl font-bold mb-8 italic text-blue-400">Klíčové funkce aplikace</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <p className="p-4 border-l-2 border-blue-500">
                            <strong>Reálná data:</strong> Integrace s CoinGecko pro aktuální ceny.
                        </p>
                        <p className="p-4 border-l-2 border-emerald-500">
                            <strong>Rychlé řazení:</strong> Algoritmy pro okamžité řazení podle ceny a změny.
                        </p>
                        <p className="p-4 border-l-2 border-purple-500">
                            <strong>Responzivita:</strong> Web je plně optimalizován pro mobily i desktop.
                        </p>
                        <p className="p-4 border-l-2 border-orange-500">
                            <strong>Typová bezpečnost:</strong> Robustní architektura díky TypeScriptu.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )

}

export default techStack;