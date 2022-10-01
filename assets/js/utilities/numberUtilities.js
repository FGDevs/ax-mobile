function formatTwoDigit(number) {
  let formattedNumber = number;
  const numberInString = String(number);
  if (numberInString.length < 2) formattedNumber = "0" + number;

  return formattedNumber;
}
