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

type AddToCartModalState = {
  isOpened: boolean;
  product: ProductDto | null;
};

type AddToCartModalProps = {
  product: ProductDto | null;
  setAddToCartModalState: (state: AddToCartModalState) => void;
};

function AddToCartModal({product, setAddToCartModalState}: AddToCartModalProps): JSX.Element {

  const handleAddButtonClick = () => {
    setAddToCartModalState({isOpened: false, product: null});
  };

  return (
    <div style={{position: 'relative', width: '550px', height: '440px', marginBottom: '50px'}}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={product?.image} srcSet="img/content/catalog-product-1@2x.png 2x" width="67" height="137" alt={product?.title}/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {product?.title}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {product?.sku}</p>
                <p className="modal__product-params">Электрогитара, {product?.stringsCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{product?.price.toLocaleString()} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button onClick={handleAddButtonClick} className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
            </div>
            <button onClick={() => setAddToCartModalState({isOpened: false, product: null})} className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCartModal;
