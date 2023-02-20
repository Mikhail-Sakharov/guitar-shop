import {DEFAULT_PAGE_NUMBER, ORDERS_LIMIT} from '../../const';
import {useAppDispatch} from '../../hooks';
import {deleteOrderAction, fetchOrdersAction} from '../../store/api-actions';
import {SortType} from '../../types/common';
import {OrderResponse} from '../../types/order.response';

type OrderCardProps = {
  order: OrderResponse;
};

function OrderCard({order}: OrderCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDeleteButtonClick = () => {
    dispatch(deleteOrderAction(order.id));
    dispatch(fetchOrdersAction({page: DEFAULT_PAGE_NUMBER, limit: ORDERS_LIMIT, sort: SortType.Date}));
  };

  return (
    <li className="orders__item">
      <h3 className="orders__number">Заказ №{order.orderNumber}</h3>
      <span className="orders__items">товаров&nbsp;<b className="orders__items-qty">{order.items.length}</b></span>
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
