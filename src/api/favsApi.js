import axiosInstance from './axiosInstance';

/**
 * Obtiene los favoritos del usuario autenticado.
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Array>} - Lista de eventos favoritos.
 */
export const fetchFavorites = async (userId) => {
  try {
    const response = await axiosInstance.get(`/favorite`, {
      params: { userId },
    });
    return response.data; // Retorna la lista de favoritos
  } catch (error) {
    console.error('Error al obtener los favoritos:', error);
    throw error; // Manejo del error
  }
};

/**
 * Alterna el estado de un evento en los favoritos del usuario autenticado.
 * Si el evento ya está en favoritos, lo elimina. Si no está, lo agrega.
 * @param {number} userId - ID del usuario.
 * @param {number} eventId - ID del evento.
 * @returns {Promise<void>}
 */
export const toggleFavorite = async (userId, eventId) => {
  try {
    await axiosInstance.post(`/favorite`, null, {
      params: { userId, eventId },
    });
  } catch (error) {
    console.error('Error al alternar el estado del favorito:', error);
    throw error;
  }
};

/**
 * Elimina explícitamente un evento de los favoritos del usuario autenticado.
 * @param {number} userId - ID del usuario.
 * @param {number} eventId - ID del evento a eliminar.
 * @returns {Promise<void>}
 */
export const removeFavorite = async (userId, eventId) => {
  try {
    await axiosInstance.delete(`/favorite`, {
      params: { userId, eventId },
    });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    throw error;
  }
};
