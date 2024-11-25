import axiosInstance from "./axiosInstance";

export const fetchFeatures = async () => {
  try {
    const response = await axiosInstance.get("/feature");
    return response.data;
  } catch (error) {
    console.error("Error al cargar las características:", error);
    throw error;
  }
};
