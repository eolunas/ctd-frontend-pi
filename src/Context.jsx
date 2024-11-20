import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { reducer } from "./Reducers/reducer";
import { getAuthStatus, register } from "./auth";
import { fetchEvents } from "./api/eventApi";
import { fetchGenres } from "./api/genreApi";

const CharStates = createContext(null);

const initialState = {
  genres: [],
  topCategories: [],
  list: [],
  favs: JSON.parse(localStorage.getItem("favs")) || [],
  homeFilters: {},
  theme: localStorage.getItem("theme") === "true",
  isLoggedIn: false,
  user: null,
  registrationSuccess: false,
};

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const getData = async () => {
      try {
        // Ejecuta todas las llamadas en paralelo
        const [genresResponse, topGenresResponse, eventsResponse] =
          await Promise.all([
            fetchGenres(),
            fetchGenres({ topGenres: true }),
            fetchEvents(),
          ]);

        // console.log(genresResponse.data);
        // console.log(topGenresResponse.data);
        // console.log(eventsResponse.data);

        dispatch({
          type: "SET_DATA",
          payload: {
            genres: genresResponse.data,
            topGenres: topGenresResponse.data,
            events: eventsResponse.data,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Puedes manejar el error aquí, por ejemplo, despachando una acción de error
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

  const handleRegister = async (userData) => {
    const result = await register(userData);
    if (result.isRegistered) {
      dispatch({
        type: "REGISTER",
        payload: result,
      });
      console.log("Registro completado");

      // Después de registrar correctamente, actualizar el estado en el contexto
      dispatch({
        type: "SET_REGISTRATION_SUCCESS",
        payload: true,
      });
    } else {
      dispatch({
        type: "SET_REGISTRATION_SUCCESS",
        payload: false,
      });
      console.error(result.error);
    }
  };
  const resetRegistrationSuccess = () => {
    dispatch({
      type: "SET_REGISTRATION_SUCCESS",
      payload: false,
    });
  };
  // Cargar estado de autenticación desde localStorage al inicializar el contexto
  useEffect(() => {
    const { isLoggedIn, user } = getAuthStatus();
    if (isLoggedIn) {
      dispatch({
        type: "LOGIN",
        payload: { isLoggedIn, user },
      });
    }

    setLoading(false); // Se completó la carga
  }, []);

  return (
    <CharStates.Provider
      value={{
        state,
        dispatch,
        loading,
        handleRegister,
        resetRegistrationSuccess,
      }}
    >
      {children}
    </CharStates.Provider>
  );
};

export const useCharStates = () => useContext(CharStates);
