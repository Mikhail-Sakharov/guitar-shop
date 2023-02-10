import {Link} from 'react-router-dom';
import {PRODUCTS_LIMIT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchProductsAction} from '../../store/api-actons';
import {changeActivePageAction} from '../../store/app-data/app-data';
import {getActivePage, getPagesCount, getSortOrder, getSortType} from '../../store/app-data/selectors';

const MAX_PAGES_COUNT = 3;

function Pagination() {
  const dispatch = useAppDispatch();

  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);
  const activePage = useAppSelector(getActivePage);

  const pagesCount = useAppSelector(getPagesCount);
  const displayedPagesQueue = Math.floor((activePage - 0.5) / MAX_PAGES_COUNT);

  const handlePrevClick = () => {
    dispatch(fetchProductsAction({page: activePage - 1, limit: PRODUCTS_LIMIT, sort: sortType, order: sortOrder}));
    dispatch(changeActivePageAction(activePage - 1));
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(fetchProductsAction({page: pageNumber, limit: PRODUCTS_LIMIT, sort: sortType, order: sortOrder}));
    dispatch(changeActivePageAction(pageNumber));
  };

  const handleNextClick = () => {
    dispatch(fetchProductsAction({page: activePage + 1, limit: PRODUCTS_LIMIT, sort: sortType, order: sortOrder}));
    dispatch(changeActivePageAction(activePage + 1));
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          activePage > 1
            && (
              <li className="pagination__page pagination__page--prev" id="prev">
                <Link
                  className="link pagination__page-link" to=""
                  onClick={handlePrevClick}
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
                <Link
                  className="link pagination__page-link" to=""
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </Link>
              </li>
            ))
        }
        {
          activePage !== pagesCount
            && (
              <li className="pagination__page pagination__page--next" id="next">
                <Link
                  className="link pagination__page-link" to=""
                  onClick={handleNextClick}
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
