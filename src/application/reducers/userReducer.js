import { CLEAR_LOGIN_USER_RESPONSE, FETCH_USER_RESPONSE, FETCH_USER_BY_ID_RESPONSE, INITIALIZE_TOKEN, LOGIN_USER_RESPONSE, LOGOUT, REGISTER_USER_RESPONSE, NOTIFICATION_IS_READ, ADD_NOTIFICATION, FETCH_INITIAL_MESSAGES_RESULT, FETCH_PAGE_OF_MESSAGES_RESPONSE } from "../actions/userAction";

const initialState = {
    token: null,
    notifications: [],
    messagePages: {}
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
        case ADD_NOTIFICATION:
            const notification = JSON.parse(action.notification)
            return {...state, notifications: [...state.notifications.filter(n => parseInt(n.id) !== parseInt(notification.id)), notification]}
        case FETCH_INITIAL_MESSAGES_RESULT:
            return {...state, initialMessages: action.initialMessages}
        case FETCH_PAGE_OF_MESSAGES_RESPONSE:
            return {...state, messagePages: {...state.messagePages, [action.id]: [...action.page.content]}}
        default:
            return state
    }
}

export default userReducer