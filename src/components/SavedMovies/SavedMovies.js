import { useContext, useState, useEffect } from 'react';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { searchMovies } from '../../utils/utils.js';
import { MOVIES_NOT_FOUND_MSG, SEARCH_SERVER_ERROR_MSG } from '../../utils/constants.js';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies(props) {
  const { savedMovies } = useContext(SavedMoviesContext);
  const [cards, setCards] = useState(savedMovies);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSearchErrorVisible, setIsSearchErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { errorHandler } = props;

  function searchMoviesHandler(search) {
    setIsSearchErrorVisible(false);
    const cardsData = searchMovies(search, savedMovies);
    
    if (!cardsData.length) {
      setErrorText(MOVIES_NOT_FOUND_MSG);
      setIsPreloaderVisible(false);
      setIsSearchErrorVisible(true);
    } else {
      setIsPreloaderVisible(false);
      setCards(cardsData);
    }
  }

  useEffect(() => {
    setCards(savedMovies);
  }, [savedMovies]);

  return (
    <main className="saved-movies-main">
      <SearchForm type='saved-movies' searchMoviesHandler={ searchMoviesHandler } />
      <Preloader />
      <SearchError isSearchErrorVisible={ isSearchErrorVisible } errorText={ errorText } />
      <MoviesCardList
        type='saved-movies'
        cards={ cards ? cards : [] }
        isPreloaderVisible={ isPreloaderVisible }
        isSearchErrorVisible={ isSearchErrorVisible }
        errorHandler={ errorHandler }
      />
    </main>
  )
}
