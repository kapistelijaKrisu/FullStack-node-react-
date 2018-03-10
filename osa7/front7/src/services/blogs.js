import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const comment = (id, comment) => {
  const body = {comment: comment}

  const request = axios.post(`${baseUrl}/${id}/comments`, body)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, deleteOne, comment }