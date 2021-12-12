import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { alertSelector } from './application/selectors/alertSelector';
import React, { useEffect, useState } from 'react';
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
import { tokenSelector } from './application/selectors/userSelector';
import { addNotification, fetchUnreadMessagesCount, fetchUser, initializeToken } from './application/actions/userAction';
import PrivateRoute from './privateRoute';
import EnrolledTripsComponent from './views/enrolledTrips/enrolledTripsComponent';
import PastTripsComponent from './views/pastTrips/pastTripsComponent';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'

function App() {
  const alert = useSelector(alertSelector)
  const dispatch = useDispatch()
  const token = useSelector(tokenSelector)
  const [stompClient, setStompClient] = useState(null) 
  const [socket, setSocket] = useState(null)
  
  const hideAlert = () => {
    dispatch(closeAlert)
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  useEffect(() => {
    if (socket === null && token) {
      const soc = new SockJS('http://localhost:8080/looping')
      setSocket(soc)
    }
  }, [socket, token])

  useEffect(() => {
    if (socket !== null && token && !stompClient?.connected) {
      const client = Stomp.over(socket)
      setStompClient(client)

      client.connect({"X-Authorization": "Bearer " + token}, _frame => {
        client.subscribe(`/user/queue/notifications`, message => {
          dispatch(addNotification(message.body))
        })
      })
    } 
  }, [token, socket, stompClient?.connected])

  useEffect(() => {
      let localToken = localStorage.getItem('Token')
      if (localToken && localToken !== token) {
          dispatch(initializeToken(localToken))
      }
  }, [dispatch])

  useEffect(() => {
      let localToken = localStorage.getItem('Token')
      if (token && token !== localToken) {
        localStorage.setItem('Token', token)
      }
      if (token) {
        dispatch(fetchUser(token))
        dispatch(fetchUnreadMessagesCount(token))
      }
      if(token === null && stompClient?.connected) {
        stompClient.disconnect(null, {"X-Authorization": "Bearer " + localToken})
        socket.close()
        setSocket(null)
      } 
      if (token === null) {
        localStorage.removeItem('Token')
      }
  }, [token, dispatch])

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
            <PrivateRoute exact path="/search/:id/reservation" component={TripReservationComponent}/>
            <Route exact path="/user/:userId">
              <UserInformationComponent/>
            </Route>
            <Route exact path="/user/:userId/reviews">
              <UserReviewsComponent/>
            </Route>
            <PrivateRoute exact path="/user/:userId/profile" component={UserProfileComponent}/>
            <PrivateRoute exact path="/add-trip" component={AddTripComponent}/>
            <PrivateRoute exact path="/update-trip/:id" component={UpdateTripComponent}/>
            <PrivateRoute exact path="/my-trips" component={UserTripsComponent}/>
            <PrivateRoute exact path="/past-trips" component={PastTripsComponent}/>
            <PrivateRoute exact path="/my-enrollments" component={EnrolledTripsComponent}/>
            <PrivateRoute exact path="/messages" component={MessagesComponent}/>
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
