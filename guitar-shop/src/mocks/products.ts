import {getRandom} from '../helpers';
import {getReviews} from './reviews';

const titles = ['Liana Z100', 'Честер Bass', 'Roman RX'];
const guitarTypes = ['электро', 'аккустика', 'укулеле'];
const stringsCounts = [4, 6, 7, 12];
const userIds = ['6398ab2b5a6c4e3fefe83771', '6398ab2b5a6c4e3fefe83772', '6398ab2b5a6c4e3fefe83773'];

export const getProducts = () => Array.from({length: 25}, () => {
  const product = {
    id: Number(new Date()) * getRandom(0, 5) + getRandom(0, 99),
    createdAt: new Date().toISOString(),
    authorId: userIds[getRandom(0, 2)],
    title: titles[getRandom(0, 2)],
    description: 'Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.',
    image: `img/content/catalog-product-${getRandom(0, 8)}.png`,
    guitarType: guitarTypes[getRandom(0, 2)],
    sku: `${Number(new Date())}`,
    stringsCount: stringsCounts[getRandom(0, 3)],
    rating: getRandom(0, 5),
    price: getRandom(100, 1000000),
    reviewsCount: getRandom(0, 10)
  };
  const productReviews = getReviews(product.id);
  return [product, productReviews];
});
