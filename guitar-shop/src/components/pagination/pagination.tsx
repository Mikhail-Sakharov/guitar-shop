import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchProductsAction} from '../../store/api-actons';
import {getProductsCount} from '../../store/app-data/selectors';

const MAX_PAGES_COUNT = 3;
const PRODUCTS_LIMIT = 9;

function Pagination() {
  const dispatch = useAppDispatch();
  const [activePage, setActivePage] = useState(1);

  dispatch(fetchProductsAction({page: activePage, limit: PRODUCTS_LIMIT}));

  const productsCount = useAppSelector(getProductsCount);
  const pagesCount = Math.ceil(productsCount / PRODUCTS_LIMIT);
  const displayedPagesQueue = Math.floor((activePage - 0.5) / MAX_PAGES_COUNT);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          activePage > 1
            && (
              <li className="pagination__page pagination__page--prev" id="prev">
                <Link
                  className="link pagination__page-link" to=""
                  onClick={() => setActivePage((prevState) => prevState === 1 ? prevState : prevState - 1)}
                >
                  Назад
                </Link>
              </li>
            )
        }
        {
          Array.from({length: pagesCount}, (_item, index) => index + 1)
            .slice(displayedPagesQueue * MAX_PAGES_COUNT, displayedPagesQueue * MAX_PAGES_COUNT + MAX_PAGES_COUNT)
            .map((pageNumber) => (
              <li key={pageNumber} className={`pagination__page ${pageNumber === activePage ? 'pagination__page--active' : ''}`}>
                <Link onClick={() => setActivePage(pageNumber)} className="link pagination__page-link" to="">{pageNumber}</Link>
              </li>
            ))
        }
        {
          activePage !== pagesCount
            && (
              <li className="pagination__page pagination__page--next" id="next">
                <Link
                  className="link pagination__page-link" to=""
                  onClick={() => setActivePage((prevState) => prevState === pagesCount ? prevState : prevState + 1)}
                >
                  Далее
                </Link>
              </li>
            )
        }
      </ul>
    </div>
  );
}

export default Pagination;
