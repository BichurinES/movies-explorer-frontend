import { useState } from 'react';
import moviesApi from '../../utils/MoviesApi.js';
import { searchMovies } from '../../utils/utils.js';
import { MOVIES_NOT_FOUND_MSG, SEARCH_SERVER_ERROR_MSG } from '../../utils/constants.js';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies(props) {
  let startMovies = localStorage.getItem('searchedMovies');
  startMovies = startMovies ? JSON.parse(startMovies) : [];
  
  const [cards, setCards] = useState(startMovies);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isSearchErrorVisible, setIsSearchErrorVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { errorHandler } = props;

  function updateCards(cards) {
    localStorage.setItem('searchedMovies', JSON.stringify(cards));
    setCards(cards);
  }
  
  function searchMoviesHandler(search) {
    setIsSearchErrorVisible(false);
    setIsPreloaderVisible(true);
    return moviesApi.getData()
      .then((data) => {
        const cardsData = searchMovies(search, data);
        if (!cardsData.length) {
          setErrorText(MOVIES_NOT_FOUND_MSG);
          setIsPreloaderVisible(false);
          setIsSearchErrorVisible(true);
        } else {
          setIsPreloaderVisible(false);
          updateCards(cardsData);
        }
      })
      .catch(() => {
        setErrorText(SEARCH_SERVER_ERROR_MSG);
        setIsPreloaderVisible(false);
        setIsSearchErrorVisible(true);
      });
  }

  return (
    <main className="movies-main">
      <SearchForm type='default-movies' searchMoviesHandler={ searchMoviesHandler } />
      <Preloader isPreloaderVisible = { isPreloaderVisible } />
      <SearchError isSearchErrorVisible={ isSearchErrorVisible } errorText={ errorText } />
      <MoviesCardList
        type='default-movies'
        cards={ cards }
        isPreloaderVisible={ isPreloaderVisible }
        isSearchErrorVisible={ isSearchErrorVisible }
        errorHandler={ errorHandler } 
      />
    </main>
  )
}
