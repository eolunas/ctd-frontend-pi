// src/Routes/EventDetail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EventDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state?.event;

  if (!event) return <p>Event not found</p>;

  return (
    <div className='bg-black  text-white p-4 sm:p-8'>
      <header className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold text-cyan-500'>
          Detalle de producto
        </h2>
        <button
          onClick={() => navigate(-1)}
          className='text-cyan-500 font-bold text-sm'
        >
          ← Regresar
        </button>
      </header>

      <div className='flex flex-col md:flex-row items-start md:items-center gap-8'>
        <div className='md:w-1/2'>
          <img
            src={event.imageUrl}
            alt={event.name}
            className='w-full object-cover rounded-lg'
          />
        </div>

        <div className='md:w-1/2'>
          <h3 className='text-2xl font-bold mb-2'>{event.name}</h3>
          <p className='text-gray-400'>{event.date}</p>
          <p className='text-gray-400'>{event.location}</p>

          <h4 className='text-lg font-bold mt-6 mb-2'>Acerca de</h4>
          <p className='text-gray-400'>
            {event.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
