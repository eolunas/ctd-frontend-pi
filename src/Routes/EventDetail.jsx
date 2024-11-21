// src/Routes/EventDetail.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById } from "../api/eventApi";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import LocationIcon from "../assets/1-Iconos/DetalleProducto/city.svg";
import TimeIcon from "../assets/1-Iconos/DetalleProducto/hour.svg";
import Button from "../Components/Button";
import { useScreenSize } from "../Hooks/useScreenSize";

import Calendar from "../Components/Calendar";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEventById = async () => {
      const event = await fetchEventById(id);
      setEvent(event.data);
    };

    getEventById();

    window.scrollTo(0, 0);
  }, [id]);
  console.log(event.features);

  return (
    <>
      {event && (
        <div className='text-white px-6 sm:px-20'>
          {/* Botón de regresar a Home */}
          <div
            onClick={() => navigate(-1)}
            className=' hover:text-primaryBlue flex justify-end items-center mb-8 mt-2 gap-2 text-white text-sm w-full cursor-pointer'
          >
            <i className='fa-solid fa-arrow-left'></i>
            <span className='flex justify-center items-center'>Regresar</span>
          </div>

          <div className='flex flex-col lg:flex-row justify-between'>
            {/* Título y botones de función */}
            <div>
              <div className='flex lg:flex-col justify-between gap-4 flex-row  mb-2'>
                <div className=''>
                  <h2 className=' text-2xl font-bold text-secondaryYellow md:text-3xl'>
                    {event.name}
                  </h2>
                  <p className='text-2xl mb-8 md:text-3xl'>{event.eventDate}</p>
                </div>

                <div className='h-10 mb-12 flex w-32 md:w-52 justify-center items-center px-1.5 text-sm md:text-md py-1.5 rounded-full cursor-pointer text-center transition duration-200 ease-in-out border-secondaryYellow border'>
                  + Favorito
                </div>
              </div>

              {/* Descripción general */}
              <div className='flex flex-col items-center gap-4 mt-6 mb-16 text-gray-400'>
                <div className='flex gap-6 w-full'>
                  <span className='flex gap-2 w-4/12'>
                    <img className='size-6' src={TimeIcon} alt='Time Icon' />
                    {event.eventTime}
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
            <div className='flex gap-4 justify-center items-center flex-col mb-4'>
              <Calendar />
              <div className='w-72'>
                <Button color='secondaryYellow'>Reservar</Button>
              </div>
            </div>
          </div>
          {/* Galería de imágenes */}
          {event?.images?.[screenSize] && (
            <div className='flex flex-col md:flex-row gap-1 mb-16'>
              <div className='w-full aspect-[5/4] flex items-center justify-center overflow-hidden cursor-pointer rounded-xl'>
                <img
                  className='w-full h-full object-cover'
                  src={event.images[screenSize]}
                  alt={event.name}
                />
              </div>
              <div className='flex w-full md:flex-wrap md:basis-[60%]'>
                {event.gallery.map((item, index) => {
                  if (index < 4)
                    return (
                      <img
                        key={item.id}
                        src={item.imageUrl}
                        alt={`${event.name} image ${item.id}`}
                        className='p-1 w-3/12 aspect-[5/4] object-cover rounded-xl md:w-3/6'
                      />
                    );
                })}
              </div>
            </div>
          )}

          {/* Sección de características */}
          <section className='my-4 px-6 py-5 bg-gray-700/20 shadow-lg rounded-2xl mb-16'>
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

          {/* Descripción del evento */}
          <section className='mb-6'>
            <h3 className='text-xl font-bold text-yellow-500 mb-2'>
              Descripción
            </h3>
            <p className='text-white'>{event.description}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default EventDetail;
