export const REGISTER_USER = 'REGISTER_USER_ACTION'
export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE_ACTION'

export const registerUser = payload => ({
    type: REGISTER_USER,
    payload: payload
})

export const registerUserResponse = response => ({
    type: REGISTER_USER_RESPONSE,
    response: response
})