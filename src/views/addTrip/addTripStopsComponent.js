import { Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Avatar, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Add, Delete, Place } from "@material-ui/icons";
import { createRef, useEffect, useState } from "react";


const AddTripStopsComponent = ({setValid, state, setFormState}) => {
    const [tripStop, setTripStop] = useState("")
    const stopInput = createRef()

    useEffect(() => {
        setValid(true)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!state.tripStops.includes(tripStop)) {
            setFormState(prevState => ({
                ...state,
                "tripStops": [...prevState.tripStops, tripStop]
            }))
        }
    }

    const validateForm = (_e) => {
        if (stopInput.current.validity.valueMissing) {
            stopInput.current.setCustomValidity("Dodaj adres przystanku pośredniego")
        } else {
            stopInput.current.setCustomValidity("")
        }
    }

    const removeStop = (stop) => {
        setFormState(prevState => ({
            ...prevState,
            "tripStops": prevState.tripStops.filter(s => {return s !== stop})
        }))
    }

    const stopsList = state.tripStops.map((stop, index) => {
        return <ListItem key={index} className="trip-stop-item">
            <ListItemAvatar>
                <Avatar>
                    <Place/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                {stop}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton onClick={() => removeStop(stop)} edge="end">
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    })

    return <section className="trip-stops-container standard-padding">
        <form  onSubmit={handleSubmit}>
            <h2 className="mb-0">Czy zatrzymujesz się gdzieś po drodze?</h2>
            <p className="text-secondary mb-2">Ten krok jest opcjonalny, nie musisz dodawać pośrednich przystanków, jendka dzięki pośrednim przystankom w podróży mozesz zabrać więcej pasażerów.</p>
            <span className="add-stop-input-row">
                <TextField 
                    required 
                    inputRef={stopInput}
                    value={tripStop} 
                    onChange={e => setTripStop(e.target.value)} 
                    className="mb-width" 
                    id="outlined-basic" 
                    label="Przystanek pośredni" 
                    variant="outlined"
                />
                <Button onClick={validateForm} type="submit" variant="outlined" color="primary" startIcon={<Add/>}>
                    Dodaj przystanek
                </Button>
            </span>
        </form>
        <List>
            {stopsList}
        </List>
    </section>
}

export default AddTripStopsComponent