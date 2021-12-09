export const REGISTER_USER = 'REGISTER_USER_ACTION'
export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE_ACTION'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE' 
export const CLEAR_LOGIN_USER_RESPONSE = 'CLEAR_LOGIN_USER_RESPONSE'
export const INITIALIZE_TOKEN = 'INITIALIZE_TOKEN'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_RESPONSE = 'FETCH_USER_RESULT'
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID'
export const FETCH_USER_BY_ID_RESPONSE = 'FETCH_USER__BY_ID_RESPONSE'
export const LOGOUT = 'LOG_OUT'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_RATING = 'UPDATE_RATING'
export const ADD_RATING = 'ADD_RATING'

export const registerUser = payload => ({
    type: REGISTER_USER,
    payload: payload
})

export const registerUserResponse = response => ({
    type: REGISTER_USER_RESPONSE,
    response: response
})

export const loginUser = payload => ({
    type: LOGIN_USER,
    payload: payload
})

export const loginResponse = response => ({
    type: LOGIN_USER_RESPONSE,
    response: response
})

export const clearLoginResponse = ({
    type: CLEAR_LOGIN_USER_RESPONSE,
})

export const initializeToken = token => ({
    type: INITIALIZE_TOKEN,
    token: token
})

export const fetchUser = token => ({
    type: FETCH_USER,
    token: token
})

export const fetchUserResponse = response => ({
    type: FETCH_USER_RESPONSE,
    response: response
})

export const fetchUserById = userId => ({
    type: FETCH_USER_BY_ID,
    userId: userId
})

export const fetchUserByIdResponse = response => ({
    type: FETCH_USER_BY_ID_RESPONSE,
    response: response
})

export const logout = ({
    type: LOGOUT
})

export const updateUser = (payload, token) => ({
    type: UPDATE_USER,
    payload: payload,
    token: token
})

export const updateRating = (payload, token) => ({
    type: UPDATE_RATING,
    payload: payload,
    token: token
})

export const addRating = (payload, token) => ({
    type: ADD_RATING,
    payload: payload,
    token: token
})