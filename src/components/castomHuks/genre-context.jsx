import React, { createContext, useState } from 'react';

const GenreContext = createContext();

const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  return (
    <GenreContext.Provider value={{ genres, setGenres }}>
      {children}
    </GenreContext.Provider>
  );
};

export { GenreContext, GenreProvider };
