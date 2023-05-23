import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.91.110.82:3333',
  // baseURL: 'http://192.168.1.72:3333',
})
