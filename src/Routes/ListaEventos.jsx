import React, { useState } from "react";
import DetalleModal from "../Components/DetalleModal";

const ListaEventos = () => {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const eventos = [
    {
      id: 1,
      nombre: "Festival Coachella",
      fecha: "15-17 de Abril, 2024",
      lugar: "Empire Polo Club en Indio",
      edadMinima: "18+",
      tarifas: "$300 - $500",
    },
    {
      id: 2,
      nombre: "Festival Coachella",
      fecha: "15-17 de Abril, 2024",
      lugar: "Empire Polo Club en Indio",
      edadMinima: "18+",
      tarifas: "$300 - $500",
    },
    
  ];

  const handleOpenModal = (evento) => {
    setEventoSeleccionado(evento);
  };

  const handleCloseModal = () => {
    setEventoSeleccionado(null);
  };

  return (
    <div className="bg-black p-4">
      <h2 className="text-lg font-bold text-cyan-500 mb-4">Recomendaciones</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="bg-black rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src="/ruta/a/la/imagen.jpg" // ruta de la imagen 
              alt={evento.nombre}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => handleOpenModal(evento)}
            />
            <div className="p-4">
              <h3 className="text-white font-semibold text-xl">{evento.nombre}</h3>
              <p className="text-gray-400">{evento.lugar}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Modal de Detalle */}
      {eventoSeleccionado && (
        <DetalleModal evento={eventoSeleccionado} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ListaEventos;
