import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchProductsAction} from '../../store/api-actons';
import {getMaxPrice, getMinPrice} from '../../store/app-data/selectors';

function Filter() {
  const dispatch = useAppDispatch();

  const minCurrentCatalogPrice = useAppSelector(getMinPrice);
  const maxCurrentCatalogPrice = useAppSelector(getMaxPrice);

  /* const handleMinPriceInputChange = () => {
    console.log('handleMinPriceInputChange');
  };

  const handleMaxPriceInputChange = () => {
    console.log('handleMaxPriceInputChange');
  }; */

  const [acoustic, setAcoustic] = useState(false);
  const [electro, setElectro] = useState(false);
  const [ukulele, setUkulele] = useState(false);

  const handleAcousticInputChange = () => {
    setAcoustic((prevState) => !prevState);
    dispatch(fetchProductsAction({}));
  };

  const handleElectroInputChange = () => {
    setElectro((prevState) => !prevState);
  };

  const handleUkuleleInputChange = () => {
    setUkulele((prevState) => !prevState);
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
              pattern="^[1-9]{1}[0-9]{2,5}&"
              type="number" placeholder={`${minCurrentCatalogPrice.toLocaleString()} ₽`} id="priceMin" name="от"
              // onChange={handleMinPriceInputChange}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              pattern="^[1-9]{1}[0-9]{2,5}&"
              type="number" placeholder={`${maxCurrentCatalogPrice.toLocaleString()} ₽`} id="priceMax" name="до"
              // onChange={handleMaxPriceInputChange}
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
            // onChange={}
            className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"
            // checked={filter.stringsCount.four}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            // onChange={}
            className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"
            // checked={filter.stringsCount.six}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            // onChange={}
            className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"
            // checked={filter.stringsCount.seven}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            // onChange={}
            className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"
            // checked={filter.stringsCount.twelve}
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

export default Filter;
