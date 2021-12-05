export const ADD_TRIP = 'ADD_TRIP'

export const addTrip = (token, payload) => ({
    type: ADD_TRIP,
    payload: payload,
    token: token
})