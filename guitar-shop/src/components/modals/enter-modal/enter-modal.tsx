import {Link} from 'react-router-dom';
import {ProductDto} from '../../../types/product.dto';

type MainPageState = {
  isEnterModalOpened?: boolean;
  product: ProductDto | null;
};

type EnterModalProps = {
  setMainPageState: (state: MainPageState) => void;
};

function EnterModal({setMainPageState}: EnterModalProps): JSX.Element {
  return (
    <div style={{position: 'relative', width: '550px', height: '500px', marginBottom: '50px'}}>
      <div className="modal is-active modal--enter">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <div className="modal-enter">
              <h2 className="modal-enter__title">Для выполнения данного действия необходимо войти в&nbsp;систему</h2>
              <Link className="button button--big modal-enter__link" to="/login">Войти</Link>
              <p className="modal-enter__text">
                Если у вас ещё нет аккаунта, необходимо <br/> <Link to="/registration">Зарегистрироваться</Link>
              </p>
            </div>
            <button
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
              onClick={() => setMainPageState({isEnterModalOpened: false, product: null})}
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

export default EnterModal;
