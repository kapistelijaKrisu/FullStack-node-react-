import jokeService from '../services/anecdotes'

const jokeReducer = (store = [], action) => {

  switch (action.type) {
    case 'UPDATE_JOKE':
      const old = store.filter(a => a.id !== action.data.id)
      return [...old, action.data]

    case 'CREATE':
      return [...store,  action.data ]

    case 'INIT_JOKES':
      return action.data

    default:
      return store
  }
}

export const jokeInitialization = () => {
  return async (dispatch) => {
    const jokes = await jokeService.getAll()
    dispatch({
    type: 'INIT_JOKES',
    data: jokes
    })
  }
}

export const createJoke = (data) => {
  return async (dispatch) => {
    const newJoke = await jokeService.createNew(data)
    dispatch({
    type: 'CREATE',
    data: newJoke
    })
  }
}
export const updateJoke = (data) => {
  return async (dispatch) => {
    const updated = await jokeService.update(data)
    dispatch({
    type: 'UPDATE_JOKE',
    data: updated
    })
  }
}

export default jokeReducer












