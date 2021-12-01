export const REGISTER_USER = 'REGISTER_USER_ACTION'
export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE_ACTION'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE' 
export const CLEAR_LOGIN_USER_RESPONSE = 'CLEAR_LOGIN_USER_RESPONSE'
export const INITIALIZE_TOKEN = 'INITIALIZE_TOKEN'

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