import {PRODUCT_IMAGE_PATH_REG_EXP} from '../../const';
import {CartItemType, GuitarType} from '../../types/common';

const GuitarTypeMap = {
  [GuitarType.Acoustic]: 'Акустическая гитара',
  [GuitarType.Electro]: 'Электрогитара',
  [GuitarType.Ukulele]: 'Гитара укулеле'
}

type OrderItemProps = {
  orderItem: CartItemType;
};

function OrderItem({orderItem}: OrderItemProps): JSX.Element {

  return (
    <li className="order-list__item">
      <div className="order-list__data">
        <img
          src={orderItem.product?.image}
          srcSet={`${orderItem.product?.image.match(PRODUCT_IMAGE_PATH_REG_EXP)}@2x.png 2x`}
          width="60" height="130" alt="Картинка гитары"/>
        <div className="order-list__container">
          <p className="order-list__name">{`${orderItem.product ? GuitarTypeMap[orderItem.product.guitarType] : ''} ${orderItem.product?.title}`}</p>
          <p className="order-list__lot">Артикул: {orderItem.product?.sku}</p>
          <p className="order-list__parameters">{`${orderItem.product ? GuitarTypeMap[orderItem.product.guitarType] : ''}, ${orderItem.product?.stringsCount}`} струнная</p>
        </div>
      </div>
      <span className="order-list__quantity">{orderItem.quantity}</span>
      <span className="order-list__price">{orderItem.totalItemPrice.toLocaleString()} ₽</span>
      <button className="order-list__button button-cross" type="button" aria-label="Закрыть">
        <span className="button-cross__icon"></span>
      </button>
    </li>
  );
}

export default OrderItem;
