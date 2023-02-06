import {Link, useParams} from 'react-router-dom';
import {products as data} from '../../components/app/app';
import ReviewsSection from '../../components/reviews-section/reviews-section';
import {MAX_RATING_STARS_COUNT, ratings} from '../../const';

function Product(): JSX.Element {
  const productId = Number(useParams().id);
  const product = data.find((item) => item.id === productId);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Главная</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Каталог</Link>
          </li>
          <li className="breadcrumbs__item">
            <Link className="link" to="/">Товар</Link>
          </li>
        </ul>
        <div className="product-container">
          <img className="product-container__img" src={product ? `../${product?.image}` : ''} /* srcSet={product ? `${product?.image} 2x` : ''} */ width="90" height="235" alt={product?.title}/>
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
              <p className="visually-hidden">Рейтинг: {product && ratings[product.rating]}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product?.reviewsCount}</p>
            </div>
            <div className="tabs">
              <Link className="button button--medium tabs__button" to="#characteristics">Характеристики</Link>
              <Link className="button button--black-border button--medium tabs__button" to="#description">Описание</Link>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Артикул:</td>
                    <td className="tabs__value">{product?.sku}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Тип:</td>
                    <td className="tabs__value">{product?.guitarType}</td>
                  </tr>
                  <tr className="tabs__table-row">
                    <td className="tabs__title">Количество струн:</td>
                    <td className="tabs__value">{product?.stringsCount} струнная</td>
                  </tr>
                </table>
                <p className="tabs__product-description hidden">{product?.description}</p>
              </div>
            </div>
          </div>
          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{product?.price.toLocaleString()} ₽</p>
            <Link className="button button--red button--big product-container__button" to="#">Добавить в корзину</Link>
          </div>
        </div>
        <ReviewsSection />
      </div>
    </main>
  );
}

export default Product;
