import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  return response.data
}

const update = async (joke) => {
  const response = await axios.put(`${url}/${joke.id}`, joke)
  return response.data
}

export default {
  getAll, createNew, update
}