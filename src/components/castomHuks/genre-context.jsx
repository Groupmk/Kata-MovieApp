import React, { createContext, useState, useEffect, useContext } from 'react';
import MovieApi from '../../service/movie-api';

const GenreContext = createContext();
const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const movieApi = new MovieApi();

    useEffect(() => {
        async function fetchGenres() {
            try {
                const genres = await movieApi.getGenres();
                setGenres(genres);
                console.log('Жанры:', genres);
            } catch (error) {
                console.error('Ошибка при получении жанров:', error);
            }
        }
        fetchGenres();
    }, []);
    return (
        <GenreContext.Provider value={genres}>
            {children}
        </GenreContext.Provider>
    );
};

export { GenreContext, GenreProvider };
