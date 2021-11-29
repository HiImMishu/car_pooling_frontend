import { useEffect } from "react";
import { TextField , Checkbox, FormControlLabel } from "@material-ui/core";

const AddAditionalInformationComponent = ({setValid, state, setFormState}) => {

    useEffect(() => {
        setValid(true)
    }, [])

    const handleDescriptionChange = (e) => {
        setFormState(prevState => ({
            ...prevState,
            "tripDescription": e.target.value
        }))
    }

    const handleCheckboxChange = (e) => {
        setFormState(prevState => ({
            ...prevState,
            "tripAddInfo": [...prevState.tripAddInfo.map(info => {return info.id === parseInt(e.target.name) ? {...info, "checked": e.target.checked} : info})]
        }))
    }

    const addInfoCheckboxes = state.tripAddInfo.map(info => {return <span key={info.id} className="add-info-item">
            <FormControlLabel
                control={
                    <Checkbox
                        checked={info.checked}
                        onChange={handleCheckboxChange}
                        name={info.id}
                        color="primary"
                    />
                }
                label={<div className="trip-options-row">
                    <img className="additional-information" src={info.avatar} alt={info.alt}/>
                    <h4>{info.description}</h4>
                </div>}
            />
        </span>})

    return <section className="trip-stops-container standard-padding mb-2">
        <h2>Dodaj dodatkowe informacje o przejeździe</h2>
        <p className="text-secondary mb-2">Czy twoi pasażerowi powinni wiedzieć coś jeszcze na temat podróży? Poniżej możesz dodać opis wyświetlany razem z ogłoszeniem, 
            zmienić domyślne ustawienia i zadecydować czy pasażerowie mają być automatycznie akceptowani.
        </p>
        <TextField  
            id="outlined-basic" 
            label="Dodatkowy opis" 
            variant="outlined"
            className="mb-2"
            value={state.tripDescription}
            onChange={handleDescriptionChange}
            multiline
            minRows={2}
            maxRows={4}
        />
        <section className="add-info-section price-text">
            {addInfoCheckboxes}
        </section>
    </section>
}

export default AddAditionalInformationComponent