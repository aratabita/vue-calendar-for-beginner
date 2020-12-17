// eslint-disable-next-line import/prefer-default-export
export const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month - 1, 1);
  const weekdayIndex = firstDay.getDay();
  const lastMonthDays = new Date(year, month - 1, 0).getDate();
  const thisMonthDays = new Date(year, month, 0).getDate();
  return {
    year,
    month,
    weekdayIndex,
    lastMonthDays,
    thisMonthDays,
  };
};
