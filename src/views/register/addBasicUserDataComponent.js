import { TextField } from "@material-ui/core";
import { FaceOutlined, PersonOutlineOutlined, CalendarToday, PhoneOutlined } from "@material-ui/icons";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useEffect } from "react";
import DateFnsUtils from '@date-io/date-fns';
import pl from "date-fns/locale/pl";

const AddBasicUserDataComponent = ({setValid, state, setFormState}) => {

    useEffect(() => {
        validate()
    }, [state])

    const handleChange = (event) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const setBirthdayDate = (event) => {
        setFormState(prevState => ({
            ...prevState,
            "birthDate": event ? event.getTime() : null
        }))
    }

    const validate = () => {
        let isValid = state.firstName !== "" &&
            state.lastName !== "" &&
            parseInt(state.birthDate) <= (new Date().getTime() - 86400000) &&
            state.phoneNumber !== "" &&
            state.phoneNumber.length === 9
        setValid(isValid)
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

    const handlePhoneNumberChange = (e) => {
        let phoneNumber = e.target.value.split("-").join("")
        if (!isNaN(phoneNumber) && phoneNumber.length <= 9) {
            setFormState(prevState => ({
                ...prevState,
                phoneNumber: phoneNumber
            }))
        }
    }

    return <form className="register-form">
        <div>
            <h3>Twoje podstawowe dane <span className="text-secondary">(wymagane)</span></h3>
        </div>
        <div className="form-element mb-1">
            <FaceOutlined className="login-icon" fontSize="large"/>
            <TextField
                required
                value={state.firstName}
                onChange={handleChange}
                className="form-field" 
                variant="outlined"
                name="firstName" 
                label="Imię"
                type="text"
            />
        </div>
        <div className="form-element mb-1">
            <PersonOutlineOutlined className="login-icon" fontSize="large"/>
            <TextField
                required
                value={state.lastName}
                onChange={handleChange}
                className="form-field" 
                variant="outlined"
                name="lastName" 
                label="Nazwisko"
                type="text"
            />
        </div>
        <div className="form-element mb-1">
            <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
                <CalendarToday className="login-icon" fontSize="large"/>
                <DatePicker
                    required
                    className="form-field" 
                    name="birthdayDate"
                    label="Data urodzenia"
                    disableFuture
                    format="dd/MM/yyyy"
                    inputVariant="outlined"
                    value={state.birthDate}
                    onChange={setBirthdayDate}
                />
            </MuiPickersUtilsProvider>
        </div>
        <div className="form-element mb-1">
            <PhoneOutlined className="login-icon" fontSize="large"/>
            <TextField 
                value={formatPhoneNumber(state.phoneNumber)}
                onChange={handlePhoneNumberChange}
                name="phoneNumber" 
                className="form-field" 
                id="outlined-basic" 
                label="Numer telefonu" 
                variant="outlined"
                required
            />
        </div>
    </form>
}

export default AddBasicUserDataComponent