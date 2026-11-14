import HeaderLink from "./HeaderLink";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/crypto-tracker.png";

const Header = () => {

    return <header className="flex items-center justify-between gap-6 py-5 sm:py-7">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-xl">
            <Image 
                src={logo}
                alt="Crypto Tracker"
                width={44}
                height={44}
                priority
                className="h-10 w-10 rounded-xl object-cover sm:h-11 sm:w-11"
            />
            <span className="min-w-0">
                <span className="block text-base font-bold tracking-tight text-slate-950 sm:text-lg">Crypto Tracker</span>
                <span className="hidden text-xs text-slate-500 sm:block">Tržní přehled bez šumu</span>
            </span>
        </Link>
        <nav aria-label="Hlavní navigace">
            <ul className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm sm:gap-2">
                <HeaderLink href="/">Domů</HeaderLink>
                <HeaderLink href="/tech-stack">Tech Stack</HeaderLink>
            </ul>
        </nav>
    </header>
}

export default Header;