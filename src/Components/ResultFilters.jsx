import { useCharStates } from "../Context";
import { useMemo } from "react";
import Card from "../Components/Card";

const ResultFilters = () => {
  const { state } = useCharStates();

  const filteredList = useMemo(() => {
    const { genres, dates, city, event } = state.homeFilters;
    let auxList = state.list;

    // Convertimos `genres` a minúsculas para una comparación eficiente
    const lowerCaseGenres = genres ? genres.map((g) => g.toLowerCase()) : [];

    if (lowerCaseGenres.length > 0) {
      auxList = auxList.filter((item) =>
        lowerCaseGenres.includes(item.genreName.toLowerCase())
      );
    }

    if (dates) {
      const [startDate, endDate] = dates.map((date) => new Date(date));
      auxList = auxList.filter((item) => {
        const dateEvent = new Date(item.eventDate);
        return dateEvent >= startDate && dateEvent <= endDate;
      });
    }

    if (city) {
      const lowerCaseCity = city.toLowerCase();
      auxList = auxList.filter((item) =>
        item.city.toLowerCase().includes(lowerCaseCity)
      );
    }

    if (event) {
      const lowerCaseEvent = event.toLowerCase();
      auxList = auxList.filter((item) =>
        item.name.toLowerCase().includes(lowerCaseEvent)
      );
    }

    return auxList;
  }, [state.homeFilters, state.list]);

  return (
    <div className="z-10 m-6 md:m-10">
      <div>
        <h3 className="text-xl font-bold text-cyan-500 mb-5">Filtros</h3>
        <div className="flex gap-2">{/* {genres, date, city, event} */}</div>
      </div>
      <h2 className="text-2xl font-bold text-cyan-500 mb-5">
        Resultados ({filteredList.length})
      </h2>
      <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredList.map((event, index) => (
          <Card key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default ResultFilters;
