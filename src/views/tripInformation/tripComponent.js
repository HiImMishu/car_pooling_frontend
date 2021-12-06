import { Container, withStyles, Step, StepLabel, Divider, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { StarOutline, NavigateNext, DriveEta, ForumOutlined } from '@material-ui/icons';
import { useParams } from "react-router";
import { StyledStepper, QontoConnector, FinishTripIcon, StartTripIcon } from "../tripCard/tripCard";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { useHistory } from 'react-router-dom';
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeUserSelector, tokenSelector } from "../../application/selectors/userSelector";
import { actualTripSelector } from "../../application/selectors/tripSelector";
import { fetchTripById } from "../../application/actions/tripActions";
import approveImg from '../../assets/images/approve.png';
import freeSeat from '../../assets/images/free-seat.png';
import noAnimals from '../../assets/images/no-animals.png';
import noSmoking from '../../assets/images/no-smoking.png';
import chat from '../../assets/images/chat.png';
import music from '../../assets/images/musical-notes.png';

const tripAddInfo = [
    {
        id: 0,
        avatar: freeSeat,
        alt: "Wolne miejsce na tylnej kanapie",
        description: "Maks. dwie osoby na tylnym siedzeniu"
    },
    {
        id: 1,
        avatar: noSmoking,
        alt: "Nie palić",
        description: "Proszę, bez palenia w samochodzie"
    },
    {
        id: 2,
        avatar: noAnimals,
        alt: "Zakaz zwierząt",
        description: "Proszę, żadnych zwierząt w aucie"
    },
    {
        id: 3,
        avatar: chat,
        alt: "Rozmowa",
        description: "Chętnie rozmawiam"
    },
    {
        id: 4,
        avatar: music,
        alt: "Muzyka",
        description: "Muzyka? Nie ma problemu!"
    },
    {
        id: 5,
        avatar: approveImg,
        alt: "Potwierdzam automatycznie",
        description: "Potwierdzam automatycznie"
    }
]

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const TripComponent = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const activeUser = useSelector(activeUserSelector)
    const trip = useSelector(actualTripSelector)
    const isOwner = activeUser?.id === trip?.owner?.id
    const token = useSelector(tokenSelector)
    const options = { weekday: 'long', day: 'numeric', month: 'long' }

    useEffect(() => {
        if (token) {
            dispatch(fetchTripById(token, id))
        }
    }, [token, dispatch, id])

    const handleUpdate = () => {
        history.push("/update-trip/"+id)
    } 

    const handleDelete = () => {
        //Delete logix here
        handleDeleteAlertClose()
    }

    const handleDeleteAlertClose = () => {
        setIsOpen(false)
    }

    const navigateToUser = (userId) => {
        history.push("/user/"+userId)
    }

    const navigateToReservation = () => {
        history.push(`/search/${id}/reservation`)
    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
        <h1 className="trip-header-date">{new Date(trip?.tripDate).toLocaleString("pl-PL", options)}</h1>
        <section className="header-section">
            <StyledStepper className="stepper" orientation="vertical" connector={<QontoConnector/>}>
                <Step key={1} completed={true}>
                    <StepLabel StepIconComponent={StartTripIcon}>
                        <h3 className="stepper-time">{trip?.startingPlace}</h3>
                    </StepLabel>
                </Step>
                {trip?.additionalStops?.length > 0 && <Step key={2} completed={true}>
                    <StepLabel StepIconComponent={StartTripIcon}>
                        <h3 className="stepper-time">{trip?.additionalStops.join(', ')} <span className="text-secondary">(stacje pośrednie)</span></h3>
                    </StepLabel>
                </Step>}
                <Step key={3} completed={true}>
                    <StepLabel StepIconComponent={FinishTripIcon}>
                        <h3 className="stepper-time">{trip?.endingPlace}</h3>
                    </StepLabel>
                </Step>
            </StyledStepper>
            {(isOwner && new Date(trip?.tripDate) > new Date()) &&
            <div className="standard-padding top-padding action-button-container">
                <Button  variant="contained" color="primary" size="medium" onClick={handleUpdate}>Edytuj</Button>
                <Button  variant="outlined" color="primary" size="medium" onClick={() => setIsOpen(true)}>Usuń</Button>
            </div>}
        </section>
        <Divider className="trip-divider mb-1"/>
        <section className="price-section">
            <h3 className="price-text">Cena za jednego pasażera</h3>
            <h3 className="price-text">{trip?.costPerSeat} zł</h3>
        </section>
        <section className="price-section">
            <h3 className="add-info-text">Liczba miejsc</h3>
            <h3 className="add-info-text">{trip?.allSeats}</h3>
        </section>
        <section className="price-section">
            <h3 className="add-info-text">Liczba pasażerów</h3>
            <h3 className="add-info-text">{trip?.enrolledPassengers?.length}</h3>
        </section>
        <Divider className="trip-divider mt-1"/>
        <section className="trip-driver" onClick={e => navigateToUser(trip?.owner?.id)}>
            <div className="driver">
                <span className="user-row">
                    <h4 className="driver-name">{trip?.owner?.firstName}</h4>
                    <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20 //ToDo</p>
                </span>
            </div>
            <span className="navigate-user">
                <img className="avatar" src={defaultAvatar} alt="Driver avatar"/>
                <NavigateNext fontSize="large"/> 
            </span>
        </section>
        <section className="price-text standard-padding">
            {trip?.description}
        </section>
        {!isOwner &&
        <section className="driver-contact">
            <ForumOutlined className="chat-icon"/> 
            <p>Skontaktuj się z kierowcą</p>
        </section>}
        <Divider className="mb-1 mt-1"/>
        <section className="add-info-section standard-padding price-text">
            {trip?.emptyThirdSeat && <span className="add-info-item">
                <img className="additional-information" src={tripAddInfo[0].avatar} alt={tripAddInfo[0].alt}/>
                <h4>{tripAddInfo[0].description}</h4>
            </span>}
            {trip?.noSmoking && <span className="add-info-item">
                <img className="additional-information" src={tripAddInfo[1].avatar} alt={tripAddInfo[1].alt}/>
                <h4>{tripAddInfo[1].description}</h4>
            </span>}
            {trip?.noAnimals && <span className="add-info-item">
                <img className="additional-information" src={tripAddInfo[2].avatar} alt={tripAddInfo[2].alt}/>
                <h4>{tripAddInfo[2].description}</h4>
            </span>}
            {trip?.talkative && <span className="add-info-item">
                <img className="additional-information" src={tripAddInfo[3].avatar} alt={tripAddInfo[3].alt}/>
                <h4>{tripAddInfo[3].description}</h4>
            </span>}
            {trip?.music && <span className="add-info-item">
                <img className="additional-information" src={tripAddInfo[4].avatar} alt={tripAddInfo[4].alt}/>
                <h4>{tripAddInfo[4].description}</h4>
            </span>}
            {trip?.autoAccept && <span className="add-info-item">
                <img className="additional-information" src={tripAddInfo[5].avatar} alt={tripAddInfo[5].alt}/>
                <h4>{tripAddInfo[5].description}</h4>
            </span>}
        </section>
        <section className="car-section standard-padding mt-1">
            <span className="car-info">
                <h2 className="car-brand">{trip?.owner?.car}</h2>
                <p className="price-text">{trip?.owner?.carColor}</p>
            </span>
            <DriveEta className="car-icon price-text"/>
        </section>
        <Divider className="trip-divider mb-1"/>
        <section className="passangers-section">
            <h2 className="passanger-heading standard-padding">Pasażerowie</h2>
            {trip?.enrolledPassengers?.map(passenger => {
                return <div key={passenger.id} className="passanger" onClick={e => navigateToUser(passenger?.id)}>
                    <div className="driver">
                        <span className="user-row">
                            <h4 className="driver-name">{passenger.firstName}</h4>
                            <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20 //ToDo</p>
                        </span>
                    </div>
                    <span className="navigate-user">
                        <img className="avatar" src={defaultAvatar} alt="User avatar"/>
                        <NavigateNext fontSize="large"/> 
                    </span>
                </div>
            })}
        </section>
        {isOwner && 
        <section className="passangers-section">
            <h2 className="passanger-heading standard-padding">Prośby o zaakceptowanie</h2>
            {trip?.awaitingAcceptation?.map(passenger => {
                return <div key={passenger.id} div className="passanger-row" onClick={e => navigateToUser(passenger?.id)}>
                    <div className="passanger">
                        <div className="driver">
                            <span className="user-row">
                                <h4 className="driver-name">{passenger.firstName}</h4>
                                <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20 //ToDo</p>
                            </span>
                        </div>
                        <span className="navigate-user">
                            <img className="avatar" src={defaultAvatar} alt="User avatar"/>
                            <NavigateNext fontSize="large"/> 
                        </span>
                    </div>
                    <div className="button-container-row">
                        <Button color="primary" variant="contained">Akceptuj</Button>
                        <Button color="primary" variant="outlined">Odrzuć</Button>
                    </div>
                </div>
            })}
        </section>}
        {!isOwner &&
        <section className="button-container">
            <Button className="default-button" variant="contained" color="primary" size="medium" onClick={navigateToReservation} endIcon={<NavigateNext/>}>Kontunuuj</Button>
        </section>}
        <Dialog open={isOpen} onClose={handleDeleteAlertClose}>
            <DialogTitle>Czy na pewno chcesz usunąć ten przejazd?</DialogTitle>
            <DialogContent>
                <DialogContentText>Pasażerowie zapisani na ten przejazd zostaną poinformowani o jego usunięciu.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleDelete}>Zatwierdź</Button>
                <Button color="primary" onClick={handleDeleteAlertClose}>Anuluj</Button>
            </DialogActions>
        </Dialog>
    </StyledContainer>
}

export default TripComponent