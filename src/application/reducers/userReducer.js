import { CLEAR_LOGIN_USER_RESPONSE, FETCH_USER_RESPONSE, FETCH_USER_BY_ID_RESPONSE, INITIALIZE_TOKEN, LOGIN_USER_RESPONSE, LOGOUT, REGISTER_USER_RESPONSE, NOTIFICATION_IS_READ } from "../actions/userAction";

const initialState = {
    token: null,
    notifications: []
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
            return {...state, user: {...action.response}, notifications: [...action.response.notifications]}
        case LOGOUT:
            return {token: null}
        case FETCH_USER_BY_ID_RESPONSE:
            return {...state, fetchedUser: {...action.response}}
        case NOTIFICATION_IS_READ:
            return {...state, notifications: [...state.notifications.filter(n => parseInt(n.id) !== parseInt(action.notificationId))]}
        default:
            return state
    }
}

export default userReducer