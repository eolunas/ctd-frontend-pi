import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ticketgo-api.onrender.com',
  timeout: 10000,
});

// Opcional: Configura interceptores para autenticación o manejo de errores
axiosInstance.interceptors.request.use(
  (config) => {
    // Agrega token a cada petición, por ejemplo
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
