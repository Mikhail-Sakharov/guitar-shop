import {Link} from 'react-router-dom';

function Breadcrumbs() {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to="/">Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to="/">Каталог</Link>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
