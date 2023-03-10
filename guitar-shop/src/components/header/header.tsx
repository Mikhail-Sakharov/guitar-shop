import {Link, useLocation} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getUserName} from '../../services/user-name';
import {getUserRole} from '../../services/user-role';
import {getCart} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {UserRole} from '../../types/user-role.enum';
import AdminNavMenu from '../admin-nav-menu/admin-nav-menu';
import UserNavMenu from '../user-nav-menu/user-nav-menu';

function Header() {
  const currentPath = useLocation().pathname;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const isUserAdmin = getUserRole() === UserRole.Admin;

  const cart = useAppSelector(getCart);

  return (
    <header className={`header ${isUserAuthorized ? 'header--logged' : ''} ${isUserAdmin ? 'header--admin' : ''}`} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link to="/" className="header__logo logo">
            <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              {
                isUserAdmin
                  ? (
                    <AdminNavMenu />
                  )
                  : (
                    <UserNavMenu />
                  )
              }
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">{isUserAuthorized && getUserName()}</span>
            <Link
              className={`header__link ${currentPath === '/cart' ? 'link--current' : ''}`}
              to="/cart" aria-label="Перейти в личный кабинет"
            >
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
            <Link
              className={`header__cart-link ${currentPath === '/cart' ? 'link--current' : ''}`}
              to="/cart" aria-label="Перейти в корзину"
            >
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
