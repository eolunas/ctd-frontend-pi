import { useState } from "react";
import { Link } from "react-router-dom";
import editIcon from "../assets/Admin/line-md_edit.svg";
import deleteIcon from "../assets/Admin/material-symbols_delete-outline.svg";
import plusIcon from "../assets/Admin/add-fav-button.svg";

// Simulando la carga de características desde una API
const mockFeatures = [
  { id: 1, name: "Automóvil", icon: "fa-car" },
  { id: 2, name: "Bicicleta", icon: "fa-bicycle" },
  { id: 3, name: "Motocicleta", icon: "fa-motorcycle" }
];

const FeatureManagement = () => {
  const [features, setFeatures] = useState(mockFeatures);

  // Función para eliminar la característica
  const handleDeleteFeature = (id) => {
    setFeatures(features.filter((feature) => feature.id !== id));
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
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700">{feature.name}</td>
                <td className="px-4 py-2 text-gray-300 border-r border-gray-700 text-center">
                  <i className={`fa-solid ${feature.icon} text-3xl text-white`} />
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/admin/features/edit/${feature.id}`}
                      className="flex items-center text-yellow-500 hover:text-yellow-400 cursor-pointer"
                    >
                      <img src={editIcon} alt="Editar" className="w-4 h-4 mr-1" />
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="flex items-center text-red-500 hover:text-red-400 cursor-pointer"
                    >
                      <img src={deleteIcon} alt="Eliminar" className="w-4 h-4 mr-1" />
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
