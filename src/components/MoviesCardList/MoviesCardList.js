import React from 'react'
import './MoviesCardList.css';
import { MOVIES_SECTION_SETTINGS } from '../../utils/constants.js';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
  // eslint-disable-next-line no-unused-vars
  let timeout;
  let currentArr = [];
  const { cards, type } = props;
  const settings = MOVIES_SECTION_SETTINGS;

  const [displayMode, setDisplayMode] = React.useState(checkDisplayMode(window.innerWidth));
  const [addedCardsCount, setAddedCardsCount] = React.useState(0);
  const [isShowedAllCards, setIsShowedAllCards] = React.useState(false);
  
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
    updateCurrentArr();
  }

  function checkIsCardsLeft(originalArr, currentArr) {
    return originalArr.length === currentArr.length;
  }

  function addCards() {
    setAddedCardsCount(addedCardsCount + 1);
  }

  function updateCurrentArr() {
    currentArr = cards.slice(0, countCurrentCards());
    const isCardsLeft = checkIsCardsLeft(cards, currentArr);

    if (isCardsLeft === isShowedAllCards) {
      return;
    }
    setIsShowedAllCards(isCardsLeft);
  }
  
  window.addEventListener('resize', () => {
    timeout = setTimeout(updateDisplayMode, 100);
  });

  updateCurrentArr();

  return (
    <section className={ `movies-cards ${ isShowedAllCards ? 'movies-cards_type_showed-all-cards' : '' }` }>
      <ul className="movies-card__list">
        {
          currentArr.map((card) => <MoviesCard key={ card.id } card={ card } type={ type } />)
        }
      </ul>
      <button className={ `movies-card__more-button page__button ${ isShowedAllCards ? 'movies-card__more-button_hidden' : '' }` } type="button" name="more-button" onClick={ addCards }>Ещё</button>
    </section>
  )
}
