import { Divider } from "@material-ui/core";
import { StarOutline, NavigateNext } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import './styles.css';

const UserReview = ({rating}) => {
    const history = useHistory()
    const options = { month: 'long', year: 'numeric' }

    const navigateToUser = () => {
        history.push(`/user/${rating?.passenger?.id}`)
    }

    const mapRatingLevelToString = (ratingLevel) => {
        switch (ratingLevel) {
            case 1: return "Fatalnie"
            case 2: return "Słabo"
            case 3: return "W porządku"
            case 4: return "Dobrze"
            case 5: return "Super"
            default: return ""
        }
    }

    return <div className="review">
        <section className="trip-driver" onClick={navigateToUser}>
            <div className="driver">
                <span className="user-row">
                    <h4 className="driver-name">{rating?.passenger?.firstName}</h4>
                </span>
            </div>
            <span className="navigate-user">
                <img className="avatar reviewer-avatar" src={defaultAvatar} alt="User avatar"/>
                <NavigateNext fontSize="large"/> 
            </span>
        </section>
        <section className="review-content standard-padding">
            <h4 className="review-title">
                {mapRatingLevelToString(rating.ratingLevel)}
                &nbsp;
                {[...Array(rating?.ratingLevel)].map((e, i) => <StarOutline key={i} className="score-star"/>)}
                </h4>
            <p className="text-secondary">{rating.description}</p>
            <p className="review-date text-secondary">{new Date(rating?.ratingDate).toLocaleString("pl-PL", options)}</p>
        </section>
        <Divider className="review-divider"/>
    </div>
}

export default UserReview