import { Container } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { ArrowForward, DriveEta } from "@material-ui/icons";
import TripCard from "../tripCard/tripCard";
import "./styles.css";

const TripsList = () => {

    return <Container className="content" maxWidth="md">
        <section className="panel-wrapper">
            <Paper className="trip-panel">
                <DriveEta fontSize="large" className="panel-icon"/>
                <div>
                    <h3 className="panel-location">Warszawa, Aleje Jerozolimskie 12&ensp;<ArrowForward className="text-secondary"/>&ensp;Siedlce, Sienkiewicza 20</h3>
                    <p className="panel-add-information">Wtorek, 18 Września, 1 Pasażer</p>        
                </div>
            </Paper>
        </section>
        <section className="full-width">
            <TripCard
                cssClass = "best-result"
                searchParameter = {cardParams.BEST_PRICE}
            />
            <TripCard
                cssClass = "best-result"
                searchParameter = {cardParams.BEST_TIME}
            />
        </section>
        <div className="filler"/>
        <section className="trip-list">
            {Array.from(Array(10).keys()).map(el => {
                return <TripCard/>
                })}
        </section>
    </Container>
}

export const cardParams = {
    BEST_PRICE: "Best price",
    BEST_TIME: "Best time"
}

export default TripsList