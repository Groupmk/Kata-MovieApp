import React from "react";
import './list.css';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Rate } from "antd";
import { useRated } from '../castomHuks/rated-context';
import { getColorForRating } from '../utils/getColorRating';


const List = ({movies, guestSessionId, genres, disableStars }) => {
    const _posterPatch = "https://image.tmdb.org/t/p/w200";
    const { ratedMovies, setRatedMovies } = useRated();
    function getGenresForMovie(movie, genres) {
      const movieGenres = movie.genre_ids || [];
      return movieGenres.map((genreId) => {
        const genre = genres.find((g) => g && g.id === genreId);
        return genre ? <span key={genreId} className={genre.name}>{genre.name}</span> : null;
      });
    }
    
      const formatDate = (yourDate) => {
        if (!yourDate) {
          return "Дата не указана";
        }
        try {
          return format(new Date(yourDate), 'MMMM dd, yyyy', { locale: enGB });
        } catch (error) {
          console.error("Error in formatDate:", error);
          return "Некорректная дата";
        }
      };
      
      const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
          return text;
        }
        const truncated = text.slice(0, maxLength).trim();
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
          return truncated.slice(0, lastSpaceIndex) + '...';
        }
        return truncated + '...';
      };  

      const ratedClick = async (movie, rating, guestSessionId, ratedMovies, setRatedMovies) => {
        console.log(movie, rating, guestSessionId, ratedMovies, setRatedMovies);
        if (!ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id)) {
          setRatedMovies([...ratedMovies, { ...movie, rating }]);
      } else {
          const updatedRatedMovies = ratedMovies.map((ratedMovie) =>
              ratedMovie.id === movie.id ? { ...ratedMovie, rating } : ratedMovie
          );
          setRatedMovies(updatedRatedMovies);
      }}

      return (
        <div className="List">
          {movies.map((movie) => {
           
            const truncatedOverview = truncateText(movie.overview, 150);
            return (
              <div className="ListCard" key={movie.id}>
               <div className="ListCardPoster"> 
               {!movie.poster_path ? <div style={{width: '12rem'}}>'not poster'</div>  : <img
               className="ListCardImage"
                  src={`${_posterPatch}${movie.poster_path}`}
                  alt={movie.title}
                />}</div>
                <div className="ListCardInfo">
                <div className="ListHeaderItems">
                <h1 className="ListTitle">{movie.title}</h1>
                <div className="CurrentRatingCircle" style={{ 
                  border: 'solid 1px ' + getColorForRating(movie.vote_average),
                  width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px'}}>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </div>
                </div>
                 <div className="ListItems">
                 {movie.release_date && (
                    <time dateTime="2023-07-30T12:00" className="ListData">{formatDate(movie.release_date)}</time>
                  )}
                 </div>
                  <div className="ListCardGenres">{getGenresForMovie(movie, genres)}</div>
                  {!movie.overview ? 'not found' : <p className="ListText">{truncatedOverview}</p>}
                  <Rate
                    allowHalf
                    value={movie.rating}
                    count={10}
                    size="small"
                    style={{ fontSize: 15, paddingLeft: '15px', paddingBottom: '15px' }}
                    onChange={(value) => ratedClick(movie, value, guestSessionId, ratedMovies, setRatedMovies)}
                    disabled={disableStars} 
                />
                </div>
              </div>
            );
          })}
        </div>
      );
}

export default List;