import { FETCH_ENROLLED_TRIPS_RESPONSE, FETCH_OWNED_TRIPS_RESPONSE, FETCH_PAST_TRIPS_RESPONSE, FETCH_TRIP_BY_ID_RESPONSE } from "../actions/tripActions"

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
        case FETCH_ENROLLED_TRIPS_RESPONSE:
            return {...state, enrolledTrips: action.enrolledTrips}
        case FETCH_PAST_TRIPS_RESPONSE:
            return {...state, pastTrips: action.pastTrips}
        default:
            return state
    }
}

export default tripReducer