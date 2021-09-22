import { useContext, useState, useEffect } from 'react';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { searchMovies, filterShortMovies } from '../../utils/utils.js';
import { MOVIES_NOT_FOUND_MSG } from '../../utils/constants.js';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies(props) {
  let startMovies = localStorage.getItem('savedMovies');
  startMovies = startMovies ? JSON.parse(startMovies) : [];
  const startShortMovies = filterShortMovies(startMovies);

  const [isNotSavedMovies, setIsNotSavedMovies] = useState(startMovies.length === 0);
  const { savedMovies } = useContext(SavedMoviesContext);
  const [cards, setCards] = useState(startMovies);
  const [shortMoviesCards, setShortMoviesCards] = useState(startShortMovies);
  const [isShortMovieOn, setIsShortMovieOn] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSearchErrorVisible, setIsSearchErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { checkStatus, errorHandler } = props;

  function updateCards(cards) {
    const shortMoviesCards = filterShortMovies(cards);
    setCards(cards);
    setShortMoviesCards(shortMoviesCards);
    setIsNotSavedMovies(cards.length === 0);
  }

  function showSearchResults(searchString, base) {
    const cardsData = searchMovies(searchString, base);
    setIsPreloaderVisible(false);
    updateCards(cardsData);
  }

  function searchMoviesHandler(search) {
    setIsSearchErrorVisible(false);
    const { searchString } = search;
    showSearchResults(searchString, savedMovies);
  }

  useEffect(() => {
    setCards(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (isNotSavedMovies) {
      return;
    }
    setErrorText(MOVIES_NOT_FOUND_MSG);
    if (isShortMovieOn) {
      setIsSearchErrorVisible(shortMoviesCards.length === 0);
    } else {
      setIsSearchErrorVisible(cards.length === 0);
    }
    return () => {
      setErrorText('');
      setIsSearchErrorVisible(false);
    };
  }, [cards, shortMoviesCards, isShortMovieOn, isNotSavedMovies]);

  return (
    <main className="saved-movies-main">
      <SearchForm type='saved-movies' isFirstSearch={ isNotSavedMovies } searchMoviesHandler={ searchMoviesHandler } setIsShortMovieOn={ setIsShortMovieOn } />
      <Preloader />
      <SearchError isSearchErrorVisible={ isSearchErrorVisible } errorText={ errorText } />
      <MoviesCardList
        type='saved-movies'
        cards={ !isShortMovieOn ? cards : shortMoviesCards }
        isPreloaderVisible={ isPreloaderVisible }
        isSearchErrorVisible={ isSearchErrorVisible }
        checkStatus={ checkStatus }
        errorHandler={ errorHandler }
      />
    </main>
  )
}
