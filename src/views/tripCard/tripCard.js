import { Paper, Step, StepLabel, Stepper, withStyles, StepConnector } from '@material-ui/core';
import { RadioButtonUnchecked, CheckCircleOutline, StarOutline, Group, AttachMoney } from '@material-ui/icons';
import { cardParams } from '../tripsList/tripsList';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import "./styles.css";
import { useSelector } from 'react-redux';
import { activeUserSelector } from '../../application/selectors/userSelector';

export const QontoConnector = withStyles({
    root: {
        padding: '5px 0',
        marginLeft: 'calc(4rem - 2rem)',
        height: '30px'
    },
    line: {
      padding: 0,
      borderColor: '#000000',
      borderWidth: '2px',
      borderRadius: 1,
      height: '30px'
    },
  })(StepConnector)

export const StyledStepper = withStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0)'
    }
})(Stepper)  

export const StartTripIcon = () => {
    return <div className="stepper-icon-container">
            <RadioButtonUnchecked color="primary" className="stepper-icon"/>
        </div>
}

export const FinishTripIcon = () => {
    return <div className="stepper-icon-container">
            <CheckCircleOutline color="primary" className="stepper-icon"/>
        </div>
}

const TripCard = ({cssClass, searchParameter, trip}) => {
    const history = useHistory()
    const activeUser = useSelector(activeUserSelector)
    const isOwner = activeUser?.id === trip?.owner?.id
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' };

    const navigateToTrip = () => {
        history.push("/search/"+trip.id)
    }

    return <Paper className={`trip-panel trip-card ${cssClass}`} onClick={navigateToTrip}>
        {searchParameter === cardParams.BEST_PRICE && <div className="badge-price">
            Najlepsza cena!
        </div>}
        {searchParameter === cardParams.BEST_TIME && <div className="badge-time">
            Najszybszy czas wyjazdu!
        </div>}
        <h5 className="text-secondary trip-date-card standard-padding">
            {new Date(trip?.tripDate).toLocaleString("pl-PL", options)}
        </h5>   
        <StyledStepper className="stepper" orientation="vertical" connector={<QontoConnector/>}>
            <Step key={1} completed={true}>
                <StepLabel StepIconComponent={StartTripIcon}>
                    <h3 className="stepper-time">{trip.startingPlace}</h3>
                </StepLabel>
            </Step>
            {trip.additionalStops?.length > 0 && <Step key={1} completed={true}>
                <StepLabel StepIconComponent={StartTripIcon}>
                    <h3 className="stepper-time">{trip.additionalStops.join(', ')} <span className="text-secondary">(stacje pośrednie)</span></h3>
                </StepLabel>
            </Step>}
            <Step key={3} completed={true}>
                <StepLabel StepIconComponent={FinishTripIcon}>
                    <h3 className="stepper-time">{trip.endingPlace}</h3>
                </StepLabel>
            </Step>
        </StyledStepper>
        <div className="trip-price">
            <h3>{trip.costPerSeat} zł</h3>
        </div>
        {isOwner ?
        <div className="card-stats standard-padding">
            <span className="stats-row">
                <Group fontSize="lg"/>
                <p className="stepper-time">Liczba pasażerów: {trip.enrolledPassengers.length}</p>
            </span> 
            <span className="stats-row">
                <AttachMoney fontSize="lg"/>
                <p className="stepper-time">Zaoszczędzone pieniądze: {trip.enrolledPassengers.length * trip.costPerSeat} zł</p>
            </span> 
        </div> :
        <div className="trip-bottom-row">
            <div className="driver">
                <img className="avatar" src={defaultAvatar}/>
                <span className="user-row">
                    <h4 className="driver-name">Marek</h4>
                    <p className="driver-score"><StarOutline className="score-star"/> 5.0 / 5.0</p>
                </span>
            </div>
            <div className="additional-informations">
                <img className="additional-information" src={defaultAvatar}/>
                <img className="additional-information" src={defaultAvatar}/>
                <img className="additional-information" src={defaultAvatar}/>
            </div>
        </div>}
    </Paper>
}

export default TripCard