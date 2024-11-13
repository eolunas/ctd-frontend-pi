import { useCharStates } from "../Context";
import Card from "../Components/Card";
import { useMemo } from "react";

const Suggested = () => {
  const { state } = useCharStates();

  const filteredList = useMemo(() => {
    const { genres, date, city, event } = state.homeFilters;
    let auxList = state.list;

    // Convertimos `genres` a minúsculas para una comparación eficiente
    const lowerCaseGenres = genres ? genres.map((g) => g.toLowerCase()) : [];

    if (lowerCaseGenres.length > 0) {
      auxList = auxList.filter((item) =>
        lowerCaseGenres.includes(item.genre.toLowerCase())
      );
    }

    if (date) {
      const dateFilter = new Date(date).toISOString().split("T")[0]; // Solo YYYY-MM-DD
      auxList = auxList.filter((item) => {
        const dateEvent = new Date(item.date).toISOString().split("T")[0];
        return dateFilter === dateEvent;
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
      <h2 className="text-2xl font-bold text-cyan-500 mb-5">Recomendaciones</h2>
      <div className="z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredList.map((event, index) => (
          <Card key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Suggested;
