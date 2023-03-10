import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../../const';

type SendOrderModalProps = {
  setOrderModalOpened: (state: boolean) => void;
};

function SendOrderModal({setOrderModalOpened}: SendOrderModalProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={{position: 'relative', width: '550px', height: '410px', marginBottom: '50px'}}>
      <div className="modal is-active modal--success modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш заказ!</p>
            <div className="modal__button-container modal__button-container--send">
              <button
                onClick={() => navigate(AppRoute.Main)}
                className="button button--small modal__button modal__button--send">
                  К покупкам!
                </button>
            </div>
            <button
              onClick={() => setOrderModalOpened(false)}
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
                <span className="button-cross__icon"></span>
                <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendOrderModal;
