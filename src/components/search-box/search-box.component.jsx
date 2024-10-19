import { Component } from "react";
import './search-box.styles.css';

const SearchBox = (props)=> (
    <input 
        className={`search-box ${props.searchBoxClassName}`}
        type='search'
        placeholder={props.searchBoxPlaceholder}
        onChange={props.onChangeHandler}
    />
)
export default SearchBox;