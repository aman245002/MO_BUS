import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mo-bus-iozk.onrender.com',
});

// Automatically attach token for every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
