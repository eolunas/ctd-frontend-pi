
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // datos API
  const event = {
    id,
    name: "Festival Coachella",
    date: "Saturday, November 2",
    location: "Monumental Plaza De Toros México",
    city: "Mexico City, DF",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <div className="bg-black min-h-screen text-white p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-cyan-500 font-bold text-sm"
        >
          ← Go Back
        </button>
        <h2 className="text-3xl font-bold text-cyan-500">Product Detail</h2>
      </header>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Imagen del evento */}
        <div className="md:w-1/2">
          <img
            src="../assets/detalle.avif" // ruta de la imagen
            alt={event.name}
            className="w-full object-cover rounded-lg"
          />
        </div>

        {/* Información del evento */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
          <p className="text-gray-400">{event.date}</p>
          <p className="text-gray-400">{event.city}</p>
          <p className="text-gray-400">{event.location}</p>

          <h4 className="text-lg font-bold mt-6 mb-2">About</h4>
          <p className="text-gray-400">{event.description}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center text-gray-400">
        <div className="flex items-center space-x-2">
          <img src="../assets/detalle.avif" alt="TicketGo" className="w-10 h-10" />
          <p>©2024 TicketGo, all rights reserved.</p>
        </div>
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <a href="#" className="hover:text-cyan-500">Facebook</a>
          <a href="#" className="hover:text-cyan-500">Instagram</a>
          <a href="#" className="hover:text-cyan-500">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
};

export default EventDetail;
