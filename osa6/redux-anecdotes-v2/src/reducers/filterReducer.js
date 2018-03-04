
const initialState = ''

const filterReducer = (store = initialState, action) => {

    if (action.type === 'SET_FILTER') {
        return action.filterValue
    } else if (action.type === 'CLEAR_FILTER') {
        return null
    }
    return store
}

export const setFilter = (filterValue) => {
    return {
        type: 'SET_FILTER',
        filterValue
    }
}


export const clearFilter = () => {
    return {
        type: 'CLEAR_FILTER'
    }
}

export default filterReducer