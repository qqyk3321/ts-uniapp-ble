import axios from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

const instance = axios.create({
  baseURL: 'https://qqyk.asia/punch',
  adapter: createUniAppAxiosAdapter(),
})
export default instance
