export const getRandom = (min: number, max: number) => {
  [min, max] = [Math.abs(min), Math.abs(max)];
  if (max < min) {[min, max] = [max, min];}
  return Math.round(min + (max - min) * Math.random());
};

const monthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function humanizeDate(date: string): string {
  return `${date[8]}${date[9]} ${monthNames[Number(`${date[5]}${date[6]}`) - 1]}`;
}
