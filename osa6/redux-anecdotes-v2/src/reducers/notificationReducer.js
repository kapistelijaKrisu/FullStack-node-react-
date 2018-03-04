
const initialState = 'initial notification'

const notificationReducer = (store = initialState, action) => {

    if (action.type === 'NOTIFY') {
        return action.notification
    } else if (action.type === 'CLEAR_NOTIFICATION') {
        return null
    }
    return store
}

export const notify = (notification) => {
    return {
        type: 'NOTIFY',
        notification
    }
}


export const clearNore = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export default notificationReducer