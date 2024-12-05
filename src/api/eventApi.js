import axiosInstance from './axiosInstance';

// Eventos:
export const fetchEvents = () => axiosInstance.get('/event');
export const fetchEventById = (id) => axiosInstance.get(`/event/${id}`);
export const fetchCities = () => axiosInstance.get(`/event/cities`);

// Filtrado:
export const fetchFilters = (filters) => axiosInstance.post(`/event/search`, filters);
export const fetchFiltersPagination = (filters, page) => axiosInstance.post(`/event/search?page=${page}`, filters);

