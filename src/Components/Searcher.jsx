import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import GenreIcon from "../assets/1-Iconos/Home/genre.svg";
import CalendarIcon from "../assets/1-Iconos/Home/date.svg";
import LocationIcon from "../assets/1-Iconos/Home/city.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCharStates } from "../Context";
import { useState } from "react";
import InputCustom from "./InputCustom";
import { fetchFilters } from "../api/eventApi";

const animatedComponents = makeAnimated();

const Searcher = () => {
  const { state, dispatch } = useCharStates();

  const categories = state.genres.map((item) => {
    return { value: item.name, label: item.name };
  });

  const cities = state.cities.map((item) => {
    return { value: item, label: item };
  });

  const data = state.list.map((item) => item.name);

  const [filters, setFilters] = useState({});
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleInputChange = (e) => {
    let { name, value } =
      "target" in e
        ? e.target
        : {
            name: "genres",
            value: e ? e.map((option) => option.value.toLowerCase()) : [],
          };

    let allNullDate = false;
    if (name == "dates") {
      setDateRange(value);
      allNullDate = value.every((item) => item === null);
    }

    setFilters((prevFilters) => {
      if (name != "genres" && name != "dates")
        value = value.replace(/^\s+|\s+(?=\s)/g, "");

      if (value === null || value.length == 0 || allNullDate) {
        // Si el valor es nulo, eliminamos la clave del estado
        const { [name]: _, ...newFilters } = prevFilters;

        // Si no hay filtros se ejecuta funcion:
        if (Object.keys(newFilters).length == 0)
          dispatch({ type: "SET_DATAFILTERED", payload: [] });

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
    const getData = async () => {
      try {
        console.log(filters);
        const data = await fetchFilters(filters);
        dispatch({ type: "SET_DATAFILTERED", payload: data.data });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "SET_DATAFILTERED", payload: [] });
      }
    };

    getData();
  };

  return (
    <div
      className={`
      flex flex-col justify-center items-center w-vw h-auto mb-3 p-6 gap-1
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
          flex flex-col justify-center items-center h-full bg-white p-3 rounded-lg w-full max-w-[650px] gap-3 z-20
        `}
      >
        <div className="flex flex-col justify-center items-center relative gap-1.5 w-full">
          <label className="flex gap-1 text-gray-700 w-full ">
            <img className="size-6" src={GenreIcon} alt="Genre Icon" />
            Género
          </label>
          <Select
            name="genres"
            onChange={handleInputChange}
            className="w-full text-sm text-gray-500 shadow-md rounded-md "
            placeholder="Seleccione..."
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={categories}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-3 w-full sm:flex-row md:flex-col lg:flex-row">
          <div className="flex flex-col justify-center items-center relative  w-full">
            <label className="flex gap-1 text-gray-700 w-full mb-2">
              <img className="size-6" src={CalendarIcon} alt="Calendar Icon" />
              Fechas
            </label>
            <DatePicker
              name="dates"
              wrapperClassName="w-full"
              clearButtonClassName="mx-2"
              className={`bg-white border border-gray-300 shadow-md text-gray-900 text-sm rounded-md w-full px-2.5 h-[38px]`}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) =>
                handleInputChange({ target: { name: "dates", value: update } })
              }
              isClearable={true}
              placeholderText="Selecciona un rango de fechas"
            />
          </div>

          <div className="flex flex-col justify-center items-center relative w-full ">
            <label className="flex gap-1 text-gray-700 w-full mb-2">
              <img className="size-6" src={LocationIcon} alt="Location Icon" />
              Ciudad
            </label>
            <Select
              name="city"
              onChange={(e) =>
                handleInputChange({
                  target: { name: "city", value: e?.value || "" },
                })
              }
              className="w-full text-sm text-gray-500 shadow-md rounded-md "
              placeholder="Todo Colombia"
              components={animatedComponents}
              options={cities}
              isClearable
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 relative w-full mt-2">
          <InputCustom
            name={"event"}
            value={filters.event}
            functionChange={handleInputChange}
            data={data}
          />
          {Object.keys(filters).length > 0 && (
            <a
              onClick={handleSearchClick}
              className={`
            flex justify-center items-center bg-secondaryYellow p-2 h-[38px]
            rounded-lg shadow-md cursor-pointer
            hover:bg-yellow-500 hover:shadow-lg transition-all duration-200 ease-in-out`}
            >
              <MagnifyingGlassCircleIcon
                className={`
                h-6 w-6 text-white`}
              />
              <span className="text-white font-semibold">Buscar</span>
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

export default Searcher;
