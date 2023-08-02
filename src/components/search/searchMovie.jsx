import React from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

const Search = ({ searchMovie }) => {
    const valueSearch = debounce((e) => {
        const value = e.target.value;
        if(value.trim() !== ''){
            searchMovie(value);
        }
    }, 500);

    return <Input placeholder="Basic usage" onChange={valueSearch}style={{ width: '938px', height: '40px' }}/>;
};

export default Search;
