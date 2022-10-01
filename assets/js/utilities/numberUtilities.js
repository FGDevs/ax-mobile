function formatTwoDigit(number) {
  let formattedNumber = number;
  const numberInString = String(number);
  if (numberInString.length < 2) formattedNumber = "0" + number;

  return formattedNumber;
}

function formatHHMM(second) {
  const hour = second / 3600;
  const minute = (second % 3600) / 60;

  return [formatTwoDigit(hour), formatTwoDigit(minute)].join(":");
}

function formatHHMMSS(second) {
  const hour = second / 3600;
  const minute = (second % 3600) / 60;
  const secondd = (second / 3600) % 60;

  return [
    formatTwoDigit(Math.floor(hour)),
    formatTwoDigit(Math.floor(minute)),
    formatTwoDigit(Math.floor(secondd)),
  ].join(":");
}
