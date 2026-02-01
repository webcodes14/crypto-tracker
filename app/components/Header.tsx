import HeaderLink from "./HeaderLink";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/crypto-tracker.png";

const Header = () => {

    return <header className="flex justify-between items-center mb-6">
        <Link href="/">
            <Image 
                src={logo}
                alt="Crypto Tracker"
                width={50}
                height={50}
            />
        </Link>
        <nav>
            <ul className="flex gap-6">
                <HeaderLink href="/">Domů</HeaderLink>
                <HeaderLink href="/tech-stack">Tech Stack</HeaderLink>
            </ul>
        </nav>
    </header>
}

export default Header;