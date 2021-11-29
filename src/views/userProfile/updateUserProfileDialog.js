import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, DialogContentText } from "@material-ui/core";
import { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import pl from "date-fns/locale/pl";

const UpdateUserProfileDialog = ({isOpen, setIsOpen}) => {
    const [userState, setUserState] = useState({
        firstName: "Michał",
        lastName: "Misiak",
        birthDate: "1998-06-24",
        phoneNumber: "503321961",
        car: "Volkswagen CC",
        carColor: "Brąszowy perłowy"
    })

    const handleUpdate = (e) => {
        e.preventDefault()

        //Set updated action here
        setIsOpen(false)
    }

    const handleUpdateAlertClose = () => {
        setIsOpen(false)
    }

    const handleChange = (e) => {
        if (e.target.validity.valueMissing) {
            e.target.setCustomValidity("To pole jest obowiązkowe")
        } else {
            e.target.setCustomValidity("")
        }
        setUserState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleDateChange = (e) => {
        setUserState(prevState => ({
            ...prevState,
            birthDate: e
        }))
    }

    const handlePhoneNumberChange = (e) => {
        let phoneNumber = e.target.value.split("-").join("")
        if (e.target.validity.valueMissing || phoneNumber.length < 8) {
            e.target.valid = false
            e.target.setCustomValidity("To pole jest obowiązkowe")
        } else {
            e.target.valid = true
            e.target.setCustomValidity("")
        }
        console.log(userState.phoneNumber)
        if (!isNaN(phoneNumber) && phoneNumber.length <= 9) {
            setUserState(prevState => ({
                ...prevState,
                phoneNumber: phoneNumber
            }))
        }
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

    return <Dialog open={isOpen} onClose={handleUpdateAlertClose}>
        <DialogTitle>Aktualizacja danych użytkownika</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Wypełnij poniższe pola zaktualizowanymi danymi.
            </DialogContentText>
            <form className="update-user-form" onSubmit={handleUpdate}>
                <TextField 
                    value={userState.firstName}
                    onChange={handleChange}
                    name="firstName" 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Imie" 
                    variant="outlined"
                    required
                />
                <TextField 
                    value={userState.lastName}
                    onChange={handleChange}
                    name="lastName" 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Nazwisko" 
                    variant="outlined"
                    required
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl} className="trip-date-time">
                    <DatePicker 
                        value={userState.birthDate} 
                        onChange={handleDateChange}
                        format="dd-MM-yyyy"
                        inputVariant="outlined"
                        name="birthDate"
                        label="Data urodzenia"
                        cancelLabel="Anuluj"
                        okLabel="Zatwierdź"
                        required
                    />
                </MuiPickersUtilsProvider> 
                <TextField 
                    value={formatPhoneNumber(userState.phoneNumber)}
                    onChange={handlePhoneNumberChange}
                    name="phoneNumber" 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Telefon" 
                    variant="outlined"
                    required
                />
                <TextField 
                    value={userState.car}
                    onChange={handleChange}
                    name="car" 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Samochód" 
                    variant="outlined"
                    required
                />
                <TextField 
                    value={userState.carColor}
                    onChange={handleChange}
                    name="carColor" 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Kolor samochodu" 
                    variant="outlined"
                    required
                />
                <DialogActions>
                    <Button type="submit" color="primary">Zapisz</Button>
                    <Button color="primary" onClick={handleUpdateAlertClose}>Anuluj</Button>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
}

export default UpdateUserProfileDialog