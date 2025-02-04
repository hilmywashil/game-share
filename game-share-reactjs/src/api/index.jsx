import axios from 'axios';
import apiConfig from './apiConfig';

const Api = axios.create({
    baseURL: apiConfig.baseUrl
})

export default Api