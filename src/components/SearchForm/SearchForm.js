import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm(props) {
  const [searchString, setSearchString] = useState('');
  const [isShortMovieOn, setIsShortMovieOn] = useState(false);
  const { searchMoviesHandler, type } = props;

  function changeSearchHandler(evt) {
    setSearchString(evt.target.value);
  }

  function submitHandler(evt) {
    evt.preventDefault();
    searchMoviesHandler({ searchString, isShortMovieOn });
  }
  
  return (
    <form name="search-form" className="search-form" onSubmit={ submitHandler }>
      <div className="search-form__search-bar">
        <input className="search-form__field" type="text" name="search" placeholder="Фильм" required={ type === 'saved-movies' ? false : true } value={ searchString } onChange={ changeSearchHandler } />
        <input className="search-form__submit-button page__button" type="submit" />
      </div>
      <div className="search-form__filter">
        <label htmlFor="filter-checkbox" className="search-form__filter-label">Короткометражки</label>
        <FilterCheckbox setIsShortMovieOn={ setIsShortMovieOn } />
      </div>
    </form>
  )
}
