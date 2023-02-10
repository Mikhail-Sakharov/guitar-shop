import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {getReviews} from '../../store/app-data/selectors';
import {useApppSelector} from '../app/app';
import Review from '../review/review';

type ProductPageState = {
  isReviewFormModalOpened?: boolean;
};

type ReviewsSectionProps = {
  setProductPageState: (state: ProductPageState) => void;
};

function ReviewsSection({setProductPageState}: ReviewsSectionProps): JSX.Element {
  const reviews = useAppSelector(getReviews);

  const authorizationStatus = useApppSelector();
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      {
        isUserAuthorized
          &&
        <Link
          onClick={() => setProductPageState({isReviewFormModalOpened: true})}
          className="button button--red-border button--big reviews__sumbit-button" to="#"
        >
          Оставить отзыв
        </Link>
      }
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
