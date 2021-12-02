import { fetchUserResponse, FETCH_USER, loginResponse, LOGIN_USER, logout, registerUserResponse, REGISTER_USER } from "../actions/userAction";

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
        default:
            break
    }

    next(action)
}

const userMiddleware = [
    registerUserFlow
]

export default userMiddleware