import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchReviewsAction} from '../../store/api-actons';
import {getCurrentQueryReviewsCount, getReviews} from '../../store/app-data/selectors';
import {useApppSelector} from '../app/app';
import Review from '../review/review';

type ProductPageState = {
  isReviewFormModalOpened?: boolean;
};

type ReviewsSectionProps = {
  setProductPageState: (state: ProductPageState) => void;
};

function ReviewsSection({setProductPageState}: ReviewsSectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const currentQueryReviewsCount = useAppSelector(getCurrentQueryReviewsCount);

  const productId = Number(useParams().id);

  const authorizationStatus = useApppSelector();
  const isUserAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const [currentReviewsPage, setCurrentReviewsPage] = useState(1);

  useEffect(() => {
    dispatch(fetchReviewsAction({productId, page: currentReviewsPage}));
  }, [currentReviewsPage, dispatch, productId]);

  const handleMoreReviewsButton = () => {
    setCurrentReviewsPage((prevState) => prevState + 1);
  };

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
      {
        currentQueryReviewsCount >= 3
          && (
            <button
              onClick={handleMoreReviewsButton}
              className="button button--medium reviews__more-button"
            >
              Показать еще отзывы
            </button>
          )
      }
      <Link
        onClick={() => window.scrollTo(0, 0)}
        className="button button--up button--red-border button--big reviews__up-button" to="#header"
      >
        Наверх
      </Link>
    </section>
  );
}

export default ReviewsSection;
