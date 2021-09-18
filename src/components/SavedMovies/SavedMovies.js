import { useContext } from 'react';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies() {
  const savedMovies = useContext(SavedMoviesContext);

  return (
    <main className="saved-movies-main">
      <SearchForm />
      <Preloader />
      <MoviesCardList type='saved-movies' cards={ savedMovies ? savedMovies : [] } />
    </main>
  )
}
