import axios from 'axios'

export const triviaAPI = axios.create({
  baseURL: 'https://opentdb.com/api.php'
})