import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import EnterModal from '../../components/modals/enter-modal/enter-modal';
import SendReviewModal from '../../components/modals/modal-success-review/send-review-modal';
import ReviewFormModal from '../../components/modals/review-form-modal/review-form-modal';
import ReviewsSection from '../../components/reviews-section/reviews-section';
import {AuthorizationStatus, DEFAULT_PAGE_NUMBER, MAX_RATING_STARS_COUNT, ratings} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchProductAction} from '../../store/api-actions';
import {putProductToCart, setDataLoadedStatus} from '../../store/app-data/app-data';
import {getCart, getProduct} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type ProductPageState = {
  isEnterModalOpened?: boolean;
  isReviewFormModalOpened?: boolean;
  isSendReviewModalOpened?: boolean;
};

function Product(): JSX.Element {
  const dispatch = useAppDispatch();

  const productId = useParams().id;
  const product = useAppSelector(getProduct);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const cart = useAppSelector(getCart);
  const cartProducts = cart.items.map((item) => item.product?.id);
  const isProductInCart = cartProducts.includes(productId);

  const [isCharacteristics, setIsCharacteristics] = useState(false);
  const productPageInitialState: ProductPageState = {
    isEnterModalOpened: false,
    isReviewFormModalOpened: false,
    isSendReviewModalOpened: false
  };
  const [productPageState, setProductPageState] = useState(productPageInitialState);
  const [currentReviewsPage, setCurrentReviewsPage] = useState(DEFAULT_PAGE_NUMBER);

  useEffect(() => {
    dispatch(setDataLoadedStatus(true));
    dispatch(fetchProductAction(productId));
  }, [dispatch, productId]);

  const handleAddButtonClick = () => {
    if (isUserAuthorized) {
      dispatch(putProductToCart(product));
    }
    setProductPageState({
      isEnterModalOpened: !isUserAuthorized
    });
  };

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">??????????</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">??????????????</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">??????????????</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">??????????</Link>
          </li>
        </ul>
        <div className="product-container">
          <img className="product-container__img" src={product ? `${product?.image}` : ''} /* srcSet={product ? `${product?.image} 2x` : ''} */ width="90" height="235" alt={product?.title}/>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{product?.title}</h2>
            <div className="rate product-container__rating">
              {
                product
                  && Array.from({length: MAX_RATING_STARS_COUNT}, (_item, index) => index + 1).map((starPosition) => (
                    <svg key={starPosition} width="14" height="14" aria-hidden="true">
                      <use xlinkHref={starPosition <= product.rating ? '#icon-full-star' : '#icon-star'}></use>
                    </svg>
                  ))
              }
              <p className="visually-hidden">??????????????: {product && ratings[product.rating]}</p>
              <p className="rate__count"><span className="visually-hidden">?????????? ????????????:</span>{product?.reviewsCount}</p>
            </div>
            <div className="tabs">
              <Link onClick={() => setIsCharacteristics(false)} className={`button button--medium tabs__button ${isCharacteristics ? 'button--black-border' : ''}`} to="#characteristics">????????????????????????????</Link>
              <Link onClick={() => setIsCharacteristics(true)} className={`button button--medium tabs__button ${isCharacteristics ? '' : 'button--black-border'}`} to="#description">????????????????</Link>
              <div className="tabs__content" id="characteristics">
                <table className={`tabs__table ${isCharacteristics ? 'hidden' : ''}`}>
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">??????????????:</td>
                      <td className="tabs__value">{product?.sku}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">??????:</td>
                      <td className="tabs__value">{product?.guitarType}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">???????????????????? ??????????:</td>
                      <td className="tabs__value">{product?.stringsCount} ????????????????</td>
                    </tr>
                  </tbody>
                </table>
                <p className={`tabs__product-description ${isCharacteristics ? '' : 'hidden'}`}>{product?.description}</p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">????????:</p>
            <p className="product-container__price-info product-container__price-info--value">{product?.price.toLocaleString()} ???</p>
            {
              isProductInCart && isUserAuthorized
                ? (
                  <Link
                    className="button button--red-border button--big product-container__button" to="/cart"
                  >
                    ?? ??????????????
                  </Link>
                )
                : (
                  <Link
                    onClick={handleAddButtonClick}
                    className="button button--red button--big product-container__button" to="#"
                  >
                    ???????????????? ?? ??????????????
                  </Link>
                )
            }
          </div>
        </div>
        <ReviewsSection
          currentReviewsPage={currentReviewsPage}
          setCurrentReviewsPage={setCurrentReviewsPage}
          setProductPageState={setProductPageState}
        />
        {
          productPageState.isEnterModalOpened && <EnterModal setMainPageState={setProductPageState}/>
        }
        {
          productPageState.isReviewFormModalOpened && <ReviewFormModal product={product} setProductPageState={setProductPageState}/>
        }
        {
          productPageState.isSendReviewModalOpened && <SendReviewModal currentReviewsPage={currentReviewsPage} setCurrentReviewsPage={setCurrentReviewsPage} setProductPageState={setProductPageState}/>
        }
      </div>
    </main>
  );
}

export default Product;
