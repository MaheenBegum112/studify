import axios from 'axios'

const API = axios.create({
  baseURL: 'https://studify-1l2q.onrender.com'
})

export default API