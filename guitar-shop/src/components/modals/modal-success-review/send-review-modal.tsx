import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../../const';

type ProductPageState = {
  isSendReviewModalOpened?: boolean;
};

type SendReviewModalProps = {
  currentReviewsPage: number;
  setCurrentReviewsPage: (page: number) => void;
  setProductPageState: (state: ProductPageState) => void;
};

function SendReviewModal({currentReviewsPage, setCurrentReviewsPage, setProductPageState}: SendReviewModalProps): JSX.Element {
  const navigate = useNavigate();

  const handleCloseButtonClick = () => {
    setProductPageState({isSendReviewModalOpened: false});
    setCurrentReviewsPage(currentReviewsPage + 1);
  };
  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button
                onClick={() => navigate(AppRoute.Main)}
                className="button button--small modal__button modal__button--review"
              >
                К покупкам!
              </button>
            </div>
            <button
              onClick={handleCloseButtonClick}
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
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

export default SendReviewModal;
