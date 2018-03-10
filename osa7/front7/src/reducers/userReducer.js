
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      return (user)
    }
    return (null)
}

const userReducer = (store = initialState(), action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return store
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({
            username: username,
            password: password
        })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            user
        })
    }
}

export const logout = (username, password) => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        dispatch({
            type: 'LOGOUT'
        })
    }
}
export default userReducer