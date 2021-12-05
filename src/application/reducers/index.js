import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import tripReducer from "./tripReducer";

const reducers = combineReducers({
    userReducer,
    alertReducer,
    tripReducer
})

export default reducers