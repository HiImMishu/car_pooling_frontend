import { Container, withStyles, Step, StepLabel, Divider, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { StarOutline, NavigateNext, DriveEta, ForumOutlined } from '@material-ui/icons';
import { useParams } from "react-router";
import { StyledStepper, QontoConnector, FinishTripIcon, StartTripIcon } from "../tripCard/tripCard";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import { useHistory } from 'react-router-dom';
import "./styles.css";
import { useState } from "react";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const TripComponent = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()
    const history = useHistory()
    const isOwner = true

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
        <h1 className="trip-header-date">Czwartek, 23 Września</h1>
        <section className="header-section">
            <StyledStepper className="stepper" orientation="vertical" connector={<QontoConnector/>}>
                <Step key={1} completed={true}>
                    <StepLabel StepIconComponent={StartTripIcon}>
                        <h3 className="stepper-time">Warszawa Centralna</h3>
                    </StepLabel>
                </Step>
                <Step key={2} completed={true}>
                    <StepLabel StepIconComponent={FinishTripIcon}>
                        <h3 className="stepper-time">Gdańsk Zachód</h3>
                    </StepLabel>
                </Step>
            </StyledStepper>
            {isOwner &&
            <div className="standard-padding top-padding action-button-container">
                <Button  variant="contained" color="primary" size="medium" onClick={handleUpdate}>Edytuj</Button>
                <Button  variant="outlined" color="primary" size="medium" onClick={() => setIsOpen(true)}>Usuń</Button>
            </div>}
        </section>
        <Divider className="trip-divider mb-1"/>
        <section className="price-section">
            <h3 className="price-text">Cena za jednego pasażera</h3>
            <h3 className="price-text">56 zł</h3>
        </section>
        <section className="price-section">
            <h3 className="add-info-text">Liczba miejsc</h3>
            <h3 className="add-info-text">4</h3>
        </section>
        <section className="price-section">
            <h3 className="add-info-text">Liczba pasażerów</h3>
            <h3 className="add-info-text">3</h3>
        </section>
        <Divider className="trip-divider mt-1"/>
        <section className="trip-driver" onClick={e => navigateToUser(2)}>
            <div className="driver">
                <span className="user-row">
                    <h4 className="driver-name">Marek</h4>
                    <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20</p>
                </span>
            </div>
            <span className="navigate-user">
                <img className="avatar" src={defaultAvatar}/>
                <NavigateNext fontSize="large"/> 
            </span>
        </section>
        <section className="price-text standard-padding">
            Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. 
            Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki.
        </section>
        {!isOwner &&
        <section className="driver-contact">
            <ForumOutlined className="chat-icon"/> 
            <p>Skontaktuj się z kierowcą</p>
        </section>}
        <Divider className="mb-1 mt-1"/>
        <section className="add-info-section standard-padding price-text">
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
        <section className="car-section standard-padding mt-1">
            <span className="car-info">
                <h2 className="car-brand">Volkswagen Passat</h2>
                <p className="price-text">Kolor czerwony</p>
            </span>
            <DriveEta className="car-icon price-text"/>
        </section>
        <Divider className="trip-divider mb-1"/>
        <section className="passangers-section">
            <h2 className="passanger-heading standard-padding">Pasażerowie</h2>
            <div className="passanger">
                <div className="driver">
                    <span className="user-row">
                        <h4 className="driver-name">Marek</h4>
                        <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20</p>
                    </span>
                </div>
                <span className="navigate-user">
                    <img className="avatar" src={defaultAvatar}/>
                    <NavigateNext fontSize="large"/> 
                </span>
            </div>
            <div className="passanger">
                <div className="driver">
                    <span className="user-row">
                        <h4 className="driver-name">Marek</h4>
                        <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20</p>
                    </span>
                </div>
                <span className="navigate-user">
                    <img className="avatar" src={defaultAvatar}/>
                    <NavigateNext fontSize="large"/> 
                </span>
            </div>
        </section>
        {isOwner && 
        <section className="passangers-section">
            <h2 className="passanger-heading standard-padding">Prośby o zaakceptowanie</h2>
            <div className="passanger-row">
                <div className="passanger">
                    <div className="driver">
                        <span className="user-row">
                            <h4 className="driver-name">Marek</h4>
                            <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20</p>
                        </span>
                    </div>
                    <span className="navigate-user">
                        <img className="avatar" src={defaultAvatar}/>
                        <NavigateNext fontSize="large"/> 
                    </span>
                </div>
                <div className="button-container-row">
                    <Button color="primary" variant="contained">Akceptuj</Button>
                    <Button color="primary" variant="outlined">Odrzuć</Button>
                </div>
            </div>
            <div className="passanger-row">
                <div className="passanger">
                    <div className="driver">
                        <span className="user-row">
                            <h4 className="driver-name">Marek</h4>
                            <p className="driver-score price-text"><StarOutline className="score-star"/> 5/5 Liczba ocen - 20</p>
                        </span>
                    </div>
                    <span className="navigate-user">
                        <img className="avatar" src={defaultAvatar}/>
                        <NavigateNext fontSize="large"/> 
                    </span>
                </div>
                <div className="button-container-row">
                    <Button color="primary" variant="contained">Akceptuj</Button>
                    <Button color="primary" variant="outlined">Odrzuć</Button>
                </div>
            </div>
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