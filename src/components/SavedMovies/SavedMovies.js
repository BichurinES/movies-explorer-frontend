import LoggedHeader from '../LoggedHeader/LoggedHeader';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { savedCards } from '../../utils/data.js';

export default function SavedMovies() {
  return (
    <main className="saved-movies-main">
      <SearchForm />
      <Preloader />
      <MoviesCardList type='saved-movies' cards={ savedCards } />
    </main>
  )
}
