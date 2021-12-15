import { useState, useEffect } from 'react';
import moviesApi from '../../utils/MoviesApi.js';
import { searchMovies, filterShortMovies } from '../../utils/utils.js';
import { MOVIES_NOT_FOUND_MSG, SEARCH_SERVER_ERROR_MSG } from '../../utils/constants.js';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies(props) {
  let startMovies = localStorage.getItem('searchedMovies');
  startMovies = startMovies ? JSON.parse(startMovies) : [];
  const startShortMovies = filterShortMovies(startMovies);

  const [isFirstSearch, setIsFirstSearch] = useState(startMovies.length === 0);
  const [cards, setCards] = useState(startMovies);
  const [shortMoviesCards, setShortMoviesCards] = useState(startShortMovies);
  const [isShortMovieOn, setIsShortMovieOn] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSearchErrorVisible, setIsSearchErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { checkStatus, errorHandler } = props;

  function updateCards(cards) {
    const shortMoviesCards = filterShortMovies(cards);
    localStorage.setItem('searchedMovies', JSON.stringify(cards));
    setCards(cards);
    setShortMoviesCards(shortMoviesCards);
  }

  function showSearchResults(searchString, base) {
    setIsFirstSearch(false);
    const cardsData = searchMovies(searchString, base);
    setIsPreloaderVisible(false);
    updateCards(cardsData);
  }

  function handleServerError() {
    setErrorText(SEARCH_SERVER_ERROR_MSG);
    setIsPreloaderVisible(false);
    setIsSearchErrorVisible(true);
  }
  
  function searchMoviesHandler(search) {
    setIsPreloaderVisible(true);
    const { searchString } = search;
    return moviesApi.getData()
      .then((data) => {
        showSearchResults(searchString, data);
      })
      .catch(handleServerError);
  }

  useEffect(() => {
    if (isFirstSearch) {
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
  }, [cards, shortMoviesCards, isShortMovieOn, isFirstSearch]);
  
  return (
    <main className="movies-main">
      <SearchForm type='default-movies' isFirstSearch={ isFirstSearch } searchMoviesHandler={ searchMoviesHandler } setIsShortMovieOn={ setIsShortMovieOn } />
      <Preloader isPreloaderVisible = { isPreloaderVisible } />
      <SearchError isSearchErrorVisible={ isSearchErrorVisible } errorText={ errorText } />
      <MoviesCardList
        type='default-movies'
        cards={ !isShortMovieOn ? cards : shortMoviesCards }
        isPreloaderVisible={ isPreloaderVisible }
        isSearchErrorVisible={ isSearchErrorVisible }
        checkStatus={ checkStatus }
        errorHandler={ errorHandler } 
      />
    </main>
  )
}
