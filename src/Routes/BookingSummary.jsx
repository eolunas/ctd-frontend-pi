import { useLocation, useNavigate } from "react-router-dom";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";
import { useCharStates } from "../Context";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { createReservation } from "../api/eventApi";
function BookingSummary() {
  const location = useLocation();
  const { event, selectedDates } = location.state || {}; // Asegúrate de manejar el caso donde no haya estado
  const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate("/booking/succes", { state: { event, selectedDates } });
  // };
  const { state } = useCharStates();

  const formatSelectedDate = (date) => {
    if (!date) return "";
    const fullDate = dayjs(`${date.month}-${date.day}`).locale("es");
    return fullDate.format("D [de] MMMM [de] YYYY"); // Formato: 22 de enero de 2025
  };
  const iva = 15000;

  const handleReservation = async () => {
    try {
      // Extraer solo la fecha (YYYY-MM-DD)
      const formattedDate = dayjs(selectedDates.fullDate).format("YYYY-MM-DD");
      const response = await createReservation(
        formattedDate,
        event.id,
        state.user.id
      );
      console.log("Reservation successful:", response.data);
      const data = response.data;
      navigate("/booking/succes", { state: { event, selectedDates, data } });
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert(
        "Hubo un error al realizar la reserva. Por favor, intenta nuevamente."
      );
    }
  };

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
        <div className='bg-[#424242] rounded-lg p-4 flex flex-col items-center justify-center'>
          <h3 className='text-secondaryYellow text-2xl font-semibold'>
            Información
          </h3>
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
            <span className='text-base font-normal'>0000{state?.user?.id}</span>
          </p>

          <h3 className='text-secondaryYellow text-2xl border-t border-primaryBlue pt-2 w-full text-center font-semibold mt-6'>
            Costo total
          </h3>
          <div className='flex items-center gap-2 justify-center'>
            <i className='fa-solid fa-ticket text-secondaryYellow'></i>
            1X
            <p className='text-xl font-medium '>
              {" "}
              <span className='text-base font-normal'>${event.price} COP</span>
            </p>
          </div>

          <p className='text-xl w-full text-center border-b border-primaryBlue pb-2 font-medium mt-2'>
            Impuesto<span className='text-base font-normal'> ${iva} COP</span>
          </p>
          <div className='flex gap-4'>
            <p className='text-xl text-secondaryYellow  text-center pb-2 font-medium mt-2'>
              Total
            </p>
            <p className='text-xl  text-center pb-2 font-medium mt-2'>
              ${iva + event.price} COP
            </p>
          </div>

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
            onClick={() => navigate(-1)}
            className='border-primaryBlue flex justify-center items-center py-1 border rounded-full text-white w-full cursor-pointer'
          >
            Regresar
          </div>
          <div
            onClick={handleReservation}
            className='bg-primaryBlue flex justify-center items-center py-1  rounded-full text-white w-full cursor-pointer'
          >
            Confirmar
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
