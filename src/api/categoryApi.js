import axiosInstance from './axiosInstance'; // Asegúrate de tener axiosInstance configurado

// Obtener categorías
export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get('/category'); // Llama al endpoint /category
    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
