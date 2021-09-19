import { useState } from 'react';
import { searchMovies } from '../../utils/utils.js';
import moviesApi from '../../utils/MoviesApi.js';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  const [search, setSearch] = useState('');

  function changeSearchHandler(evt) {
    setSearch(evt.target.value);
  }

  function submitHandler(evt) {
    evt.preventDefault();
    moviesApi.getData()
      .then((data) => {
        console.log(searchMovies(search, data))
      })
  }
  
  return (
    <form name="search-form" className="search-form" onSubmit={ submitHandler }>
      <div className="search-form__search-bar">
        <input className="search-form__field" type="text" name="search" placeholder="Фильм" required value={ search } onChange={ changeSearchHandler } />
        <input className="search-form__submit-button page__button" type="submit" />
      </div>
      <div className="search-form__filter">
        <label htmlFor="filter-checkbox" className="search-form__filter-label">Короткометражки</label>
        <FilterCheckbox />
      </div>
    </form>
  )
}
