export const SHOW_ALLERT = 'SHOW_ALLERT'
export const CLOSE_ALERT = 'CLOSE_ALERT'

export const showAllert = alertProps => ({
    type: SHOW_ALLERT,
    props: alertProps
})

export const closeAlert = ({
    type: CLOSE_ALERT
})