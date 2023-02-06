import {getRandom} from '../helpers';
import {UserRole} from '../types/user-role.enum';

export const getReviews = () => Array.from({length: getRandom(1, 5)}, () => ({
  id: Number(new Date()) * getRandom(0, 5) + getRandom(0, 99),
  createdAt: new Date().toISOString(),
  user: {
    _id: 'qwe7qy87f864rwewrwer8u',
    firstName: 'Михаил',
    lastName: 'Сахаров',
    email: 'mikhail@sakharov.qwe',
    userRole: UserRole.User
  },
  advantages: 'Хороший корпус, чистый звук, стурны хорошего качества',
  disadvantages: 'Тугие колки',
  text: 'У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте нет чехла и ремня.',
  rating: getRandom(0, 5)
}));
