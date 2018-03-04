import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import jokeReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    jokes: jokeReducer,
    note: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store