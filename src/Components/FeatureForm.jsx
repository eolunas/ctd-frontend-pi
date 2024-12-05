import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage"; // Componente para mostrar el mensaje de error

const FeatureForm = ({ action = "crear", selectedFeature = null, updateFeatures, setIsFormOpen }) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errors, setErrors] = useState({});

  // Validar los campos
  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre de la característica es obligatorio.";
    } else if (name.trim().length < 3) {
      newErrors.name = "La característica debe tener al menos 3 caracteres.";
    }

    if (!icon.trim()) {
      newErrors.icon = "Debes seleccionar un icono.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Rellenar los campos cuando es un formulario de edición
  useEffect(() => {
    if (action === "editar" && selectedFeature) {
      setName(selectedFeature.name);
      setIcon(selectedFeature.icon);
    }
  }, [action, selectedFeature]);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validateFields()) {
      console.log("Error: Faltan campos obligatorios");
      return;
    }

    // Crear el objeto de la característica
    const newFeature = { id: action === "crear" ? Date.now() : selectedFeature.id, name, icon };

    // Imprimir en consola los datos que serán enviados
    console.log("Datos que serán enviados al backend:", newFeature);

    try {
      // Suponiendo que tu API usa PUT para editar y POST para crear
      const response = action === "crear"
        ? await axiosInstance.post("/feature", newFeature)
        : await axiosInstance.put(`/feature/${id}`, newFeature);

      console.log("Característica guardada:", response.data);

      // Actualizar características en el estado global
      updateFeatures(newFeature);

      // Cerrar el formulario
      setIsFormOpen(false);

      // Redirigir a la lista de características
      navigate("/admin/features");
    } catch (error) {
      console.error("Error al guardar la característica:", error);

      // Mostrar errores dependiendo del tipo
      if (error.response && error.response.status === 409) {
        setErrorMessage("Ya existe una característica con ese nombre.");
      } else {
        setErrorMessage("Ocurrió un error inesperado. Inténtalo de nuevo más tarde.");
      }
      setIsErrorOpen(true);
    }
  };

  return (
    <div className="p-8 bg-black text-white">
      {/* Botón de cierre */}
      <button
        className="absolute top-20 right-6 text-gray-300 hover:text-white text-xl font-bold"
        onClick={() => navigate("/admin/features")}
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">
        {action === "crear" ? "Crear nueva característica" : "Editar característica"}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Icono */}
        <div className="mb-4">
          <label htmlFor="icon" className="block text-gray-300">Icono (Clase FontAwesome)</label>
          <div className="grid grid-cols-4 gap-4">
            {['fa-car', 'fa-bicycle', 'fa-motorcycle'].map((iconClass) => (
              <label key={iconClass} className="flex justify-center items-center">
                <input
                  type="checkbox"
                  name="icon"
                  value={iconClass}
                  checked={icon === iconClass}
                  onChange={() => setIcon(iconClass)}
                  className="mr-2"
                />
                <i className={`fa-solid ${iconClass} text-3xl`} />
              </label>
            ))}
          </div>
          {errors.icon && <p className="text-red-500 text-sm">{errors.icon}</p>}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-secondaryYellow text-white py-2 px-4 rounded"
          >
            {action === "crear" ? "Crear" : "Actualizar"}
          </button>
          <button
            type="button"
            onClick={() => setIsFormOpen(false)}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Error modal */}
      {isErrorOpen && (
        <ErrorMessage
          title="Lo sentimos :("
          description={errorMessage}
          buttonText="Volver atrás"
          onClose={() => setIsErrorOpen(false)}
        />
      )}
    </div>
  );
};

export default FeatureForm;
