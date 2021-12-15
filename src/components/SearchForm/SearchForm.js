import { useState } from 'react';
import { AUTO_EMPTY_ERROR_MSG, CORRECT_EMPTY_ERROR_MSG } from '../../utils/constants';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ValidationForm from '../ValidationForm/ValidationForm';
import './SearchForm.css';

export default function SearchForm(props) {
  const { isFirstSearch, searchMoviesHandler, setIsShortMovieOn, type } = props;
  const { values, handleChange, errors, isValid } = ValidationForm();
  const [isReqInProgress, setIsReqInProgress] = useState(false);

  errors.search = errors.search === AUTO_EMPTY_ERROR_MSG ? CORRECT_EMPTY_ERROR_MSG : errors.search;

  function blockForm() {
    setIsReqInProgress(true);
  }

  function unblockForm() {
    setIsReqInProgress(false);
  }
  
  function submitHandler(evt) {
    evt.preventDefault();
    blockForm();
    searchMoviesHandler({ searchString: values.search })
      .then(unblockForm)
  }
  
  return (
    <form name="search-form" className="search-form" onSubmit={ submitHandler }>
      <div className="search-form__search-bar">
        <input
          className={ `search-form__field ${ errors.search ? 'search-form__field_error' : '' }` }
          type="text"
          name="search"
          placeholder="Фильм"
          minLength="2"
          required={ type === 'saved-movies' ? false : true }
          readOnly={ isReqInProgress ? "readonly" : false }
          onChange={ handleChange }
        />
        <input
          className={ `search-form__submit-button page__button ${ !isValid || isReqInProgress ? 'search-form__submit-button_disable' : '' }` }
          type="submit"
          disabled={ !isValid || isReqInProgress ? true : false }
        />
      </div>
      <span className={ `search-form__error ${ errors.search ? 'search-form__error_visible' : '' }` }>{ errors.search }</span>
      <div className="search-form__filter">
        <label htmlFor="filter-checkbox" className="search-form__filter-label">Короткометражки</label>
        <FilterCheckbox setIsShortMovieOn={ setIsShortMovieOn } isFirstSearch={ isFirstSearch } />
      </div>
    </form>
  )
}
