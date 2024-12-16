import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../Hooks/useScreenSize";
import { useCharStates } from "../Context";
import { createFavorite, fetchFavoritesByUserId } from "../api/eventApi";
import FavIcon from "../assets/1-Iconos/Home/favorite-card.svg";
import FavIconFilled from "../assets/1-Iconos/Home/favorite-filled.svg";
import PlaceIcon from "../assets/1-Iconos/Home/place.svg";
import GenreIcon from "../assets/1-Iconos/Home/genre.svg";

const Card = ({ event, onFavoriteChange }) => {
  const screenSize = useScreenSize();
  const { state, dispatch } = useCharStates();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isErrorModalFavOpen, setIsErrorModalFavOpen] = useState(false);

  if (!event) {
    console.error("No se proporcionó un evento para el componente Card.");
    return null;
  }

  // Efecto para verificar el estado inicial de favorito
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (state?.user?.id) {
        try {
          const response = await fetchFavoritesByUserId(state.user.id);
          const isFavoriteEvent = response.data.some(
            (fav) => fav.id === event.id
          );
          setIsFavorite(isFavoriteEvent);
        } catch (error) {
          console.error("Error verificando estado de favorito:", error);
        }
      }
    };

    checkFavoriteStatus();
  }, [state?.user?.id, event.id]);

  // Manejar el cambio de estado de favorito
  const handleFavoriteToggle = async () => {
    if (!state?.user?.id) {
      setIsErrorModalFavOpen(true);
      return;
    }

    try {
      const response = await createFavorite(state.user.id, event.id);

      if (response.status === 200) {
        const newFavoriteStatus = !isFavorite;
        setIsFavorite(newFavoriteStatus);

        // Actualizar el estado global
        dispatch({
          type: newFavoriteStatus ? "ADD_FAVS" : "REMOVE_FAVS",
          payload: { id: event.id },
        });

        // Llamar al callback para actualizar la lista en Favs
        if (onFavoriteChange) {
          onFavoriteChange(event.id, newFavoriteStatus);
        }
      } else {
        setIsErrorModalFavOpen(true);
      }
    } catch (error) {
      console.error("Error al cambiar el estado de favorito:", error);
      setIsErrorModalFavOpen(true);
    }
  };

  // Modal de error
  const ErrorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Error</h2>
        <p>Debe iniciar sesión para gestionar favoritos</p>
        <button
          onClick={() => setIsErrorModalFavOpen(false)}
          className="mt-4 bg-secondaryYellow text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );

  return (
    <div key={event.id} className="z-10 overflow-hidden">
      <Link className="relative" to={`/detail/${event.id}`} state={{ event }}>
        <div
          className={`w-full aspect-[5/3] flex items-center justify-center overflow-hidden cursor-pointer rounded-xl`}
        >
          <img
            className="w-full h-full object-cover"
            src={event.coverImageUrl || "path/to/placeholder.jpg"}
            alt={event.name || "Nombre no disponible"}
          />
        </div>
      </Link>

      <div className="my-3 flex flex-col gap-4 lg:mx-5">
        <div className="flex w-full justify-between">
          <h3 className="text-white font-semibold text-2xl">
            {event.name || "Nombre no disponible"}
          </h3>
          <div className="basis-[15%] flex justify-end m-2">
            <div onClick={handleFavoriteToggle}>
              <img
                className="size-6 cursor-pointer"
                src={isFavorite ? FavIconFilled : FavIcon}
                alt="Favorite Icon"
              />
            </div>
          </div>
        </div>

        <p className="text-secondaryYellow text-xl">
          {event.city || "Ciudad no especificada"}
        </p>

        <div className="flex justify-between">
          <span className="text-white text-sm flex gap-2">
            <img className="size-6" src={PlaceIcon} alt="Place Icon" />
            {event.site || "Lugar no especificado"}
          </span>
          <span className="text-white text-sm flex gap-2">
            <img className="size-6" src={GenreIcon} alt="Genre Icon" />
            {event.genreName || "Género no especificado"}
          </span>
        </div>
      </div>

      {isErrorModalFavOpen && <ErrorModal />}
    </div>
  );
};

export default Card;
