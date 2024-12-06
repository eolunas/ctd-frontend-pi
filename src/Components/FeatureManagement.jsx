import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // Instancia de Axios
import editIcon from "../assets/Admin/line-md_edit.svg";
import deleteIcon from "../assets/Admin/material-symbols_delete-outline.svg";
import plusIcon from "../assets/Admin/add-fav-button.svg";

// Funciones para interactuar con la API
const fetchFeatures = async () => {
  try {
    const response = await axiosInstance.get("/feature");
    return response.data;
  } catch (error) {
    console.error("Error al cargar las características:", error);
    throw error;
  }
};

const deleteFeature = async (id) => {
  try {
    await axiosInstance.delete(`/feature/${id}`);
  } catch (error) {
    console.error("Error al eliminar la característica:", error);
    throw error;
  }
};

const FeatureManagement = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar las características cuando el componente se monta
  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const data = await fetchFeatures();
        setFeatures(data); // Guardar las características en el estado
      } catch (error) {
        console.error("Error al cargar las características", error);
      } finally {
        setLoading(false);
      }
    };
    loadFeatures();
  }, []);

  // Función para manejar la eliminación de una característica
  const handleDeleteFeature = async (id) => {
    try {
      await deleteFeature(id); // Eliminar de la API
      setFeatures((prevFeatures) => prevFeatures.filter((feature) => feature.id !== id)); // Eliminar de la lista local
    } catch (error) {
      console.error("Error al eliminar la característica", error);
    }
  };

  // Función para navegar a la página de edición
  const handleEditFeature = (feature) => {
    navigate(`/admin/features/edit/${feature.id}`, { state: { feature } }); // Usar el 'state' para pasar el objeto 'feature'
  };

  return (
    <div className="p-8 bg-black text-white flex flex-col w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-500">Administrar características</h2>
        <Link
          to="/admin/features/createfeature"
          className="h-10 flex justify-center items-center md:px-6 px-1.5 text-sm md:text-md py-1.5 rounded-full cursor-pointer text-center transition duration-200 ease-in-out bg-secondaryYellow text-white hover:bg-opacity-90"
        >
          <img src={plusIcon} alt="Agregar" className="w-5 h-5 mr-2" /> Agregar
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="px-4 py-2 border-r border-gray-700 text-left">CARACTERÍSTICA</th>
              <th className="px-4 py-2 border-r border-gray-700 text-center">ICONO</th>
              <th className="px-4 py-2 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id} className="border-b border-gray-700">
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700">{feature.title}</td>
                <td className="px-4 py-2 text-center border-r border-gray-700">
                  <i className={`${feature.iconCode} text-3xl`} />
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    {/* Botón de editar */}
                    <button
                      onClick={() => handleEditFeature(feature)}
                      className="flex items-center text-yellow-500 hover:text-yellow-400 border-none bg-transparent hover:bg-transparent cursor-pointer"
                    >
                      <img src={editIcon} alt="Editar" className="w-6 h-6 mr-2" />
                      Editar
                    </button>

                    {/* Botón de eliminar */}
                    <button
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="flex items-center text-red-500 hover:text-red-400 border-none bg-transparent hover:bg-transparent cursor-pointer"
                    >
                      <img src={deleteIcon} alt="Eliminar" className="w-6 h-6 mr-2" />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureManagement;
