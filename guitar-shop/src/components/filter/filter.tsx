import {useEffect, useRef, useState} from 'react';
import {DEFAULT_PAGE_NUMBER, PRODUCTS_LIMIT} from '../../const';
import {debounce} from '../../helpers';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchProductsAction} from '../../store/api-actons';
import {changeActivePageAction, setDataLoadedStatus} from '../../store/app-data/app-data';
import {getActivePage, getMaxPrice, getMinPrice, getSortOrder, getSortType} from '../../store/app-data/selectors';
import {GuitarType, StringsCount} from '../../types/common';

function Filter() {
  const dispatch = useAppDispatch();

  const activePage = useAppSelector(getActivePage);
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);
  const minCurrentCatalogPrice = useAppSelector(getMinPrice);
  const maxCurrentCatalogPrice = useAppSelector(getMaxPrice);

  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const [acoustic, setAcoustic] = useState(false);
  const [electro, setElectro] = useState(false);
  const [ukulele, setUkulele] = useState(false);

  const [fourStringsFilter, setFourStringsFilter] = useState(false);
  const [sixStringsFilter, setSixStringsFilter] = useState(false);
  const [sevenStringsFilter, setSevenStringsFilter] = useState(false);
  const [twelveStringsFilter, setTwelveStringsFilter] = useState(false);

  useEffect(() => {
    dispatch(setDataLoadedStatus(true));
    const minPriceFilter = minPrice !== '' ? `price_gte=${minPrice}` : '';
    const maxPriceFilter = maxPrice !== '' ? `price_lte=${maxPrice}` : '';
    const guitarTypeFilter = [
      acoustic ? `guitarType=${GuitarType.Acoustic}` : '',
      electro ? `guitarType=${GuitarType.Electro}` : '',
      ukulele ? `guitarType=${GuitarType.Ukulele}` : ''
    ].filter((type) => type !== '').join('&');
    const stringsCountFilter = [
      fourStringsFilter ? `stringsCount=${StringsCount.Four}` : '',
      sixStringsFilter ? `stringsCount=${StringsCount.Six}` : '',
      sevenStringsFilter ? `stringsCount=${StringsCount.Seven}` : '',
      twelveStringsFilter ? `stringsCount=${StringsCount.Twelve}` : ''
    ].filter((type) => type !== '').join('&');
    dispatch(fetchProductsAction({
      page: activePage,
      limit: PRODUCTS_LIMIT,
      sort: sortType,
      order: sortOrder,
      minPriceFilter,
      maxPriceFilter,
      guitarTypeFilter,
      stringsCountFilter
    }));
  });

  const setMinPriceDebounced = debounce((arg) => setMinPrice(arg), 1000);
  const setMaxPriceDebounced = debounce((arg) => setMaxPrice(arg), 1000);

  const handleMinPriceInputChange = () => {
    setMinPriceDebounced(minPriceRef.current ? minPriceRef.current.value : '');
  };

  const handleMaxPriceInputChange = () => {
    setMaxPriceDebounced(maxPriceRef.current ? maxPriceRef.current.value : '');
  };

  const handleAcousticInputChange = () => {
    setAcoustic((prevState) => !prevState);
  };

  const handleElectroInputChange = () => {
    setElectro((prevState) => !prevState);
  };

  const handleUkuleleInputChange = () => {
    setUkulele((prevState) => !prevState);
  };

  const handleFourStringsInputChange = () => {
    setFourStringsFilter((prevState) => !prevState);
  };

  const handleSixStringsInputChange = () => {
    setSixStringsFilter((prevState) => !prevState);
  };

  const handleSevenStringsInputChange = () => {
    setSevenStringsFilter((prevState) => !prevState);
  };

  const handleTwelveStringsInputChange = () => {
    setTwelveStringsFilter((prevState) => !prevState);
  };

  const handleResetButtonClick = () => {
    [
      !!minPrice,
      !!maxPrice,
      acoustic,
      electro,
      ukulele,
      fourStringsFilter,
      sixStringsFilter,
      sevenStringsFilter,
      twelveStringsFilter
    ].includes(true)
      && dispatch(changeActivePageAction(DEFAULT_PAGE_NUMBER));
    setMinPrice('');
    setMaxPrice('');
    setAcoustic(false);
    setElectro(false);
    setUkulele(false);
    setFourStringsFilter(false);
    setSixStringsFilter(false);
    setSevenStringsFilter(false);
    setTwelveStringsFilter(false);
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              ref={minPriceRef}
              pattern="^[1-9]{1}[0-9]{2,5}&"
              type="number" placeholder={`${minCurrentCatalogPrice.toLocaleString()} ₽`} id="priceMin" name="от"
              onChange={handleMinPriceInputChange}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              ref={maxPriceRef}
              pattern="^[1-9]{1}[0-9]{2,5}&"
              type="number" placeholder={`${maxCurrentCatalogPrice.toLocaleString()} ₽`} id="priceMax" name="до"
              onChange={handleMaxPriceInputChange}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleAcousticInputChange}
            className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
            checked={acoustic}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleElectroInputChange}
            className="visually-hidden" type="checkbox" id="electric" name="electric"
            checked={electro}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleUkuleleInputChange}
            className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"
            checked={ukulele}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleFourStringsInputChange}
            className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"
            checked={fourStringsFilter}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleSixStringsInputChange}
            className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"
            checked={sixStringsFilter}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleSevenStringsInputChange}
            className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"
            checked={sevenStringsFilter}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            onChange={handleTwelveStringsInputChange}
            className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"
            checked={twelveStringsFilter}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium" type="reset"
        onClick={handleResetButtonClick}
      >
        Очистить
      </button>
    </form>
  );
}

export default Filter;
