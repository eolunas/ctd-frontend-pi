import { useLocation, useNavigate } from "react-router-dom";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";

function BookingSucces() {
  const location = useLocation();
  const { event } = location.state || {}; // Asegúrate de manejar el caso donde no haya estado
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/booking/succes", { state: { event } });
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
      <div className='w-1/2 flex flex-col justify-between  '>
        <div className='bg-[#E0E0E0] rounded-lg p-4 flex flex-col items-center justify-center'>
          <h3 className='text-secondaryYellow text-lg font-semibold'>
            Feclicidades
          </h3>
          <p className='text-xl font-medium mt-2'>{event.date}</p>
        </div>

        <div className='mt-8 flex justify-between gap-4'>
          <div
            onClick={() => navigate(-1)}
            className='border-primaryBlue flex justify-center items-center py-1 border rounded-full text-white w-full cursor-pointer'
          >
            Regresar
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

export default BookingSucces;
