export const GET_TEST_DATA = 'get test data'
export const SET_TEST_DATA = 'set test data'

export const setTestData = testData => ({
    type: SET_TEST_DATA,
    payload: testData
})

export const getTestData = ({
    type: GET_TEST_DATA
})