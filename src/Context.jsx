import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { reducer } from "./Reducers/reducer";
import { fetchEvents, fetchCities } from "./api/eventApi";
import { fetchGenres } from "./api/genreApi";
import { fetchCategories } from "./api/categoryApi";
import axios from "axios";

const CharStates = createContext(null);

const initialState = {
  genres: [],
  cities: [],
  topCategories: [],
  list: [],
  filteredList: [],
  favs: JSON.parse(localStorage.getItem("favs")) || [], // Cargar favoritos del almacenamiento local
  homeFilters: {},
  theme: localStorage.getItem("theme") === "true",
  isLoggedIn: false,
  user: null,
  registrationSuccess: false,
};

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  const toggleFavorite = async (userId, eventId) => {
    try {
      const isFavorite = state.favs.some((fav) => fav.id === eventId);

      if (isFavorite) {
        // Si ya es favorito, eliminarlo
        await axios.delete(
          `https://50xba6bw91.execute-api.us-east-1.amazonaws.com/favorite?userId=${userId}&eventId=${eventId}`
        );
        dispatch({ type: "REMOVE_FAV", payload: eventId });
      } else {
        // Si no es favorito, agregarlo
        await axios.post(
          `https://50xba6bw91.execute-api.us-east-1.amazonaws.com/favorite?userId=${userId}&eventId=${eventId}`
        );
        const event = { id: eventId }; // Ajusta según los datos del evento que tengas
        dispatch({ type: "ADD_FAV", payload: event });
      }
    } catch (error) {
      console.error("Error al alternar favorito:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const [genresResponse, allCities, topCategories, eventsResponse] =
          await Promise.all([
            fetchGenres(),
            fetchCities(),
            fetchCategories(),
            fetchEvents(),
          ]);

        dispatch({
          type: "SET_DATA",
          payload: {
            genres: genresResponse.data,
            cities: allCities.data,
            topCategories: topCategories,
            events: eventsResponse.data,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
    document.body.className = state.theme ? "light" : "dark";
  }, [state.theme]);

  const fetchUserFavs = async (userId) => {
    try {
      const response = await axios.get(
        `https://50xba6bw91.execute-api.us-east-1.amazonaws.com/favorite?userId=${userId}`
      );
      dispatch({ type: "SET_FAVS", payload: response.data }); // Actualiza los favoritos en el estado global
      return response.data; // Devuelve los favoritos para uso adicional
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const response = await axios.get("/auth/status");
        if (response.data.isLoggedIn) {
          dispatch({
            type: "LOGIN",
            payload: {
              isLoggedIn: response.data.isLoggedIn,
              user: response.data.user,
            },
          });
        }
      } catch (error) {
        console.error("Error al verificar el estado de autenticación:", error);
      } finally {
        setLoading(false);
      }
    };

    getAuthStatus();
  }, []);

  return (
    <CharStates.Provider
      value={{
        state,
        dispatch,
        loading,
        toggleFavorite,
        fetchUserFavs,
      }}
    >
      {children}
    </CharStates.Provider>
  );
};

export const useCharStates = () => useContext(CharStates);
