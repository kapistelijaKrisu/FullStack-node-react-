import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'
import bloggersReducer from './reducers/bloggersReducer'

const reducer = combineReducers({
    note: notificationReducer,
    user: userReducer,
    blogs: blogsReducer,
    bloggers: bloggersReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store