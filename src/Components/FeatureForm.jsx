import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // Instancia de Axios

const FeatureForm = () => {
  const [title, setTitle] = useState("");
  const [iconCode, setIconCode] = useState(""); // Valor para el ícono seleccionado
  const [availableIcons, setAvailableIcons] = useState([]); // Para guardar los íconos disponibles de la API
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const feature = location.state?.feature; // Usar los datos pasados desde el componente de gestión

  // Determinar si estamos en modo de edición
  const isEdit = Boolean(id);

  // Cargar los íconos disponibles de la API
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axiosInstance.get("/feature");
        const allIcons = response.data; // Todos los íconos disponibles
        const uniqueIcons = getUniqueIcons(allIcons); // Filtrar íconos únicos

        setAvailableIcons(uniqueIcons); // Guardamos los íconos únicos
      } catch (error) {
        console.error("Error al cargar los íconos:", error);
      }
    };

    fetchIcons();
  }, []);

  // Obtener íconos únicos de la lista de características
  const getUniqueIcons = (icons) => {
    const iconSet = new Set(); // Usamos un Set para filtrar duplicados
    const uniqueIcons = [];

    icons.forEach(icon => {
      const iconClass = icon.iconCode.replace("fa-solid ", ""); // Obtener la clase sin el prefijo "fa-solid"
      if (!iconSet.has(iconClass)) {
        uniqueIcons.push(icon);
        iconSet.add(iconClass); // Añadimos el ícono al Set (esto evita duplicados)
      }
    });

    return uniqueIcons;
  };

  // Si estamos en modo edición, establecemos los valores de la característica
  useEffect(() => {
    if (isEdit && feature) {
      setTitle(feature.title);
      setIconCode(feature.iconCode.replace("fa-solid ", "")); // Asumimos que el icono tiene el prefijo "fa-solid"
    }
  }, [isEdit, feature]);

  // Validar campos
  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "El nombre de la característica es obligatorio.";
    if (title.trim().length < 3) newErrors.title = "La característica debe tener al menos 3 caracteres.";
    if (!iconCode.trim()) newErrors.iconCode = "Debes seleccionar un icono.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return; // Solo proceder si no hay errores
  
    // Concatenar las clases "fa-solid", "fa-regular", y "fa-" con el nombre del ícono
    const formattedIconCode = `fa-solid fa-regular fa-${iconCode}`;
  
    const featureData = {
      title,
      iconCode: formattedIconCode, // Usar el código del ícono formateado
    };
  
    try {
      if (isEdit) {
        // Si es edición, hacemos un PUT
        await axiosInstance.put(`/feature/${id}`, featureData);
        console.log("Característica actualizada.");
      } else {
        // Si es creación, hacemos un POST
        await axiosInstance.post("/feature", featureData);
        console.log("Característica creada.");
      }
      navigate("/admin/features"); // Redirigir a la lista de características después de guardar
    } catch (error) {
      console.error("Error al guardar la característica:", error);
    }
  };
  
  return (
    <div className="p-8 bg-black text-white">
      <button
        className="absolute top-20 right-6 text-gray-300 hover:text-white text-xl font-bold"
        onClick={() => navigate("/admin/features")}
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">{isEdit ? "Editar característica" : "Crear nueva característica"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-300">Nombre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Selección de icono */}
        <div className="mb-6">
          <label htmlFor="iconCode" className="block text-gray-300">Selecciona un icono</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              "shield", "calendar-check", "charging-station", "truck-monster", "bicycle", "video",
              "shield-cat", "utensils", "hotel", "ticket", "truck-medical", "leaf", "smoking", "crown",
              "martini-glass-citrus", "gamepad", "temperature-arrow-up"
            ].map((icon) => (
              <label key={icon} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="iconCode"
                  value={icon}
                  checked={iconCode === icon}
                  onChange={() => setIconCode(icon)}
                  className="form-radio"
                />
                <i className={`fa-solid fa-${icon}`}></i>
              </label>
            ))}
          </div>
          {errors.iconCode && <p className="text-red-500 text-sm">{errors.iconCode}</p>}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {isEdit ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeatureForm;
