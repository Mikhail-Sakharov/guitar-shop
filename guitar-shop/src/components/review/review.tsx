import {MAX_RATING_STARS_COUNT, ratings} from '../../const';
import {humanizeDate} from '../../helpers';
import {ReviewDto} from '../../types/review.dto';

type ReviewProps = {
  review: ReviewDto;
};

function Review({review}: ReviewProps): JSX.Element {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{`${review.user.lastName} ${review.user.firstName}`}</h4>
        <span className="review__date">{humanizeDate(review.createdAt)}</span>
      </div>
      <div className="rate review__rating-panel">
        {
          Array.from({length: MAX_RATING_STARS_COUNT}, (_item, index) => index + 1).map((starPosition) => (
            <svg key={starPosition} width="16" height="16" aria-hidden="true">
              <use xlinkHref={starPosition <= review.rating ? '#icon-full-star' : '#icon-star'}></use>
            </svg>
          ))
        }
        <p className="visually-hidden">Оценка: {ratings[review.rating]}</p>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{review.advantages}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantages}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{review.text}</p>
    </div>
  );
}

export default Review;
