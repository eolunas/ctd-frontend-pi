import { useLocation, useNavigate } from "react-router-dom";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";
import dayjs from "dayjs";
import "dayjs/locale/es";
import Calendar from "../Components/Calendar";
import { useState } from "react";

function BookingDate() {
  const location = useLocation();
  const { event, selectedDate, dates } = location.state || {}; // Manejo del estado
  const navigate = useNavigate();

  const [showCalendar, setShowCalendar] = useState(false); // Estado para la visibilidad del calendario
  const [selectedDates, setSelectedDates] = useState(selectedDate);
  const handleDateSelect = (date) => {
    console.log("Fecha seleccionada:", date);
    setSelectedDates(date);
  };
  const handleNavigate = () => {
    navigate("/booking/summary", { state: { event, selectedDates } });
  };

  const handleDateChange = () => {
    setShowCalendar((prev) => !prev); // Alterna la visibilidad del calendario
  };

  const formatSelectedDate = (date) => {
    if (!date) return "";
    const fullDate = dayjs(`${date.month}-${date.day}`).locale("es");
    return fullDate.format("D [de] MMMM [de] YYYY"); // Formato: 22 de enero de 2025
  };

  return (
    <div className='bg-[#212121] text-white p-6 w-full mx-auto rounded-md shadow-lg flex md:flex-row flex-col gap-6'>
      {/* Tarjeta del Evento */}
      <div className='md:w-1/2 w-full'>
        <img
          src={event.coverImageUrl}
          alt='Event Poster'
          className='w-full h-60 object-cover rounded-xl'
        />
        <div className='pt-4'>
          <h2 className='text-xl font-semibold'>{event.name}</h2>
          <p className='text-yellow-400 mt-2'>{event.city}</p>
          <p className='flex items-center mt-2 gap-2 text-gray-400'>
            <img className='size-6' src={PlaceIcon} alt='Genre Icon' />
            {event.site}
          </p>
          <p className='flex items-center mt-2 gap-2 text-gray-400'>
            <img className='size-6' src={GenreIcon} alt='Genre Icon' />
            {event.genreName}
          </p>
        </div>
      </div>

      {/* Información de la Reserva */}
      <div className='md:w-1/2 w-full flex flex-col justify-between'>
        <div>
          <h3 className='text-yellow-400 text-lg font-semibold'>
            Fecha seleccionada
          </h3>
          <p className='text-xl font-medium mt-2'>
            {formatSelectedDate(selectedDates)}
          </p>
          <p className='text-lg font-normal mt-2'>{selectedDates.hour} hrs</p>
          <button
            className='text-blue-400 underline mt-2'
            onClick={handleDateChange} // Maneja la visibilidad del calendario
          >
            Cambiar fecha
          </button>

          {showCalendar && ( // Renderiza el calendario si `showCalendar` es true
            <div className='mt-4 bg-[#212121] absolute border rounded-3xl'>
              <Calendar
                dates={dates}
                notDouble
                onDateSelect={handleDateSelect}
              />
              <div className='flex mb-4 mx-2 gap-2'>
                <div
                  onClick={() => setShowCalendar(false)}
                  className='border-primaryBlue flex justify-center items-center py-1 border rounded-full text-white w-full cursor-pointer'
                >
                  Cancelar
                </div>
              </div>
            </div>
          )}

          <h3 className='text-yellow-400 text-lg font-semibold mt-6'>
            Valor: ${event.price} COP
          </h3>
        </div>

        <div className='mt-8 flex justify-between gap-4'>
          <div
            onClick={() => navigate(`/`)}
            className='border-primaryBlue flex justify-center items-center py-1 border rounded-full text-white w-full cursor-pointer'
          >
            Cancelar
          </div>
          <div
            onClick={handleNavigate}
            className='bg-primaryBlue flex justify-center items-center py-1 rounded-full text-white w-full cursor-pointer'
          >
            Continuar
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDate;
