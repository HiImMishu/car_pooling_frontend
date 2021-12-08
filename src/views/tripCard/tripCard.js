import { Paper, Step, StepLabel, Stepper, withStyles, StepConnector } from '@material-ui/core';
import { RadioButtonUnchecked, CheckCircleOutline, StarOutline, Group, AttachMoney } from '@material-ui/icons';
import { cardParams } from '../tripsList/tripsList';
import { useHistory } from 'react-router-dom';
import defaultAvatar from '../../assets/images/default-avatar.jpg';
import "./styles.css";
import { useSelector } from 'react-redux';
import { activeUserSelector } from '../../application/selectors/userSelector';
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
                    <h3 className="stepper-time">{trip?.startingPlace}</h3>
                </StepLabel>
            </Step>
            {trip?.additionalStops?.length > 0 && <Step key={2} completed={true}>
                <StepLabel StepIconComponent={StartTripIcon}>
                    <h3 className="stepper-time">{trip?.additionalStops?.join(', ')} <span className="text-secondary">(stacje pośrednie)</span></h3>
                </StepLabel>
            </Step>}
            <Step key={3} completed={true}>
                <StepLabel StepIconComponent={FinishTripIcon}>
                    <h3 className="stepper-time">{trip?.endingPlace}</h3>
                </StepLabel>
            </Step>
        </StyledStepper>
        <div className="trip-price">
            <h3>{trip?.costPerSeat} zł</h3>
        </div>
        {isOwner ?
        <div className="card-stats standard-padding">
            <span className="stats-row">
                <Group fontSize="large"/>
                <p className="stepper-time">Liczba pasażerów: {trip?.enrolledPassengers?.length}</p>
            </span> 
            <span className="stats-row">
                <AttachMoney fontSize="large"/>
                <p className="stepper-time">Zaoszczędzone pieniądze: {trip?.enrolledPassengers?.length * trip?.costPerSeat} zł</p>
            </span> 
        </div> :
        <div className="trip-bottom-row">
            <div className="driver">
                <img className="avatar" src={defaultAvatar} alt="Driver avatar"/>
                <span className="user-row">
                    <h4 className="driver-name">{trip?.owner?.firstName}</h4>
                    <p className="driver-score"><StarOutline className="score-star"/> 5.0 / 5.0 //ToDo</p>
                </span>
            </div>
            <div className="additional-informations">
                {trip?.emptyThirdSeat && <img className="additional-information" src={tripAddInfo[0].avatar} alt={tripAddInfo[0].alt}/>}
                {trip?.noSmoking && <img className="additional-information" src={tripAddInfo[1].avatar} alt={tripAddInfo[1].alt}/>}
                {trip?.noAnimals && <img className="additional-information" src={tripAddInfo[2].avatar} alt={tripAddInfo[2].alt}/>}
                {trip?.talkative && <img className="additional-information" src={tripAddInfo[3].avatar} alt={tripAddInfo[3].alt}/>}
                {trip?.music && <img className="additional-information" src={tripAddInfo[4].avatar} alt={tripAddInfo[4].alt}/>}
                {trip?.autoAccept && <img className="additional-information" src={tripAddInfo[5].avatar} alt={tripAddInfo[5].alt}/>}
            </div>
        </div>}
    </Paper>
}

export default TripCard