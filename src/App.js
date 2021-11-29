import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { testData } from './application/selectors/testSelector';
import { useEffect } from 'react';
import { getTestData } from './application/actions/testActions';
import HomeComponent from './views/home/homeComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './views/navbar/navbar';
import TripsList from './views/tripsList/tripsList';
import TripComponent from './views/tripInformation/tripComponent';
import UserInformationComponent from './views/user/userInformationComponent';
import UserReviewsComponent from './views/userReviews/userReviewsComponent';
import TripReservationComponent from './views/tripReservation/tripReservationComponent';
import AddTripComponent from './views/addTrip/addTripComponent';
import UserTripsComponent from './views/userTrips/userTripsComponent';
import UpdateTripComponent from './views/updateTrip/UpdateTripComponent';
import UserProfileComponent from './views/userProfile/userProfileComponent';
import MessagesComponent from './views/messages/messagesComponent';

function App() {
  const data = useSelector(testData)
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(dispatch(getTestData), 5000)
  }, [dispatch])


  return (
    <div className="main">
      <Router>
        <Navbar/>
        <Switch>
            <Route exact path="/">
              <HomeComponent/>
            </Route>
            <Route exact path="/search">
              <TripsList/>
            </Route>
            <Route exact path="/search/:id">
              <TripComponent/>
            </Route>
            <Route exact path="/search/:id/reservation">
              <TripReservationComponent/>
            </Route>
            <Route exact path="/user/:userId">
              <UserInformationComponent/>
            </Route>
            <Route exact path="/user/:userId/reviews">
              <UserReviewsComponent/>
            </Route>
            <Route exact path="/user/:userId/profile">
              <UserProfileComponent/>
            </Route>
            <Route exact path="/add-trip">
              <AddTripComponent/>
            </Route>
            <Route exact path="/update-trip/:id">
              <UpdateTripComponent/>
            </Route>
            <Route exact path="/my-trips">
              <UserTripsComponent/>
            </Route>
            <Route exact path="/messages">
              <MessagesComponent/>
            </Route>
        </Switch>
      </Router>
      <footer>
        <p className="footer-text">
            Aplikacja wykonana na potrzeby realizacji Pracy Inżynierskiej. Wszelkie prawa zastrzeżone. Michał Misiak &copy;
        </p>
      </footer>
    </div>    
  )
}

export default App;
