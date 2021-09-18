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
