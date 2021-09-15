
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { cards } from '../../utils/data.js';

export default function Movies() {
  return (
    <main className="movies-main">
      <SearchForm />
      <Preloader />
      <MoviesCardList type='default-movies' cards={ cards } />
    </main>
  )
}
