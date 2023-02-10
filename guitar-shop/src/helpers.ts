import {SortOrder, QueryArguments, SortType} from './types/common';

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

export const getQueryString = (args: QueryArguments | undefined) => {
  if (!args) {return '';}
  const queryParams = [
    `${args.page ? `_page=${args.page}` : ''}`,
    `${args.limit ? `_limit=${args.limit}` : ''}`,
    `${args.sort ? `_sort=${args.sort}` : `_sort=${SortType.Price}`}`,
    `${args.order ? `_order=${args.order}` : `_order=${SortOrder.Asc}`}`,
    `${args.minPriceFilter ? args.minPriceFilter : ''}`,
    `${args.maxPriceFilter ? args.maxPriceFilter : ''}`,
    `${args.guitarTypeFilter ? `${args.guitarTypeFilter}` : ''}`,
    `${args.stringsCountFilter ? `${args.stringsCountFilter}` : ''}`
  ];
  const queryString = `?${queryParams.filter((param) => param !== '').join('&')}`;
  return queryString;
};

export const debounce = (callback: (state: string) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (state: string) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(state), delay);
  };
};
