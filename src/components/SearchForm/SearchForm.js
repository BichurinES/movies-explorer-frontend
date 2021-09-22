import { AUTO_EMPTY_ERROR_MSG, CORRECT_EMPTY_ERROR_MSG } from '../../utils/constants';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import ValidationForm from '../ValidationForm/ValidationForm';
import './SearchForm.css';

export default function SearchForm(props) {
  const { isFirstSearch, searchMoviesHandler, setIsShortMovieOn, type } = props;
  const { values, handleChange, errors, isValid } = ValidationForm();

  errors.search = errors.search === AUTO_EMPTY_ERROR_MSG ? CORRECT_EMPTY_ERROR_MSG : errors.search;
  
  function submitHandler(evt) {
    evt.preventDefault();
    searchMoviesHandler({ searchString: values.search });
  }
  
  return (
    <form name="search-form" className="search-form" onSubmit={ submitHandler }>
      <div className="search-form__search-bar">
        <input className={ `search-form__field ${ errors.search ? 'search-form__field_error' : '' }` } type="text" name="search" placeholder="Фильм" required={ type === 'saved-movies' ? false : true } minLength="2" onChange={ handleChange } />
        <input className={ `search-form__submit-button page__button ${ !isValid ? 'search-form__submit-button_disable' : '' }` } type="submit"  disabled={ !isValid ? true : false } />
      </div>
      <span className={ `search-form__error ${ errors.search ? 'search-form__error_visible' : '' }` }>{ errors.search }</span>
      <div className="search-form__filter">
        <label htmlFor="filter-checkbox" className="search-form__filter-label">Короткометражки</label>
        <FilterCheckbox setIsShortMovieOn={ setIsShortMovieOn } isFirstSearch={ isFirstSearch } />
      </div>
    </form>
  )
}
