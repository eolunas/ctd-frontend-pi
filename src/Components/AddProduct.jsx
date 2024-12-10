import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCharStates } from "../Context";
import axiosInstance from "../api/axiosInstance";
import { fetchGenres } from "../api/genreApi";
import { fetchCategories } from "../api/categoryApi";
import { fetchFeatures } from "../api/featureApi";
import close from "../assets/1-Iconos/close.png";
import ErrorMessage from "../Components/ErrorMessage";
import { fetchCities } from "../api/eventApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { state, dispatch } = useCharStates();

  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    genreName: "",
    genre: "",
    city: "",
    site: "",
    category: "",
    categoryName: "",
    dates: [],
    coverImageUrl: "",
    gallery: [],
    description: "",
    features: [],
    newCategoryName: "",  // Para guardar el nombre de la nueva categoría
    newCategoryIcon: "",  // Para guardar el icono de la nueva categoría
  });

  // console.log(formData);

  const [genres, setGenres] = useState([]); // Estado para almacenar los géneros
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [features, setFeatures] = useState([]);
  const [errors, setErrors] = useState({});


  const iconOptions = [
    { id: "fa-film", className: "fa-solid fa-film", label: "Película" },
    { id: "fa-handshake-angle", className: "fa-solid fa-handshake-angle", label: "Acuerdo" },
    { id: "fa-briefcase", className: "fa-solid fa-briefcase", label: "Trabajo" },
    { id: "fa-user-graduate", className: "fa-solid fa-user-graduate", label: "Estudiante" },
    { id: "fa-cake-candles", className: "fa-solid fa-cake-candles", label: "Cumpleaños" },
  ];

  // Manejar el cambio en el dropdown de categorías
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.name === e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: selectedCategory ? selectedCategory.id : "", 
      categoryName: e.target.value,
    }));
  };

  // Función para manejar el cambio en el icono seleccionado
  const handleIconChange = (e) => {
    const selectedIcon = e.target.value;
    setFormData((prev) => ({
      ...prev,
      newCategoryIcon: selectedIcon,  // Almacenamos el icono seleccionado
    }));
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  // const handleFeatureChange = (feature) => {
  //   setFormData((prev) => {
  //     const isSelected = prev.selectedFeatures.find((f) => f.id === feature.id);

  //     return {
  //       ...prev,
  //       selectedFeatures: isSelected
  //         ? prev.selectedFeatures.filter((f) => f.id !== feature.id) // Quita la característica si ya estaba seleccionada
  //         : [...prev.selected, feature], // Agrega la característica si no estaba seleccionada
  //     };
  //   });
  // };

  // const handleCategoryChange = (e) => {
  //   const selectedCategory = categories.find(
  //     (cat) => cat.id === parseInt(e.target.value)
  //   );
  //   setFormData((prev) => ({
  //     ...prev,
  //     category: selectedCategory?.id || "",
  //     categoryName: selectedCategory?.name || "",
  //   }));
  // };

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities(); // Llama a la API de categorías
        setCities(data.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    loadCities();
  }, []);
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

  // Fetch genres from API on component mount
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const response = await fetchGenres(); // Llama a la API
        setGenres(response.data); // Guarda los géneros en el estado
      } catch (error) {
        console.error("Error al cargar los géneros:", error);
      }
    };
    fetchGenreData();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(); // Llama a la API de categorías
        setCategories(data); // Guarda las categorías en el estado
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/event/${id}`);
          const productData = response.data;
          setFormData({
            name: productData.name || "",
            artist: productData.artist || "",
            genreName: productData.genreName || "",
            genre: productData.genreId || "",
            category: productData.categoryId || "",
            categoryName: productData.categoryName || "",
            city: productData.city || "",
            site: productData.site || "",
            dates: productData.dates || [],
            features: productData.features.map((feature) => feature.id) || [], // Convertir a un objeto con claves dinámicas
            coverImageUrl: productData.coverImageUrl || "",
            description: productData.description || "",
            gallery: productData.gallery.map((gallery) => gallery.imageUrl),
            policies: productData.policies || "",
          });
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length > 0) {
      setFormData((prev) => {
        const newGallery = [...prev.gallery, ...validFiles];

        // Validar que el total de imágenes no exceda el máximo permitido
        if (newGallery.length > 4) {
          alert("Solo puedes agregar un máximo de 4 imágenes.");
          return prev; // No actualiza la galería si excede el límite
        }

        return {
          ...prev,
          gallery: newGallery,
        };
      });
    } else {
      alert("Por favor, selecciona archivos de imagen válidos.");
    }
  };

  const handleAddDate = () => {
    if (formData.eventDateTime) {
      // Formatear fecha reemplazando "T" por un espacio
      const formattedDate = formData.eventDateTime.replace("T", " ");
      setFormData((prev) => ({
        ...prev,
        dates: [...prev.dates, formattedDate], // Agregar fecha formateada
        eventDateTime: "", // Limpiar el campo de fecha y hora
      }));
    }
  };
  const validateFields = () => {
    const newErrors = {};
  
    if (!formData.name.trim()) {
      newErrors.name = "El nombre del evento es obligatorio.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }
  
    if (!formData.artist.trim()) {
      newErrors.artist = "El artista del evento es obligatorio.";
    } else if (formData.artist.trim().length < 3) {
      newErrors.artist = "El nombre del artista debe tener al menos 3 caracteres.";
    }
  
    if (!formData.city) {
      newErrors.city = "La ciudad es obligatoria.";
    }
  
    if (!formData.site.trim()) {
      newErrors.site = "El sitio es obligatorio.";
    }
  
    if (!formData.genre) {
      newErrors.genre = "El género es obligatorio.";
    }
  
    // Validación de categoría
    if (formData.categoryName === "new") {
      // Verificar que el nombre de la nueva categoría no esté vacío
      if (!formData.newCategoryName.trim()) {
        newErrors.category = "El nombre de la nueva categoría es obligatorio.";
      } else {
        // Verificar que el nombre de la nueva categoría no esté repetido
        const categoryExists = categories.some(
          (category) =>
            category.name.toLowerCase() === formData.newCategoryName.trim().toLowerCase()
        );
  
        if (categoryExists) {
          newErrors.category =
            "El nombre de la nueva categoría ya existe. Por favor, elige un nombre diferente.";
        }
      }
  
      if (!formData.newCategoryIcon.trim()) {
        newErrors.category = "Debes seleccionar un icono para la nueva categoría.";
      }
    } else if (!formData.category) {
      newErrors.category = "La categoría es obligatoria.";
    }
  
    if (!formData.features || formData.features.length === 0) {
      newErrors.features = "Debes seleccionar al menos 1 característica.";
    }
  
    if (!formData.gallery || formData.gallery.length < 4) {
      newErrors.gallery = "Debes seleccionar 4 imágenes.";
    }
  
    if (!formData.coverImageUrl) {
      newErrors.coverImageUrl = "Es necesario una imagen de portada.";
    }
  
    if (!formData.policies || !formData.policies.trim()) {
      newErrors.policies = "Las políticas del evento son obligatorias.";
    }
  
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    }
  
    if (!formData.dates || formData.dates.length === 0) {
      newErrors.dates = "Debes agregar al menos una fecha.";
    }
  
    setErrors(newErrors); // Actualizar los errores en el estado
    return newErrors;
  };
  
  
    
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar los campos antes de continuar
    const validationErrors = validateFields(); // Ejecutar la validación
    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores, no continuar con el envío
      console.log("Errores de validación:", validationErrors);
      setErrors(validationErrors); // Actualizar los errores en el estado
      return; // Detener el envío
    }
  
    // Crear FormData para enviar archivos e información JSON
    const dataToSend = new FormData();
  
    // Agregar la imagen de portada
    if (formData.coverImageUrl instanceof File) {
      dataToSend.append("cover", formData.coverImageUrl);
    }
  
    // Agregar las imágenes de la galería
    formData.gallery.forEach((image) => {
      if (image instanceof File) {
        dataToSend.append("gallery", image);
      }
    });
  
    // Crear el objeto de datos JSON
    const dto = {
      name: formData.name,
      artist: formData.artist,
      city: formData.city,
      site: formData.site,
      genre: formData.genre,
      category: formData.category,
      description: formData.description,
      features: formData.features,
      policies: formData.policies,
      dates: formData.dates.map((date) => date.replace("T", " ")),
    };
  
    // Si la categoría es nueva, agregamos el nombre y el icono
    if (formData.categoryName === "new") {
      const newCategoryData = {
        name: formData.newCategoryName,
        icon: `fa-solid ${formData.newCategoryIcon}`,
      };
  
      try {
        // Llamada para crear la nueva categoría
        const response = await axiosInstance.post("/category", newCategoryData);
        const newCategory = response.data; // La nueva categoría creada
        dto.category = newCategory.id;
      } catch (error) {
        console.error("Error al crear la nueva categoría:", error);
        setErrorMessage("Error al crear la nueva categoría");
        setIsErrorOpen(true);
        return; // Detener el proceso si hay un error
      }
    }
  
    // Serializar el objeto JSON y agregarlo al FormData
    dataToSend.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
  
    try {
      const response = id
        ? await axiosInstance.put(`/event/${id}`, dataToSend)
        : await axiosInstance.post("/event", dataToSend);
  
      console.log("Evento guardado:", response.data);
  
      dispatch({
        type: id ? "EDIT_PRODUCT" : "ADD_PRODUCT",
        payload: response.data,
      });
  
      navigate("/admin/products");
    } catch (error) {
      console.error("Error al guardar el evento:", error);
  
      // Manejar errores del servidor
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "No se puede crear el evento porque ya existe un evento con ese nombre."
        );
        setIsErrorOpen(true);
      } else {
        setErrorMessage(
          "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
        );
        setIsErrorOpen(true);
      }
    }
  };
  
  
  
  

  const handleRemoveDate = (index) => {
    setFormData((prev) => ({
      ...prev,
      dates: prev.dates.filter((_, i) => i !== index), // Eliminar fecha seleccionada
    }));
  };

  return (
    <div className='p-8 bg-black text-white w-full flex justify-center items-center relative'>
      <button
        className='absolute top-4 right-6 text-gray-300 hover:text-white text-xl font-bold'
        onClick={() => navigate("/admin/products")}
      >
        ✕
      </button>
      <div className=' p-6 rounded-2xl shadow-lg w-full max-w-4xl'>
        <h2 className='text-3xl font-bold text-yellow-500 mb-6 text-center'>
          {id ? "Editar Producto" : "Nuevo Producto"}
        </h2>
        <form onSubmit={handleSubmit}>
        

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='mb-6'>
            <label htmlFor='name' className='block text-gray-400 mb-2'>
              Nombre del Producto
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl bg-gray-700 focus:outline-none`}
            />
            {errors.name && (
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)",
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />
                <p className='text-[#DABEBE] text-sm '>{errors.name}</p>
              </div>
            )}
          </div>
          <div className='mb-6'>
              <label htmlFor='artist' className='block text-gray-400 mb-2'>
                Artista
              </label>
              <input
                type='text'
                id='artist'
                name='artist'
                value={formData.artist}
                onChange={handleInputChange}
                className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              />
              {errors.artist && (
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)",
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />
                  <p className='text-[#DABEBE] text-sm '>{errors.artist}</p>
                </div>
              )}
            </div>
            <div className='mb-6'>
              <label htmlFor='city' className='block text-gray-400 mb-2'>
                Ciudad
              </label>
              <select
                id='city'
                name='city'
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              >
                <option value=''>Selecciona una ciudad</option>
                {Array.isArray(cities) &&
                  cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>

              {errors.city && (
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)",
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />
                  <p className='text-[#DABEBE] text-sm '>{errors.city}</p>
                </div>
              )}
            </div>

            {/* Dropdown para géneros */}
            <div className='mb-6'>
              <label htmlFor='genreName' className='block text-gray-400 mb-2'>
                Género
              </label>
              <select
                id='genreName'
                name='genreName'
                value={formData.genreName} // Se usa genreName como valor seleccionado
                onChange={(e) => {
                  const selectedGenre = genres.find(
                    (genre) => genre.name === e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    genre: selectedGenre ? selectedGenre.id : "", // Actualizamos el ID
                    genreName: e.target.value, // Actualizamos el nombre del género
                  }));
                }}
                className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              >
                <option value=''>Selecciona un género</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)",
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />
                  <p className='text-[#DABEBE] text-sm '>{errors.genre}</p>
                </div>
              )}
            </div>
            <div className='mb-6'>
              <label htmlFor='site' className='block text-gray-400 mb-2'>
                Sitio
              </label>
              <input
                type='text'
                id='site'
                name='site'
                value={formData.site}
                onChange={handleInputChange}
                className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              />
              {errors.site && (
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)",
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />
                  <p className='text-[#DABEBE] text-sm '>{errors.site}</p>
                </div>
              )}
            </div>
{/* Dropdown para categorias */}
<div>
  <label htmlFor='category' className='block text-gray-400 mb-2'>
    Tipo de evento (Categoría)
  </label>
  <select
    id='categoryName'
    name='categoryName'
    value={formData.categoryName} // Mantener el valor seleccionado
    onChange={(e) => {
      const selectedCategory = categories.find(
        (category) => category.name === e.target.value
      );

      if (e.target.value === "new") {
        // Si seleccionan "Crear nueva categoría", mostrar los campos para el nombre y el icono
        setFormData((prev) => ({
          ...prev,
          category: "", // No asignar ID aún
          categoryName: e.target.value, // Mostrar "Crear nueva categoría"
          newCategoryName: "", // Limpiar campo de nuevo nombre
          newCategoryIcon: "", // Limpiar campo de nuevo icono
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          category: selectedCategory ? selectedCategory.id : "",
          categoryName: e.target.value,
        }));
      }
    }}
    className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
  >
    <option value=''>Selecciona una categoría</option>
    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ))}
    <option value='new'>Crear nueva categoría</option>
  </select>

  {/* Mostrar error si es necesario */}
  {errors.category && (
    <div
      className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
      style={{
        backgroundColor: "rgba(242, 161, 161, 0.14)",
        border: "2px solid rgba(223, 22, 22, 0.39)",
      }}
    >
      <img src={close} className='w-5 h-5' alt='' />
      <p className='text-[#DABEBE] text-sm '>{errors.category}</p>
    </div>
  )}
