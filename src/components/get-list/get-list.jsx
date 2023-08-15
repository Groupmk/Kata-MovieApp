import React, { useContext } from 'react';
import List from '../list/list';
import './get-list.css';
import { GenreContext } from '../castomHuks/genre-context';
const GetList = ({ movies, guestSessionId, createGuestSession, ratedClick }) => {
  const genres = useContext(GenreContext);
  const movieItems = movies.map((movie) => (
    <List
      key={movie.id}
      movies={[movie]}
      guestSessionId={guestSessionId}
      createGuestSession={createGuestSession}
      ratedClick={() => ratedClick()}
      genres={genres}
    />
  ));

  return <div className='GetList'>{movieItems}</div>;
};

export default GetList;
