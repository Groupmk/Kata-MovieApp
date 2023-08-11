import React from "react";
import './list.css';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { Rate } from "antd";
import { useRated } from '../castomHuks/rated-context';
import MovieApi from "../../service/movie-api";
import { getColorForRating } from '../utils/getColorRating';


const List = ({movies, guestSessionId, createGuestSession, disableStars }) => {
    const _posterPatch = "https://image.tmdb.org/t/p/w200";
    const moveiApi = new MovieApi();
    const getGenresNames = (genreIds) => {
        const genresMap = {
          16: 'Анимация',
          28: 'Боевик',
          27: 'Ужасы',
          35: 'Криминал',
          18: 'Драма',
          36: 'Фантастика',
          80: 'Приключения',
          99: 'Комедия',
          878: 'Фэнтези',
          9648: 'Мелодрама',
          10749: 'Триллер',
          10751: 'Музыка',
          10752: 'Детектив',
          10770: 'Семейный',
        };
       genreIds.map((genreId) => genresMap[genreId]).join(', ');
       return genreIds.map((genreId) => {
        if (genresMap[genreId]) {
          return (
            <span key={genreId} className={genresMap[genreId]}>
              {genresMap[genreId]}
            </span>
          );
        }
        return null;
      });
      };
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

      const { ratedMovies, setRatedMovies } = useRated();
      const ratedClick = async (movie, rating) => {
        if (!ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id)) {
          try {
            if (!guestSessionId) {
              await createGuestSession(rating); 
            }
            const response = await moveiApi.rateMovie(guestSessionId, movie.id, rating);
            console.log("Rating response:", response);
            setRatedMovies([...ratedMovies, { ...movie, rating }]);
          } catch (error) {
            console.error("Error rating movie:", error);
          }
        } else {
          try {
            const response = await moveiApi.rateMovie(guestSessionId, movie.id, rating);
            console.log("Rating response:", response);
            const updatedRatedMovies = ratedMovies.map((ratedMovie) =>
                ratedMovie.id === movie.id ? { ...ratedMovie, rating } : ratedMovie
            );
            setRatedMovies(updatedRatedMovies);
            console.log("Updated rating:", rating);
        } catch (error) {
            console.error("Error updating movie rating:", error);
        }
    }
      };

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
                  <div className="ListCardGenres">{getGenresNames(movie.genre_ids)}</div>
                  {!movie.overview ? 'not found' : <p className="ListText">{truncatedOverview}</p>}
                  <Rate
                    allowHalf
                    value={movie.rating}
                    count={10}
                    size="small"
                    style={{ fontSize: 15, paddingLeft: '15px', paddingBottom: '15px' }}
                    onChange={(value) => ratedClick(movie, value)}
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