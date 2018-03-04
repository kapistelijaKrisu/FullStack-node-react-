import { createStore, combineReducers } from 'redux'
import jokeReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
    jokes: jokeReducer,
    note: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState())

export default store