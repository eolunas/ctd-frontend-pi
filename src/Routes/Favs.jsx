import React, { useEffect, useState } from "react";
import { useCharStates } from "../Context";
import Card from "../Components/Card";

const Favs = () => {
  const { state, fetchUserFavs, toggleFavorite } = useCharStates(); // Contexto global
  const [favorites, setFavorites] = useState([]); // Estado local para manejar los favoritos

  useEffect(() => {
    if (state.user && state.user.id) {
      // Cargar favoritos del usuario al montar el componente
      const loadFavorites = async () => {
        try {
          const favs = await fetchUserFavs(state.user.id);
          setFavorites(favs);
        } catch (error) {
          console.error("Error al cargar favoritos:", error);
        }
      };

      loadFavorites();
    }
  }, [state.user, fetchUserFavs]);

  const handleToggleFavorite = async (eventId) => {
    if (state.user && state.user.id) {
      try {
        // Alternar favorito en el backend y actualizar el estado local
        await toggleFavorite(state.user.id, eventId);
        setFavorites((prev) =>
          prev.some((fav) => fav.id === eventId)
            ? prev.filter((fav) => fav.id !== eventId) // Eliminar si ya es favorito
            : [...prev, { id: eventId }] // Agregar si no es favorito
        );
      } catch (error) {
        console.error("Error al alternar favorito:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primaryBlue mb-4">
        Tus Eventos Favoritos
      </h1>
      {favorites.length > 0 ? (
        <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite, index) => (
            <Card
              key={index}
              event={favorite} // Aquí se pasa el favorito a la Card
              onFavoriteToggle={() => handleToggleFavorite(favorite.id)} // Manejo del toggle
              
            />
          ))}
        </div>
      ) : (
        <p>No tienes eventos favoritos.</p>
      )}
    </div>
  );
};

export default Favs;
