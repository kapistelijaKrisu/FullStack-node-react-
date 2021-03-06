const initialState = ''

const notificationReducer = (store = initialState, action) => {
    if (action.type === 'NOTIFY') {
        return action.text
    } else if (action.type === 'CLEAR_NOTIFICATION') {
        return null
    }
    return store
}

export const notify = (text, timeout = 5) => {
    return async (dispatch) => {
        dispatch(showNotification(text))

        setTimeout(() => {
            dispatch(hideNotification())
        }, timeout * 1000)
    }
}
const showNotification = (text) => {
    return { type: 'NOTIFY', text }
}
const hideNotification = () => {
    return { type: 'CLEAR_NOTIFICATION' }
}

export default notificationReducer