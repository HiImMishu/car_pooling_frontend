import { Container, withStyles, Divider } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchUserById } from '../../application/actions/userAction';
import { fetchedUserSelector } from '../../application/selectors/userSelector';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import UserReview from '../userReview/userReview';
import './styles.css';

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserReviewsComponent = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const fetchedUser = useSelector(fetchedUserSelector)
    const ratingsLength = fetchedUser?.ratings?.length > 0 ? fetchedUser?.ratings?.length : 1
    const rating = fetchedUser?.ratings?.map(rating => rating.ratingLevel).reduce((prev, curr) => prev + curr, 0) / ratingsLength

    useEffect(() => {
        dispatch(fetchUserById(userId))
    }, [dispatch, userId])

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
            <section className="user-profile-header">
                <img className="profile-avatar" src={defaultAvatar} alt="User avatar"/>
                <h1 className="user-profile-heading">
                    {fetchedUser?.firstName} -                             
                    {fetchedUser?.ratings?.length === 0 ? ' Brak ocen' : ' ' + rating?.toFixed(1) + ' / 5.0'}
                </h1>
                <h4 className="user-profile-age text-secondary">Liczba ocen: {ratingsLength}</h4>
            </section>
            <Divider className="review-divider"/>
            <section className="review-metrics">
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Super</h3>
                    <h3 className="review-count">
                        {fetchedUser?.ratings?.filter(rating => rating.ratingLevel === 5)?.length}
                    </h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Dobrze</h3>
                    <h3 className="review-count">
                        {fetchedUser?.ratings?.filter(rating => rating.ratingLevel === 4)?.length}
                    </h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">W porządku</h3>
                    <h3 className="review-count">
                        {fetchedUser?.ratings?.filter(rating => rating.ratingLevel === 3)?.length}
                    </h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Słabo</h3>
                    <h3 className="review-count">
                        {fetchedUser?.ratings?.filter(rating => rating.ratingLevel === 2)?.length}
                    </h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Fatalnie</h3>
                    <h3 className="review-count">
                        {fetchedUser?.ratings?.filter(rating => rating.ratingLevel === 1)?.length}
                    </h3>
                </div>
            </section>
            <section>
                {fetchedUser?.ratings?.map(rating => {
                    return <UserReview key={rating.id} rating={rating}/>
                })}
            </section>
        </StyledContainer>
}

export default UserReviewsComponent