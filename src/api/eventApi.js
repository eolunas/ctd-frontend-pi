import axiosInstance from './axiosInstance';

// Eventos:
export const fetchEvents = () => axiosInstance.get('/event');
export const fetchEventById = (id) => axiosInstance.get(`/event/${id}`);
