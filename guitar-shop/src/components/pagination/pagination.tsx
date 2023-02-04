import {Link} from 'react-router-dom';

function Pagination() {
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--active">
          <Link className="link pagination__page-link" to="1">1</Link>
        </li>
        <li className="pagination__page">
          <Link className="link pagination__page-link" to="2">2</Link>
        </li>
        <li className="pagination__page">
          <Link className="link pagination__page-link" to="3">3</Link>
        </li>
        <li className="pagination__page pagination__page--next" id="next">
          <Link className="link pagination__page-link" to="2">Далее</Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
