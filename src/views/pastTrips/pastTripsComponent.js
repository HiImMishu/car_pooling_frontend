import { withStyles, Container, Divider } from "@material-ui/core";
import TripCard from "../tripCard/tripCard";
import { useDispatch, useSelector } from "react-redux";
import { pastTripsSelector } from "../../application/selectors/tripSelector";
import { useEffect } from 'react';
import { fetchPastTrips } from "../../application/actions/tripActions";
import { tokenSelector } from "../../application/selectors/userSelector";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const PastTripsComponent = () => {
    const dispatch = useDispatch()
    const pastTrips = useSelector(pastTripsSelector)
    const token = useSelector(tokenSelector)

    useEffect(() => {
        dispatch(fetchPastTrips(token))
    }, [dispatch, token])

    return <StyledContainer className="content standard-padding" maxWidth="md">
        <header className="mt-2">
            <h1 className="my-trips-heading">Poniżej znajduje się lista przeszłych podróży</h1>
        </header>
        <Divider className="mt-1 mb-1"/>
        <section className="trip-list">
            {pastTrips?.map((trip) => {
                return <TripCard key={trip.id} trip={trip}/>
            })}
        </section>
    </StyledContainer>
}

export default PastTripsComponent