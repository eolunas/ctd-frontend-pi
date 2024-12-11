// src/Routes/EventDetail.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchEventById,
  fetchDatesByEventId,
  fetchFavoritesByUserId,
  createFavorite,
} from "../api/eventApi";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import LocationIcon from "../assets/1-Iconos/DetalleProducto/city.svg";
import TimeIcon from "../assets/1-Iconos/DetalleProducto/hour.svg";

import Calendar from "../Components/Calendar";
import ErrorMessage from "../Components/ErrorMessage";
import { useCharStates } from "../Context";

const EventDetail = () => {
  const { id } = useParams();
  const { state } = useCharStates();

  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isErrorModalDateOpen, setIsErrorModalDateOpen] = useState(false);
  // const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [nearestDate, setNearestDate] = useState(null);
  const [dates, setDates] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);

  const getSpecificFavorite = async (userId, eventId) => {
    try {
      const response = await fetchFavoritesByUserId(userId);
      const favorites = response.data; // Lista de favoritos

      const favoriteEvent = favorites.find(
        (favorite) => favorite.id == eventId
      );
      setIsFavorite(!!favoriteEvent); // Actualiza isFavorite según si existe el evento
    } catch (error) {
      console.error("Error al obtener el favorito específico:", error);
    }
  };

  useEffect(() => {
    if (state?.user?.id && id) {
      getSpecificFavorite(state.user.id, id);
    }
  }, [state?.user?.id, id]);

  const handleFavoriteToggle = async () => {
    try {
      await createFavorite(state.user.id, id);

      setIsFavorite(!isFavorite); // Cambiar el estado después de la respuesta
    } catch (error) {
      console.error("Error al cambiar el estado de favorito:", error);
    }
  };

  const handleDateSelect = (date) => {
    console.log("Fecha seleccionada:", date);
    setSelectedDate(date);
  };

  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await fetchEventById(id);
        const eventData = response.data;
        const dates = await fetchDatesByEventId(id);
        const dateData = dates.data;

        setDates(dateData);
        setEvent(eventData);

        if (eventData.dates) {
          const now = new Date();
          const closestDate = eventData.dates
            .map((date) => new Date(date))
            .filter((date) => date >= now)
            .reduce(
              (closest, current) =>
                Math.abs(current - now) < Math.abs(closest - now)
                  ? current
                  : closest,
              new Date(8640000000000000)
            );
          setNearestDate(closestDate);
        }
      } catch (error) {
        console.error(error);
        setIsErrorOpen(true);
      }
    };

    getEventById();
    window.scrollTo(0, 0);
  }, [id]);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };
  const handleNavigate = () => {
    if (state.user?.role && selectedDate) {
      navigate("/booking", { state: { event, selectedDate, dates } });
    } else if (!state.user?.role) {
      setIsErrorModalOpen(true);
    } else if (!selectedDate) {
      setIsErrorModalDateOpen(true);
    }
  };

  return (
    <>
      {event && (
        <div className='text-white '>
          {/* Botón de regresar a Home */}
          <div
            onClick={() => navigate(-1)}
            className=' hover:text-primaryBlue flex justify-end items-center mb-8 mt-2 gap-2 text-white text-sm w-full cursor-pointer'
          >
            <i className='fa-solid fa-arrow-left'></i>
            <span className='flex justify-center items-center'>Regresar</span>
          </div>

          <div className='flex flex-col w-full  lg:flex-row justify-between'>
            {/* Título y botones de función */}
            <div className='w-full'>
              <div className='flex lg:flex-col justify-between gap-4 flex-row  mb-2'>
                <div className=''>
                  <h2 className=' text-2xl font-bold text-secondaryYellow md:text-3xl'>
                    {event.name}
                  </h2>
                  <div className='text-2xl lg:mb-8 md:text-3xl'>
                    {nearestDate ? (
                      <div className='text-white'>
                        {/* Fecha más cercana:{" "} */}
                        {nearestDate.toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                      </div>
                    ) : (
                      <>
                        <p>No hay fechas disponibles próximamente</p>
                      </>
                    )}
                  </div>
                </div>

                <div
                  onClick={handleFavoriteToggle}
                  className='h-10 lg:mb-12 flex w-32 md:w-52 justify-center items-center px-1.5 text-sm md:text-md py-1.5 rounded-full cursor-pointer text-center transition duration-200 ease-in-out border-secondaryYellow border'
                >
                  {isFavorite
                    ? "- Quitar de Favoritos"
                    : "+ Agregar a Favoritos"}
                </div>
              </div>

              {/* Descripción general */}
              <div className='flex flex-col items-center gap-4 mt-6 mb-16 text-gray-400'>
                <div className='flex gap-6 w-full'>
                  <span className='flex gap-2 w-4/12'>
                    <img className='size-6' src={TimeIcon} alt='Time Icon' />
                    {Array.isArray(event.dates) && event.dates.length > 0
                      ? `${new Date(event.dates[0]).toLocaleTimeString(
                          "es-ES",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )} hrs`
                      : "Hora no disponible"}
                  </span>

                  <span className='flex gap-2'>
                    <img
                      className='size-6'
                      src={LocationIcon}
                      alt='Location Icon'
                    />
                    {event.city}
                  </span>
                </div>
                <div className='flex gap-6 w-full'>
                  <span className='flex gap-2 w-4/12'>
                    <img className='size-6' src={GenreIcon} alt='Genre Icon' />
                    {event.genreName}
                  </span>
                  <span className='flex gap-2'>
                    <img className='size-6' src={PlaceIcon} alt='Place Icon' />
                    {event.site}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex gap-4 w-full justify-center items-center flex-col mb-4'>
              <Calendar dates={dates} onDateSelect={handleDateSelect} />
              <div
                className='h-10 w-1/2  bg-secondaryYellow flex justify-center items-center md:px-6 px-1.5 text-sm md:text-md py-1.5 rounded-full cursor-pointer text-center transition duration-200 ease-in-out'
                onClick={handleNavigate}
              >
                Reservar
              </div>
            </div>
          </div>
          {/* Galería de imágenes */}
          {event?.coverImageUrl && (
            <div className='flex flex-col md:flex-row gap-1 mb-16'>
              <div
                className='w-full aspect-[5/4] flex items-center justify-center overflow-hidden cursor-pointer rounded-xl'
                onClick={() => openModal(event.coverImageUrl)}
              >
                <img
                  className='w-full h-full object-cover'
                  src={event.coverImageUrl}
                  alt={event.name}
                />
              </div>
              <div className='flex w-full flex-wrap md:basis-[60%]'>
                {event.gallery.slice(0, 4).map((item, index) => (
                  <img
                    key={item.id}
                    src={item.imageUrl}
                    alt={`${event.name} image ${item.id}`}
                    className={`p-1 ${
                      event.gallery.length === 1
                        ? "w-full md:h-full h-32"
                        : event.gallery.length === 2
                        ? "w-full"
                        : event.gallery.length === 3
                        ? index < 2
                          ? "w-1/2" // For the first two images
                          : "w-full" // For the third image, in a new row
                        : "p-1 w-3/12 aspect-[5/4] object-cover rounded-xl md:w-3/6 cursor-pointer"
                    } aspect-[5/4] object-cover rounded-xl cursor-pointer`}
                    onClick={() => openModal(item.imageUrl)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sección de características */}
          <section className='my-4 w-full px-6 py-5 bg-gray-700/20 shadow-lg rounded-2xl mb-16'>
            <h3 className='text-xl font-bold text-primaryBlue mb-6'>
              Características
            </h3>
            <div className=' w-full flex flex-wrap gap-y-4 '>
              {event.features?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className='flex items-center justify-start gap-4 w-full sm:w-[50%] lg:w-[20%]'
                  >
                    <i className={`${item.iconCode} text-primaryBlue`}></i>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {isErrorOpen && (
            <ErrorMessage
              title='Lo sentimos :('
              description='No se puede obtener la información en este momento, inténtalo más tarde.'
              buttonText='Volver al inicio'
              onClose={() => setIsErrorOpen(false)}
            />
          )}

          {/* Descripción del evento */}
          <section className='mb-6'>
            <h3 className='text-xl font-bold text-secondaryYellow mb-2'>
              Descripción
            </h3>
            <p className='text-white'>{event.description}</p>
          </section>

          {event.policies ? (
            <section className='mb-6'>
              <h3 className='text-xl font-bold text-primaryBlue mb-2'>
                Políticas del evento
              </h3>
              <p className='text-white'>{event.policies}</p>
            </section>
          ) : (
            <></>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
          <div className='absolute inset-0' onClick={closeModal}></div>
          <div className='relative p-4 bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-hidden'>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-white text-xl'
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt='Selected'
              className='w-full h-full object-contain'
            />
          </div>
        </div>
      )}
      {isErrorModalOpen && (
        <ErrorMessage
          title='Lo sentimos :('
          description='Debes tener una sesión iniciada para poder reservar.'
          buttonText='Volver a Inicio'
          onClose={() => setIsErrorModalOpen(false)}
        />
      )}
      {isErrorModalDateOpen && (
        <ErrorMessage
          title='Lo sentimos :('
          description='Deber elegir una fecha para reservar.'
          buttonText='Volver a Inicio'
          onClose={() => setIsErrorModalDateOpen(false)}
        />
      )}
    </>
  );
};

export default EventDetail;
