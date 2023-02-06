import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../../const';
import {ProductDto} from '../../../types/product.dto';

type MainPageState = {
  isAddToCartModalOpened: boolean;
  isSuccessAddModalOpened: boolean;
  product: ProductDto | null;
};

type SuccessAddModalProps = {
  setMainPageState: (state: MainPageState) => void;
};

function SuccessAddModal({setMainPageState}: SuccessAddModalProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button
                className="button button--small modal__button"
                onClick={() => navigate(AppRoute.Cart)}
              >
                Перейти в корзину
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={
                  () => setMainPageState({
                    isAddToCartModalOpened: false,
                    isSuccessAddModalOpened: false,
                    product: null
                  })
                }
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              onClick={
                () => setMainPageState({
                  isAddToCartModalOpened: false,
                  isSuccessAddModalOpened: false,
                  product: null
                })
              }
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessAddModal;
