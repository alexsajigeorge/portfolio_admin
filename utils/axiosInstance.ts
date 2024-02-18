import axios from 'axios';
import router from 'next/router';

const baseURL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = config.headers.Authorization || localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('Not working');
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle successful responses here
        return response;
    },
    (error) => {
        // Handle errors here
        if (error.response.status === 401) {
            router.push('/auth/signin');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


