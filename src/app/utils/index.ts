export const getStartEndDate = (month?: number, year?: number) => {
  const date = new Date(),
    y = year || date.getFullYear(),
    m = month > 0 ? month : date.getMonth();
  const start = new Date(y, m, 1);
  const end = new Date(y, m + 1, 0);
  return { start, end };
};

export const getNoOfDaysInMonth = (dateData: string) => {
  const date = new Date(dateData),
    month = date.getMonth(),
    year = date.getFullYear();
  return new Date(year, month, 0).getDate();
};

export const getMonthName = (date: string) => {
  return new Date(date).toLocaleString('default', {
    month: 'long',
  });
};

export const monthIndex = () => {
  return [
    { name: 'jan', index: 0, fullName: 'January' },
    { name: 'feb', index: 1, fullName: 'February' },
    { name: 'mar', index: 2, fullName: 'March' },
    { name: 'apr', index: 3, fullName: 'April' },
    { name: 'may', index: 4, fullName: 'May' },
    { name: 'jun', index: 5, fullName: 'June' },
    { name: 'jul', index: 6, fullName: 'July' },
    { name: 'aug', index: 7, fullName: 'August' },
    { name: 'sep', index: 8, fullName: 'September' },
    { name: 'oct', index: 9, fullName: 'October' },
    { name: 'nov', index: 10, fullName: 'November' },
    { name: 'dec', index: 11, fullName: 'December' },
  ];
};

export const chartColors = [
  '#FEA47F',
  '#25CCF7',
  '#EAB543',
  '#55E6C1',
  '#CAD3C8',
  '#F97F51',
  '#1B9CFC',
  '#F8EFBA',
  '#58B19F',
  '#2C3A47',
  '#B33771',
  '#3B3B98',
  '#FD7272',
  '#9AECDB',
  '#D6A2E8',
  '#6D214F',
  '#182C61',
  '#FC427B',
  '#BDC581',
  '#82589F',
];
