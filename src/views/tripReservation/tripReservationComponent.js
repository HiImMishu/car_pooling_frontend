import { Container, withStyles, Step, StepLabel, Divider, Button } from "@material-ui/core";
import { StyledStepper, QontoConnector, FinishTripIcon, StartTripIcon } from "../tripCard/tripCard";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import './styles.css';
import { Done } from "@material-ui/icons";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const TripReservationComponent = () => {

    const reserveTrip = () => {

    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
            <h1 className="trip-header-date trip-reservation-header">Sprawdź szczegóły i zarezerwuj!</h1>
            <h2 className="trip-date-reservation standard-padding text-secondary">Środa, 12 września</h2>
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
            <section className="trip-driver-reservation standard-padding">
                <img className="avatar" src={defaultAvatar}/>
                <h2 className="driver-name text-secondary">Marek</h2>
            </section>
            <Divider className="trip-divider mt-1"/>
            <section className="final-price-section standard-padding">
                <h2 className="final-price-header">Łączna cena</h2>
                <h3 className="final-price-text text-secondary">1 miejsce: 50,00 zł</h3>
                <p className="final-price-hint text-secondary">Zapłać w samochodzie</p>
                <h2 className="final-price-footer">Płatność gotówką</h2>
            </section>
            <Divider className="trip-divider mt-1"/>
            <section className="button-container mt-1">
                <Button className="default-button" variant="contained" color="primary" size="medium" onClick={reserveTrip} endIcon={<Done/>}>Zarezerwuj</Button>
            </section>
        </StyledContainer>
}

export default TripReservationComponent