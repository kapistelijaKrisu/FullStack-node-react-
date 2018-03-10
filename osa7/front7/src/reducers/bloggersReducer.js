
import userService from '../services/users'

const bloggersReducer = (store = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGGERS':
            return action.bloggers
        default:
            return store
    }
}

export const bloggersInitialization = () => {
    return async (dispatch) => {
        const bloggers = await userService.getAll()
        dispatch({
            type: 'INIT_BLOGGERS',
            bloggers
        })
    }
}
export default bloggersReducer