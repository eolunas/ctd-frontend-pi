
import React from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const events = [
    {
      id: 1,
      name: "Festival Coachella",
      date: "November 2, 2024",
      location: "Empire Polo Club, Indio",
    },
    {
      id: 2,
      name: "Festival Coachella",
      date: "November 2, 2024",
      location: "Empire Polo Club, Indio",
    },
    // eventos
  ];

  return (
    <div className="bg-black p-4">
      <h2 className="text-lg font-bold text-cyan-500 mb-4">Recommendations</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-black rounded-lg overflow-hidden shadow-lg"
          >
            <Link to={`/detail/${event.id}`}>
              <img
                src="/src/assets/detalle.avif" // la ruta de la imagen
                alt={event.name}
                className="w-full h-48 object-cover cursor-pointer"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-white font-semibold text-xl">{event.name}</h3>
              <p className="text-gray-400">{event.location}</p>
              <p className="text-gray-400">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
