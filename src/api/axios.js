import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const getPosts = async (page = 1, option = {}) => {
  const res = await api.get(`/posts?_page=${page}`, option)
  return res.data
}
