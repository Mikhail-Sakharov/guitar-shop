import {PRODUCT_IMAGE_PATH_REG_EXP} from '../../const';
import {useAppDispatch} from '../../hooks';
import {decreaseCartItemQuantity, deleteProductFromCart, increaseCartItemQuantity} from '../../store/app-data/app-data';
import {CartItemType} from '../../types/common';

type CartItemProps = {
  cartItem: CartItemType;
};

function CartItem({cartItem}: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleIncButtonClick = () => {
    dispatch(increaseCartItemQuantity(cartItem.product));
  };

  const handleDecButtonClick = () => {
    dispatch(decreaseCartItemQuantity(cartItem.product));
  };

  const handleRemoveButtonClick = () => {
    dispatch(deleteProductFromCart(cartItem.product));
  };

  return (
    <div className="cart-item">
      <button onClick={handleRemoveButtonClick} className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={cartItem.product ? `${cartItem.product?.image}` : ''}
          srcSet={`${cartItem.product?.image.match(PRODUCT_IMAGE_PATH_REG_EXP)}@2x.png 2x`}
          width="55" height="130" alt="ЭлектроГитара Честер bass"/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">ЭлектроГитара {cartItem.product?.title}</p>
        <p className="product-info__info">Артикул: {cartItem.product?.sku}</p>
        <p className="product-info__info">Электрогитара, {cartItem.product?.stringsCount} струнная</p>
      </div>
      <div className="cart-item__price">{cartItem.product?.price.toLocaleString()} ₽</div>
      <div className="quantity cart-item__quantity">
        <button onClick={handleDecButtonClick} className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input className="quantity__input" type="number" placeholder={cartItem.quantity.toString()} id="1-count" name="1-count" max="99"/>
        <button onClick={handleIncButtonClick} className="quantity__button" aria-label="Увеличить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{cartItem.totalItemPrice.toLocaleString()} ₽</div>
    </div>
  );
}

export default CartItem;
