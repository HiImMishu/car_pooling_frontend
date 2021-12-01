import { combineReducers } from "redux";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";

const reducers = combineReducers({
    userReducer,
    alertReducer
})

export default reducers