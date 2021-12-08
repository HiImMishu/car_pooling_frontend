import { Container } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { ArrowForward, DriveEta } from "@material-ui/icons";
import TripCard from "../tripCard/tripCard";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { matchingTripsSelector, tripSearchCriteriaSelector } from '../../application/selectors/tripSelector';
import { useEffect, useState } from "react";
import { fetchSearchedTrips } from '../../application/actions/tripActions';
import { useHistory } from "react-router";

const TripsList = () => {
    const searchCriteria = useSelector(tripSearchCriteriaSelector)
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    const dispatch = useDispatch()
    const matchingTrips = useSelector(matchingTripsSelector)
    const history = useHistory()
    const [fastestTimeTrip, setFastestTimeTrip] = useState(null)
    const [cheapestTrip, setCheapestTrip] = useState(null)
    const [trips, setTrips] = useState([])
    
    useEffect(() => {
        if (searchCriteria) {
            dispatch(fetchSearchedTrips(searchCriteria))
        } else {
            history.push("/")
        }
    }, [searchCriteria, dispatch, history])

    useEffect(() => {
        if (matchingTrips?.length > 2) {
            const fastestTrip = matchingTrips.reduce((prev, current) => {
                return (new Date(prev.tripDate).getTime() <= new Date(current.tripDate).getTime()) ? prev : current  
            })
            setFastestTimeTrip(fastestTrip)
            const cheapest = matchingTrips.reduce((prev, current) => {
                return prev.costPerSeat <= current.costPerSeat ? prev : current  
            })
            setCheapestTrip(cheapest)
            setTrips(matchingTrips.filter(trip => trip.id !== fastestTrip.id && trip.id !== cheapest.id ))
        } else {
            setTrips(matchingTrips)
        }
    }, [matchingTrips])

    return <Container className="content" maxWidth="md">
        <section className="panel-wrapper">
            <Paper className="trip-panel">
                <DriveEta fontSize="large" className="panel-icon"/>
                <div>
                    <h3 className="panel-location">{searchCriteria?.startingPlace}&ensp;<ArrowForward className="text-secondary"/>&ensp;{searchCriteria?.endingPlace}</h3>
                    <p className="panel-add-information">{new Date(searchCriteria?.tripDate).toLocaleString("pl-PL", options)}</p>        
                </div>
            </Paper>
        </section>
        {matchingTrips?.length >= 3 && <><section className="full-width">
            <TripCard
                cssClass = "best-result"
                searchParameter = {cardParams.BEST_PRICE}
                trip={cheapestTrip}
            />
            <TripCard
                cssClass = "best-result"
                searchParameter = {cardParams.BEST_TIME}
                trip={fastestTimeTrip}
            />
        </section>
        <div className="filler"/></>}
        <section className="trip-list">
            {trips?.map(trip => {
                return <TripCard key={trip.id} trip={trip}/>
            })}
        </section>
    </Container>
}

export const cardParams = {
    BEST_PRICE: "Best price",
    BEST_TIME: "Best time"
}

export default TripsList