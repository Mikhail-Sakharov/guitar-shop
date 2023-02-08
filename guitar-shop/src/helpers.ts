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

export const getQueryString = (args: QueryArguments) => {
  if (!args) {return '';}
  const queryParams = [
    `${args.page ? `_page=${args.page}` : '_page=1'}`,
    `${args.limit ? `_limit=${args.limit}` : '_limit=9'}`,
    `${args.sort ? `_sort=${args.sort}` : `_sort=${SortType.Price}`}`,
    `${args.order ? `_order=${args.order}` : `_order=${SortOrder.Asc}`}`,
  ];
  const queryString = queryParams.every((param) => param === '') ? '' : `?${queryParams.join('&')}`;
  return queryString;
};
