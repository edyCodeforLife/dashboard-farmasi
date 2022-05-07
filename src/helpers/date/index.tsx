const DayFormat = (value: any) => {
  const date = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];
  return date[value];
};

export {
  DayFormat,
};
