import { SET_TEST_DATA, GET_TEST_DATA } from '../actions/testActions';

const initialState = {
    values: []
}

const testReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TEST_DATA:
            return {...state, values: action.payload}
        case GET_TEST_DATA:
            return {...state}
        default:
            return state
    }
}

export default testReducer