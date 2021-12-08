import { FETCH_ENROLLED_TRIPS_RESPONSE, FETCH_OWNED_TRIPS_RESPONSE, FETCH_PAST_TRIPS_RESPONSE, FETCH_SEARCHED_TRIPS_RESULT, FETCH_TRIP_BY_ID_RESPONSE, SET_SEARCH_CRITERIA } from "../actions/tripActions"

const initialState = {}

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
        case SET_SEARCH_CRITERIA:
            return {...state, searchCriteria: {...action.searchCriteria}}
        case FETCH_SEARCHED_TRIPS_RESULT:
            return {...state, matchingTrips: [...action.matchingTrips]}
        default:
            return state
    }
}

export default tripReducer