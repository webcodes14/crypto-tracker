import classes from "./SearchBar.module.css";

type SearchProps = {
    value: string;
    onChange: (newValue: string) => void;
}

const SearchBar = ({ value, onChange }: SearchProps) => {

    return <div className={classes.search}>
        <input 
            className={classes.searchInput} 
            type="search" 
            name="search" 
            id="search" 
            placeholder=" "
            maxLength={30}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        <label 
            className={classes.searchLabel} 
            htmlFor="search">
                Vyhledat kryptoměnu
        </label>
    </div>
}

export default SearchBar;