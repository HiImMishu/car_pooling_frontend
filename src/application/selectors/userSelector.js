export const registrationResult = state => state.userReducer.response
export const loginResultSelector = state => state.userReducer.loginStatus
export const tokenSelector = state => state.userReducer.token
export const activeUserSelector = state => state.userReducer.user
export const fetchedUserSelector = state => state.userReducer.fetchedUser
export const notificationsSelector = state => state.userReducer.notifications
export const initialMessagesSelector = state => state.userReducer.initialMessages
export const messagesSelector = state => state.userReducer.messagePages