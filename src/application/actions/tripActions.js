export const ADD_TRIP = 'ADD_TRIP'
export const FETCH_OWNED_TRIPS = 'FETCH_OWNED_TRIPS'
export const FETCH_OWNED_TRIPS_RESPONSE = 'FETCH_OWNED_TRIPS_RESPONSE'

export const addTrip = (token, payload) => ({
    type: ADD_TRIP,
    payload: payload,
    token: token
})

export const fetchOwnedTrips = token => ({
    type: FETCH_OWNED_TRIPS,
    token: token
})

export const fetchOwnedTripsResponse = response => ({
    type: FETCH_OWNED_TRIPS_RESPONSE,
    status: response.status,
    ownedTrips: response.ownedTrips
})