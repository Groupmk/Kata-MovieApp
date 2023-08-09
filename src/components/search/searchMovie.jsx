import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';
import './search.css'

const Search = ({ searchMovie, onCancel }) => {
    const [inputValue, setInputValue] = useState('');

    const valueSearch = useCallback(
        debounce((value) => {
            if (value.trim() !== '') {
                searchMovie(value);
            }
        }, 500),
        []
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        valueSearch(value);
        if (value.trim() === '') {
            onCancel();
        }
    };

    return (
        <div className='inputBox'>
        <Input
            placeholder="Basic usage"
            value={inputValue}
            onChange={handleInputChange}
         
        />
        </div>
    );
};

export default Search;
