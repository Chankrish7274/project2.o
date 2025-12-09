import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Update if deployed
});

// Add Token to requests
API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

// Handle Token Expiry / Invalid Token
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem('user');
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default API;
