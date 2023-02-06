import {Link} from 'react-router-dom';

class ProductDto { // TODO: перенести в типы
  public id!: number;
  public title!: string;
  public description!: string;
  public createdAt!: string;
  public image!: string;
  public guitarType!: string;
  public sku!: string;
  public stringsCount!: number;
  public rating!: number;
  public price!: number;
  public reviewsCount!: number;
}

const ratings = ['Не определено', 'Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично']; // TODO: перенести в константы

const maxRatingStarsCount = 5; // TODO: перенести в константы

type AddToCartModalState = {
  isOpened: boolean;
  product: ProductDto | null;
};

type ProductCardProps = {
  product: ProductDto;
  setAddToCartModalState: (state: AddToCartModalState) => void;
};

function ProductCard({product, setAddToCartModalState}: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} srcSet="img/content/catalog-product-0@2x.png 2x" width="75" height="190" alt={product.title}/>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array.from({length: maxRatingStarsCount}, (_item, index) => index + 1).map((starPosition) => (
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
        <Link className="button button--mini" to="/product">Подробнее</Link>
        {/* меняем класс, если товар в корзине */}
        <Link className="button button--red button--mini button--add-to-cart" to="/" onClick={() => setAddToCartModalState({isOpened: true, product})}>Купить</Link>
      </div>
    </div>
  );
}

export default ProductCard;
