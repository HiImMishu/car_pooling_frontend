import { combineReducers } from "redux";
import testReducer from "./testReducer";
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";

const reducers = combineReducers({
    testReducer,
    userReducer,
    alertReducer
})

export default reducers