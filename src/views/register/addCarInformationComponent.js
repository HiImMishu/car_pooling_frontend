import { TextField } from "@material-ui/core";
import { DriveEtaOutlined, PaletteOutlined } from "@material-ui/icons";
import { useEffect } from "react";


const AddCarInformationComponent = ({setValid, state, setFormState}) => {

    useEffect(() => {
        setValid(true)
    }, [])

    const handleChange = (event) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    return <form className="register-form">
        <div>
            <h3 className="center-text">Dane o pojeździe <span className="text-secondary">(opcjonalne)</span></h3>
            <p className="text-secondary mb-2">
                Jeśli zdecydujesz się dodawać przejazdy poniższe dane będą automatycznie wypełniane <br/>
                za Ciebie w momencie dodawania ogłoszenia.
            </p>
        </div>
        <div className="form-element mb-1">
            <DriveEtaOutlined className="login-icon" fontSize="large"/>
            <TextField
                value={state.car}
                onChange={handleChange}
                className="form-field" 
                variant="outlined"
                name="car" 
                label="Marka i model"
                type="text"
            />
        </div>
        <div className="form-element mb-1">
            <PaletteOutlined className="login-icon" fontSize="large"/>
            <TextField
                value={state.carColor}
                onChange={handleChange}
                className="form-field" 
                variant="outlined"
                name="carColor" 
                label="Kolor pojazdu"
                type="text"
            />
        </div>
    </form>
}

export default AddCarInformationComponent