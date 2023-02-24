import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppDispatch} from '../../hooks';
import {deleteOrderAction} from '../../store/api-actions';
import {OrderResponse} from '../../types/order.response';

type OrderCardProps = {
  order: OrderResponse;
  refreshPage: () => void;
};

function OrderCard({order, refreshPage}: OrderCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalOrderProductsCount = order.items.reduce((res, item) => res + item.quantity, 0);

  const handleDeleteButtonClick = async () => {
    await dispatch(deleteOrderAction(order.id));
    refreshPage();
  };

  return (
    <li className="orders__item">
      <h3
        style={{cursor: 'pointer'}}
        onClick={() => navigate(`${AppRoute.Order}/${order.id}`)}
        className="orders__number"
      >
        Заказ №{order.orderNumber}
      </h3>
      <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">{totalOrderProductsCount}</b></span>
      <span className="orders__date">{order.createdAt}</span>
      <b className="orders__sum">{order.totalOrderPrice.toLocaleString()}<span className="orders__rouble">₽</span></b>
      <button
        onClick={handleDeleteButtonClick}
        className="button button--small orders__remove-button" type="button"
      >
        Удалить
      </button>
    </li>
  )
}

export default OrderCard;
