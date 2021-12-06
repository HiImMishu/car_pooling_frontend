import { withStyles, Container, Divider } from "@material-ui/core";
import TripCard from "../tripCard/tripCard";
import { useDispatch, useSelector } from "react-redux";
import { enrolledTripsSelector } from "../../application/selectors/tripSelector";
import { useEffect } from 'react';
import { fetchEnrolledTrips } from "../../application/actions/tripActions";
import { tokenSelector } from "../../application/selectors/userSelector";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const EnrolledTripsComponent = () => {
    const dispatch = useDispatch()
    const enrolledTrips = useSelector(enrolledTripsSelector)
    const token = useSelector(tokenSelector)

    useEffect(() => {
        dispatch(fetchEnrolledTrips(token))
    }, [dispatch, token])

    return <StyledContainer className="content standard-padding" maxWidth="md">
        <header className="mt-2">
            <h1 className="my-trips-heading">Poniżej znajduje się lista przejzdów na które jesteś zapisany</h1>
        </header>
        <Divider className="mt-1 mb-1"/>
        <section className="trip-list">
            {enrolledTrips?.map((trip) => {
                return <TripCard key={trip.id} trip={trip}/>
            })}
        </section>
    </StyledContainer>
}

export default EnrolledTripsComponent