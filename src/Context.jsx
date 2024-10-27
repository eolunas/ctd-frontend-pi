/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer } from './Reducers/reducer';

const CharStates = createContext(null);
const favs = JSON.parse(localStorage.getItem('favs')) || [];
const theme = localStorage.getItem('theme') == 'true';
const initialState = {
  list: [],
  favs: favs,
  theme: theme,
}

export const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        dispatch({ type: 'GET_CHARS', payload: res.data })
      })
      .catch(error => {
        console.error('Error fetching data:', error); 
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs));
  }, [state.favs]);

  // Aplicar la clase de tema al body del documento
  useEffect(() => {
    document.body.className = state.theme ? 'light' : 'dark';
  }, [state.theme]);

  return (
    <CharStates.Provider value={{ state, dispatch }}>
      {children}
    </CharStates.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCharStates = () => {
  return useContext(CharStates);
};