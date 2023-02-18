import {Link} from "react-router-dom";
import {MAX_RATING_STARS_COUNT, PRODUCT_IMAGE_PATH_REG_EXP, ratings} from "../../const";
import {ProductDto} from "../../types/product.dto";

type AdminProductCardProps = {
  product: ProductDto;
};

function AdminProductCard({product}: AdminProductCardProps): JSX.Element {
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={product.image} srcSet={`${product.image.match(PRODUCT_IMAGE_PATH_REG_EXP)}@2x.png 2x`} width="36" height="93" alt="Картинка гитары"/>
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">{product.title}</p>
          <div className="rate catalog-item__data-rate">
            {
              Array.from({length: MAX_RATING_STARS_COUNT}, (_item, index) => index + 1).map((starPosition) => (
                <svg key={starPosition} width="14" height="14" aria-hidden="true">
                  <use xlinkHref={starPosition <= product.rating ? '#icon-full-star' : '#icon-star'}></use>
                </svg>
              ))
            }
            <p className="visually-hidden">Оценка: {ratings[product.rating]}</p>
          </div>
          <p className="catalog-item__data-date">{product.createdAt}</p>
          <p className="catalog-item__data-price">{`${product.price.toLocaleString()} ₽`}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link className="button button--small button--black-border" to="/edit-item" aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </li>
  );
}

export default AdminProductCard;
