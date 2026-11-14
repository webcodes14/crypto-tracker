"use client";

import classes from "./SearchBar.module.css";

type SearchProps = {
    value: string;
    onChange: (newValue: string) => void;
};

const SearchBar = ({ value, onChange }: SearchProps) => (
    <div className={classes.search}>
        <label className={classes.searchLabel} htmlFor="coin-search">
            Hledat kryptoměnu
        </label>
        <div className={classes.inputWrapper}>
            <svg
                aria-hidden="true"
                className={classes.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
            >
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
                className={classes.searchInput}
                type="search"
                id="coin-search"
                name="search"
                placeholder="Např. bitcoin nebo BTC"
                maxLength={50}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    </div>
);

export default SearchBar;
