import { Checkbox, FormControlLabel } from "@material-ui/core"


const AddAdditionalRegistrationInformationComponent = ({setValid, state, setFormState}) => {
    
    const handleCheckboxChange = (e) => {
        setFormState(prevState => ({
            ...prevState,
            "addInfo": [...prevState.addInfo.map(info => {return info.id === parseInt(e.target.name) ? {...info, "checked": e.target.checked} : info})]
        }))
    }

    const addInfoCheckboxes = state.addInfo.map(info => {return <span key={info.id} className="add-info-item">
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

    return <form className="register-form">
        <div>
            <h3 className="center-text">Dodatkowe infomacje <span className="text-secondary">(opcjonalne)</span></h3>
            <p className="text-secondary mb-2">
                Jeśli zdecydujesz się dodawać przejazdy poniższe dane będą automatycznie wypełniane <br/>
                za Ciebie w momencie dodawania ogłoszenia.
            </p>
        </div>
        <section className="add-info-section price-text">
            {addInfoCheckboxes}
        </section>
    </form>
} 

export default AddAdditionalRegistrationInformationComponent