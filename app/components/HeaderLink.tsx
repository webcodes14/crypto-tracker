'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./HeaderLink.module.css";

interface HeaderLinkProps {
    href: string;
    children: React.ReactNode;
}

const HeaderLink = ({ href, children }: HeaderLinkProps) => {
    const path = usePathname();

    const pathActive = href === "/" ? path === href : path.startsWith(href);

    return <li>
        <Link 
            href={href}
            className={pathActive ? `${classes.link} ${classes.active}` : `${classes.link}`}>
                {children}
        </Link>
    </li>
}

export default HeaderLink;