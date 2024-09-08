import axios from 'axios'

import { getState } from '../redux/store'

// axios с базовыми настройками
const axiosInstance = axios.create({
  baseURL: 'https://blog.kata.academy/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
