import {
  MagnifyingGlassCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import GenreIcon from "../assets/1-Iconos/Home/genre.svg";
import CalendarIcon from "../assets/1-Iconos/Home/date.svg";
import LocationIcon from "../assets/1-Iconos/Home/city.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useCharStates } from "../Context";
import { useState } from "react";

const animatedComponents = makeAnimated();

const Searcher = () => {
  const { state, dispatch } = useCharStates();

  const categories = state.topCategories.map((item) => {
    return { value: item.title, label: item.title };
  });

  const [filters, setFilters] = useState({});

  const handleInputChange = (e) => {
    let { name, value } =
      "target" in e
        ? e.target
        : {
            name: "genres",
            value: e ? e.map((option) => option.value.toLowerCase()) : [],
          };

    setFilters((prevFilters) => {
      if(name != "genres") value = value.replace(/^\s+|\s+(?=\s)/g, "");
      if (value === null || value.length == 0) {
        // Si el valor es nulo, eliminamos la clave del estado
        const { [name]: _, ...newFilters } = prevFilters;
        return newFilters;
      }

      // De lo contrario, actualizamos el valor normalmente
      return {
        ...prevFilters,
        [name]: value,
      };
    });
  };

  const handleSearchClick = () => {
    dispatch({ type: "SET_FILTERS", payload: filters });
    console.log(filters);
  };

  return (
    <div
      className={`
      flex flex-col justify-center items-center w-vw h-auto mb-3 p-6 gap-5
      bg-searcher-mb bg-cover bg-center
      md:bg-searcher-tb md:p-10 md:flex-row
      lg:bg-searcher-pc`}
      style={{ boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.7)" }}
    >
      <div>
        <h1
          className={`
          text-[35px] font-bold text-white w-full
          md:text-[52px] md:w-2/3`}
        >
          Descubre, reserva y disfruta
        </h1>
        <p
          className={`
          mt-4 text-white text-[15px] mb-5 w-full
          md:w-2/3
          lg:w-1/3`}
        >
          No dejes pasar la oportunidad de disfrutar de tus artistas favoritos
          en el escenario.
        </p>
      </div>

      <form
        className={`
          flex flex-col justify-center items-center h-full bg-white p-3 rounded-lg w-full max-w-[650px] gap-3 z-10
        `}
      >
        <div className="flex flex-col justify-center items-center gap-3 w-full sm:flex-row">
          <div className="flex flex-col justify-center items-center relative gap-1.5 w-full">
            <label className="flex gap-1 text-gray-700 w-full">
              <img className="size-6" src={GenreIcon} alt="Genre Icon" />
              Género
            </label>
            <Select
              name="genres"
              onChange={handleInputChange}
              className="w-full text-sm"
              placeholder="Seleccione..."
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={categories}
            />
          </div>

          <div className="flex flex-col justify-center items-center relative gap-1.5 w-full sm:max-w-44">
            <label className="flex gap-1 text-gray-700 w-full">
              <img className="size-6" src={CalendarIcon} alt="Calendar Icon" />
              Fecha
            </label>
            <input
              name="date"
              onChange={handleInputChange}
              type="date"
              className="text-sm w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Selecciona una fecha"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center relative gap-1.5 w-full">
          <label className="flex gap-1 text-gray-700 w-full">
            <img className="size-6" src={LocationIcon} alt="Location Icon" />
            Ciudad
          </label>
          <input
            name="city"
            value={filters.city || ""}
            onChange={handleInputChange}
            type="text"
            className={`border border-gray-300 text-gray-900 text-sm rounded-md 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            placeholder="Todo Colombia"
          />
        </div>
        <div className="flex justify-center items-center gap-3 relative w-full">
          <UsersIcon className="h-6 w-6 text-black absolute left-2" />
          <input
            name="event"
            value={filters.event || ""}
            onChange={handleInputChange}
            type="text"
            className={`border border-gray-300 text-gray-900 text-sm rounded-md 
                        focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5`}
            placeholder="Artista o evento"
          />
          <a
            onClick={handleSearchClick}
            className={`
            flex justify-center items-center bg-secondaryYellow p-2
            rounded-lg shadow-md cursor-pointer
            hover:bg-yellow-500 hover:shadow-lg transition-all duration-200 ease-in-out`}
          >
            <MagnifyingGlassCircleIcon
              className={`
                h-6 w-6 text-white`}
            />
            <span className="text-white font-semibold">Buscar</span>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Searcher;
