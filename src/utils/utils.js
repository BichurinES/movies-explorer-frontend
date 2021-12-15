import { BEATFILM_MOVIES_API_IMAGE_URL } from './constants.js';

export function convertDurationInHours(durationInMin) {
  if (durationInMin < 60) {
    return durationInMin + 'м';
  } else {
    return (Math.trunc(durationInMin / 60) + 'ч ' + (durationInMin % 60) + 'м');
  }
}

export function formatCard(card) {
  const formatedCard = { ...card };
  formatedCard.movieId = formatedCard.id;
  delete formatedCard.id;
  formatedCard.thumbnail = BEATFILM_MOVIES_API_IMAGE_URL + formatedCard.image.formats.thumbnail.url;
  formatedCard.image = BEATFILM_MOVIES_API_IMAGE_URL + formatedCard.image.url;
  formatedCard.trailer = formatedCard.trailerLink;
  delete formatedCard.trailerLink;
  delete formatedCard.created_at;
  delete formatedCard.updated_at;
  for (let key in formatedCard) {
    if (formatedCard[key] === null) {
      delete formatedCard[key];
    }
  }
  return formatedCard;
}

export function isShortMovie(movie) {
  return movie.duration <= 40;
}

export function filterShortMovies(movies) {
  return movies.filter(isShortMovie);
}

export function searchMovies(searchString, base) {
  const normalizeString = searchString.toLowerCase();
  const result = [];
  const exactMatch = [];
  const nameWithoutEndMatch = [];
  const descriptionMatch = [];
  const descriptionWithoutEndMatch = [];

  const keyWords = normalizeString.split(' ').filter((word) => word.length > 1);
  const oneKeyWord = keyWords.length === 1 ? keyWords[0] : null;
  
  function isFieldsIncludes(substr, firstField, secondField = null) {
    return (firstField ? firstField.includes(substr) : false) || (secondField ? secondField.includes(substr) : false);
  }

  function getWordWithoutEnding(word) {
    return word.length <= 4 ? word.slice(0, -1) : word.slice(0, -2);
  }

  function searchExactMatch(movie, normalizeData) {
    const { nameRU, nameEN } = normalizeData;
    if (isFieldsIncludes(normalizeString, nameRU, nameEN)) {
      exactMatch.push(movie);
      return true;
    }

    if (oneKeyWord && isFieldsIncludes(getWordWithoutEnding(oneKeyWord), nameRU, nameEN)) {
      nameWithoutEndMatch.push(movie);
      return true;
    }
  }

  function searchOneOrMoreWordsMatch(movie, normalizeData) {
    if (!oneKeyWord) {
      const { nameRU, nameEN, description } = normalizeData;
      let isSuccess = false;

      for (let i = 0; i < keyWords.length; i++) {
        const shortWord = getWordWithoutEnding(keyWords[i]);
        
        if (isFieldsIncludes(keyWords[i], nameRU, nameEN)) {
          exactMatch.push(movie);
          isSuccess = true;
          break;
        }

        if (isFieldsIncludes(shortWord, nameRU, nameEN)) {
          nameWithoutEndMatch.push(movie);
          isSuccess = true;
          break;
        }

        if (isFieldsIncludes(keyWords[i], description)) {
          descriptionMatch.push(movie);
          isSuccess = true;
          break;
        }

        if (isFieldsIncludes(shortWord, description)) {
          descriptionWithoutEndMatch.push(movie);
          isSuccess = true;
          break;
        }
      }
      return isSuccess;
    }
  }

  function searchDescriptionMatch(movie, normalizeData) {
    const { description } = normalizeData;
    if (isFieldsIncludes(normalizeString, description)) {
      descriptionMatch.push(movie);
      return true;
    }

    if (oneKeyWord && isFieldsIncludes(getWordWithoutEnding(oneKeyWord), description)) {
      descriptionWithoutEndMatch.push(movie);
      return true;
    }
  }

  base.forEach((movie) => {
    const { nameRU, nameEN, description } = movie;
    const normalizeData = {
      nameRU: nameRU ? nameRU.toLowerCase() : nameRU,
      nameEN: nameEN ? nameEN.toLowerCase() : nameEN,
      description: description ? description.toLowerCase() : description,
    };
    
    if (searchExactMatch(movie, normalizeData)) {
      return;
    }
    if (searchOneOrMoreWordsMatch(movie, normalizeData)) {
      return;
    }
    if (searchDescriptionMatch(movie, normalizeData)) {
      return;
    }
  });
  result.push(...exactMatch, ...nameWithoutEndMatch, ...descriptionMatch, ...descriptionWithoutEndMatch);
  return result;
}
