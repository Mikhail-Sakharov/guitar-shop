import {Link, useLocation} from "react-router-dom";

function UserNavMenu() {
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
          className={`link main-nav__link ${currentPath === '/' ? 'link--current' : ''}`}
          to="#"
        >
          Где купить?
        </Link>
      </li>
      <li className="main-nav__item">
        <Link
          className={`link main-nav__link ${currentPath === '/' ? 'link--current' : ''}`}
          to="#"
        >
          О компании
        </Link>
      </li>
    </>
  );
}

export default UserNavMenu;
