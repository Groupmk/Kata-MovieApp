import React from 'react';
import List from '../list/list';
const GetList = ({movies}) => {
    return (
        <div>
        <List movies={movies}/>
        </div>
    )
}

export default GetList;