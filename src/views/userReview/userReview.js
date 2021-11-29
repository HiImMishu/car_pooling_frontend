import { Divider } from "@material-ui/core";
import { StarOutline, NavigateNext } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import './styles.css';

const UserReview = ({userId}) => {
    const history = useHistory()

    const navigateToUser = () => {
        history.push(`/user/${userId}`)
    }

    return <div className="review">
        <section className="trip-driver" onClick={navigateToUser}>
            <div className="driver">
                <span className="user-row">
                    <h4 className="driver-name">Edyta</h4>
                </span>
            </div>
            <span className="navigate-user">
                <img className="avatar reviewer-avatar" src={defaultAvatar}/>
                <NavigateNext fontSize="large"/> 
            </span>
        </section>
        <section className="review-content standard-padding">
            <h4 className="review-title">Super</h4>
            <p className="text-secondary">Polecam pasażera:) Podróż przyjemna, wszystko bezproblemowo:)</p>
            <p className="review-date text-secondary">sierpień 2019</p>
        </section>
        <Divider className="review-divider"/>
    </div>
}

export default UserReview