import { Container, withStyles, Divider } from '@material-ui/core';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import UserReview from '../userReview/userReview';
import './styles.css';

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserReviewsComponent = () => {

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
            <section className="user-profile-header">
                <img className="profile-avatar" src={defaultAvatar}/>
                <h1 className="user-profile-heading">Marek - 5/5</h1>
                <h4 className="user-profile-age text-secondary">Liczba ocen: 20</h4>
            </section>
            <Divider className="review-divider"/>
            <section className="review-metrics">
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Super</h3>
                    <h3 className="review-count">12</h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Dobrze</h3>
                    <h3 className="review-count">5</h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">W porządku</h3>
                    <h3 className="review-count">2</h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Słabo</h3>
                    <h3 className="review-count">1</h3>
                </div>
                <div className="review-metric text-secondary standard-padding">
                    <h3 className="review-count-label">Fatalnie</h3>
                    <h3 className="review-count">0</h3>
                </div>
            </section>
            <section>
                <UserReview/>
                <UserReview/>
                <UserReview/>
                <UserReview/>
                <UserReview/>
            </section>
        </StyledContainer>
}

export default UserReviewsComponent