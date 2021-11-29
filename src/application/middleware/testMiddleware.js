import { GET_TEST_DATA, setTestData } from "../actions/testActions"

const testFlow = ({api}) => ({dispatch}) => next => action => {

    if (action.type === GET_TEST_DATA) {
        const testData = api.testApi.getAll()
        dispatch(setTestData(testData))
    }
    
    next(action)
}

export default [
    testFlow
]