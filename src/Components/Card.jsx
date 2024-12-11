import { Link } from "react-router-dom";
import { useScreenSize } from "../Hooks/useScreenSize";
import { useCharStates } from "../Context";
import FavIcon from "../assets/1-Iconos/Home/favorite-card.svg";
import FavIconFilled from "../assets/1-Iconos/Home/favorite-filled.svg";
import PlaceIcon from "../assets/1-Iconos/Home/place.svg";
import GenreIcon from "../assets/1-Iconos/Home/genre.svg";

// eslint-disable-next-line react/prop-types
const Card = ({ event }) => {
  const screenSize = useScreenSize();
  const { state, dispatch } = useCharStates();

  // Validación para evitar errores si event no está definido
  if (!event) {
    console.error("No se proporcionó un evento para el componente Card.");
    return null;
  }

  // Verificar si el evento está en favoritos usando el estado global
  const isFavorite = state.favs.some((item) => item.id === event.id);

  // Función para alternar entre agregar o quitar de favoritos
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: "REMOVE_FAV",
        payload: { id: event.id },
      });
    } else {
      dispatch({
        type: "ADD_FAV",
        payload: event,
      });
    }
  };

  return (
    <div key={event.id} className="z-10 overflow-hidden">
      <Link className="relative" to={`/detail/${event.id}`} state={{ event }}>
        <div
          className={`w-full aspect-[5/3] flex items-center justify-center 
        overflow-hidden cursor-pointer rounded-xl`}
        >
          <img
            className="w-full h-full object-cover"
            src={event.coverImageUrl || "path/to/placeholder.jpg"} // Validación para imágenes
            alt={event.name || "Nombre no disponible"} // Validación para el nombre
          />
        </div>
        <div
          className={`hidden
          bg-secondaryYellow absolute bottom-0 left-0 w-5/12 h-1/4 rounded-tr-2xl rounded-bl-xl
          flex flex-col justify-center items-center`}
        >
          <span className="text-white text-lg sm:text-xl lg:text-2xl">
            {event.eventDate || "Fecha no disponible"}{" "}
            {/* Validación para la fecha */}
          </span>
          <span className="text-white text-sm sm:text-lg lg:text-xl">
            {event.eventTime || "Hora no disponible"}{" "}
            {/* Validación para la hora */}
          </span>
        </div>
      </Link>
      <div className="my-3 flex flex-col gap-4 lg:mx-5">
        <div className="flex w-full justify-between">
          <h3 className="text-white font-semibold text-2xl">
            {event.name || "Nombre no disponible"}{" "}
            {/* Validación para el nombre */}
          </h3>
          <div className="basis-[15%] flex justify-end m-2">
            <a onClick={toggleFavorite}>
              <img
                className="size-6 cursor-pointer"
                src={isFavorite ? FavIconFilled : FavIcon}
                alt="Favorite Icon"
              />
            </a>
          </div>
        </div>
        <p className="text-secondaryYellow text-xl">
          {event.city || "Ciudad no especificada"}
          {/* Validación para la ciudad */}
        </p>
      </div>
    </div>
  );
};

export default Card;
