import { Container, withStyles, Stepper, Step, StepLabel, Typography, Button, MobileStepper } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useState } from "react";
import AddAditionalInformationComponent from "./addAditionalInformationComponent";
import AddTripLocationComponent from "./addTripLocationComponent";
import AddTripSeatsComponent from "./addTripSeatsComponent";
import AddTripStopsComponent from "./addTripStopsComponent";
import AddTripTimeComponent from "./addTripTimeComponent";
import "./styles.css";
import approveImg from '../../assets/images/approve.png';
import freeSeat from '../../assets/images/free-seat.png';
import noAnimals from '../../assets/images/no-animals.png';
import noSmoking from '../../assets/images/no-smoking.png';
import chat from '../../assets/images/chat.png';
import music from '../../assets/images/musical-notes.png';

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const AddTripComponent = ({isUpdate, initialState}) => {
    const [activeStep, setActiveStep] = useState(0)
    const [valid, setValid] = useState(false)
    const [formState, setFormState] = useState(initialState || {
        tripStartPlace: "",
        tripEndPlace: "",
        tripStops: [],
        tripDates: [],
        tripSeats: 1,
        tripAddInfo: [
            {
                id: 0,
                avatar: freeSeat,
                alt: "Wolne miejsce na tylnej kanapie",
                description: "Maks. dwie osoby na tylnym siedzeniu",
                checked: false
            },
            {
                id: 1,
                avatar: noSmoking,
                alt: "Nie palić",
                description: "Proszę, bez palenia w samochodzie",
                checked: false
            },
            {
                id: 2,
                avatar: noAnimals,
                alt: "Zakaz zwierząt",
                description: "Proszę, żadnych zwierząt w aucie",
                checked: false
            },
            {
                id: 3,
                avatar: chat,
                alt: "Rozmowa",
                description: "Chętnie rozmawiam",
                checked: false
            },
            {
                id: 4,
                avatar: music,
                alt: "Muzyka",
                description: "Muzyka? Nie ma problemu!",
                checked: false
            },
            {
                id: 5,
                avatar: approveImg,
                alt: "Potwierdzam automatycznie",
                description: "Potwierdzam automatycznie",
                checked: false
            }
        ],
        tripDescription: ""
    })
    const components = [
        <AddTripLocationComponent key={1} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddTripStopsComponent key={2} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddTripTimeComponent key={3} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddTripSeatsComponent key={4} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddAditionalInformationComponent key={5} state={formState} setFormState={setFormState} setValid={setValid}/> 
    ]

    const handleNext = () => {
        if(activeStep !== 4) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
            if (isUpdate) {
                //update
            } else {
                //save
            }
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const mobileStepper = <MobileStepper
        className="mobile-stepper"
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5 || !valid}>
            {activeStep === 4 ? 'Zatwierdź' : 'Dalej'}
            {<KeyboardArrowRight />}
        </Button>
        }
        backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {<KeyboardArrowLeft />}
            Cofnij
        </Button>
        }
    />

    const standardStepper = <Stepper activeStep={activeStep} alternativeLabel className="standard-stepper">
        <Step key={1}>
            <StepLabel>Skąd i dokąd jedziesz?</StepLabel>
        </Step>
        <Step key={2}>
            <StepLabel>Będą jakieś przystanki?</StepLabel>
        </Step>
        <Step key={3}>
            <StepLabel>Kiedy wyjeżdżasz?</StepLabel>
        </Step>
        <Step key={4}>
            <StepLabel>Ile masz miejsc?</StepLabel>
        </Step>
        <Step key={5}>
            <StepLabel>Dodatkowe opcje?</StepLabel>
        </Step>
    </Stepper>

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
        {standardStepper}
        {mobileStepper}
        <Typography component="div" className="standard-padding">
            {components.filter((_component, index) => index === activeStep)}
            <div className="add-trip-button-container mb-2">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Cofnij
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={!valid}>
                {activeStep === 4 ? 'Zatwierdź' : 'Dalej'}
              </Button>
            </div>
        </Typography>
    </StyledContainer>
}

export default AddTripComponent