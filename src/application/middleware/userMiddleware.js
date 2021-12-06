import { fetchUser, fetchUserByIdResponse, fetchUserResponse, FETCH_USER, FETCH_USER_BY_ID, loginResponse, LOGIN_USER, logout, registerUserResponse, REGISTER_USER, UPDATE_USER } from "../actions/userAction";

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
        default:
            break
    }

    next(action)
}

const userMiddleware = [
    registerUserFlow
]

export default userMiddleware