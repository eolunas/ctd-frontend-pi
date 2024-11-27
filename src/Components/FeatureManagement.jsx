import { Link } from "react-router-dom";
import editIcon from "../assets/Admin/line-md_edit.svg";
import deleteIcon from "../assets/Admin/material-symbols_delete-outline.svg";
import plusIcon from "../assets/Admin/add-fav-button.svg";
import { fetchFeatures } from "../api/featureApi";
import { useEffect, useState } from "react";

const FeatureManagement = () => {
  // Simulación de datos iniciales de características
  // const features = [
  //   { id: 1, name: "Sanitarios", icon: "🚻" },
  //   { id: 2, name: "Seguridad", icon: "🛡️" },
  //   { id: 3, name: "Accesibilidad", icon: "♿" },
  //   { id: 4, name: "Wi-fi", icon: "📶" },
  //   { id: 5, name: "Estacionamientos", icon: "🅿️" },
  //   { id: 6, name: "Meet and Greet", icon: "🤝" },
  //   { id: 7, name: "Área de descanso", icon: "🛋️" },
  //   { id: 8, name: "Merchandising", icon: "🛍️" },
  // ];
  const [features, setFeatures] = useState([]);
  console.log(features);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const response = await fetchFeatures();
        setFeatures(response); // Guarda las características en el estado
      } catch (error) {
        console.error("Error al cargar las características:", error);
      }
    };
    loadFeatures();
  }, []);

  return (
    <div className='p-8 bg-black text-white flex flex-col w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold text-yellow-500'>
          Administrar características
        </h2>
        <Link
          to='#'
          className='flex items-center bg-yellow-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-yellow-400 transition'
        >
          <img src={plusIcon} alt='Agregar' className='w-5 h-5 mr-2' /> Agregar
          característica
        </Link>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700'>
          <thead>
            <tr className='text-gray-400 border-b border-gray-700'>
              <th className='px-4 py-2 border-r border-gray-700 text-left'>
                CARACTERÍSTICA
              </th>
              <th className='px-4 py-2 border-r border-gray-700 text-center'>
                ICONO
              </th>
              <th className='px-4 py-2 text-center'>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id} className='border-b border-gray-700'>
                <td className='px-4 py-2 text-gray-300 border-r border-gray-700'>
                  {feature.title}
                </td>
                <td className='px-4 py-2 text-gray-300 border-r border-gray-700 text-center'>
                  <i className={`${feature.iconCode} text-primaryBlue`}></i>
                </td>
                <td className='px-4 py-2 text-center'>
                  <div className='flex justify-center space-x-4'>
                    <Link
                      to='#'
                      onClick={(e) => e.preventDefault()}
                      className='flex items-center text-yellow-500 hover:text-yellow-400 cursor-pointer'
                    >
                      <img
                        src={editIcon}
                        alt='Editar'
                        className='w-4 h-4 mr-1'
                      />{" "}
                      Editar
                    </Link>
                    <Link
                      to='#'
                      onClick={(e) => e.preventDefault()}
                      className='flex items-center text-red-500 hover:text-red-400 cursor-pointer'
                    >
                      <img
                        src={deleteIcon}
                        alt='Eliminar'
                        className='w-4 h-4 mr-1'
                      />{" "}
                      Eliminar
                    </Link>
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
