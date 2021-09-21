/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import { MOVIES_SECTION_SETTINGS } from '../../utils/constants.js';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  const { cards, type, isPreloaderVisible, isSearchErrorVisible, errorHandler } = props;
  const settings = MOVIES_SECTION_SETTINGS;
  const [displayMode, setDisplayMode] = useState(checkDisplayMode(window.innerWidth));
  const [addedCardsCount, setAddedCardsCount] = useState(0);
  const [isShowedAllCards, setIsShowedAllCards] = useState(false);
  const [currentArr, setCurrentArr] = useState([]);
  
  function checkDisplayMode(windowWidth) {
    if (windowWidth < settings.tablet.width) {
      return settings.mobile.title;
    }
    if (windowWidth >= settings.tablet.width && windowWidth < settings.desktop.width) {
      return settings.tablet.title;
    }
    if (windowWidth >= settings.desktop.width) {
      return settings.desktop.title;
    }
  }

  function countCurrentCards() {
    return settings[displayMode].cardsInitialNumber + settings[displayMode].addCardsNumber * addedCardsCount;
  }

  function updateDisplayMode() {
    const currentMode = checkDisplayMode(window.innerWidth);
    if (displayMode === currentMode) {
      return;
    }
    setDisplayMode(currentMode);
  }

  function checkIsCardsLeft(originalArr, currentArr) {
    return originalArr.length === currentArr.length;
  }

  function addCards() {
    setAddedCardsCount(addedCardsCount + 1);
  }

  function updateCurrentArr() {
    const newArr = cards.slice(0, countCurrentCards());
    setCurrentArr(newArr);
    const isCardsLeft = checkIsCardsLeft(cards, newArr);

    if (isCardsLeft === isShowedAllCards) {
      return;
    }
    setIsShowedAllCards(isCardsLeft);
  }

  useEffect(() => {
    let timeout;
    function updateDisplayWithTimeout() {
      clearTimeout(timeout);
      timeout = setTimeout(updateDisplayMode, 100);
    }
    
    window.addEventListener('resize', updateDisplayWithTimeout);
    updateCurrentArr();
    return () => {
      window.removeEventListener('resize', updateDisplayWithTimeout);
    };
  }, [displayMode, addedCardsCount, isShowedAllCards, cards]);
  
  return (
    <section 
      className={ 
        `movies-cards
        ${ isShowedAllCards ? 'movies-cards_type_showed-all-cards' : '' }
        ${ isPreloaderVisible || isSearchErrorVisible ? 'movies-cards_type_hidden' : '' }` 
      }
    >
      <ul className="movies-card__list">
        {
          currentArr.map((card) => <MoviesCard key={ type === 'saved-movies' ? card.movieId : card.id } card={ card } type={ type } errorHandler={ errorHandler } />)
        }
      </ul>
      <button className={ `movies-card__more-button page__button ${ isShowedAllCards ? 'movies-card__more-button_hidden' : '' }` } type="button" name="more-button" onClick={ addCards }>Ещё</button>
    </section>
  )
}
