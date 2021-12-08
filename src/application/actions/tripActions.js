export const ADD_TRIP = 'ADD_TRIP'
export const UPDATE_TRIP = 'UPDATE_TRIP'
export const FETCH_OWNED_TRIPS = 'FETCH_OWNED_TRIPS'
export const FETCH_OWNED_TRIPS_RESPONSE = 'FETCH_OWNED_TRIPS_RESPONSE'
export const FETCH_TRIP_BY_ID = 'FETCH_TRIP_BY_ID'
export const FETCH_TRIP_BY_ID_RESPONSE = 'FETCH_TRIP_BY_ID_RESPONSE'
export const FETCH_ENROLLED_TRIPS = 'FETCH_ENROLLED_TRIPS'
export const FETCH_ENROLLED_TRIPS_RESPONSE = 'FETCH_ENROLLED_TRIPS_RESPONSE'
export const DELETE_TRIP = 'DELETE_TRIP'
export const ENROLL_TO_TRIP = 'ENROLL_TO_TRIP'
export const RESIGN_FROM_TRIP = 'RESIGN_FROM_TRIP'
export const ACCEPT_ENROLLMENT_REQUEST = 'ACCEPT_ENROLLMENT_REQUEST'
export const REJECT_ENROLLMENT_REQUEST = 'REJECT_ENROLLMENT_REQUEST'
export const FETCH_PAST_TRIPS = 'FETCH_PAST_TRIPS'
export const FETCH_PAST_TRIPS_RESPONSE = 'FETCH_PAST_TRIPS_RESPONSE'
export const SET_SEARCH_CRITERIA = 'SET_SEARCH_CRITERIA'
export const FETCH_SEARCHED_TRIPS = 'FETCH_SEARCHED_TRIPS'
export const FETCH_SEARCHED_TRIPS_RESULT = 'FETCH_SEARCHED_TRIPS_RESULT'

export const addTrip = (token, payload) => ({
    type: ADD_TRIP,
    payload: payload,
    token: token
})

export const updateTrip = (token, payload) => ({
    type: UPDATE_TRIP,
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

export const fetchTripById = tripId => ({
    type: FETCH_TRIP_BY_ID,
    tripId: tripId
})

export const fetchTripByIdResponse = response => ({
    type: FETCH_TRIP_BY_ID_RESPONSE,
    status: response.status,
    trip: response.trip
})

export const fetchEnrolledTrips = token => ({
    type: FETCH_ENROLLED_TRIPS,
    token: token
})

export const fetchEnrolledTripsReponse = response => ({
    type: FETCH_ENROLLED_TRIPS_RESPONSE,
    enrolledTrips: response.enrolledTrips
})

export const deleteTrip = (token, tripId) => ({
    type: DELETE_TRIP,
    token: token,
    tripId: tripId
})

export const enrollToTrip = (token, tripId, isAutoAccept) => ({
    type: ENROLL_TO_TRIP,
    token: token,
    tripId: tripId,
    isAutoAccept: isAutoAccept
})

export const resignFromTrip = (token, tripId) => ({
    type: RESIGN_FROM_TRIP,
    token: token,
    tripId: tripId
})

export const acceptEnrollmentRequest = (token, tripId, userId) => ({
    type: ACCEPT_ENROLLMENT_REQUEST,
    token: token,
    tripId: tripId,
    userId: userId
})

export const rejectEnrollmentRequest = (token, tripId, userId) => ({
    type: REJECT_ENROLLMENT_REQUEST,
    token: token,
    tripId: tripId,
    userId: userId
})

export const fetchPastTrips = token => ({
    type: FETCH_PAST_TRIPS,
    token: token
})

export const fetchPastTripsResponse = response => ({
    type: FETCH_PAST_TRIPS_RESPONSE,
    status: response.status,
    pastTrips: response.pastTrips
})

export const setSearchCriteria = (startingPlace, endingPlace, tripDate) => ({
    type: SET_SEARCH_CRITERIA,
    searchCriteria: {
        startingPlace: startingPlace,
        endingPlace: endingPlace,
        tripDate: tripDate
    }
})

export const fetchSearchedTrips = (criteria) => ({
    type: FETCH_SEARCHED_TRIPS,
    searchCriteria: {...criteria}
})

export const fetchSearchedTripsResult = (response) => ({
    type: FETCH_SEARCHED_TRIPS_RESULT,
    status: response.status,
    matchingTrips: response.matchingTrips
})