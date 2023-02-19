import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {DEFAULT_PAGE_NUMBER, ORDERS_LIMIT, PRODUCTS_LIMIT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchOrdersAction, fetchProductsAction} from '../../store/api-actions';
import {changeSortTypeAction, changeSortOrderAction, changeActivePageAction, setDataLoadedStatus} from '../../store/app-data/app-data';
import {getSortType, getSortOrder} from '../../store/app-data/selectors';
import {SortOrder, SortType} from '../../types/common';

function Sort() {
  const dispatch = useAppDispatch();
  const currentPath = useLocation().pathname;

  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);

  const handleSortTypeClick = (sort: SortType) => {
    dispatch(setDataLoadedStatus(true));
    if (currentPath === '/orders') {
      dispatch(fetchOrdersAction({page: DEFAULT_PAGE_NUMBER, limit: ORDERS_LIMIT, sort, order: SortOrder.Asc}));
    } else {
      dispatch(fetchProductsAction({page: DEFAULT_PAGE_NUMBER, limit: PRODUCTS_LIMIT, sort, order: SortOrder.Asc}));
    }
    dispatch(changeActivePageAction(DEFAULT_PAGE_NUMBER));
    dispatch(changeSortTypeAction(sort));
    dispatch(changeSortOrderAction(SortOrder.Asc));
  };

  const handleSortOrderClick = (order: SortOrder) => {
    dispatch(setDataLoadedStatus(true));
    if (currentPath === '/orders') {
      dispatch(fetchOrdersAction({page: DEFAULT_PAGE_NUMBER, limit: ORDERS_LIMIT, sort: sortType, order}));
    } else {
      dispatch(fetchProductsAction({page: DEFAULT_PAGE_NUMBER, limit: PRODUCTS_LIMIT, sort: sortType, order}));
    }
    dispatch(changeSortOrderAction(order));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {
          currentPath === '/orders'
            && (
              <button
                className={`catalog-sort__type-button ${sortType === SortType.Date ? 'catalog-sort__type-button--active' : ''}`} aria-label="по дате"
                onClick={() => handleSortTypeClick(SortType.Date)}
              >
                по дате
              </button>
            )
        }
        <button
          className={`catalog-sort__type-button ${sortType === SortType.Price ? 'catalog-sort__type-button--active' : ''}`} aria-label="по цене"
          onClick={() => handleSortTypeClick(currentPath === '/orders' ? SortType.TotalOrderPrice : SortType.Price)}
        >
          по цене
        </button>
        {
          currentPath === '/orders' ? null : (
            <button
              className={`catalog-sort__type-button ${sortType === SortType.Rating ? 'catalog-sort__type-button--active' : ''}`} aria-label="по популярности"
              onClick={() => handleSortTypeClick(SortType.Rating)}
            >
              по популярности
            </button>
          )
        }
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up ${sortOrder === SortOrder.Asc ? 'catalog-sort__order-button--active' : ''}`} aria-label="По возрастанию"
          onClick={() => handleSortOrderClick(SortOrder.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down ${sortOrder === SortOrder.Desc ? 'catalog-sort__order-button--active' : ''}`} aria-label="По убыванию"
          onClick={() => handleSortOrderClick(SortOrder.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
