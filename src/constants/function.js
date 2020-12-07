import { MONTH_DAYS } from './variable';

export const uniqId = () => {
  return Math.floor(Math.random() * 10000000000000001);
};

export const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month - 1, 1);
  const weekdayIndex = firstDay.getDay();
  const lastMonthDays = month === 1 ? MONTH_DAYS[11] : MONTH_DAYS[month - 2];
  const thisMonthDays = MONTH_DAYS[month - 1];
  return {
    year,
    month,
    weekdayIndex,
    lastMonthDays,
    thisMonthDays,
  };
};
