import { registerUserResponse, REGISTER_USER } from "../actions/userAction";

const registerUserFlow = ({api}) => ({dispatch}) => next => action => {
    if (action.type === REGISTER_USER) {
        api.userApi.registerUser(action.payload)
            .then(res => {
                dispatch(registerUserResponse(res))
            })
    }

    next(action)
}

export default [
    registerUserFlow
]