import { Container, withStyles, Step, StepLabel, Divider, Button } from "@material-ui/core";
import { StyledStepper, QontoConnector, FinishTripIcon, StartTripIcon } from "../tripCard/tripCard";
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import './styles.css';
import { Done } from "@material-ui/icons";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actualTripSelector } from "../../application/selectors/tripSelector";
import { tokenSelector, activeUserSelector } from "../../application/selectors/userSelector";
import { useEffect } from "react";
import { enrollToTrip, fetchTripById } from "../../application/actions/tripActions";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const TripReservationComponent = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const trip = useSelector(actualTripSelector)
    const token = useSelector(tokenSelector)
    const activeUser = useSelector(activeUserSelector)
    const options = { weekday: 'long', day: 'numeric', month: 'long' }
    const waitingForAccept = trip?.awaitingAcceptation?.find(passenger => passenger.id === activeUser?.id) !== undefined
    const alreadyEnrolled = trip?.enrolledPassengers?.find(passenger => passenger.id === activeUser?.id) !== undefined

    useEffect(() => {
        if (token) {
            dispatch(fetchTripById(id))
        }
    }, [dispatch, id, token])

    const reserveTrip = () => {
        if (token) {
            dispatch(enrollToTrip(token, id, trip?.autoAccept))
        }
    }

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
            <h1 className="trip-header-date trip-reservation-header">Sprawdź szczegóły i zarezerwuj!</h1>
            <h2 className="trip-date-reservation standard-padding text-secondary">{new Date(trip?.tripDate).toLocaleString("pl-PL", options)}</h2>
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
            <section className="trip-driver-reservation standard-padding">
                <img className="avatar" src={defaultAvatar} alt="User avatar"/>
                <h2 className="driver-name text-secondary">{trip?.owner?.firstName}</h2>
            </section>
            <Divider className="trip-divider mt-1"/>
            <section className="final-price-section standard-padding">
                <h2 className="final-price-header">Łączna cena</h2>
                <h3 className="final-price-text text-secondary">1 miejsce: {trip?.costPerSeat} zł</h3>
                <p className="final-price-hint text-secondary">Zapłać w samochodzie</p>
                <h2 className="final-price-footer">Płatność gotówką</h2>
            </section>
            <Divider className="trip-divider mt-1"/>
            {(!waitingForAccept && !alreadyEnrolled) && <section className="button-container mt-1">
                <Button className="default-button" variant="contained" color="primary" size="medium" onClick={reserveTrip} endIcon={<Done/>}>Zarezerwuj</Button>
            </section>}
        </StyledContainer>
}

export default TripReservationComponent