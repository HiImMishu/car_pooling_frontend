import { useParams } from "react-router";
import AddTripComponent from "../addTrip/addTripComponent";
import approveImg from '../../assets/images/approve.png';
import freeSeat from '../../assets/images/free-seat.png';
import noAnimals from '../../assets/images/no-animals.png';
import noSmoking from '../../assets/images/no-smoking.png';
import chat from '../../assets/images/chat.png';
import music from '../../assets/images/musical-notes.png';
import { useDispatch, useSelector } from "react-redux";
import { fetchTripById } from "../../application/actions/tripActions";
import { actualTripSelector } from "../../application/selectors/tripSelector";
import { tokenSelector } from "../../application/selectors/userSelector";
import { useEffect, useState } from "react";

const UpdateTripComponent = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const token = useSelector(tokenSelector)
   const trip = useSelector(actualTripSelector)
   const [initialState, setInitialState] = useState()

   useEffect(() => {
      if (token) {
         dispatch(fetchTripById(token, id))
      }
   }, [token])

   useEffect(() => {
      if (trip) {
         setInitialState({
            id: id,
            tripStartPlace: trip.startingPlace,
            tripEndPlace: trip.endingPlace,
            tripStops: trip.additionalStops,
            tripDate: trip.tripDate,
            tripSeats: trip.allSeats,
            costPerSeat: trip.costPerSeat,
            tripAddInfo: [
                {
                    id: 0,
                    avatar: freeSeat,
                    alt: "Wolne miejsce na tylnej kanapie",
                    description: "Maks. dwie osoby na tylnym siedzeniu",
                    checked: trip.emptyThirdSeat
                },
                {
                    id: 1,
                    avatar: noSmoking,
                    alt: "Nie palić",
                    description: "Proszę, bez palenia w samochodzie",
                    checked: trip.noSmoking
                },
                {
                    id: 2,
                    avatar: noAnimals,
                    alt: "Zakaz zwierząt",
                    description: "Proszę, żadnych zwierząt w aucie",
                    checked: trip.noAnimals
                },
                {
                    id: 3,
                    avatar: chat,
                    alt: "Rozmowa",
                    description: "Chętnie rozmawiam",
                    checked: trip.talkative
                },
                {
                    id: 4,
                    avatar: music,
                    alt: "Muzyka",
                    description: "Muzyka? Nie ma problemu!",
                    checked: trip.music
                },
                {
                    id: 5,
                    avatar: approveImg,
                    alt: "Potwierdzam automatycznie",
                    description: "Potwierdzam automatycznie",
                    checked: trip.autoAccept
                }
            ],
            tripDescription: trip.description
        })
      }
   }, [trip])

   return <AddTripComponent 
      isUpdate = {true}
      initialState = {initialState}
   />
}

export default UpdateTripComponent