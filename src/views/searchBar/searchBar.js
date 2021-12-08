import { TextField, Paper, Divider, IconButton } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { LocationOn, CalendarToday, Search } from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './styles.css';
import { useHistory } from 'react-router-dom';
import { createRef, useState } from 'react';
import pl from "date-fns/locale/pl";
import { useDispatch } from 'react-redux';
import { setSearchCriteria } from '../../application/actions/tripActions';

const SearchBar = () => {
    const history = useHistory()
    const [searchData, setSearchData] = useState({
        startingPlace: "",
        endingPlace: "",
        tripDate: new Date()
    })
    const startingPlaceRef = createRef()
    const endingPlacePlaceRef = createRef()
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(setSearchCriteria(searchData.startingPlace, searchData.endingPlace, searchData.tripDate))
        history.push("/search")
    } 

    const handleChange = (e) => {
        setSearchData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
        validateForm()
    }

    const handleDateChange = (e) => {
        setSearchData(prevData => ({
            ...prevData,
            "tripDate": e
        }))
        validateForm()
    }

    const validateForm = () => {
        if (startingPlaceRef.current.validity.valueMissing) {
            startingPlaceRef.current.setCustomValidity("Miejsce startu jest wymagane.")
        } 
        else {
            startingPlaceRef.current.setCustomValidity("")
        }

        if (endingPlacePlaceRef.current.validity.valueMissing) {
            endingPlacePlaceRef.current.setCustomValidity("Miejsce docelowe jest wymagane.")
        }
        else {
            endingPlacePlaceRef.current.setCustomValidity("")
        }
    }

    return(
        <Paper component="form" className="root" onSubmit={handleSubmit}>
            <div className="form-element">
                <LocationOn className="icon"/>
                <TextField 
                    required
                    value={searchData.startingPlace}
                    onChange={handleChange}
                    inputRef={startingPlaceRef}
                    className="input" 
                    name="startingPlace" 
                    label="Miejsce startu"
                />
            </div>
            <Divider className="divider" orientation="vertical" flexItem/>
            <div className="form-element">
                <LocationOn  className="icon"/>
                <TextField
                    required 
                    value={searchData.endingPlace}
                    onChange={handleChange}
                    inputRef={endingPlacePlaceRef}
                    className="input"
                    name="endingPlace" 
                    label="Miejsce docelowe"
                />
            </div>
            <Divider className="divider" orientation="vertical" flexItem/>
            <MuiPickersUtilsProvider className="input" locale={pl} utils={DateFnsUtils}>
                <div className="form-element">
                    <CalendarToday  className="icon"/>
                    <DatePicker
                        required
                        disablePast
                        value={searchData.tripDate}
                        onChange={handleDateChange}
                        className="input"
                        name="tripDate"
                        label="Data wyjazdu"
                        format="dd/MM/yyyy"
                    />
                </div>
            </MuiPickersUtilsProvider>
            <Divider className="divider" orientation="vertical" flexItem/>
            <IconButton type="submit" onClick={validateForm}>
                <Search/>
            </IconButton>
        </Paper>
    )
}

export default SearchBar