import {getRandom} from '../helpers';

const titles = ['Liana Z100', 'Честер Bass', 'Roman RX'];
const guitarTypes = ['электро', 'аккустика', 'укулеле'];
const stringsCounts = [4, 6, 7, 12];

export const getProducts = () => Array.from({length: 9}, () => ({
  id: Number(new Date()) * getRandom(0, 5) + getRandom(0, 99),
  title: titles[getRandom(0, 2)],
  description: 'Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.',
  createdAt: new Date().toISOString(),
  image: `img/content/catalog-product-${getRandom(0, 8)}.png`,
  guitarType: guitarTypes[getRandom(0, 2)],
  sku: `${Number(new Date())}`,
  stringsCount: stringsCounts[getRandom(0, 3)],
  rating: getRandom(0, 5),
  price: getRandom(100, 1000000),
  reviewsCount: getRandom(0, 10)
}));
