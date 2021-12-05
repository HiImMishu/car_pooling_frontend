import { FETCH_OWNED_TRIPS_RESPONSE, FETCH_TRIP_BY_ID_RESPONSE } from "../actions/tripActions"

const initialState = {
    searchCriteria: {
        tripDate: "2021-12-05T20:10:15.994546"
    }
}

const tripReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_OWNED_TRIPS_RESPONSE:
            return {...state, ownedTrips: action.ownedTrips}
        case FETCH_TRIP_BY_ID_RESPONSE:
            return {...state, trip: action.trip}
        default:
            return state
    }
}

export default tripReducer