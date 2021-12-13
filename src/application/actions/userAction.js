export const REGISTER_USER = 'REGISTER_USER_ACTION'
export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE_ACTION'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE' 
export const CLEAR_LOGIN_USER_RESPONSE = 'CLEAR_LOGIN_USER_RESPONSE'
export const INITIALIZE_TOKEN = 'INITIALIZE_TOKEN'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_RESPONSE = 'FETCH_USER_RESULT'
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID'
export const FETCH_USER_BY_ID_RESPONSE = 'FETCH_USER__BY_ID_RESPONSE'
export const LOGOUT = 'LOG_OUT'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_RATING = 'UPDATE_RATING'
export const ADD_RATING = 'ADD_RATING'
export const READ_NOTIFICATION = 'READ_NOTIFICATION'
export const NOTIFICATION_IS_READ = 'NOTIFICATION_IS_READ'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const FETCH_INITIAL_MESSAGES = 'FETCH_INITIAL_MESSAGES'
export const FETCH_INITIAL_MESSAGES_RESULT = 'FETCH_INITIAL_MESSAGES_RESULT'
export const FETCH_PAGE_OF_MESSAGES = 'FETCH_PAGE_OF_MESSAGES'
export const FETCH_PAGE_OF_MESSAGES_RESPONSE = 'FETCH_PAGE_OF_MESSAGES_RESPONSE'
export const FETCH_UNREAD_MESSAGES_COUNT = 'FETCH_UNREAD_MESSAGES_COUNT'
export const FETCH_UNREAD_MESSAGES_COUNT_RESPONSE = 'FETCH_UNREAD_MESSAGES_COUNT_RESPONSE'
export const MARK_THREAD_AS_READ = 'MARK_THREAD_AS_READ'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_MESSAGE_RESPONSE = 'ADD_MESSAGE_RESPONSE'
export const GOT_MESSAGE = 'GOT_MESSAGE'

export const registerUser = payload => ({
    type: REGISTER_USER,
    payload: payload
})

export const registerUserResponse = response => ({
    type: REGISTER_USER_RESPONSE,
    response: response
})

export const loginUser = payload => ({
    type: LOGIN_USER,
    payload: payload
})

export const loginResponse = response => ({
    type: LOGIN_USER_RESPONSE,
    response: response
})

export const clearLoginResponse = ({
    type: CLEAR_LOGIN_USER_RESPONSE,
})

export const initializeToken = token => ({
    type: INITIALIZE_TOKEN,
    token: token
})

export const fetchUser = token => ({
    type: FETCH_USER,
    token: token
})

export const fetchUserResponse = response => ({
    type: FETCH_USER_RESPONSE,
    response: response
})

export const fetchUserById = userId => ({
    type: FETCH_USER_BY_ID,
    userId: userId
})

export const fetchUserByIdResponse = response => ({
    type: FETCH_USER_BY_ID_RESPONSE,
    response: response
})

export const logout = ({
    type: LOGOUT
})

export const updateUser = (payload, token) => ({
    type: UPDATE_USER,
    payload: payload,
    token: token
})

export const updateRating = (payload, token) => ({
    type: UPDATE_RATING,
    payload: payload,
    token: token
})

export const addRating = (payload, token) => ({
    type: ADD_RATING,
    payload: payload,
    token: token
})

export const readNotification = (token, notificationId) => ({
    type: READ_NOTIFICATION,
    token: token,
    notificationId: notificationId
})

export const notificationIsRead = (notificationId) => ({
    type: NOTIFICATION_IS_READ,
    notificationId: notificationId
})

export const addNotification = (notification) => ({
    type: ADD_NOTIFICATION,
    notification: notification
})

export const fetchInitialMessages = (token) => ({
    type: FETCH_INITIAL_MESSAGES,
    token: token
})

export const fetchInitialMessagesResult = (messages) => ({
    type: FETCH_INITIAL_MESSAGES_RESULT,
    initialMessages: messages
})

export const fetchPageOfMessages = (token, pageSize, pageNumber, conversationId) => ({
    type: FETCH_PAGE_OF_MESSAGES,
    token: token,
    size: pageSize,
    number: pageNumber,
    id: conversationId
})

export const fetchPageOfMessagesResponse = (response) => ({
    type: FETCH_PAGE_OF_MESSAGES_RESPONSE,
    page: response.messages,
    id: response.id
})

export const fetchUnreadMessagesCount = (token) => ({
    type: FETCH_UNREAD_MESSAGES_COUNT,
    token: token
})

export const fetchUnreadMessagesCountResponse = (count) => ({
    type: FETCH_UNREAD_MESSAGES_COUNT_RESPONSE,
    count: count
})

export const markThreadAsRead = (token, threadId) => ({
    type: MARK_THREAD_AS_READ,
    token: token,
    threadId: threadId
})

export const sendMessage = (token, message) => ({
    type: ADD_MESSAGE,
    token: token,
    message: message
})

export const sendMessageResponse = (message) => ({
    type: ADD_MESSAGE_RESPONSE,
    message: message
})

export const gotMessage = (message, token) => ({
    type: GOT_MESSAGE,
    message: message,
    token: token
})