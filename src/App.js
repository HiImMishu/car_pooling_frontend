import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { alertSelector } from './application/selectors/alertSelector';
import React from 'react';
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
import LoginComponent from './views/login/loginComponent';
import RegisterUserComponent from './views/register/registerUserComponent';
import { IconButton, Slide, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';
import { closeAlert } from './application/actions/alertActions';

function App() {
  const alert = useSelector(alertSelector)
  const dispatch = useDispatch()

  const hideAlert = () => {
    dispatch(closeAlert)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return (
    <div className="main">
      <Router>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}    
          open={alert.open}
          onClose={() => hideAlert()}
          autoHideDuration={6000}
          TransitionComponent={Slide.name}
        >
          <Alert 
            severity={alert.type}
            action={
              <React.Fragment>
                {alert.button}
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => hideAlert()}>
                  <Close fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          >
            {alert.message}
          </Alert>
        </Snackbar>
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
            <Route exact path="/login">
              <LoginComponent/>
            </Route>
            <Route exact path="/register">
              <RegisterUserComponent/>
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
