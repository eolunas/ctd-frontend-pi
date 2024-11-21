import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: "",
    city: "",
    category: "",
    genre: "",
    dates: [],
    description: "",
    coverImage: null,
    gallery: [],
    eventPolicies: "",
    characteristics: {
      wifi: false,
      accessibility: false,
      seguridad: false,
      merchandising: false,
      estacionamiento: false,
      meetAndGreet: false,
      descanso: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      characteristics: {
        ...prev.characteristics,
        [name]: checked,
      },
    }));
  };

  const handleFileChange = (e, field) => {
    const files = e.target.files;
    if (field === "coverImage") {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          coverImage: file,
        }));
      } else {
        alert("Por favor, selecciona un archivo de imagen válido.");
      }
    } else if (field === "gallery") {
      setFormData((prev) => ({
        ...prev,
        gallery: Array.from(files),
      }));
    }
  };

  const handleAddDate = () => {
    const newDate = document.getElementById("newDate").value;
    if (newDate && !formData.dates.includes(newDate)) {
      setFormData((prev) => ({
        ...prev,
        dates: [...prev.dates, newDate],
      }));
      document.getElementById("newDate").value = ""; // Limpia el campo de fecha
    }
  };

  const handleRemoveDate = (dateToRemove) => {
    setFormData((prev) => ({
      ...prev,
      dates: prev.dates.filter((date) => date !== dateToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí podrías agregar la lógica para enviar los datos al backend
    navigate("/admin/events"); // Vuelve a la lista de eventos
  };

  return (
    <div className="p-8 bg-black text-white w-full flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre del evento */}
          <div className="mb-6">
            <label htmlFor="eventName" className="block text-gray-400 mb-2">
              Nombre del evento
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
          {/* Ciudad, Tipo de evento y Género */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-400 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-400 mb-2">
                Tipo de evento (Categoría)
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="genre" className="block text-gray-400 mb-2">
                Género
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
          </div>
          {/* Fechas (múltiples) */}
          <div className="mb-6">
            <label htmlFor="newDate" className="block text-gray-400 mb-2">
              Fechas del evento
            </label>
            <div className="flex gap-4 items-center mb-2">
              <input
                type="date"
                id="newDate"
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
              />
              <button
                type="button"
                onClick={handleAddDate}
                className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition"
              >
                Agregar fecha
              </button>
            </div>
            {formData.dates.length > 0 && (
              <ul className="text-gray-300 mt-4">
                {formData.dates.map((date, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{date}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDate(date)}
                      className="px-3 py-1 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Descripción */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-400 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Características */}
          <fieldset className="mb-6">
            <legend className="text-gray-400 mb-4 text-lg font-semibold">Características</legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Object.keys(formData.characteristics).map((key) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData.characteristics[key]}
                    onChange={handleCheckboxChange}
                    className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
                  />
                  <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {/* Imagen de portada */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Imagen de portada</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "coverImage")}
              className="block w-full text-gray-400 file:bg-yellow-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg cursor-pointer"
            />
          </div>
          {/* Galería de imágenes */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Galería de imágenes</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "gallery")}
              className="block w-full text-gray-400 file:bg-yellow-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg cursor-pointer"
            />
          </div>
          {/* Políticas del evento */}
          <div className="mb-6">
            <label htmlFor="eventPolicies" className="block text-gray-400 mb-2">
              Políticas del evento
            </label>
            <textarea
              id="eventPolicies"
              name="eventPolicies"
              value={formData.eventPolicies}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
              rows="4"
              required
            ></textarea>
          </div>
          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/events")}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition"
            >
              Guardar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
