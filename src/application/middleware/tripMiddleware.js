import { showAllert } from "../actions/alertActions";
import { ADD_TRIP, fetchOwnedTripsResponse, FETCH_OWNED_TRIPS } from "../actions/tripActions";
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
        default:
            break
    }

    next(action)
}

export default tripFlow