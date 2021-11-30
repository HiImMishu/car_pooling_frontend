import { Button, Container, MobileStepper, Step, StepLabel, Stepper, Typography, withStyles } from "@material-ui/core";
import { ExitToAppOutlined, KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import AddAdditionalRegistrationInformationComponent from "./AddAdditionalRegistrationInformationComponent";
import AddBasicUserDataComponent from "./addBasicUserDataComponent";
import AddCarInformationComponent from "./addCarInformationComponent";
import AddUserAuthenticationDataComponent from "./addUserAuthenticationDataComponent";
import "./styles.css";
import approveImg from '../../assets/images/approve.png';
import freeSeat from '../../assets/images/free-seat.png';
import noAnimals from '../../assets/images/no-animals.png';
import noSmoking from '../../assets/images/no-smoking.png';
import chat from '../../assets/images/chat.png';
import music from '../../assets/images/musical-notes.png';
import { useDispatch, useSelector } from "react-redux";
import { registrationResult } from '../../application/selectors/userSelector';
import { registerUser } from '../../application/actions/userAction';
import { showAllert } from "../../application/actions/alertActions";
import { Link } from "react-router-dom";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
})(Container)


const RegisterUserComponent = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [valid, setValid] = useState(true)
    const registrationResponseCode = useSelector(registrationResult)
    const dispatch = useDispatch()
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        birthDate: null,
        phoneNumber: "",
        email: "",
        emailTaken: false,
        password: "",
        repeatedPassword: "",
        car: "",
        carColor: "",
        addInfo: [
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
        ]
    })

    useEffect(() => {
        if (parseInt(registrationResponseCode) >= 200 && parseInt(registrationResponseCode) < 300) {
            let button = <Button startIcon={<ExitToAppOutlined/>} component={Link} variant="outlined" to="/login">Logowanie</Button>
            let alertProps = {
                open: true,
                type: "success",
                button: button,
                message: "Rejestracja się powiodła. Przejdź do logowania aby w pełni korzystać z serwisu"
            }
            dispatch(showAllert(alertProps))
        } else if (parseInt(registrationResponseCode) === 409) {
            setFormState(prevState => ({
                ...prevState,
                emailTaken: true
            }))
            setActiveStep(1)
        } 
    }, [registrationResponseCode])
    
    const handleNext = () => {
        if(activeStep !== 3) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        } else {
            dispatch(registerUser(formState))
        }
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const mobileStepper = <MobileStepper
        className="mobile-stepper"
        variant="dots"
        steps={4}
        position="static"
        activeStep={activeStep}
        nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === 4 || !valid}>
                {activeStep === 3 ? "Zarejestruj" : "Dalej"}
                {<KeyboardArrowRight/>}
            </Button>
        }
        backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {<KeyboardArrowLeft/>}
                Cofnij
            </Button>
        }
    />

    const registrationStepper = <Stepper activeStep={activeStep} alternativeLabel className="standard-stepper">
        <Step key={1}>
            <StepLabel>Twoje podstawowe dane</StepLabel>
        </Step>
        <Step key={2}>
            <StepLabel>Dane dostępu do konta</StepLabel>
        </Step>
        <Step key={3}>
            <StepLabel>Dane pojazdu *Opcjonalne</StepLabel>
        </Step>
        <Step key={4}>
            <StepLabel>Dodatkowe informacje *Opcjonalne</StepLabel>
        </Step>
    </Stepper>

    const components = [
        <AddBasicUserDataComponent key={1} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddUserAuthenticationDataComponent key={2} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddCarInformationComponent key={3} state={formState} setFormState={setFormState} setValid={setValid}/>,
        <AddAdditionalRegistrationInformationComponent key={4} state={formState} setFormState={setFormState} setValid={setValid}/>
    ]

    return <StyledContainer component="main" maxWidth="md" className="trip-container">
        {registrationStepper}
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
                    {activeStep === 3 ? 'Zarejestruj' : 'Dalej'}
                </Button>
            </div>
        </Typography>
    </StyledContainer>
}

export default RegisterUserComponent