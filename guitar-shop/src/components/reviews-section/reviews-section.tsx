import {Link} from 'react-router-dom';
import {getReviews} from '../../mocks/reviews';
import Review from '../review/review';

function ReviewsSection(): JSX.Element {
  const reviews = getReviews();
  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <Link className="button button--red-border button--big reviews__sumbit-button" to="#">Оставить отзыв</Link>
      {
        reviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))
      }
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
      <Link className="button button--up button--red-border button--big reviews__up-button" to="#header">Наверх</Link>
    </section>
  );
}

export default ReviewsSection;
