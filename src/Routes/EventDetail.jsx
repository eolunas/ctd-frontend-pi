// src/Routes/EventDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;

  if (!event) return <p>Event not found</p>;

  return (
    <div className="bg-black text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-500">
          {event.name}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-yellow-500 font-bold text-sm"
        >
          ← Regresar
        </button>
      </header>

      {/* Información principal del evento */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4 text-gray-400">
          <p className="text-lg">{event.date}</p>
          <p>{event.city}, {event.country}</p>
          <p>{event.genre}</p>
          <p>{event.site}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Imagen principal del evento */}
          <div className="flex-1">
            <img
              src={event.images.large}
              alt={event.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Galería de imágenes */}
          <div className="flex flex-col gap-2">
            <img
              src={event.images.medium}
              alt={`${event.name} image 1`}
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src={event.images.small}
              alt={`${event.name} image 2`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Sección de características */}
        <section className="mt-6">
          <h3 className="text-xl font-bold text-cyan-500 mb-2">Características</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <img src="path/to/icon-sanitario.svg" alt="Sanitarios" className="w-6 h-6" />
              <p>Sanitarios</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <img src="path/to/icon-meetgreet.svg" alt="Meet & Greet" className="w-6 h-6" />
              <p>Meet & Greet</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <img src="path/to/icon-seguridad.svg" alt="Seguridad" className="w-6 h-6" />
              <p>Seguridad</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <img src="path/to/icon-wifi.svg" alt="Wi-Fi" className="w-6 h-6" />
              <p>Wi-Fi</p>
            </div>
          </div>
        </section>

        {/* Descripción del evento */}
        <section className="mt-6">
          <h3 className="text-xl font-bold text-yellow-500 mb-2">Descripción</h3>
          <p className="text-gray-400">{event.description}</p>
        </section>
      </div>
    </div>
  );
};

export default EventDetail;