</div>

{/* Campos para la nueva categoría (si se selecciona la opción de crear nueva categoría) */}
{formData.categoryName === "new" && (
  <div className='mb-6'>
    <label htmlFor='newCategoryName' className='block text-gray-400 mb-2'>
      Nombre de la nueva categoría
    </label>
    <input
      type='text'
      id='newCategoryName'
      name='newCategoryName'
      value={formData.newCategoryName}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          newCategoryName: e.target.value,
        }))
      }
      className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
    />
  </div>
)}

{/* Iconos para la nueva categoría */}
{formData.categoryName === "new" && (
  <div className='mb-6'>
    <label htmlFor='newCategoryIcon' className='block text-gray-400 mb-2'>
      Icono de la nueva categoría
    </label>
    {/* Usamos Tailwind para grid y 3 columnas */}
    <div className='grid grid-cols-3 gap-4'>
    {[
  { icon: "fa-film", label: "Cine" },
  { icon: "fa-handshake-angle", label: "Negocios" },
  { icon: "fa-briefcase", label: "Trabajo" },
  { icon: "fa-user-graduate", label: "Educación" },
  { icon: "fa-cake-candles", label: "Eventos" },
  { icon: "fa-shield", label: "Escudo" },
  { icon: "fa-calendar-check", label: "Calendario Check" },
  { icon: "fa-charging-station", label: "Estación de Carga" },
  { icon: "fa-truck-monster", label: "Camión Monster" },
  { icon: "fa-bicycle", label: "Bicicleta" },
  { icon: "fa-video", label: "Video" },
  { icon: "fa-shield-cat", label: "Escudo Gato" },
  { icon: "fa-utensils", label: "Utensilios" },
  { icon: "fa-hotel", label: "Hotel" },
  { icon: "fa-ticket", label: "Ticket" },
  { icon: "fa-truck-medical", label: "Camión Médico" },
  { icon: "fa-leaf", label: "Hoja" },
  { icon: "fa-smoking", label: "Fumar" },
  { icon: "fa-crown", label: "Corona" },
  { icon: "fa-martini-glass-citrus", label: "Martini con Limón" },
  { icon: "fa-gamepad", label: "Control de Juego" },
  { icon: "fa-temperature-arrow-up", label: "Temperatura Alta" },
].map((iconOption) => (
        <label key={iconOption.icon} className='flex items-center gap-2'>
          <input
            type='radio'
            name='newCategoryIcon'
            value={iconOption.icon}
            checked={formData.newCategoryIcon === iconOption.icon}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                newCategoryIcon: e.target.value,
              }))
            }
            className='form-radio'
          />
          <i className={`fa-solid fa-regular fa- ${iconOption.icon}`}></i>
          {iconOption.label}
        </label>
      ))}
    </div>
  </div>
)}

            <div className='mb-6'>
              <label htmlFor='eventDateTime' className='block text-gray-400 mb-2'>
                Fecha y Hora del Evento
              </label>
              <div className='flex gap-4'>
                <input
                  type='datetime-local'
                  id='eventDateTime'
                  name='eventDateTime'
                  value={formData.eventDateTime}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-3 rounded-xl ${
                    errors.dates
                      ? "bg-gray-700 text-white border-red-500"
                      : "bg-gray-700 text-white border-gray-600"
                  } focus:outline-none`}
                />
                <button
                  type='button'
                  onClick={handleAddDate}
                  className='px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition'
                >
                  Agregar
                </button>
              </div>
              {errors.dates && (
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)",
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />
                  <p className='text-[#DABEBE] text-sm '>{errors.dates}</p>
                </div>
              )}
            </div>
            <div className='mb-6'>
              <h3 className='text-lg font-bold text-gray-300 mb-2'>
                Fechas Seleccionadas:
              </h3>
              <ul className='space-y-2'>
                {formData.dates.map((date, index) => (
                  <li
                    key={index}
                    className='flex justify-between items-center bg-gray-700 p-2 rounded-lg'
                  >
                    <span>{date}</span>
                    <button
                      type='button'
                      onClick={() => handleRemoveDate(index)}
                      className='text-red-500 hover:text-red-400'
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Descripciones */}
          <div className='mb-6'>
            <label htmlFor='description' className='block text-gray-400 mb-2'>
              Descripcion
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              rows='4'
            ></textarea>
            {errors.description && (
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)",
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />
                <p className='text-[#DABEBE] text-sm '>{errors.description}</p>
              </div>
            )}
          </div>
          {/* Características */}
          <fieldset className='mb-6'>
            <legend className='text-gray-400 mb-4 text-lg font-semibold'>
              Características
            </legend>
            <div className='flex flex-wrap gap-4'>
              {features.map((feature) => (
                <label
                  key={feature.id}
                  className='flex items-center justify-start gap-4 w-full sm:w-[50%] lg:w-[20%]'
                >
                  <input
                    type='checkbox'
                    name={`feature-${feature.id}`}
                    checked={formData.features.includes(feature.id)} // Verifica si el ID está en el array
                    onChange={(e) => {
                      const isChecked = e.target.checked;

                      setFormData((prev) => ({
                        ...prev,
                        features: isChecked
                          ? [...prev.features, feature.id] // Agrega el ID si está seleccionado
                          : prev.features.filter((id) => id !== feature.id), // Elimina el ID si no está seleccionado
                      }));
                    }}
                    className='w-5 h-5 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500'
                  />

                  {/* <i className={`${feature.iconCode} text-primaryBlue`}></i> */}
                  <span className='text-gray-300'>{feature.title}</span>
                </label>
              ))}
              {errors.features && (
                <div
                  className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                  style={{
                    backgroundColor: "rgba(242, 161, 161, 0.14)",
                    border: "2px solid rgba(223, 22, 22, 0.39)",
                  }}
                >
                  <img src={close} className='w-5 h-5' alt='' />
                  <p className='text-[#DABEBE] text-sm '>{errors.features}</p>
                </div>
              )}
            </div>
          </fieldset>

          {/* Imagen de portada */}
          <div className='mb-6'>
            <label className='block text-gray-400 mb-2'>
              Imagen de portada
            </label>
            <div
              className='w-full h-32 rounded-xl border-2 border-dashed border-gray-600 bg-gray-700 flex justify-center items-center cursor-pointer'
              onClick={() => document.getElementById("coverImage").click()}
            >
              <p className='text-gray-400 text-center'>
                {formData.coverImageUrl &&
                typeof formData.coverImageUrl === "string"
                  ? "Haz clic para cambiar la imagen"
                  : "Arrastra y suelta una imagen aquí o haz clic para buscar"}
              </p>
            </div>
            <input
              type='file'
              id='coverImage'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith("image/")) {
                  setFormData((prev) => ({
                    ...prev,
                    coverImageUrl: file, // Guarda la nueva imagen como archivo
                  }));
                } else {
                  alert("Por favor, selecciona un archivo de imagen válido.");
                }
              }}
              className='hidden'
            />
            {formData.coverImageUrl && (
              <div className='mt-2 text-gray-300'>
                {typeof formData.coverImageUrl === "string" ? (
                  <div>
                    <p>Imagen actual:</p>
                    <div className='w-[20%] mt-2'>
                      <img
                        className='w-full block'
                        src={formData.coverImageUrl}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>Imagen seleccionada:</p>
                    <div className='w-[20%] mt-2'>
                      <img
                        className='w-full block'
                        src={URL.createObjectURL(formData.coverImageUrl)}
                        alt='Imagen seleccionada'
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {errors.coverImageUrl && (
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)",
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />
                <p className='text-[#DABEBE] text-sm '>
                  {errors.coverImageUrl}
                </p>
              </div>
            )}
          </div>

          {/* Galería de imágenes */}
          <div className='mb-6'>
            <label className='block text-gray-400 mb-2'>
              Galería de imágenes max(4)
            </label>
            <div
              className='w-full h-32 rounded-xl border-2 border-dashed border-gray-600 bg-gray-700 flex justify-center items-center cursor-pointer'
              onClick={() => document.getElementById("galleryImages").click()}
            >
              <p className='text-gray-400 text-center'>
                Arrastra y suelta imágenes aquí o haz clic para buscar
              </p>
            </div>
            <input
              type='file'
              id='galleryImages'
              accept='image/*'
              multiple
              onChange={handleGalleryChange}
              className='hidden'
            />
            {Array.isArray(formData.gallery) ? (
              <div className='flex flex-wrap gap-4'>
                {formData.gallery.map((image, index) => (
                  <div key={index} className='w-[20%] mt-2'>
                    <img
                      className='w-full block'
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt={`Imagen ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>Imagen seleccionada: {formData.gallery?.name}</p>
            )}

            {/* {formData.gallery.length > 0 && (
              <div className='mt-2 text-gray-300'>
                <p>Imágenes seleccionadas:</p>
                <ul>
                  {formData.gallery.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )} */}
            {errors.gallery && (
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)",
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />
                <p className='text-[#DABEBE] text-sm '>{errors.gallery}</p>
              </div>
            )}
          </div>

          {/* Event Policies */}
          <div className='mb-6'>
            <label htmlFor='policies' className='block text-gray-400 mb-2'>
              Políticas del evento
            </label>
            <textarea
              id='policies'
              name='policies'
              value={formData.policies}
              onChange={handleInputChange}
              className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              rows='4'
            ></textarea>
            {errors.policies && (
              <div
                className='flex items-center p-1 px-2 gap-2 rounded-lg mt-2'
                style={{
                  backgroundColor: "rgba(242, 161, 161, 0.14)",
                  border: "2px solid rgba(223, 22, 22, 0.39)",
                }}
              >
                <img src={close} className='w-5 h-5' alt='' />
                <p className='text-[#DABEBE] text-sm '>{errors.policies}</p>
              </div>
            )}
          </div>
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={() => navigate("/admin/products")}
              className='px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition'
            >
              Cancelar
            </button>
            <button
              type='submit'
              // onClick={() => setIsErrorOpen(true)}
              className='px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      {isErrorOpen && (
        <ErrorMessage
          title='Lo sentimos :('
          description={errorMessage} // Usa el mensaje dinámico
          buttonText='Volver atrás'
          onClose={() => setIsErrorOpen(false)}
        />
      )}

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
          <div className='absolute inset-0' onClick={closeModal}></div>
          <div className='relative p-4 bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-white text-xl'
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt='Selected'
              className='w-full h-full object-contain'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
