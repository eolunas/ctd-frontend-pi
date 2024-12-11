import axiosInstance from './axiosInstance';

/**
 * Obtiene la información del usuario autenticado.
 * @returns {Promise<Object>} - Información del usuario (incluye el ID y otros datos).
 */
export const fetchUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/user/me');
    return response.data; // Retorna la información del usuario
  } catch (error) {
    console.error('Error al obtener la información del usuario:', error);
    throw error; // Manejo del error para quien lo llame
  }
};
