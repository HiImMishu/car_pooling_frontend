import { showAllert } from "../actions/alertActions";
import { ACCEPT_ENROLLMENT_REQUEST, ADD_TRIP, DELETE_TRIP, ENROLL_TO_TRIP, fetchEnrolledTripsReponse, fetchOwnedTripsResponse, fetchPastTripsResponse, fetchSearchedTripsResult, fetchTripById, fetchTripByIdResponse, FETCH_ENROLLED_TRIPS, FETCH_OWNED_TRIPS, FETCH_PAST_TRIPS, FETCH_SEARCHED_TRIPS, FETCH_TRIP_BY_ID, REJECT_ENROLLMENT_REQUEST, RESIGN_FROM_TRIP, UPDATE_TRIP } from "../actions/tripActions";
import { logout } from "../actions/userAction";

const tripFlow = ({api}) => ({dispatch}) => next => action => {
    switch(action.type) {
        case ADD_TRIP:
            api.tripApi.postTrip(action.token, action.payload)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 201) {
                        let alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Twój przejazd został dodany."
                        }
                        dispatch(showAllert(alertProps))
                    }
                })  
            break
        case UPDATE_TRIP:
            api.tripApi.updateTrip(action.token, action.payload)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        let alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Twój przejazd został zaktualizowany."
                        }
                        dispatch(showAllert(alertProps))
                    }
                })  
            break    
        case FETCH_OWNED_TRIPS:
            api.tripApi.fetchOwnedTrips(action.token)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        dispatch(fetchOwnedTripsResponse({...res}))
                    }
                })
            break
        case FETCH_ENROLLED_TRIPS:
            api.tripApi.fetchEnrolledTrips(action.token)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        dispatch(fetchEnrolledTripsReponse(res))
                    }
                })
            break
        case FETCH_TRIP_BY_ID:
            api.tripApi.fetchTripById(action.tripId)
                .then(res => {
                    if(res.status === 200) {
                        dispatch(fetchTripByIdResponse({...res}))
                    }
                })
            break
        case DELETE_TRIP:
            api.tripApi.deleteTrip(action.token, action.tripId)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 204) {
                        let alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Twój przejazd został usunięty."
                        }
                        dispatch(showAllert(alertProps))
                    }
                })
            break
        case ENROLL_TO_TRIP:
            api.tripApi.enrollToTrip(action.token, action.tripId)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 204 && action.isAutoAccept) {
                        var alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Zostałeś zapisany na przejazd."
                        }
                    } else if (res.status === 204) {
                        alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Zostałeś zapisany na listę oczekujących. Kierowca musi zatwierdzić Twój udział."
                        }
                    }
                    dispatch(showAllert(alertProps))
                    dispatch(fetchTripById(action.tripId))
                })
            break
        case RESIGN_FROM_TRIP:
            api.tripApi.resignFromTrip(action.token, action.tripId)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 204) {
                        var alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Zostałeś wypisany z przejazdu."
                        }
                        dispatch(showAllert(alertProps))
                    }
                    dispatch(fetchTripById(action.tripId))
                })
            break
        case ACCEPT_ENROLLMENT_REQUEST:
            api.tripApi.acceptUserEnrollment(action.token, action.tripId, action.userId)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } 
                    dispatch(fetchTripById(action.tripId))
                })
            break
        case REJECT_ENROLLMENT_REQUEST:
            api.tripApi.rejectUserEnrollment(action.token, action.tripId, action.userId)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } 
                    dispatch(fetchTripById(action.tripId))
                })
            break
        case FETCH_PAST_TRIPS:
            api.tripApi.fetchPastTrips(action.token)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        dispatch(fetchPastTripsResponse({...res}))
                    }
                })
            break
        case FETCH_SEARCHED_TRIPS:
            api.tripApi.fetchMatchingTrips(action.searchCriteria)
                .then(res => {
                    if(res.status === 200) {
                        dispatch(fetchSearchedTripsResult({...res}))
                    }
                })
            break
        default:
            break
    }

    next(action)
}

export default tripFlow