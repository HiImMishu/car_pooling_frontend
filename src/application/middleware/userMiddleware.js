import { showAllert } from "../actions/alertActions";
import { fetchTripById } from "../actions/tripActions";
import { ADD_RATING, fetchInitialMessagesResult, fetchPageOfMessagesResponse, fetchUnreadMessagesCountResponse, fetchUser, fetchUserByIdResponse, fetchUserResponse, FETCH_INITIAL_MESSAGES, FETCH_PAGE_OF_MESSAGES, FETCH_UNREAD_MESSAGES_COUNT, FETCH_USER, FETCH_USER_BY_ID, loginResponse, LOGIN_USER, logout, notificationIsRead, READ_NOTIFICATION, registerUserResponse, REGISTER_USER, UPDATE_RATING, UPDATE_USER } from "../actions/userAction";

const registerUserFlow = ({api}) => ({dispatch}) => next => action => {
    switch(action.type) {
        case REGISTER_USER:
            api.userApi.registerUser(action.payload)
                .then(res => {
                    dispatch(registerUserResponse(res))
                })
            break
        case LOGIN_USER:
            api.userApi.loginUser(action.payload)
                .then(res => {
                    dispatch(loginResponse(res))
                })
            break
        case FETCH_USER:
            api.userApi.fetchUser(action.token)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else {
                        dispatch(fetchUserResponse(res.user))
                    }
                })
            break
        case UPDATE_USER:
            api.userApi.updateUser(action.token, action.payload)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else {
                        dispatch(fetchUser(action.token))
                    }
                })
            break
        case FETCH_USER_BY_ID:
            api.userApi.fetchUserById(action.userId)
                .then(res => {
                    if (res.status === 200) {
                        dispatch(fetchUserByIdResponse(res.user))
                    }
                })
            break
        case UPDATE_RATING:
            api.userApi.updateRating(action.token, action.payload)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        let alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Ocena została zaktualizowana."
                        }
                        dispatch(showAllert(alertProps))
                        dispatch(fetchTripById(action.payload.tripId))
                    }
                })
            break
        case ADD_RATING:
            api.userApi.addRating(action.token, action.payload)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 201) {
                        let alertProps = {
                            open: true,
                            type: "success",
                            button: null,
                            message: "Ocena została dodana."
                        }
                        dispatch(showAllert(alertProps))
                        dispatch(fetchTripById(action.payload.tripId))
                    }
                })
            break
        case READ_NOTIFICATION:
            api.userApi.dismissNotification(action.token, action.notificationId)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 204) {
                        dispatch(notificationIsRead(action.notificationId))
                    }
                })
            break
        case FETCH_INITIAL_MESSAGES:
            api.userApi.fetchInitialMessages(action.token)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        dispatch(fetchInitialMessagesResult(res.messages))
                    }
                })
            break
        case FETCH_PAGE_OF_MESSAGES:
            api.userApi.fetchPageOfMessages(action.token, action.id, action.size, action.number)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        dispatch(fetchPageOfMessagesResponse({messages: res.messages, id: action.id}))
                    }
                })
            break
        case FETCH_UNREAD_MESSAGES_COUNT:
            api.userApi.fetchUnreadMessagesCount(action.token)
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout)
                    } else if(res.status === 200) {
                        dispatch(fetchUnreadMessagesCountResponse(res.count))
                    }
                })
            break
        default:
            break
    }

    next(action)
}

const userMiddleware = [
    registerUserFlow
]

export default userMiddleware