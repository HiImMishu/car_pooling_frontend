import { withStyles, Container, Divider } from "@material-ui/core";
import TripCard from "../tripCard/tripCard";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { ownedTripsSelector } from "../../application/selectors/tripSelector";
import { useEffect } from 'react';
import { fetchOwnedTrips } from "../../application/actions/tripActions";
import { tokenSelector } from "../../application/selectors/userSelector";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserTripsComponent = () => {
    const dispatch = useDispatch()
    const ownedTrips = useSelector(ownedTripsSelector)
    const token = useSelector(tokenSelector)

    useEffect(() => {
        dispatch(fetchOwnedTrips(token))
    }, [])

    return <StyledContainer className="content standard-padding" maxWidth="md">
        <header className="mt-2">
            <h1 className="my-trips-heading">Poniżej znajduje się lista udostępnionych przez Ciebie ofert</h1>
        </header>
        <Divider className="mt-1 mb-1"/>
        <section className="trip-list">
            {ownedTrips?.map((trip) => {
                return <TripCard key={trip.id} trip={trip}/>
            })}
        </section>
    </StyledContainer>
}

export default UserTripsComponent