
import React from "react";

const DetalleModal = ({ evento, onClose }) => {
  if (!evento) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-2">{evento.nombre}</h2>
        <p><strong>Fecha:</strong> {evento.fecha}</p>
        <p><strong>Lugar:</strong> {evento.lugar}</p>
        <p><strong>Edad mínima:</strong> {evento.edadMinima}</p>
        <p><strong>Tarifas:</strong> {evento.tarifas}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default DetalleModal;
