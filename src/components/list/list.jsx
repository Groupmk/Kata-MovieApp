import React from "react";
import './list.css';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
const List = ({movies}) => {
    const _posterPatch = "https://image.tmdb.org/t/p/w200";
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
      
      return (
        <div className="List">
          {movies.map((movie) => {
            if (!movie.overview || !movie.poster_path) {
              return null; 
            } 
            const truncatedOverview = truncateText(movie.overview, 150);
            return (
              <div className="ListCard" key={movie.id}>
                <img
                  src={`${_posterPatch}${movie.poster_path}`}
                  alt={movie.title}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <div className="ListCardInfo">
                <div className="ListHeaderItems">
                <h1 style={{ fontSize: '12px', paddingTop: '10px' }}>{movie.title}</h1>
                {/* <div className="ListCardPopularity">
                    {Math.min(Math.round(movie.popularity * 10) / 10, 10)}
                    </div> */}
                </div>
                  {movie.release_date && (
                    <time datetime="2023-07-30T12:00">{formatDate(movie.release_date)}</time>
                  )}
                  <div className="ListCardGenres">{getGenresNames(movie.genre_ids)}</div>
                  <p className="ListText">{truncatedOverview}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
}

export default List;