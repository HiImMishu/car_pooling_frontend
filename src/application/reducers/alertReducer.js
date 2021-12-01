import { CLOSE_ALERT, SHOW_ALLERT } from "../actions/alertActions";

const initialState = {
    alert: {
        open: false,
        type: "success",
        button: null,
        message: ""
    }
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALLERT:
            return {...state, alert: {...action.props}}
        case CLOSE_ALERT:
            return {...state, alert: {...initialState.alert}}
        default:
            break
    }
    return state
}

export default alertReducer