import { REGISTER_USER, REGISTER_USER_RESPONSE } from "../actions/userAction";

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return state
        case REGISTER_USER_RESPONSE:
            return {...state, ...action.response}
        default:
            return state
    }
}

export default userReducer