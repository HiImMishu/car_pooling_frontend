import { Container, withStyles, Divider } from '@material-ui/core';
import { StarOutline, NavigateNext } from '@material-ui/icons';
import { useParams } from "react-router";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { useHistory } from 'react-router-dom';
import './styles.css';

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserInformationComponent = () => {
    const { userId } = useParams()
    const history = useHistory()

    const navigateToReviews = () => {
        history.push(`/user/${userId}/reviews/`)
    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
            <section className="user-profile-header">
                <img className="profile-avatar" src={defaultAvatar}/>
                <h1 className="user-profile-heading">Marek</h1>
                <h4 className="user-profile-age text-secondary">34 lat/-a</h4>
            </section>
            <section className="trip-driver" onClick={navigateToReviews}>
                <div className="driver">
                    <span className="user-row">
                        <h3 className="user-reviews text-secondary"><StarOutline className="score-star" fontSize="large"/> 5/5 Liczba ocen - 20</h3>
                    </span>
                </div>
                <span className="navigate-user">
                    <NavigateNext fontSize="large"/> 
                </span>
            </section>
            <Divider className="profile-divider trip-divider"/>
            <section className="add-info-section trip-padding price-text">
                <span className="add-info-item">
                    <img className="additional-information" src={defaultAvatar}/>
                    <h4>Proszę, bez palenia w samochodzie</h4>
                </span>
                <span className="add-info-item">
                    <img className="additional-information" src={defaultAvatar}/>
                    <h4>Nie przepadam za zwierzętami</h4>
                </span>
                <span className="add-info-item">
                    <img className="additional-information" src={defaultAvatar}/>
                    <h4>Maks. dwie osoby na tylnym siedzeniu</h4>
                </span>
                <span className="add-info-item">
                    <img className="additional-information" src={defaultAvatar}/>
                    <h4>Potwierdzam automatycznie</h4>
                </span>
            </section>
            <Divider className="profile-divider trip-divider"/>
            <section className="add-info-section trip-padding price-text">
                <h4 className="profile-statistics">Opublikowanych przejazdów: 32</h4> 
                <h4 className="profile-statistics">Dołączył/-a maj 2016</h4> 
            </section>
        </StyledContainer>
}

export default UserInformationComponent