import { useEffect } from "react";
import { useCharStates } from "../Context";
import axios from "axios";
import Searcher from "../Components/Searcher";
import Categories from "../Components/Categories";
import Suggested from "../Components/Suggested";

//TODO: Implementar llamado a backend para solicitar información, por ahora se simula
const genres = [
  {
    title: "Rock",
    description: "Energía pura, guitarras potentes y una actitud rebelde.",
  },
  {
    title: "Jazz",
    description: "Improvisación y elegancia en cada nota.",
  },
  {
    title: "Pop",
    description: "Melodías pegajosas y ritmos que te harán bailar.",
  },
  {
    title: "Electronic",
    description: "Sonidos futuristas y ritmos que encienden la pista.",
  },
];
const eventList = [
  {
    id: "1",
    name: "Shakira | Las mujeres ya no lloran World Tour",
    genre: "pop",
    capacity: 100,
    date: "20-02-2024",
    time: "20:00",
    site: "Estadio Metropolitano Roberto Meléndez",
    city: "Barranquilla",
    description: "Descripcion 01 ejemplo generico",
    images: {
      small: "assets/Movil/Home/shakira.webp",
      medium: "assets/Tablet/Home/shakira-world-tour.webp",
      large: "assets/Desktop/Home/shakira-world-tour.webp",
    },
  },
  {
    id: "2",
    name: "Aventura: Cerrando clicos",
    genre: "Ritmos latinos",
    capacity: 100,
    date: "21-12-2024",
    time: "22:00",
    site: "Estadio Olimpico Pascual Guerrero",
    city: "Cali",
    description: "Descripcion 02 ejemplo generico",
    images: {
      small: "assets/Movil/Home/aventura.webp",
      medium: "assets/Tablet/Home/aventura.webp",
      large: "assets/Desktop/Home/aventura-cali.webp",
    },
  },
  {
    id: "3",
    name: "Apolo7 & Friends",
    genre: "Rock",
    capacity: 100,
    date: "29-11-2024",
    time: "21:00",
    site: "Estudio de la Piña",
    city: "Bogotá",
    description: "Descripcion 03 ejemplo generico",
    images: {
      small: "assets/Movil/Home/apolo7.webp",
      medium: "assets/Tablet/Home/apolo7.webp",
      large: "assets/Desktop/Home/apolo7.webp",
    },
  },
  {
    id: "4",
    name: "Festival Estéreo Picnic",
    genre: "Alternativo",
    capacity: 100,
    date: "27-04-2024",
    time: "14:00",
    site: "Parque Metropolitano Simón Bolívar",
    city: "Bogotá",
    description: "Descripcion 04 ejemplo generico",
    images: {
      small: "assets/Movil/Home/estereo.webp",
      medium: "assets/Tablet/Home/estereo-picnic.webp",
      large: "assets/Desktop/Home/estereo-picnic.webp",
    },
  },
];

const Home = () => {
  const { state, dispatch } = useCharStates();

  console.log(state.user, "aaa");

  useEffect(() => {
    // axios
    //   .get("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => {
    //     dispatch({ type: "GET_CHARS", payload: res.data });
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });
    dispatch({ type: "GET_TOPCAT", payload: genres });
    dispatch({ type: "GET_CHARS", payload: eventList });
  }, []);

  return (
    <>
      <Searcher />
      <Categories />
      <Suggested />
    </>
  );
};

export default Home;
