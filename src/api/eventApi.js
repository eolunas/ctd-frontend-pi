import axiosInstance from './axiosInstance';

// Eventos:
export const fetchEvents = () => axiosInstance.get('/event');
export const fetchEventById = (id) => axiosInstance.get(`/event/${id}`);
export const fetchDatesByEventId = (eventId) =>
  axiosInstance.get(`/dates`, { params: { eventId } });
export const fetchCities = () => axiosInstance.get(`/event/cities`);

// Filtrado:
export const fetchFilters = (filters) => axiosInstance.post(`/event/search`, filters);
export const fetchFiltersPagination = (filters, page) => axiosInstance.post(`/event/search?page=${page}`, filters);

export const createReservation = (date, eventId, userId) =>
  axiosInstance.post(`/dates/reservation`, null, {
    params: {
      date,
      eventId,
      userId,
    },
  });


// Obtener favoritos por userId
export const fetchFavoritesByUserId = (userId) => {
  return axiosInstance.get(`/favorite`, {
    params: {
      userId,
    },
  });
};

// Crear un favorito con userId y eventId
export const createFavorite = (userId, eventId) => {
  return axiosInstance.post(`/favorite`, null, {
    params: {
      userId,
      eventId,
    },
  });
};

// Obtener un favorito específico por userId y eventId
// export const fetchFavorite = (userId, eventId) => {
//   return axiosInstance.get(`/favorite`, {
//     params: {
//       userId,
//       eventId,
//     },
//   });
// };
