// Context.js
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { reducer } from "./Reducers/reducer";
import { getAuthStatus } from "./auth";

const CharStates = createContext(null);

const initialState = {
  topCategories: [],
  list: [],
  favs: JSON.parse(localStorage.getItem("favs")) || [],
  homeFilters: {},

  theme: localStorage.getItem("theme") === "true",
  isLoggedIn: false,
  user: null,
};

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
    document.body.className = state.theme ? "light" : "dark";
  }, [state.theme]);

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
    <CharStates.Provider value={{ state, dispatch, loading }}>
      {children}
    </CharStates.Provider>
  );
};

export const useCharStates = () => useContext(CharStates);
