import { useContext, useState, useEffect } from 'react';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import mainApi from '../../utils/MainApi';
import './MoviesCard.css';
import { convertDurationInHours, formatCard } from '../../utils/utils.js';
import { BEATFILM_MOVIES_API_IMAGE_URL } from '../../utils/constants.js';

export default function MoviesCard(props) {
  const { savedMovies, updateSavedCards } = useContext(SavedMoviesContext);
  const { card, type, checkStatus, errorHandler } = props;
  const [isSaved, setIsSaved] = useState(false);
  
  function findMovieObject(shortId) {
    return savedMovies
      .find((movie) => movie.movieId === shortId);
  }

  function deleteMovie() {
    const movie = type === 'saved-movies' ?
      card :
      findMovieObject(card.id);

    if (!movie) {
      errorHandler({ message: 'Ошибка при удалении фильма' })
      return;
    }

    mainApi.deleteMovie(movie._id)
      .then((deletedCard) => {
        checkStatus(deletedCard);
        const movies = savedMovies.filter((item) => item._id !== deletedCard._id);
        updateSavedCards(movies);
      })
      .catch(errorHandler);
  }

  function saveMovie() {
    mainApi.saveMovie(formatCard(card))
      .then((res) => {
        checkStatus(res);
        setIsSaved(true);
        updateSavedCards([...savedMovies, res])
      })
      .catch(errorHandler);
  }
  
  function checkIsSaved() {
    return savedMovies.some((movie) => movie.movieId === card.id);
  }

  useEffect(() => {
    setIsSaved(checkIsSaved());
  }, [savedMovies]);

  return (
    <li className="movies-card">
      <a href={ type === 'saved-movies' ? card.trailer : card.trailerLink } className="movies-card__trailer-link page__button" target="_blank" rel="noreferrer">
        <img src={ type === 'saved-movies' ? card.image : BEATFILM_MOVIES_API_IMAGE_URL + card.image.url } alt={ card.nameRU } className="movies-card__image" />
      </a>
      <div className="movies-card__footer">
        <h2 className="movies-card__title">{ card.nameRU }</h2>
        <p className="movies-card__duration">{ convertDurationInHours(card.duration) }</p>
      </div>
      { 
        type === 'default-movies' ? 
        <button type="button" name="save-button" className={ `movies-card__save-button ${ isSaved ? 'movies-card__save-button_hidden' : '' } page__button` } onClick={ saveMovie }>Сохранить</button> : 
        '' 
      }
      <button type="button" name="delete-button" className={ `movies-card__delete-button movies-card__delete-button_type_${ type } ${ type === 'default-movies' && !isSaved ? 'movies-card__delete-button_type_hidden' : '' } page__button` } onClick={ deleteMovie }></button>
    </li>
  )
}
