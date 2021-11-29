import { TextField, Paper, Divider, IconButton } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { LocationOn, CalendarToday, AirlineSeatReclineNormal, Search } from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './styles.css';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log("Search!")
        history.push("/search")
    } 

    return(
        <Paper component="form" className="root" onSubmit={handleSubmit}>
            <div className="form-element">
                <LocationOn className="icon"/>
                <TextField 
                    className="input" 
                    name="startingPlace" 
                    label="Miejsce startu"
                />
            </div>
            <Divider className="divider" orientation="vertical" flexItem/>
            <div className="form-element">
                <LocationOn  className="icon"/>
                <TextField 
                    className="input"
                    name="destination" 
                    label="Miejsce docelowe"
                />
            </div>
            <Divider className="divider" orientation="vertical" flexItem/>
            <MuiPickersUtilsProvider className="input"utils={DateFnsUtils}>
                <div className="form-element">
                    <CalendarToday  className="icon"/>
                    <KeyboardDatePicker
                        className="input"
                        name="tripDate"
                        label="Data wyjazdu"
                        format="dd/MM/yyyy"
                    />
                </div>
            </MuiPickersUtilsProvider>
            <Divider className="divider" orientation="vertical" flexItem/>
            <div className="form-element">
                <AirlineSeatReclineNormal  className="icon"/>
                <TextField 
                    className="input"
                    type="number"
                    inputProps={{min: 1}}
                    name="passangersNumber" 
                    label="Liczba pasażerów"
                />
            </div>
            <Divider className="divider" orientation="vertical" flexItem/>
            <IconButton type="submit">
                <Search/>
            </IconButton>
        </Paper>
    )
}

export default SearchBar