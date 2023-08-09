import React, { createContext, useContext, useState } from 'react';

const RatedContext = createContext();

export const useRated = () => useContext(RatedContext);

export const RatedProvider = ({ children }) => {
    const [ratedMovies, setRatedMovies] = useState([]);


    return (
        <RatedContext.Provider value={{ ratedMovies, setRatedMovies }}>
            {children}
        </RatedContext.Provider>
    );
};
