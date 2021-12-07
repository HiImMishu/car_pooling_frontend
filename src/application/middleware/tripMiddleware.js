import { showAllert } from "../actions/alertActions";
import { ADD_TRIP, DELETE_TRIP, ENROLL_TO_TRIP, fetchEnrolledTripsReponse, fetchOwnedTripsResponse, fetchTripById, fetchTripByIdResponse, FETCH_ENROLLED_TRIPS, FETCH_OWNED_TRIPS, FETCH_TRIP_BY_ID, UPDATE_TRIP } from "../actions/tripActions";
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
        default:
            break
    }

    next(action)
}

export default tripFlow