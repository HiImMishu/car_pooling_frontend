import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, DialogContentText } from "@material-ui/core";
import { useEffect, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import pl from "date-fns/locale/pl";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../application/actions/userAction";
import { tokenSelector } from "../../application/selectors/userSelector";
import { activeUserSelector } from "../../application/selectors/userSelector";

const UpdateUserProfileDialog = ({isOpen, setIsOpen}) => {
    const activeUser = useSelector(activeUserSelector)
    const [userState, setUserState] = useState({
        firstName: "",
        lastName: "",
        birthday: new Date().getTime(),
        phoneNumber: "",
        car: "",
        carColor: ""
    })
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)

    useEffect(() => {
        setUserState({
            firstName: activeUser.firstName,
            lastName: activeUser.lastName,
            birthday: activeUser.birthday,
            phoneNumber: activeUser.phoneNumber,
            car: activeUser.car,
            carColor: activeUser.carColor
    })}, [activeUser])

    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUser(userState, token))
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
            birthday: e.getTime()
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
                        value={userState.birthday} 
                        onChange={handleDateChange}
                        format="dd-MM-yyyy"
                        inputVariant="outlined"
                        name="birthday"
                        disableFuture
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
                />
                <TextField 
                    value={userState.carColor}
                    onChange={handleChange}
                    name="carColor" 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Kolor samochodu" 
                    variant="outlined"
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