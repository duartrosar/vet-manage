export const getDays = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

export const checkLeapYear = (year: number): boolean => {
  const isLeapYear = year % 4 === 0;
  return isLeapYear;
};
