import { useLocation, useNavigate } from "react-router-dom";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useCharStates } from "../Context";
function BookingSucces() {
  const location = useLocation();
  const { event, selectedDates, data } = location.state || {}; // Asegúrate de manejar el caso donde no haya estado
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const formatSelectedDate = (date) => {
    if (!date) return "";
    const fullDate = dayjs(`${date.month}-${date.day}`).locale("es");
    return fullDate.format("D [de] MMMM [de] YYYY"); // Formato: 22 de enero de 2025
  };
  const { state } = useCharStates();

  return (
    <div className='bg-[#212121] text-white p-6 max-w-4xl mx-auto rounded-md shadow-lg flex gap-6'>
      {/* Tarjeta del Evento */}
      <div className='w-1/2   '>
        <img
          src={event.coverImageUrl} // Cambia esto por tu URL de imagen
          alt='Event Poster'
          className='w-full  h-60 object-cover rounded-xl '
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
          <p className='flex items-center text-center  mt-2 gap-2 text-gray-400'>
            <div className='size-6'>
              <i className='fa-solid fa-calendar-days text-secondaryYellow'></i>
            </div>
            {formatSelectedDate(selectedDates)}
          </p>
          <p className='flex items-center text-center mt-2 gap-2 text-gray-400'>
            <div className='size-6'>
              <i className='fa-regular fa-clock text-secondaryYellow'></i>
            </div>
            {selectedDates.hour}
          </p>
        </div>
      </div>

      {/* Información de la Reserva */}
      <div className='w-1/2 flex flex-col justify-between  '>
        <div className=' rounded-lg p-4 flex flex-col items-center justify-start text-start'>
          <h3 className='text-secondaryYellow text-lg font-semibold'>
            ¡Tu reserva ha sido confirmada con éxito! Estás a un paso de vivir
            una experiencia musical única.
          </h3>
          <p className='text-base font-normal mt-2'>
            Si tienes alguna duda o necesitas más información, no dudes en
            contactarnos. ¡Nos vemos en el concierto! 🎵
          </p>
        </div>
        <div>
          <p className='text-lg font-semibold text-secondaryYellow mt-2'>
            Tu reserva fue enviada
          </p>

          <p className='text-lg font-medium mt-2'>
            Nombre:{" "}
            <span className='text-base font-normal'>
              {state?.user?.fullName}
            </span>
          </p>
          <p className='text-lg font-medium mt-2'>
            Email:{" "}
            <span className='text-base font-normal'>{state?.user?.email}</span>
          </p>
          <p className='text-lg font-medium mt-2'>
            No. de reserva:{" "}
            <span className='text-base font-normal'>{data?.ticketNumber}</span>
          </p>
        </div>

        <div className='mt-8 flex justify-between gap-4'>
          <div
            onClick={handleNavigate}
            className='bg-primaryBlue flex justify-center items-center py-1  rounded-full text-white px-6 cursor-pointer'
          >
            Volver a inicio
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSucces;
