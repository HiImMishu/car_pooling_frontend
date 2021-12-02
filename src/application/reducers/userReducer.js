import { CLEAR_LOGIN_USER_RESPONSE, FETCH_USER_RESPONSE, INITIALIZE_TOKEN, LOGIN_USER_RESPONSE, LOGOUT, REGISTER_USER_RESPONSE } from "../actions/userAction";

const initialState = {
    token: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER_RESPONSE:
            return {...state, ...action.response}
        case LOGIN_USER_RESPONSE:
            return {...state, loginStatus: action.response.status, token: action.response.token}
        case CLEAR_LOGIN_USER_RESPONSE:
            return {...state, loginStatus: null}
        case INITIALIZE_TOKEN:
            return {...state, token: action.token}
        case FETCH_USER_RESPONSE:
            return {...state, user: {...action.response}}
        case LOGOUT:
            return {token: null}
        default:
            return state
    }
}

export default userReducer