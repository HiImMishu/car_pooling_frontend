import { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Avatar } from "@material-ui/core";
import { Add, Delete, Event } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import pl from "date-fns/locale/pl";

const AddTripTimeComponent = ({setValid, state, setFormState, isUpdate}) => {
    const [tripDateTime, setTripDateTime] = useState(new Date())
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric' };

    useEffect(() => {
        if (isUpdate) {
            return true
        }
        setValid(state.tripDates.length !== 0)
    }, [state.tripDates?.length, setValid, isUpdate])

    useEffect(() => {
        if (isUpdate) {
            setTripDateTime(state?.tripDate)
        }
    }, [isUpdate, state?.tripDate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!state.tripDates.includes(tripDateTime)) {
            setFormState(prevState => ({
                ...prevState,
                "tripDates": [...prevState.tripDates, tripDateTime]
            }))
        } 
        setValid(true)
    }

    const handlePickerChange = (date) => {
        setFormState(prevState => ({
            ...prevState,
            "tripDate": date
        }))
        setTripDateTime(date)
    }

    const removeStop = (date) => {
        setFormState((prevState) => ({
            ...prevState,
            "tripDates": prevState.tripDates.filter(s => {return s !== date})
        }))
    }

    const tripDatesList = state.tripDates?.map((date, index) => {
        return <ListItem key={index} className="trip-date-item">
            <ListItemAvatar>
                <Avatar>
                    <Event/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                {new Date(date).toLocaleString("pl-PL", options)}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton onClick={() => removeStop(date)} edge="end">
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    })

    return <section className="standard-padding">
        <form  onSubmit={handleSubmit}>
            <h2 className="mb-0">Kiedy wyjeżdżasz?</h2>
            <p className="text-secondary mb-2">Jeśli wiesz, że twoja podróż występuje regularnie lub się powtarza, możesz dodać kilka dat wyjazdu jednocześnie.</p>
            <span className="add-date-input-row">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pl} className="trip-date-time">
                    <DateTimePicker 
                        value={tripDateTime} 
                        onChange={handlePickerChange}
                        inputVariant="outlined"
                        disablePast
                        ampm={false}
                        label="Data i czas wyjazdu"
                        cancelLabel="Anuluj"
                        okLabel="Zatwierdź"
                    />
                </MuiPickersUtilsProvider> 
                {!isUpdate && <Button type="submit" variant="outlined" color="primary" startIcon={<Add/>}>
                    Dodaj datę i czas wyjazdu
                </Button>}
            </span>
        </form>
        {!isUpdate && <List>
            {tripDatesList}
        </List>}
    </section>
}

export default AddTripTimeComponent