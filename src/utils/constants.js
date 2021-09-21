export const MOVIES_SECTION_SETTINGS = {
  desktop: {
    title: 'desktop',
    width: 1280,
    cardsInitialNumber: 12,
    addCardsNumber: 3,
    maxColumns: 3,
  },
  tablet: {
    title: 'tablet',
    width: 768,
    cardsInitialNumber: 8,
    addCardsNumber: 2,
    maxColumns: 2,
  },
  mobile: {
    title: 'mobile',
    width: 320,
    cardsInitialNumber: 5,
    addCardsNumber: 2,
    maxColumns: 1,
  },
};

export const BEATFILM_MOVIES_API_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BEATFILM_MOVIES_API_IMAGE_URL = 'https://api.nomoreparties.co';
export const MAIN_API_SETTINGS = {
  // baseUrl: 'https://api.mestogram.nomoredomains.monster',
  baseUrl: 'http://localhost:4000',
  headers: { 'Content-Type': 'application/json' },
};

export const SUCCESS_REGISTER_MSG = 'Регистрация прошла успешно!';
export const MOVIES_NOT_FOUND_MSG = 'Ничего не найдено';
export const SEARCH_SERVER_ERROR_MSG = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
