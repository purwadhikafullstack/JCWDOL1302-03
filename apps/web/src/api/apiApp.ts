import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_APP,
});
api.interceptors.request.use(
  (config) => {
    // Get the token from wherever you store it (e.g., localStorage, Vuex store)
    const token = localStorage.getItem('token');
    console.log(token);
    // Add the token to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  },
);

export default api;
