import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_BASE_URL

export const instance = axios.create({
  baseURL: BASE_URL,
})
