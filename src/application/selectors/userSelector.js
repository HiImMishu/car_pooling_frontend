export const registrationResult = state => state.userReducer.response
export const loginResultSelector = state => state.userReducer.loginStatus
export const tokenSelector = state => state.userReducer.token