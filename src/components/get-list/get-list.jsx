import React from 'react';
import List from '../list/list';
import './get-list.css';

const GetList = ({ movies, guestSessionId, createGuestSession }) => {
  const movieItems = movies.map((movie) => (
    <List
      key={movie.id}
      movies={[movie]}
      guestSessionId={guestSessionId}
      createGuestSession={createGuestSession}
    />
  ));

  return <div className='GetList'>{movieItems}</div>;
};

export default GetList;
