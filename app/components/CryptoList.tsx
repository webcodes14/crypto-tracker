'use client';

import { useState, useMemo, useEffect, useRef } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

import { Coin } from "@/lib/api";
import CoinCard from "./CoinCard";
import SearchBar from "./SearchBar";

import classes from "../components/CryptoList.module.css";

interface CryptoListProps {
    initialData: Coin[];
}

const CryptoList = ({ initialData }: CryptoListProps) => {
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ sortTerms, setSortTerms ] = useState<'default' | 'desc' | 'asc'>('default');
    const [ sortMenu, setSortMenu ] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleSortMenu = () => {
        setSortMenu(prevState => !prevState);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ( sortRef.current && !sortRef.current.contains(event.target as Node) ) {
                setSortMenu(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const filteredTerm = useMemo(() => {
        const cleanSearch = searchTerm.toLocaleLowerCase().trim();
        
        const filtered = initialData.filter(item => 
            item.name.toLocaleLowerCase().includes(cleanSearch) || 
            item.symbol.toLocaleLowerCase().includes(cleanSearch)
        );

        if (sortTerms === 'default') {
            return filtered;
        }

        if (sortTerms === 'desc') {
            return filtered.sort(( a, b ) => b.current_price - a.current_price );
        }

        if (sortTerms === 'asc') {
            return filtered.sort(( a, b ) => a.current_price - b.current_price );
        }

        return filtered;

    }, [searchTerm, initialData, sortTerms]);

    return (
        <>
            <div className="md:flex md:justify-between md:items-center">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <div className="relative w-48" ref={sortRef}>
                    <button onClick={handleSortMenu} className="cursor-pointer md:ml-4 md:mr-3 flex items-center gap-1.5">
                        <IoIosArrowDropdown className="-mt-0.5" /> <span>Řazení</span> 
                        <span>- {sortTerms === 'default' ? 'Výchozí' : sortTerms === 'desc' ? 'Nejdražší' : 'Nejlevnější'}</span>
                    </button>
                    {sortMenu && (
                        <div className="flex items-center flex-col absolute top-full left-6 pt-0 px-4 pb-4 mt-2 bg-white">
                            <button className="text-left cursor-pointer my-0.5 bg-white w-full" onClick={() => setSortTerms('default')} type="button">Výchozí</button>
                            <button className="text-left cursor-pointer my-0.5 bg-white w-full" onClick={() => setSortTerms('desc')} type="button">Nejdražší</button>
                            <button className="text-left cursor-pointer my-0.5 bg-white w-full" onClick={() => setSortTerms('asc')} type="button">Nejlevnější</button>
                        </div>
                    )}
                </div>
            </div>

            {filteredTerm.length > 0 ? (
                <ul className={classes['coin-list']}>
                    {filteredTerm.map(item => (
                        <CoinCard key={item.id} coin={item} />
                    ))}
                </ul>
            ) : (
                <h3 className="text-center">
                    <strong><em>Žádná kryptoměna neodpovídá vašemu hledání.</em></strong>
                </h3>
            )}
        </>
    )
}

export default CryptoList;