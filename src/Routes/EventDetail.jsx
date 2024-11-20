// src/Routes/EventDetail.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEventById } from "../api/eventApi";
import BackArrowIcon from "../assets/1-Iconos/DetalleProducto/back-white.svg";
import PlaceIcon from "../assets/1-Iconos/DetalleProducto/place.svg";
import GenreIcon from "../assets/1-Iconos/DetalleProducto/genre.svg";
import LocationIcon from "../assets/1-Iconos/DetalleProducto/city.svg";
import TimeIcon from "../assets/1-Iconos/DetalleProducto/hour.svg";
import Button from "../Components/Button";
import { useScreenSize } from "../Hooks/useScreenSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faRestroom } from "@fortawesome/free-solid-svg-icons";

// Importa los íconos de características locales
import SanitarioIcon from "../assets/Detail/wc.svg";
import MeetGreetIcon from "../assets/Detail/meet.svg";
import SeguridadIcon from "../assets/Detail/shield.svg";
import WifiIcon from "../assets/Detail/wifi.svg";
import AccesibilidadIcon from "../assets/Detail/disability.svg";
import EstacionamientoIcon from "../assets/Detail/parking.svg";
import MerchandisingIcon from "../assets/Detail/merchandising.svg";
import DescansoIcon from "../assets/Detail/chair.svg";

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
          <a
            onClick={() => navigate(-1)}
            className='flex justify-end align-center gap-2 text-white text-sm w-full h-4 cursor-pointer'
          >
            <img
              className='size-4 h-auto'
              src={BackArrowIcon}
              alt='BackArrow Icon'
            />
            <span className='flex justify-center items-center'>Regresar</span>
          </a>

          {/* Título y botones de función */}
          <div className='flex justify-between items-center my-4'>
            <h2 className='w-8/12 text-2xl font-bold text-secondaryYellow md:text-3xl'>
              {event.name}
            </h2>
            <div className='flex flex-col md:flex-row gap-2'>
              <Button color='secondaryYellow'>Reservar</Button>
              <Button type='secondary' color='secondaryYellow'>
                + Favorito
              </Button>
            </div>
          </div>

          {/* Fecha del evento */}
          <p className='text-2xl mb-6 md:text-3xl'>{event.eventDate}</p>

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
