import {Link, useLocation} from 'react-router-dom';
import {ORDERS_LIMIT, PRODUCTS_LIMIT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOrdersAction, fetchProductsAction} from '../../store/api-actions';
import {changeActiveOrdersPageAction, changeActivePageAction, setDataLoadedStatus} from '../../store/app-data/app-data';
import {getActiveOrdersPage, getActivePage, getOrdersPagesCount, getPagesCount, getSortOrder, getSortType} from '../../store/app-data/selectors';

const MAX_PAGES_COUNT = 3;

function Pagination() {
  const dispatch = useAppDispatch();
  const currentPath = useLocation().pathname;

  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);
  const activePage = currentPath === '/orders' ? useAppSelector(getActiveOrdersPage) : useAppSelector(getActivePage);

  const pagesCount = currentPath === '/orders' ? useAppSelector(getOrdersPagesCount) : useAppSelector(getPagesCount);
  const displayedPagesQueue = Math.floor((activePage - 0.5) / MAX_PAGES_COUNT);

  const handlePrevClick = () => {
    dispatch(setDataLoadedStatus(true));
    if (currentPath === '/orders') {
      dispatch(fetchOrdersAction({page: activePage - 1, limit: ORDERS_LIMIT, sort: sortType, order: sortOrder}));
      dispatch(changeActiveOrdersPageAction(activePage - 1));
    } else {
      dispatch(fetchProductsAction({page: activePage - 1, limit: PRODUCTS_LIMIT, sort: sortType, order: sortOrder}));
      dispatch(changeActivePageAction(activePage - 1));
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(setDataLoadedStatus(true));
    if (currentPath === '/orders') {
      dispatch(fetchOrdersAction({page: pageNumber, limit: ORDERS_LIMIT, sort: sortType, order: sortOrder}));
      dispatch(changeActiveOrdersPageAction(pageNumber));
    } else {
      dispatch(fetchProductsAction({page: pageNumber, limit: PRODUCTS_LIMIT, sort: sortType, order: sortOrder}));
      dispatch(changeActivePageAction(pageNumber));
    }
  };

  const handleNextClick = () => {
    dispatch(setDataLoadedStatus(true));
    if (currentPath === '/orders') {
      dispatch(fetchOrdersAction({page: activePage + 1, limit: ORDERS_LIMIT, sort: sortType, order: sortOrder}));
      dispatch(changeActiveOrdersPageAction(activePage + 1));
    } else {
      dispatch(fetchProductsAction({page: activePage + 1, limit: PRODUCTS_LIMIT, sort: sortType, order: sortOrder}));
      dispatch(changeActivePageAction(activePage + 1));
    }
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
