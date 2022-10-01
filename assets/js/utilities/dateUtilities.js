const DAY_MAP = {
  0: "Minggu",
  1: "Senin",
  2: "Selasa",
  3: "Rabu",
  4: "Kamis",
  5: "Jumat",
  6: "Sabtu",
};

function formatDateFull(day, date, month, year) {
  date = formatTwoDigit(date);
  month = formatTwoDigit(month);

  return `${DAY_MAP[day]}, ${date}/${month}/${year}`;
}
