import {FormEvent, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../hooks';
import {postCommentAction} from '../../../store/api-actons';
import {ProductDto} from '../../../types/product.dto';

type ProductPageState = {
  isReviewFormModalOpened?: boolean;
  isSendReviewModalOpened?: boolean;
};

type ReviewFormModalProps = {
  product: ProductDto | null;
  setProductPageState: (state: ProductPageState) => void;
};

function ReviewFormModal({product, setProductPageState}: ReviewFormModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comment, setComment] = useState('');

  const [advantagesInputUsed, setAdvantagesInputUsed] = useState(false);
  const [disadvantagesInputUsed, setDisadvantagesInputUsed] = useState(false);
  const [commentInputUsed, setCommentInputUsed] = useState(false);

  const [ratingError, setRatingError] = useState('Поставьте оценку');
  const [advantagesError, setAdvantagesError] = useState('Поле обязательно к заполнению');
  const [disadvantagesError, setDisadvantagesError] = useState('Поле обязательно к заполнению');
  const [commentError, setCommentError] = useState('Поле обязательно к заполнению');

  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (advantagesError || disadvantagesError || commentError || ratingError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [advantagesError, commentError, disadvantagesError, ratingError]);

  const handleInputFocus = (evt: FormEvent<HTMLInputElement>) => {
    switch(evt.currentTarget.id) {
      case 'advantage':
        setAdvantagesInputUsed(true);
        break;
      case 'disadv':
        setDisadvantagesInputUsed(true);
        break;
    }
  };

  const handleCommentInputFocus = () => {
    setCommentInputUsed(true);
  };

  const handleAdvsInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setAdvantages(value);
    if (value.length < 50 || value.length > 100) {
      setAdvantagesError('Длина текста от 50 до 100 символов');
      if (!value) {
        setAdvantagesError('Поле обязательно к заполнению');
      }
    } else {
      setAdvantagesError('');
    }
  };

  const handleDisadvsInputChange = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setDisadvantages(value);
    if (value.length < 50 || value.length > 100) {
      setDisadvantagesError('Длина текста от 50 до 100 символов');
      if (!value) {
        setDisadvantagesError('Поле обязательно к заполнению');
      }
    } else {
      setDisadvantagesError('');
    }
  };

  const handleCommentInputChange = (evt: FormEvent<HTMLTextAreaElement>) => {
    const value = evt.currentTarget.value;
    setComment(value);
    if (value.length < 5 || value.length > 1024) {
      setCommentError('Длина комментария от 5 до 1024 символов');
      if (!value) {
        setCommentError('Поле обязательно к заполнению');
      }
    } else {
      setCommentError('');
    }
  };

  const handleSubmitButtonClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (formValid && product) {
      setProductPageState({
        isReviewFormModalOpened: false,
        isSendReviewModalOpened: true
      });
      dispatch(postCommentAction({
        productId: product.id,
        advantages,
        disadvantages,
        text: comment,
        rating
      }));
    }
    setAdvantagesInputUsed(true);
    setDisadvantagesInputUsed(true);
    setCommentInputUsed(true);
  };

  const handleCloseButtonClick = () => {
    setProductPageState({
      isReviewFormModalOpened: false
    });
  };

  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px'}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <form className="form-review">
              <div className="form-review__wrapper">
                <h3 className="form-review__title">{product?.title}</h3>
                <div>
                  <span className="form-review__label form-review__label--required form-review__label--star">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input onClick={() => {setRating(5); setRatingError('');}} className="visually-hidden" id="star-5" name="rate" type="radio" value="5"/>
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input onClick={() => {setRating(4); setRatingError('');}} className="visually-hidden" id="star-4" name="rate" type="radio" value="4"/>
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input onClick={() => {setRating(3); setRatingError('');}} className="visually-hidden" id="star-3" name="rate" type="radio" value="3"/>
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input onClick={() => {setRating(2); setRatingError('');}} className="visually-hidden" id="star-2" name="rate" type="radio" value="2"/>
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input onClick={() => {setRating(1); setRatingError('');}} className="visually-hidden" id="star-1" name="rate" type="radio" value="1"/>
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    <p className="rate__message">{ratingError}</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="advantage">Достоинства</label>
              <input
                onChange={handleAdvsInputChange}
                value={advantages}
                onFocus={handleInputFocus}
                className="form-review__input" id="advantage" type="text" autoComplete="off"
              />
              <p className="form-review__warning">{advantagesInputUsed && advantagesError}</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input
                onChange={handleDisadvsInputChange}
                value={disadvantages}
                onFocus={handleInputFocus}
                className="form-review__input" id="disadv" type="text" autoComplete="off"
              />
              <p className="form-review__warning">{disadvantagesInputUsed && disadvantagesError}</p>
              <label className="form-review__label form-review__label--required form-review__label--textarea" htmlFor="comment">Комментарий</label>
              <textarea
                onChange={handleCommentInputChange}
                value={comment}
                onFocus={handleCommentInputFocus}
                className="form-review__input form-review__input--textarea" id="comment" autoComplete="off"
              >
              </textarea>
              <p className="form-review__warning">{commentInputUsed && commentError}</p>
              <button
                onClick={handleSubmitButtonClick}
                className="button button--medium-20 form-review__button" type="submit"
              >
                Отправить отзыв
              </button>
            </form>
            <button
              onClick={handleCloseButtonClick}
              className="modal__close-btn button-cross" type="button" aria-label="Закрыть"
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewFormModal;
