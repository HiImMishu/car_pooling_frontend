import { FETCH_OWNED_TRIPS_RESPONSE } from "../actions/tripActions"

const initialState = {}

const tripReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_OWNED_TRIPS_RESPONSE:
            return {...state, ownedTrips: action.ownedTrips}
        default:
            return state
    }
}

export default tripReducer