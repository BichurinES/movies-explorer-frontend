import './MoviesCard.css';
import { convertDurationInHours } from '../../utils/utils.js';
import { BEATFILM_MOVIES_API_URL } from '../../utils/constants.js';

export default function MoviesCard(props) {
  const { card, type } = props;

  return (
    <li className="movies-card">
      <a href={ card.trailerLink } className="movies-card__trailer-link page__button" target="_blank" rel="noreferrer">
        <img src={ BEATFILM_MOVIES_API_URL + card.image.url } alt={ card.nameRU } className="movies-card__image" />
      </a>
      <div className="movies-card__footer">
        <h2 className="movies-card__title">{ card.nameRU }</h2>
        <p className="movies-card__duration">{ convertDurationInHours(card.duration) }</p>
      </div>
      { 
        type === 'default-movies' ? 
        <button type="button" name="save-button" className={ `movies-card__save-button ${ card.isSaved ? 'movies-card__save-button_hidden' : '' } page__button` }>Сохранить</button> : 
        '' 
      }
      <button type="button" name="delete-button" className={ `movies-card__delete-button movies-card__delete-button_type_${ type } ${ type === 'default-movies' && !card.isSaved ? 'movies-card__delete-button_type_hidden' : '' } page__button` }></button>
    </li>
  )
}
