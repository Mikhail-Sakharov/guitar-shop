import {Link, useLocation} from "react-router-dom";

function AdminNavMenu() {
  const currentPath = useLocation().pathname;

  return (
    <>
      <li className="main-nav__item">
        <Link
          className={`link main-nav__link ${currentPath === '/' ? 'link--current' : ''}`}
          to="/"
        >
          Каталог
        </Link>
      </li>
      <li className="main-nav__item">
        <Link
          className={`link main-nav__link ${currentPath === '/orders' ? 'link--current' : ''}`}
          to="/orders"
        >
          Список заказов
        </Link>
      </li>
      <li className="main-nav__item">
        <Link
          className={`link main-nav__link ${currentPath === '/products' ? 'link--current' : ''}`}
          to="/products"
        >
          Список товаров
        </Link>
      </li>
    </>
  );
}

export default AdminNavMenu;
