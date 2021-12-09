import { Button, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, TextField } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRating, updateRating } from "../../application/actions/userAction";
import { actualTripSelector } from "../../application/selectors/tripSelector";
import { tokenSelector } from "../../application/selectors/userSelector";

const RatingDialogComponent = ({isOpen, setIsOpen, isUpdate, rating}) => {
    const [ratingLevel, setRatingLevel] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const token = useSelector(tokenSelector)
    const trip = useSelector(actualTripSelector)

    useEffect(() => {
        if (isUpdate) {
            setRatingLevel(rating.ratingLevel)
            setDescription(rating.description)
        }
    }, [isUpdate, rating?.ratingLevel, rating?.description, isOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isUpdate) {
            const payload = {
                id: rating.id,
                ratingLevel: ratingLevel,
                description: description,
                tripId: rating.tripId,
                hostId: rating.host.id
            }
            dispatch(updateRating(payload, token))
        } else {
            const payload = {
                ratingLevel: ratingLevel,
                description: description,
                tripId: trip.id,
                hostId: trip.owner.id
            }
            dispatch(addRating(payload, token))
        }
        setIsOpen(false)
    }

    const handleRatingChange = (e) => {
        setRatingLevel(e.target.value)
    }

    const handleDescriptionchange = (e) => {
        setDescription(e.target.value)
    }

    return <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>
            {isUpdate ? 'Aktualizacja oceny użytkownika' : 'Nowa ocena użytkownika'}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>Wypełniż poniższy formularz aby {isUpdate ? 'zaktualizować' : 'dodać'} ocenę</DialogContentText>
            <form className="update-user-form" onSubmit={handleSubmit}>
                <FormControl variant="outlined">
                    <InputLabel id="rating-level-label">Ocena</InputLabel>
                    <Select
                        required
                        labelId="rating-level-label"
                        id="rating-level-select"
                        value={ratingLevel}
                        onChange={handleRatingChange}
                    >
                        <MenuItem value={5}>Super</MenuItem>
                        <MenuItem value={4}>Dobrze</MenuItem>
                        <MenuItem value={3}>W porządku</MenuItem>
                        <MenuItem value={2}>Słabo</MenuItem>
                        <MenuItem value={1}>Fatalnie</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    value={description}
                    onChange={handleDescriptionchange}
                    name="description"
                    id="outlined-basic"
                    label="Ocena pisemna"
                    variant="outlined"
                    multiline={true}
                    maxRows={3}
                    minRows={2}
                >

                </TextField>
                <DialogActions>
                    <Button type="submit" color="primary">Zapisz</Button>
                    <Button color="primary" onClick={() => setIsOpen(false)}>Anuluj</Button>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
}

export default RatingDialogComponent