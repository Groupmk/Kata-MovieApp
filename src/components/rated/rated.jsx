import React, { useState,  useContext } from 'react';
import { useRated } from '../castomHuks/rated-context';
import { GenreContext } from '../castomHuks/genre-context';
import List from '../list/list';
import './reted.css';
import PaginationMovie from '../pagination/pagination';

const Rated = ({ guestSessionId }) => {
  const { ratedMovies } = useRated();
  console.log(ratedMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const genres = useContext(GenreContext);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentItems = ratedMovies.slice(startIndex, endIndex);

  const noRatedMoviesMessage = (
    <p style={{ textAlign: 'center', marginTop: '20px' }}>Оцените Фильмы чтобы они добавились.</p>
  );

  return (
    <>
      {ratedMovies.length === 0 ? (
        noRatedMoviesMessage
      ) : (
        <div className='rated'>
          {currentItems.map((movie) => (
            <List
              key={movie.id}
              movies={[movie]}
              currentRating={movie.rating}
              guestSessionId={guestSessionId}
              genres={genres}
              disableStars={true}
            />
          ))}
        </div>
      )}
      {ratedMovies.length === 0 ? null : (
        <div className="custom-footer">
          <PaginationMovie
            current={currentPage}
            total={ratedMovies.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </>
  );
};

export default Rated;
