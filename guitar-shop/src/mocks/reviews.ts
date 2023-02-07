import {getRandom} from '../helpers';
import {users} from './users';

export const getReviews = (productId: number) => Array.from({length: getRandom(1, 5)}, () => ({
  id: Number(new Date()) * getRandom(0, 5) + getRandom(0, 99),
  createdAt: new Date().toISOString(),
  user: users[getRandom(0, 2)],
  productId,
  advantages: 'Хороший корпус, чистый звук, стурны хорошего качества',
  disadvantages: 'Тугие колки',
  text: 'У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте нет чехла и ремня.',
  rating: getRandom(0, 5)
}));
