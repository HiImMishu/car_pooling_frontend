import { withStyles, Container, Divider } from "@material-ui/core";
import TripCard from "../tripCard/tripCard";
import "./styles.css";

const StyledContainer = withStyles({
    maxWidthMd: {
        maxWidth: "50rem"
    }
  })(Container)

const UserTripsComponent = () => {

    return <StyledContainer className="content standard-padding" maxWidth="md">
        <header className="mt-2">
            <h1 className="my-trips-heading">Poniżej znajduje się lista udostępnionych przez Ciebie ofert</h1>
        </header>
        <Divider className="mt-1 mb-1"/>
        <section className="trip-list">
            {Array.from(Array(10).keys()).map(() => {
                return <TripCard tripDate="12/02/2021 18:30"/>
            })}
        </section>
    </StyledContainer>
}

export default UserTripsComponent