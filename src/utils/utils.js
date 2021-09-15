export function convertDurationInHours(durationInMin) {
  if (durationInMin < 60) {
    return durationInMin + 'м';
  } else {
    return (Math.trunc(durationInMin / 60) + 'ч ' + (durationInMin % 60) + 'м');
  }
}
