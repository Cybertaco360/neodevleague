import axios from 'axios';

export default function ({ $axios }) {
    // Set the base URL for all requests
    $axios.defaults.baseURL = 'https://api.example.com';

    // Add interceptors if needed
    $axios.interceptors.request.use(config => {
        // Do something before the request is sent
        return config;
    }, error => {
        // Handle the error
        return Promise.reject(error);
    });

    $axios.interceptors.response.use(response => {
        // Any status code that lie within the range of 2xx causes this function to trigger
        return response;
    }, error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return Promise.reject(error);
    });
}
