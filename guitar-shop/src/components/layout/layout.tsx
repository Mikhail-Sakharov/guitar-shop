import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className="header" id="header">
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
              <span className="header__user-name">Имя</span>
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
                <span className="header__cart-count">2</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="footer">
        <div className="container">
          <div className="footer__container">
            <div className="footer__logo-wrapper">
              <Link to="/" className="footer__logo logo">
                <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
              </Link>
              <div className="socials footer__socials">
                <ul className="socials__list">
                  <li className="socials-item">
                    <Link className="socials__link" to="https://www.skype.com/" aria-label="Мы в skype">
                      <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="#icon-skype"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="socials-item">
                    <Link className="socials__link" to="https://www.vsco.co/" aria-label="Мы в vsco">
                      <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="#icon-vsco"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="socials-item">
                    <Link className="socials__link" to="https://www.pinterest.com/" aria-label="Мы в pinterest">
                      <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref="#icon-pinterest"></use>
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <section className="footer__nav-section footer__nav-section--about">
              <h2 className="footer__nav-title footer__nav-title--about">О нас</h2>
              <p className="footer__nav-text footer__nav-text--about">Магазин гитар, музыкальных <br/> инструментов и&nbsp;гитарная мастерская в&nbsp;Санкт-Петербурге.</p>
              <p className="footer__nav-text footer__nav-text--about">Все инструменты проверены, отстроены и&nbsp;доведены до&nbsp;идеала!</p>
            </section>
            <section className="footer__nav-section footer__nav-section--links">
              <h2 className="footer__nav-title footer__nav-title--links">Информация</h2>
              <ul className="footer__nav-list">
                <li className="footer__nav-list-item">
                  <Link className="link footer__nav-link" to="#top">Где купить?</Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link footer__nav-link" to="#top">Блог</Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link footer__nav-link" to="#top">Вопрос - ответ</Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link footer__nav-link" to="#top">Возврат</Link>
                </li>
                <li className="footer__nav-list-item">
                  <Link className="link footer__nav-link" to="#top">Сервис-центры</Link>
                </li>
              </ul>
            </section>
            <section className="footer__nav-section footer__nav-section--contacts">
              <h2 className="footer__nav-title footer__nav-title--contacts">Контакты</h2>
              <p className="footer__nav-text footer__nav-text--address">г. Санкт-Петербург,<br/> м. Невский проспект, ул. Казанская 6.
              </p>
              <Link className="link footer__nav-link footer__nav-link--phone" to="tel:88125005050">8-812-500-50-50</Link>
              <p className="footer__nav-text footer__nav-text--work-hours-title">
                Режим работы:<span className="footer__nav-text footer__nav-text--work-hours">с 11:00 до 20:00</span>
              </p>
              <p className="footer__nav-text footer__nav-text--weekends">без выходных</p>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
