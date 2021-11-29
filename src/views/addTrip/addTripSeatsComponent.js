import { useEffect } from "react";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";

const AddTripSeatsComponent = ({setValid, state, setFormState}) => {

    useEffect(() => {
        setValid(true)
    }, [])

    const handleChange = (e) => {
        if (e.target.value >= 1) {
            setFormState(prevState => ({
                ...prevState,
                "tripSeats": e.target.value
            }))
        }
    }

    const handleSeatChecbox = (e) => {
        setFormState(prevState => ({
            ...prevState,
            "tripAddInfo": [...prevState.tripAddInfo.map(info => {return info.id === 0 ? {...info, "checked": e.target.checked} : info})]
        }))
    }

    

    return <section className="trip-stops-container standard-padding">
        <h2 className="mb-2">Ilu pasażerów możesz zabrać?</h2>
        <TextField
            className="mb-2 w-15"
            id="outlined-number"
            label="Ilość miejsc w aucie"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            value={state.tripSeats}
            onChange={handleChange}
            variant="outlined"
        />
        <p className="text-secondary">Pozostawienie wolnego środkowego miejsca na tylnej kanapie ma wpływ na komfort pasażerów. Być może poskutkuje to lepszą opinią po odbyciu podróży!</p>
        <FormControlLabel
            control={
                <Checkbox
                    checked={state.tripAddInfo.find(e => e.id === 0)?.checked}
                    onChange={handleSeatChecbox}
                    name="checkedB"
                    color="primary"
                />
            }
            label={<div className="trip-options-row">
                <img className="additional-information" src={state.tripAddInfo.find(e => e.id === 0)?.avatar}/>
                <h4>{state.tripAddInfo.find(e => e.id === 0)?.description}</h4>
            </div>}
        />
    </section>
}

export default AddTripSeatsComponent