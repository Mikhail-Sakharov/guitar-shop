import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getUserName} from '../../services/user-name';
import {getCart} from '../../store/app-data/selectors';
import {getAuthorizationStatus, getUserData} from '../../store/user-process/selectors';

function Header() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const cart = useAppSelector(getCart);

  return (
    <header className={`header ${isUserAuthorized ? 'header--logged' : ''}`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to="/" className="header__logo logo">
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="link main-nav__link link--current" to="/">Каталог</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="#">Где купить?</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="#">О компании</Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">{isUserAuthorized && userData.userName}</span>
            <Link className="header__link" to="/cart" aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
            <Link className="header__cart-link" to="/cart" aria-label="Перейти в корзину">
              <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
              {
                cart.items.length !== 0
                  &&
                <span className="header__cart-count">{cart.items.length}</span>
              }
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
