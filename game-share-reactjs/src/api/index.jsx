import axios from 'axios';
import apiConfig from './apiConfig';

const Api = axios.create({
    baseURL: apiConfig.baseUrl,
});

Api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default Api;
