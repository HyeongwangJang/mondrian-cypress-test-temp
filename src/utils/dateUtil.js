/**
 * 각 월의 몇주차인지 리턴
 * @param {Date} date 
 * @returns 2024-02-26 => 5
 */
export function getWeek(date) {
  let monthStart = new Date(date);
  monthStart.setDate(0);
  let offset = (monthStart.getDay() + 1) % 7 - 1; // -1 is for a week starting on Monday

  return Math.ceil((date.getDate() + offset) / 7);
}

/**
 * 각 년과 월의 몇주차인지 문자열로 리턴
 * @param {Date} date 
 * @returns 2024-02-26 => 2024년 2월 5주차
 */
export function getWeekNumberAndMonthAndYear(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const weekNumber = getWeek(date);

  return year + '년 ' + month + '월 ' + weekNumber + '주차';
}