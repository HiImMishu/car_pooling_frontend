import { Container, Divider, withStyles, Button } from "@material-ui/core";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { StarOutline, NavigateNext, AirlineSeatReclineNormal, CheckCircleOutline, List } from "@material-ui/icons";
import { useHistory, useParams } from "react-router";
import "./styles.css";
import UpdateUserProfileDialog from "./updateUserProfileDialog";
import { useState } from "react";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserProfileComponent = () => {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const { userId } = useParams()
    const history = useHistory()

    const navigateToReviews = () => {
        history.push(`/user/${userId}/reviews/`)
    }

    const openUpdateDialog = () => {
        setIsUpdateDialogOpen(true)
    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container mb-1">
        <section className="user-profile-header">
            <img className="profile-avatar" src={defaultAvatar}/>
            <h1 className="user-profile-heading user-full-heading">Marek Stawczyński</h1>
        </section>
        <section className="user-profile-secondary-info standard-padding">
            <p className="user-secondary-info-item text-secondary">Wiek: </p>
                <p className="user-secondary-info-item text-secondary">34 lat/-a</p>
            <p className="user-secondary-info-item text-secondary">Email: </p>
                <p className="user-secondary-info-item text-secondary">marek.stawczynski@gmail.com</p>
            <p className="user-secondary-info-item text-secondary">Telefon: </p>
                <p className="user-secondary-info-item text-secondary">(+48) 402-322-351</p>
            <p className="user-secondary-info-item text-secondary">Dołączono: </p>
                <p className="user-secondary-info-item text-secondary">21 stycznia 2017</p>
            <p className="user-secondary-info-item text-secondary">Pojazd: </p>
                <p className="user-secondary-info-item text-secondary">Volkswagen Passat</p>
            <p className="user-secondary-info-item text-secondary">Kolor pojazdu: </p>
                <p className="user-secondary-info-item text-secondary">Czerwony</p>
        </section>
        <section className="profile-action-container standard-padding mt-1">
            <Button onClick={openUpdateDialog} className="profile-action-button" color="primary" variant="outlined">Aktualizuj profil</Button>
        </section>
        <Divider className="mt-1 mb-1"/>
        <section className="user-profile-secondary-info standard-padding">
            <p className="user-secondary-info-item text-secondary">Opublikowanych przejazdów: </p>
                <p className="user-secondary-info-item text-secondary">34</p>
            <p className="user-secondary-info-item text-secondary">Zaoszczędzono: </p>
                <p className="user-secondary-info-item text-secondary">1643 zł</p>
        </section>
        <Divider className="mt-1 mb-1"/>
        <section className="trip-driver" onClick={navigateToReviews}>
            <div className="driver">
                <span className="user-row">
                    <h3 className="user-reviews text-secondary"><AirlineSeatReclineNormal className="seat-icon" fontSize="large"/> Zarezerwowane przejazdy</h3>
                </span>
            </div>
            <span className="navigate-user">
                <NavigateNext fontSize="large"/> 
            </span>
        </section>
        <section className="trip-driver" onClick={navigateToReviews}>
            <div className="driver">
                <span className="user-row">
                    <h3 className="user-reviews text-secondary"><List fontSize="large" className="list-icon"/> Dodane przejazdy</h3>
                </span>
            </div>
            <span className="navigate-user">
                <NavigateNext fontSize="large"/> 
            </span>
        </section>
        <section className="trip-driver" onClick={navigateToReviews}>
            <div className="driver">
                <span className="user-row">
                    <h3 className="user-reviews text-secondary"><CheckCircleOutline fontSize="large" className="tick-icon"/> Odbyte przejazdy</h3>
                </span>
            </div>
            <span className="navigate-user">
                <NavigateNext fontSize="large"/> 
            </span>
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
        <UpdateUserProfileDialog isOpen={isUpdateDialogOpen} setIsOpen={setIsUpdateDialogOpen}/>
    </StyledContainer>
}

export default UserProfileComponent