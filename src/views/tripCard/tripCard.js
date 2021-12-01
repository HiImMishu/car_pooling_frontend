import { Paper, Step, StepLabel, Stepper, withStyles, StepConnector } from '@material-ui/core';
import { RadioButtonUnchecked, CheckCircleOutline, StarOutline, Group, AttachMoney } from '@material-ui/icons';
import { cardParams } from '../tripsList/tripsList';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import "./styles.css";

export const QontoConnector = withStyles({
    root: {
        padding: '5px 0',
        marginLeft: 'calc(4rem - 0.75rem)',
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
            <h4 className="stepper-time text-secondary">12:03</h4>
            <RadioButtonUnchecked color="primary" className="stepper-icon"/>
        </div>
}

export const FinishTripIcon = () => {
    return <div className="stepper-icon-container">
            <h4 className="stepper-time text-secondary">15:22</h4>
            <CheckCircleOutline color="primary" className="stepper-icon"/>
        </div>
}

const TripCard = ({cssClass, searchParameter, tripDate}) => {
    const history = useHistory()
    const isOwner = true

    const navigateToTrip = () => {
        history.push("/search/"+2)
    }

    return <Paper className={`trip-panel trip-card ${cssClass}`} onClick={navigateToTrip}>
        {searchParameter === cardParams.BEST_PRICE && <div className="badge-price">
            Najlepsza cena!
        </div>}
        {searchParameter === cardParams.BEST_TIME && <div className="badge-time">
            Najszybszy czas wyjazdu!
        </div>}
        {tripDate && <h5 className="text-secondary trip-date-card standard-padding">{tripDate}</h5>}
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
        <div className="trip-price">
            <h3>56 zł</h3>
        </div>
        {isOwner ?
        <div className="card-stats standard-padding">
            <span className="stats-row">
                <Group fontSize="lg"/>
                <p className="stepper-time">Liczba pasażerów: 2</p>
            </span> 
            <span className="stats-row">
                <AttachMoney fontSize="lg"/>
                <p className="stepper-time">Zaoszczędzone pieniądze: 112 zł</p>
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