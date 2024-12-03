import { useLocation, useNavigate } from "react-router-dom";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";

function BookingDate() {
  const location = useLocation();
  const { event } = location.state || {}; // Asegúrate de manejar el caso donde no haya estado
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/booking/summary", { state: { event } });
  };

  return (
    <div className='bg-[#212121] text-white p-6 max-w-4xl mx-auto rounded-md shadow-lg flex gap-6'>
      {/* Tarjeta del Evento */}
      <div className='w-1/2   '>
        <img
          src={event.coverImageUrl} // Cambia esto por tu URL de imagen
          alt='Event Poster'
          className='w-full h-52 object-cover rounded-xl '
        />
        <div className='p-4'>
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
      <div className='w-1/2 flex flex-col justify-between '>
        <div>
          <h3 className='text-yellow-400 text-lg font-semibold'>
            Fecha seleccionada
          </h3>
          <p className='text-xl font-medium mt-2'>{event.date}</p>
          <button
            className='text-blue-400 underline mt-2'
            // onClick={handleDateChange}
          >
            Cambiar fecha
          </button>

          <h3 className='text-yellow-400 text-lg font-semibold mt-6'>
            Selecciona el número de boletos
          </h3>
          {/* <select
            value={ticketCount}
            onChange={handleTicketChange}
            className='mt-2 block w-16 p-2 bg-gray-800 border border-gray-600 rounded-md text-white text-center'
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num} value={num + 1}>
                {String(num + 1).padStart(2, "0")}
              </option>
            ))}
          </select> */}
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
            className='bg-primaryBlue flex justify-center items-center py-1  rounded-full text-white w-full cursor-pointer'
          >
            Continuar
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDate;
