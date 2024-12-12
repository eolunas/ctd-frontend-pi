import { useEffect, useState } from "react";
import { useCharStates } from "../Context";
import Card from "../Components/Card";
import { fetchFavoritesByUserId } from "../api/eventApi";

const Favs = () => {
  const { state } = useCharStates(); // Contexto global
  const [favorites, setFavorites] = useState([]); // Estado local para manejar los favoritos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para obtener los favoritos del usuario
  const getUserFavorites = async (userId) => {
    try {
      setLoading(true); // Inicia la carga
      const response = await fetchFavoritesByUserId(userId);
      setFavorites(response.data);
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  useEffect(() => {
    if (state?.user?.id) {
      getUserFavorites(state.user.id);
    }
  }, [state?.user?.id, state?.favorites]); // Añadir 'state?.favorites' a la dependencia para volver a cargar los favoritos si cambian
  

  // Función para actualizar la lista de favoritos localmente
  const handleFavoriteChange = (updatedFavorites) => {
    setFavorites(updatedFavorites);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-primaryBlue mb-4">
        Tus Eventos Favoritos
      </h1>
      {loading ? (
        <p>Cargando tus eventos favoritos...</p>
      ) : favorites.length > 0 ? (
        <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite, index) => (
            <Card
              key={index}
              event={favorite} // Aquí se pasa el favorito a la Card
              onFavoriteChange={handleFavoriteChange} // Pasamos la función de actualización
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
