import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, MAX_RATING_STARS_COUNT, PRODUCT_IMAGE_PATH_REG_EXP, ratings} from '../../const';
import {useAppSelector} from '../../hooks';
import {getCart} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {ProductDto} from '../../types/product.dto';

type MainPageState = {
  isAddToCartModalOpened: boolean;
  isEnterModalOpened?: boolean;
  product: ProductDto | null;
};

type ProductCardProps = {
  product: ProductDto;
  setMainPageState?: (state: MainPageState) => void;
};

function ProductCard({product, setMainPageState}: ProductCardProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const cart = useAppSelector(getCart);
  const cartProducts = cart.items.map((item) => item.product?.id);
  const isProductInCart = cartProducts.includes(product.id);

  return (
    <div className="product-card">
      <img src={product.image} srcSet={`${product.image.match(PRODUCT_IMAGE_PATH_REG_EXP)}@2x.png 2x`} width="75" height="190" alt={product.title}/>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array.from({length: MAX_RATING_STARS_COUNT}, (_item, index) => index + 1).map((starPosition) => (
              <svg key={starPosition} width="12" height="11" aria-hidden="true">
                <use xlinkHref={starPosition <= product.rating ? '#icon-full-star' : '#icon-star'}></use>
              </svg>
            ))
          }
          <p className="visually-hidden">Рейтинг: {ratings[product.rating]}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewsCount}</p>
        </div>
        <p className="product-card__title">{product.title}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{`${product.price.toLocaleString()} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Product}/${product.id}`}>Подробнее</Link>
        {
          isProductInCart && isUserAuthorized
            ? (
              <Link to="/cart" className="button button--red-border button--mini button--in-cart">В корзине</Link>
            )
            : (
              <Link
                to=""
                className="button button--red button--mini button--add-to-cart"
                onClick={
                  () => setMainPageState && setMainPageState({
                    isAddToCartModalOpened: isUserAuthorized,
                    isEnterModalOpened: !isUserAuthorized,
                    product: isUserAuthorized ? product : null
                  })
                }
              >
                Купить
              </Link>
            )
        }
      </div>
    </div>
  );
}

export default ProductCard;
