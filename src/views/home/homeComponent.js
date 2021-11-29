import HomeCard from '../homeCard/homeCard';
import SearchBar from '../searchBar/searchBar';
import saveMoneyImg from '../../assets/images/save-money.png';
import shareRideImg from '../../assets/images/share-ride.png';
import ecologyImg from '../../assets/images/ecology.png';
import './styles.css';
import { useEffect } from 'react';

const HomeComponent = () => {

    useEffect(() => {
        document.title = "HopInAndGo - Współdzielenie przejazdów"
    }, [])

    return <main>
        <section className="search-bar">
            <SearchBar/>
        </section>
        <section className="cards">
            <HomeCard
                img = {saveMoneyImg}
                title = {"Oszczędności"}
                text = {"Dzięki współdzieleniu przejazdów obniżamy koszty utrzymania samochodu, wydatków na paliwo i miejsca parkingowe. Oszczędzaj razem z nami!"}
            />
            <HomeCard
                img = {shareRideImg}
                title = {"Nowe znajomości"}
                text = {"Słuchanie muzyi czy krótka pogawędka? Dzięki podróżowaniu w większym gronie pojawia się okazja nowych znajomości. Wybór należy do Ciebie!"}
            />
            <HomeCard
                img = {ecologyImg}
                title = {"Ekologia"}
                text = {"Dzięki zmniejszeniu ilości poruszających się pojazdów zmiejszasz ilość szkodliwych substancji emitowanych do atmosfery!"}
            />
        </section>
    </main>
}

export default HomeComponent