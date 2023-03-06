import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, FILE_TYPES, MAX_PRICE, MIN_PRICE, PRICE_VALUE_REG_EXP} from '../../const';
import {getOrdersHumanizedDate} from '../../helpers';
import {useAppDispatch} from '../../hooks';
import {createProductAction} from '../../store/api-actions';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {GuitarType, StringsCount} from '../../types/common';

function AddItem(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [guitarType, setGuitarType] = useState<GuitarType | null>(null);
  const [stringsCount, setStringsCount] = useState<StringsCount | null>(null);

  const [titleInputUsed, setTitleInputUsed] = useState(false);
  const [priceInputUsed, setPriceInputUsed] = useState(false);
  const [skuInputUsed, setSkuInputUsed] = useState(false);
  const [descriptionInputUsed, setDescriptionInputUsed] = useState(false);

  const [imageError, setImageError] = useState('Добавьте изображение товара');
  const [titleError, setTitleError] = useState('Заполните поле');
  const [priceError, setPriceError] = useState('Заполните поле');
  const [skuError, setSkuError] = useState('Заполните поле');
  const [descriptionError, setDescriptionError] = useState('Заполните поле');
  const [guitarTypeError, setGuitarTypeError] = useState('Выберите тип товара');
  const [stringsCountError, setStringsCountError] = useState('Выберите количество струн');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (imageError || titleError || priceError || skuError || descriptionError || guitarTypeError || stringsCountError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [imageError, titleError, priceError, skuError, descriptionError, guitarTypeError, stringsCountError]);

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.name) {
      case 'title':
        setTitleInputUsed(true);
        break;
      case 'price':
        setPriceInputUsed(true);
        break;
      case 'sku':
        setSkuInputUsed(true);
        break;
    }
  };

  const handleDescriptionInputFocus = () => {
    setDescriptionInputUsed(true);
  };

  const handleFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.currentTarget.files && evt.currentTarget.files[0];
    const fileName = file ? file.name.toLowerCase() : '';
    const matches = FILE_TYPES.some((fileType) => {
      return fileName.endsWith(fileType);
    });

    if (matches && file) {
      setImage(URL.createObjectURL(file));
    }
    if (file?.size && file?.size > 500000) {
      setImageError('Максимальный размер файла 500 кбайт');
      if (!file) {
        setImageError('Добавьте изображение товара');
      }
    } else {
      setImageError('');
    }
  };

  const handleTitleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setTitle(value);
    if (value.length < 10 || value.length > 100) {
      setTitleError('Длина названия товара от 10 до 100 символов');
      if (!value) {
        setTitleError('Поле обязательно к заполнению');
      }
    } else {
      setTitleError('');
    }
  };

  const handlePriceInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const unformattedValue = value.split('').filter((item) => PRICE_VALUE_REG_EXP.test(item)).join('');
    setPrice(unformattedValue);
    if (Number(unformattedValue) < MIN_PRICE || Number(unformattedValue) > MAX_PRICE) {
      setPriceError('Цена товара должна быть в диапазоне от 100 до 1000000 рублей');
      if (!unformattedValue) {
        setPriceError('Поле обязательно к заполнению');
      }
    } else {
      setPriceError('');
    }
  };

  const handleSkuInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setSku(value);
    if (value.length < 5 || value.length > 40) {
      setSkuError('Длина артикула от 10 до 100 символов');
      if (!value) {
        setSkuError('Поле обязательно к заполнению');
      }
    } else {
      setSkuError('');
    }
  };

  const handleDescriptionInputChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
    setDescription(value);
    if (value.length < 20 || value.length > 1024) {
      setDescriptionError('Длина описания товара от 20 до 1024 символов');
      if (!value) {
        setDescriptionError('Поле обязательно к заполнению');
      }
    } else {
      setDescriptionError('');
    }
  };

  const handleGuitarTypeInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputId = evt.currentTarget.id;
    switch(inputId) {
      case 'guitar':
        setGuitarType(GuitarType.Acoustic);
        setGuitarTypeError('');
        break;
      case 'el-guitar':
        setGuitarType(GuitarType.Electro);
        setGuitarTypeError('');
        break;
      case 'ukulele':
        setGuitarType(GuitarType.Ukulele);
        setGuitarTypeError('');
        break;
    }
  };

  const handleStringsCountInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const inputId = evt.currentTarget.id;
    switch(inputId) {
      case 'string-qty-4':
        setStringsCount(StringsCount.Four);
        setStringsCountError('');
        break;
      case 'string-qty-6':
        setStringsCount(StringsCount.Six);
        setStringsCountError('');
        break;
      case 'string-qty-7':
        setStringsCount(StringsCount.Seven);
        setStringsCountError('');
        break;
      case 'string-qty-12':
        setStringsCount(StringsCount.Twelve);
        setStringsCountError('');
        break;
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (formValid) {
      const createdAt = (new Date()).toISOString();
      const productData = {
        createdAt,
        title,
        description,
        image,
        guitarType: guitarType as GuitarType,
        sku,
        stringsCount: stringsCount as StringsCount,
        price: Number(price)
      };
      dispatch(setDataLoadedStatus(true));
      dispatch(createProductAction(productData));
      navigate(AppRoute.Products);
    }
    setTitleInputUsed(true);
    setPriceInputUsed(true);
    setSkuInputUsed(true);
    setDescriptionInputUsed(true);
  };

  return (
    <main className="page-content">
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <ul className="breadcrumbs">
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Каталог</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Товары</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="link" to="/">Новый товар</Link>
            </li>
          </ul>
          <form className="add-item__form" action="#" method="get">
            <div className="add-item__form-left">
              <div className="edit-item-image add-item__form-image">
                <div className="edit-item-image__image-wrap">
                  <img src={image}/>
                </div>
                <div className="edit-item-image__btn-wrap">
                  <input
                    onChange={handleFileInputChange}
                    className="hidden" type="file" id="file" name="file" accept="image/png, image/jpeg, image/jpg" required
                  />
                  <button
                    className="button button--small button--black-border edit-item-image__btn"
                  >
                    <label htmlFor="file">Добавить</label>
                  </button>
                  <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                </div>
                <div className="custom-input is-invalid">
                  <p>{imageError}</p>
                </div>
              </div>
              <div className="input-radio add-item__form-radio">
                <span>Выберите тип товара</span>
                <input
                  onChange={handleGuitarTypeInputChange}
                  type="radio" id="guitar" name="item-type" value="guitar"
                />
                <label htmlFor="guitar">Акустическая гитара</label>
                <input
                  onChange={handleGuitarTypeInputChange}
                  type="radio" id="el-guitar" name="item-type" value="el-guitar"
                />
                <label htmlFor="el-guitar">Электрогитара</label>
                <input
                  onChange={handleGuitarTypeInputChange}
                  type="radio" id="ukulele" name="item-type" value="ukulele"
                />
                <label htmlFor="ukulele">Укулеле</label>
                <div className="custom-input is-invalid">
                  <p>{guitarTypeError}</p>
                </div>
              </div>
              <div className="input-radio add-item__form-radio">
                <span>Количество струн</span>
                <input
                  onChange={handleStringsCountInputChange}
                  type="radio" id="string-qty-4" name="string-qty" value="4"
                />
                <label htmlFor="string-qty-4">4</label>
                <input
                  onChange={handleStringsCountInputChange}
                  type="radio" id="string-qty-6" name="string-qty" value="6"
                />
                <label htmlFor="string-qty-6">6</label>
                <input
                  onChange={handleStringsCountInputChange}
                  type="radio" id="string-qty-7" name="string-qty" value="7"
                />
                <label htmlFor="string-qty-7">7</label>
                <input
                  onChange={handleStringsCountInputChange}
                  type="radio" id="string-qty-12" name="string-qty" value="12"
                />
                <label htmlFor="string-qty-12">12</label>
                <div className="custom-input is-invalid">
                  <p>{stringsCountError}</p>
                </div>
              </div>
            </div>
            <div className="add-item__form-right">
              <div className="custom-input add-item__form-input">
                <label>
                  <span>Дата добавления товара</span>
                  <input
                    value={getOrdersHumanizedDate((new Date()).toISOString())}
                    type="text" name="date"
                    placeholder="Дата в формате 00.00.0000"
                    readOnly
                  />
                </label>
                <p>Заполните поле</p>
              </div>
              <div className={`custom-input add-item__form-input ${titleInputUsed && 'is-invalid'}`}>
                <label>
                  <span>Введите наименование товара</span>
                  <input
                    onFocus={handleInputFocus}
                    onChange={handleTitleInputChange} type="text" name="title" value={title} placeholder="Наименование"
                  />
                </label>
                <p>{titleInputUsed && titleError}</p>
              </div>
              <div className={`custom-input add-item__form-input add-item__form-input--price is-placeholder ${priceInputUsed && 'is-invalid'}`}>
                <label>
                  <span>Введите цену товара</span>
                  <input
                    onFocus={handleInputFocus}
                    onChange={handlePriceInputChange}
                    type="text"
                    name="price"
                    value={Number(price) === 0 ? '' : Number(price).toLocaleString()}
                    placeholder="Цена в формате 00 000"
                  />
                </label>
                <p>{priceInputUsed && priceError}</p>
              </div>
              <div className={`custom-input add-item__form-input ${skuInputUsed && 'is-invalid'}`}>
                <label>
                  <span>Введите артикул товара</span>
                  <input
                    onFocus={handleInputFocus}
                    onChange={handleSkuInputChange} type="text" name="sku" value={sku} placeholder="Артикул товара"
                  />
                </label>
                <p>{skuInputUsed && skuError}</p>
              </div>
              <div className={`custom-textarea add-item__form-textarea ${descriptionInputUsed && 'is-invalid'}`}>
                <label>
                  <span>Введите описание товара</span>
                  <textarea
                    onFocus={handleDescriptionInputFocus}
                    onChange={handleDescriptionInputChange}
                    value={description}
                    name="description" placeholder="">
                  </textarea>
                </label>
                <p>{descriptionInputUsed && descriptionError}</p>
              </div>
            </div>
            <div className="add-item__form-buttons-wrap">
              <button
                onClick={handleSubmitButtonClick}
                className="button button--small add-item__form-button" type="submit"
              >
                Сохранить изменения
              </button>
              <button className="button button--small add-item__form-button" type="button">Вернуться к списку товаров</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddItem;
