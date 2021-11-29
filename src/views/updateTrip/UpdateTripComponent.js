import { useParams } from "react-router";
import AddTripComponent from "../addTrip/addTripComponent";
import approveImg from '../../assets/images/approve.png';
import freeSeat from '../../assets/images/free-seat.png';
import noAnimals from '../../assets/images/no-animals.png';
import noSmoking from '../../assets/images/no-smoking.png';
import chat from '../../assets/images/chat.png';
import music from '../../assets/images/musical-notes.png';

const UpdateTripComponent = () => {
    const { id } = useParams()
    const exampleState = {
        tripStartPlace: "Kraków",
        tripEndPlace: "Siedlce",
        tripStops: [
           "Warszawa",
           "Mińsk Mazowiecki 34"
        ],
        tripDates: [
           "2021-11-08T18:19:48.170Z",
           "2021-11-16T18:19:00.000Z"
        ],
        tripSeats: "2",
        tripAddInfo: [
           {
              id: 0,
              avatar: freeSeat,
              alt: "Wolne miejsce na tylnej kanapie",
              description: "Maks. dwie osoby na tylnym siedzeniu",
              checked: true
           },
           {
              id: 1,
              avatar: noSmoking,
              alt: "Nie palić",
              description: "Proszę, bez palenia w samochodzie",
              checked: true
           },
           {
              id: 2,
              avatar: noAnimals,
              alt: "Zakaz zwierząt",
              description: "Proszę, żadnych zwierząt w aucie",
              checked: false
           },
           {
              id: 3,
              avatar: chat,
              alt: "Rozmowa",
              description: "Chętnie rozmawiam",
              checked: false
           },
           {
              id: 4,
              avatar: music,
              alt: "Muzyka",
              description: "Muzyka? Nie ma problemu!",
              checked: true
           },
           {
              id: 5,
              avatar: approveImg,
              alt: "Potwierdzam automatycznie",
              description: "Potwierdzam automatycznie",
              checked: true
           }
        ],
        tripDescription: "Zapraszam!"
    }

    return <AddTripComponent 
        isUpdate = {true}
        initialState = {exampleState}
    />
}

export default UpdateTripComponent