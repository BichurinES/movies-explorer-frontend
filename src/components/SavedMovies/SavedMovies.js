import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies() {
  const { savedMovies } = useContext(CurrentUserContext);

  return (
    <main className="saved-movies-main">
      <SearchForm />
      <Preloader />
      <MoviesCardList type='saved-movies' cards={ savedMovies } />
    </main>
  )
}
