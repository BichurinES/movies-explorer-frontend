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
  return formatedCard;
}

export function searchMovies(req, base) {
  const normalizeReq = req.toLowerCase();
  const result = [];
  const exactMatch = [];
  const oneOrMoreWordsMatch = [];
  const descriptionMatch = [];

  const keyWords = normalizeReq.split(' ').filter((word) => word.length > 1);
  const oneKeyWord = keyWords.length === 1 ? keyWords[0] : null;
  
  function isFieldsIncludes(substr, firstField, secondField = null) {
    return (firstField ? firstField.includes(substr) : false) || (secondField ? secondField.includes(substr) : false);
  }

  function getWordWithoutEnding(word) {
    return word.length <= 4 ? word.slice(0, -1) : word.slice(0, -2);
  }

  function searchExactMatch(movie, normalizeData) {
    const { nameRU, nameEN } = normalizeData;
    if (
      isFieldsIncludes(normalizeReq, nameRU, nameEN) || 
      isFieldsIncludes(getWordWithoutEnding(oneKeyWord), nameRU, nameEN)
      ) {
      exactMatch.push(movie);
      return;
    }
  }

  function searchOneOrMoreWordsMatch(movie, normalizeData) {
    if (!oneKeyWord) {
      const { nameRU, nameEN, description } = normalizeData;

      for (let i = 0; i < keyWords.length; i++) {
        const shortWord = getWordWithoutEnding(keyWords[i]);
        
        if (
          isFieldsIncludes(keyWords[i], nameRU, nameEN) || 
          isFieldsIncludes(shortWord, nameRU, nameEN)
        ) {
          oneOrMoreWordsMatch.push(movie);
          break;
        }

        if (
          isFieldsIncludes(keyWords[i], description) || 
          isFieldsIncludes(shortWord, description)
        ) {
          descriptionMatch.push(movie);
          break;
        }
      }
    }
  }

  function searchDescriptionMatch(movie, normalizeData) {
    const { description } = normalizeData;
    if (
      isFieldsIncludes(normalizeReq, description) || 
      isFieldsIncludes(getWordWithoutEnding(oneKeyWord), description)
    ) {
      descriptionMatch.push(movie);
      return;
    }
  }

  base.forEach((movie) => {
    const { nameRU, nameEN, description } = movie;
    const normalizeData = {
      nameRU: nameRU ? nameRU.toLowerCase() : nameRU,
      nameEN: nameEN ? nameEN.toLowerCase() : nameEN,
      description: description ? description.toLowerCase() : description,
    };
    
    searchExactMatch(movie, normalizeData);
    searchOneOrMoreWordsMatch(movie, normalizeData);
    searchDescriptionMatch(movie, normalizeData);
  });

  result.push(...exactMatch, ...oneOrMoreWordsMatch, ...descriptionMatch);
  return result;
}
