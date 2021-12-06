import { Container, Divider, withStyles, Button } from "@material-ui/core";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { StarOutline, NavigateNext, AirlineSeatReclineNormal, CheckCircleOutline, List } from "@material-ui/icons";
import { useHistory, useParams } from "react-router";
import "./styles.css";
import UpdateUserProfileDialog from "./updateUserProfileDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import { activeUserSelector } from "../../application/selectors/userSelector";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserProfileComponent = () => {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
    const { userId } = useParams()
    const history = useHistory()
    const activeUser = useSelector(activeUserSelector)
    const userAge = parseInt((new Date() - new Date(activeUser.birthday)) / (1000*60*60*24*365))
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const add = (accumulator, a) => {
        return accumulator + a;
    }

    const savedMoney = activeUser?.ownedTrips?.map(trip => {
        return trip.enrolledPassengers.length * trip.costPerSeat
    }).reduce(add, 0)

    const navigateToReviews = () => {
        history.push(`/user/${userId}/reviews/`)
    }

    const navigateToMyTrips = () => {
        history.push(`/my-trips`)
    }

    const openUpdateDialog = () => {
        setIsUpdateDialogOpen(true)
    }

    const formatPhoneNumber = (phoneNumber) => {
        let phoneNumberArray = phoneNumber.toString().split("")
        return phoneNumberArray.map((number, index) => {
            if (index !== 0 && index < phoneNumberArray.length-1 && (index+1) % 3 === 0) {
                return number + "-"
            } 
            return number
        }).join("")
    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container mb-1">
        <section className="user-profile-header">
            <img className="profile-avatar" src={defaultAvatar} alt="User avatar"/>
            <h1 className="user-profile-heading user-full-heading">{activeUser.firstName} {activeUser.lastName}</h1>
        </section>
        <section className="user-profile-secondary-info standard-padding">
            <p className="user-secondary-info-item text-secondary">Wiek: </p>
                <p className="user-secondary-info-item text-secondary">{userAge} lat/-a</p>
            <p className="user-secondary-info-item text-secondary">Email: </p>
                <p className="user-secondary-info-item text-secondary">{activeUser.email}</p>
            <p className="user-secondary-info-item text-secondary">Telefon: </p>
                <p className="user-secondary-info-item text-secondary">(+48) {formatPhoneNumber(activeUser.phoneNumber)}</p>
            <p className="user-secondary-info-item text-secondary">Dołączono: </p>
                <p className="user-secondary-info-item text-secondary">{new Date(activeUser.registeredDate).toLocaleString("pl-PL", options)}</p>
            <p className="user-secondary-info-item text-secondary">Pojazd: </p>
                <p className="user-secondary-info-item text-secondary">{activeUser.car}</p>
            <p className="user-secondary-info-item text-secondary">Kolor pojazdu: </p>
                <p className="user-secondary-info-item text-secondary">{activeUser.carColor}</p>
        </section>
        <section className="profile-action-container standard-padding mt-1">
            <Button onClick={openUpdateDialog} className="profile-action-button" color="primary" variant="outlined">Aktualizuj profil</Button>
        </section>
        <Divider className="mt-1 mb-1"/>
        <section className="user-profile-secondary-info standard-padding">
            <p className="user-secondary-info-item text-secondary">Opublikowanych przejazdów: </p>
                <p className="user-secondary-info-item text-secondary">{activeUser?.ownedTrips?.length}</p>
            <p className="user-secondary-info-item text-secondary">Zaoszczędzono: </p>
                <p className="user-secondary-info-item text-secondary">{savedMoney} zł</p>
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
        <section className="trip-driver" onClick={navigateToMyTrips}>
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