export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function calculateDates(numberOfDays) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateMinusDays = new Date(today);
  dateMinusDays.setDate(today.getDate() - numberOfDays);

  const formattedYesterday = formatDate(yesterday);
  const formattedDateMinusDays = formatDate(dateMinusDays);

  return {end: formattedYesterday, start: formattedDateMinusDays};
}
