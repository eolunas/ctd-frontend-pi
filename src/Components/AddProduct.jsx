import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCharStates } from "../Context";
import axiosInstance from "../api/axiosInstance";
import { fetchGenres } from "../api/genreApi";
import { fetchCategories } from "../api/categoryApi";
import { fetchFeatures } from "../api/featureApi";
import ErrorMessage from "../Components/ErrorMessage";

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
  });

  console.log(formData);

  const [genres, setGenres] = useState([]); // Estado para almacenar los géneros
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [errors, setErrors] = useState({});

  

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };
  console.log();

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
    let isValid = true;
  
    if (!formData.name.trim()) {
      alert("El nombre del evento es obligatorio.");
      isValid = false;
    }
  
    if (!formData.city.trim()) {
      alert("La ciudad es obligatoria.");
      isValid = false;
    }
  
    if (!formData.site.trim()) {
      alert("El sitio es obligatorio.");
      isValid = false;
    }
  
    if (!formData.genre) {
      alert("El género es obligatorio.");
      isValid = false;
    }
  
    if (!formData.category) {
      alert("La categoría es obligatoria.");
      isValid = false;
    }
  
    if (!formData.description.trim()) {
      alert("La descripción es obligatoria.");
      isValid = false;
    }
  
    if (!formData.policies.trim()) {
      alert("Las políticas del evento son obligatorias.");
      isValid = false;
    }
  
    return isValid;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar los campos antes de continuar
    if (!validateFields()) {
      // Aquí puedes manejar los errores de validación en el cliente
      console.log("Error: Faltan campos obligatorios"); // Mensaje para depuración
      return; // No continúes con el envío de datos
    }
  
    if (!formData.dates.length) {
      alert("Por favor, agrega al menos una fecha antes de guardar.");
      return;
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
      city: formData.city,
      site: formData.site,
      genre: formData.genre,
      category: formData.category,
      description: formData.description,
      features: formData.features,
      policies: formData.policies,
      dates: formData.dates.map((date) => date.replace("T", " ")),
    };
  
    // Serializar el objeto JSON y agregarlo al FormData
    dataToSend.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
  
    // Debug: Ver contenido del FormData
    for (let pair of dataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = id
        ? await axiosInstance.put(`/event/${id}`, dataToSend)
        : await axiosInstance.post("/event", dataToSend);
  
      console.log("Producto guardado:", response.data);
  
      dispatch({
        type: id ? "EDIT_PRODUCT" : "ADD_PRODUCT",
        payload: response.data,
      });
  
      navigate("/admin/products");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
  
      // Manejar errores del servidor (por ejemplo, nombre duplicado)
      if (error.response && error.response.status === 409) {
        setErrorMessage(
          "No se puede crear el evento porque ya existe un evento con ese nombre."
        );
        setIsErrorOpen(true); // Solo muestra el modal si es error del servidor
      } else {
        setErrorMessage(
          "Ocurrió un error inesperado. Inténtalo de nuevo más tarde."
        );
        setIsErrorOpen(true); // Solo muestra el modal si es error del servidor
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
      <div className='bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-4xl'>
        <h2 className='text-3xl font-bold text-yellow-500 mb-6 text-center'>
          {id ? "Editar Producto" : "Nuevo Producto"}
        </h2>
        <form onSubmit={handleSubmit}>
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
              className={`w-full px-4 py-3 rounded-xl ${
                errors.name
                  ? "bg-gray-700 text-white border-red-500"
                  : "bg-gray-700 text-white border-gray-600"
              } focus:outline-none`}
              required
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='mb-6'>
              <label htmlFor='city' className='block text-gray-400 mb-2'>
                Ciudad
              </label>
              <input
                type='text'
                id='city'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              />
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
            </div>
            {/* Dropdown para categorias */}
            <div>
              <label htmlFor='category' className='block text-gray-400 mb-2'>
                Tipo de evento (Categoría)
              </label>
              <select
                id='categoryName'
                name='categoryName'
                onChange={(e) => {
                  const selectedCategory = categories.find(
                    (category) => category.name === e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    category: selectedCategory ? selectedCategory.id : "", // Actualizamos el ID
                  }));
                }}
                className='w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500'
              >
                <option>
                  {formData.categoryName
                    ? formData.categoryName
                    : "Selecciona una categoría"}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

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
              {errors.dates && <p className='text-red-500 text-sm'>{errors.dates}</p>}
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
              required
            ></textarea>
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
              required
            ></textarea>
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
              onClick={() => setIsErrorOpen(true)}
              className='px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      {isErrorOpen && (
          <ErrorMessage
            title="Lo sentimos :("
            description={errorMessage} // Usa el mensaje dinámico
            buttonText="Volver al inicio"
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
