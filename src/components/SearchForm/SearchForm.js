import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <form name="search-form" className="search-form">
      <div className="search-form__search-bar">
        <input className="search-form__field" type="text" name="movie-title" placeholder="Фильм" required />
        <input className="search-form__submit-button page__button" type="submit" />
      </div>
      <div className="search-form__filter">
        <label htmlFor="filter-checkbox" className="search-form__filter-label">Короткометражки</label>
        <FilterCheckbox />
      </div>
    </form>
  )
}
