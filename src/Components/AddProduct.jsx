// src/Routes/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    date: "",
    description: "",
    images: null,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        images: file,
      }));
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí podrías agregar la lógica para enviar los datos al backend
    navigate("/admin/products"); // Vuelve a la lista de productos
  };

  return (
    <div className="p-8 bg-black text-white w-full flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">Nuevo Producto</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-400 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
              required
            />
          </div>
          {/* Categoría y Fecha */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-gray-400 mb-2">
                Categoría
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
              <label htmlFor="date" className="block text-gray-400 mb-2">
                Fecha
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
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
          {/* Imágenes */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Imágenes</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-gray-400 file:bg-yellow-500 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg cursor-pointer"
            />
          </div>
          {/* Características */}
         {/* Características */}
<fieldset className="mb-6">
  <legend className="text-gray-400 mb-4 text-lg font-semibold">Características</legend>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="wifi"
        checked={formData.characteristics.wifi}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Wifi</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="accesibilidad"
        checked={formData.characteristics.accesibilidad}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Accesibilidad</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="seguridad"
        checked={formData.characteristics.seguridad}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Seguridad</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="merchandising"
        checked={formData.characteristics.merchandising}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Merchandising</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="estacionamiento"
        checked={formData.characteristics.estacionamiento}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Estacionamiento</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="estabilidad"
        checked={formData.characteristics.estabilidad}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Estabilidad</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="meetAndGreet"
        checked={formData.characteristics.meetAndGreet}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Meet and Greet</span>
    </label>
    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        name="descanso"
        checked={formData.characteristics.descanso}
        onChange={handleCheckboxChange}
        className="w-6 h-6 text-yellow-500 bg-gray-700 border-gray-600 rounded-lg focus:ring-yellow-500"
      />
      <span className="text-gray-300">Área de descanso</span>
    </label>
  </div>
</fieldset>

          {/* Botones */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
