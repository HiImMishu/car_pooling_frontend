import { TextField } from "@material-ui/core";
import { createRef, useEffect } from "react";


const AddTripLocationComponent = ({setValid, state, setFormState}) => {
    const startPlaceInput = createRef()
    const finishPlaceInput = createRef()

    useEffect(() => {
        setValid(state?.tripStartPlace !== "" && state?.tripEndPlace !== "" && (state?.tripStartPlace?.toLowerCase() !== state?.tripEndPlace?.toLowerCase()))
    }, [setValid, state?.tripStartPlace, state?.tripEndPlace])

    const validateForm = (event) => {
        setFormState(prevState => ({
            ...prevState, 
            [event.target.name]: event.target.value
        }))
       
        setValid(startPlaceInput.current.value !== "" && finishPlaceInput.current.value !== "" && (startPlaceInput.current.value.toLowerCase() !== finishPlaceInput.current.value.toLowerCase()))
    }

    return <form className="trip-locations-container">
        <div>
            <h2>Skąd wyjeżdżasz?</h2>
            <TextField 
                inputRef={startPlaceInput}
                value={state.tripStartPlace}
                onChange={validateForm}
                name="tripStartPlace" 
                className="mb-width" 
                id="outlined-basic" 
                label="Miejsce wyjazdu" 
                variant="outlined"
            />
        </div>
        <div>
            <h2>Dokąd jedziesz?</h2>
            <TextField 
                inputRef={finishPlaceInput} 
                onChange={validateForm}
                value={state.tripEndPlace}
                name="tripEndPlace" 
                className="mb-width" 
                id="outlined-basic" 
                label="Miejsce docelowe" 
                variant="outlined"
            />
        </div>
    </form>
}

export default AddTripLocationComponent